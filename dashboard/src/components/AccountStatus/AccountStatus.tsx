import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardTitle from "@temp/components/CardTitle";
import { ControlledCheckbox } from "@temp/components/ControlledCheckbox";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

interface StaffStatusProps {
  data: {
    isActive: boolean;
  };
  disabled: boolean;
  label: React.ReactNode;
  onChange: (event: React.ChangeEvent<any>) => void;
}

const StaffStatus: React.FC<StaffStatusProps> = ({
  data,
  disabled,
  label,
  onChange
}) => {
  const intl = useIntl();

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({id: "account_status",
          defaultMessage: "Account Status",
          description: "section header"
        })}
      />
      <CardContent>
        <Typography>
          <FormattedMessage id="if_you_want_disable_this_account_uncheck_the_box_below"
                            defaultMessage="If you want to disable this account uncheck the box below" />
        </Typography>
        <ControlledCheckbox
          checked={data.isActive}
          disabled={disabled}
          label={label}
          name="isActive"
          onChange={onChange}
        />
      </CardContent>
    </Card>
  );
};
StaffStatus.displayName = "StaffStatus";
export default StaffStatus;
