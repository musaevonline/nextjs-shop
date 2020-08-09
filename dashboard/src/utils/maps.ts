import { MultiAutocompleteChoiceType } from "@temp/components/MultiAutocompleteSelectField";
import { SingleAutocompleteChoiceType } from "@temp/components/SingleAutocompleteSelectField";

export function mapCountriesToChoices(
  countries: any[]
): Array<SingleAutocompleteChoiceType | MultiAutocompleteChoiceType> {
  return countries.map(country => ({
    label: country.country,
    value: country.code
  }));
}
