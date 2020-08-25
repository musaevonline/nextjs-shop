import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import React from "react";
import { FormattedMessage } from "react-intl";

import { ListSettings } from "../../types";
import {commonMessages} from "@temp/intl";

const useStyles = makeStyles(
  theme => ({
    label: {
      fontSize: 14
    },
    select: {
      "& div": {
        "&:focus": {
          background: "none"
        },
        color: theme.palette.primary.main,
        marginLeft: theme.spacing(1)
      },
      "& svg": {
        color: theme.palette.primary.main
      },
      "&:after, &:before, &:hover": {
        border: "none !important"
      }
    }
  }),
  {
    name: "RowNumberSelect"
  }
);

interface RowNumberSelectProps {
  choices: number[];
  className?: string;
  settings: ListSettings;
  onChange(key: keyof ListSettings, value: any);
}

const RowNumberSelect: React.FC<RowNumberSelectProps> = ({
  className,
  choices,
  settings,
  onChange
}) => {
  const theme = useTheme();
  const classes = useStyles({ theme });
  return (
    <div className={className}>
      <span className={classes.label}>
        <FormattedMessage {...commonMessages.numberOfRows} />
      </span>
      <Select
        className={classes.select}
        value={settings.rowNumber}
        onChange={event => onChange("rowNumber", event.target.value)}
      >
        {choices.length > 0 &&
          choices.map(choice => (
            <MenuItem value={choice} key={choice}>
              {choice}
            </MenuItem>
          ))}
      </Select>
    </div>
  );
};

export default RowNumberSelect;