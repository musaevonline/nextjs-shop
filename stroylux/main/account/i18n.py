from collections import defaultdict

from django import forms
from django_countries import countries

from .models import Address
from .validators import validate_possible_number

COUNTRY_FORMS = {}
UNKNOWN_COUNTRIES = set()

AREA_TYPE = {
    "area": "Area",
    "county": "County",
    "department": "Department",
    "district": "District",
    "do_si": "Do/si",
    "eircode": "Eircode",
    "emirate": "Emirate",
    "island": "Island",
    "neighborhood": "Neighborhood",
    "oblast": "Oblast",
    "parish": "Parish",
    "pin": "PIN",
    "postal": "Postal code",
    "prefecture": "Prefecture",
    "province": "Province",
    "state": "State",
    "suburb": "Suburb",
    "townland": "Townland",
    "village_township": "Village/township",
    "zip": "ZIP code",
}


class PossiblePhoneNumberFormField(forms.CharField):
    """A phone input field."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.widget.input_type = "tel"


class AddressMetaForm(forms.ModelForm):
    # This field is never visible in UI
    preview = forms.BooleanField(initial=False, required=False)

    class Meta:
        model = Address
        fields = ["country", "preview"]
        labels = {"country": "Country"}

    def clean(self):
        data = super().clean()
        if data.get("preview"):
            self.data = self.data.copy()
            self.data["preview"] = False
        return data


class AddressForm(forms.ModelForm):

    AUTOCOMPLETE_MAPPING = [
        ("first_name", "given-name"),
        ("last_name", "family-name"),
        ("company_name", "organization"),
        ("street_address_1", "address-line1"),
        ("street_address_2", "address-line2"),
        ("city", "address-level2"),
        ("postal_code", "postal-code"),
        ("country_area", "address-level1"),
        ("country", "country"),
        ("city_area", "address-level3"),
        ("phone", "tel"),
        ("email", "email"),
    ]

    class Meta:
        model = Address
        exclude = []
        labels = {
            "first_name": "Given name",
            "last_name": "Family name",
            "company_name": "Company or organization",
            "street_address_1": "Address",
            "street_address_2": "",
            "city": "City",
            "city_area": "District",
            "postal_code": "Postal code",
            "country": "Country",
            "country_area": "State or province",
            "phone": "Phone number",
        }
        placeholders = {
            "street_address_1": "Street address, P.O. box, company name",
            "street_address_2": "Apartment, suite, unit, building, floor, etc",
        }

    def __init__(self, *args, **kwargs):
        autocomplete_type = kwargs.pop("autocomplete_type", None)
        super().__init__(*args, **kwargs)
        # countries order was taken as defined in the model,
        # not being sorted accordingly to the selected language
        self.fields["country"].choices = sorted(
            COUNTRY_CHOICES, key=lambda choice: choice[1]
        )
        autocomplete_dict = defaultdict(lambda: "off", self.AUTOCOMPLETE_MAPPING)
        for field_name, field in self.fields.items():
            if autocomplete_type:
                autocomplete = "%s %s" % (
                    autocomplete_type,
                    autocomplete_dict[field_name],
                )
            else:
                autocomplete = autocomplete_dict[field_name]
            field.widget.attrs["autocomplete"] = autocomplete
            field.widget.attrs["placeholder"] = (
                field.label if not hasattr(field, "placeholder") else field.placeholder
            )

    def clean(self):
        data = super().clean()
        phone = data.get("phone")
        country = data.get("country")
        if phone:
            try:
                data["phone"] = validate_possible_number(phone, country)
            except forms.ValidationError as error:
                self.add_error("phone", error)
        return data


def get_address_form_class(country_code):
    return COUNTRY_FORMS.get(country_code, AddressForm)

COUNTRY_CHOICES = [
    (code, label)
    for code, label in countries.countries.items()
    if code not in UNKNOWN_COUNTRIES
]
# Sort choices list by country name
COUNTRY_CHOICES = sorted(COUNTRY_CHOICES, key=lambda choice: choice[1])