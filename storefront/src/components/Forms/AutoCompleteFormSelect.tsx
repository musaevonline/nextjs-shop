import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import _ from "lodash";

interface IOption {
    label: string,
    value: string | number
}

const AutocompleteFormSelect:React.FC<{
    form: any
    options: IOption[],
    label: string,
    name: string
}> = ({ form, options, label, name, ...props }) => {
    const selectedIndex = _.findIndex(options, el => el.value === form.values[name]);
    const selected = options[selectedIndex] || options[0];

    const onChange = (e, el) =>{
        const { value } = el;
        form.setFieldValue(name, value);
        // form.setFieldTouched(name, true);
    };

    return (
        <Autocomplete
            id={`id_${name}`}
            options={options}
            onChange={onChange}
            value={selected}
            onBlur={form.onBlur}
            disableClearable
            autoHighlight
            getOptionLabel={option => option.label}
            renderOption={option => option.label}
            {...props}
            renderInput={params => (
                <TextField
                    {...params}
                    label={label}
                    variant="outlined"
                    fullWidth
                    helperText={(form.touched[name] && form.errors[name])}
                    error={!!(form.touched[name] && form.errors[name])}
                    inputProps={{
                        ...params.inputProps
                    }}
                />
            )}
        />
    );
};

export default AutocompleteFormSelect;
