import { MultiAutocompleteChoiceType } from "@temp/components/MultiAutocompleteSelectField";
import { ChangeEvent, FormChange } from "@temp/hooks/useForm";
import { toggle } from "@temp/utils/lists";

/**
 * @param change Use toggleValue callback delivered by form
 */
function createMultiAutocompleteSelectHandler(
  change: FormChange,
  setSelected: (choices: MultiAutocompleteChoiceType[]) => void,
  selected: MultiAutocompleteChoiceType[],
  choices: MultiAutocompleteChoiceType[]
): FormChange {
  return (event: ChangeEvent) => {
    change(event);

    const id = event.target.value;
    const choice = choices.find(choice => choice.value === id);

    setSelected(toggle(choice, selected, (a, b) => a.value === b.value));
  };
}

export default createMultiAutocompleteSelectHandler;
