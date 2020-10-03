import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CardTitle from "@temp/components/CardTitle";
import FormSpacer from "@temp/components/FormSpacer";
import { commonMessages } from "@temp/intl";
import { PageErrorFragment } from "@temp/sections/pages/types/PageErrorFragment";
import { getFormErrors } from "@temp/utils/errors";
import getPageErrorMessage from "@temp/utils/errors/page";
import React from "react";
import { useIntl } from "react-intl";

import { PageDetails_page } from "../../types/PageDetails";
import { FormData } from "../PageDetailsPage";
import {RichCKEditor} from "@temp/components/RichCkeditor";

export interface PageInfoProps {
    data: FormData;
    disabled: boolean;
    errors: PageErrorFragment[];
    page: PageDetails_page;
    onChange: (event: React.ChangeEvent<any>) => void;
}

const useStyles = makeStyles(
    {
        root: {
            overflow: "visible"
        }
    },
    { name: "PageInfo" }
);

const PageInfo: React.FC<PageInfoProps> = props => {
    const { data, disabled, errors, onChange } = props;
    const classes = useStyles(props);
    const intl = useIntl();

    const formErrors = getFormErrors(["title", "content"], errors);
    return (
        <Card className={classes.root}>
            <CardTitle
                title={intl.formatMessage(commonMessages.generalInformation)}
            />
            <CardContent>
                <TextField
                    disabled={disabled}
                    error={!!formErrors.title}
                    fullWidth
                    helperText={getPageErrorMessage(formErrors.title, intl)}
                    label={intl.formatMessage({
                        id: "title",
                        defaultMessage: "Title",
                        description: "page title"
                    })}
                    name={"title" as keyof FormData}
                    value={data.title}
                    onChange={onChange}
                />
                <FormSpacer />
                <RichCKEditor disabled={disabled}
                              data={data.content}
                              name="content"
                              onChange={onChange}
                />
            </CardContent>
        </Card>
    );
};
PageInfo.displayName = "PageInfo";
export default PageInfo;
