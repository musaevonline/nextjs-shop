from django.contrib.sites.models import Site
from measurement.measures import Weight


class WeightUnits:
    KILOGRAM = "kg"
    POUND = "lb"
    OUNCE = "oz"
    GRAM = "g"

    CHOICES = [
        (KILOGRAM, "kg"),
        (POUND, "lb"),
        (OUNCE, "oz"),
        (GRAM, "g"),
    ]


def zero_weight():
    """Represent the zero weight value."""
    return Weight(kg=0)


def convert_weight(weight, unit):
    # Weight amount from the Weight instance can be retrived in serveral units
    # via its properties. eg. Weight(lb=10).kg
    converted_weight = getattr(weight, unit)
    return Weight(**{unit: converted_weight})


def get_default_weight_unit():
    site = Site.objects.get_current()
    return site.settings.default_weight_unit