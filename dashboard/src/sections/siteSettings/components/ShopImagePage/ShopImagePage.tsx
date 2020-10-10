import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import AppHeader from "@temp/components/AppHeader";
import CardTitle from "@temp/components/CardTitle";
import { ConfirmButtonTransitionState } from "@temp/components/ConfirmButton";
import Container from "@temp/components/Container";
import Grid from "@temp/components/Grid";
import PageHeader from "@temp/components/PageHeader";
import SaveButtonBar from "@temp/components/SaveButtonBar";
import Skeleton from "@temp/components/Skeleton";
import { commonMessages } from "@temp/intl";
import React from "react";
import {useIntl} from "react-intl";
import * as yup from 'yup';

import ShopImageNavigation from "../ShopImageNavigation";
import {useFormik} from "formik";
import {maybe} from "@temp/misc";
import {RichCKEditor} from "@temp/components/RichCkeditor";

const schema = yup.object().shape({
    description: yup.string(),
    alt: yup.string()
});

const useStyles = makeStyles(
    theme => ({
        image: {
            height: "100%",
            objectFit: "contain",
            width: "100%"
        },
        imageContainer: {
            background: "#ffffff",
            border: "1px solid #eaeaea",
            borderRadius: theme.spacing(),
            margin: `0 auto ${theme.spacing(2)}px`,
            maxWidth: 552,
            padding: theme.spacing(2)
        }
    }),
    { name: "ShopImagePage" }
);
export interface ShopImageFormData {
    description: string;
    alt: string;
}

interface ShopImagePageProps {
    image?: {
        id: string;
        alt: string;
        description: string;
        url: string;
    };
    images?: Array<{
        id: string;
        url: string;
    }>;
    disabled: boolean;
    shop: string;
    saveButtonBarState: ConfirmButtonTransitionState;
    onBack: () => void;
    onDelete: () => void;
    onRowClick: (id: string) => () => void;
    onSubmit: (data: ShopImageFormData) => void;
}



const ShopImagePage: React.FC<ShopImagePageProps> = props => {
    const {
        disabled,
        image,
        images,
        shop,
        saveButtonBarState,
        onBack,
        onDelete,
        onRowClick,
        onSubmit
    } = props;

    const classes = useStyles(props);
    const intl = useIntl();
    const initialValues: ShopImageFormData = {
        description: maybe(() => image.description, ''),
        alt: maybe(() => image.alt, ''),
    }
    const form = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        validationSchema: schema,
        onSubmit: values => {
            onSubmit(values);
        }
    })

    return (
        <form onSubmit={form.handleSubmit}>
            <Container>
                <AppHeader onBack={onBack}>{shop}</AppHeader>
                <PageHeader
                    title={intl.formatMessage({ id:'edit_photo',
                        defaultMessage: "Edit Photo",
                        description: "header"
                    })}
                />
                <Grid variant="inverted">
                    <div>
                        <ShopImageNavigation
                            disabled={disabled}
                            images={images}
                            highlighted={image ? image.id : undefined}
                            onRowClick={onRowClick}
                        />
                        <Card>
                            <CardTitle
                                title={intl.formatMessage({ id: 'photo_information',
                                    defaultMessage: "Photo Information",
                                    description: "section header"
                                })}
                            />
                            <CardContent>
                                <TextField
                                    name="alt"
                                    label={intl.formatMessage(commonMessages.alt)}
                                    helperText={intl.formatMessage({
                                        id: 'optional',
                                        defaultMessage: "Optional",
                                        description: "field is optional"
                                    })}
                                    disabled={disabled}
                                    onChange={form.handleChange}
                                    value={form.values.alt}
                                    multiline
                                    fullWidth
                                />
                                <RichCKEditor disabled={disabled || !onSubmit}
                                              data={form.values.description}
                                              name={"description"}
                                              onChange={form.handleChange}
                                />
                            </CardContent>
                        </Card>
                    </div>
                    <div>
                        <Card>
                            <CardTitle
                                title={intl.formatMessage({ id: 'photo_view',
                                    defaultMessage: "Photo View",
                                    description: "section header"
                                })}
                            />
                            <CardContent>
                                {!!image ? (
                                    <div className={classes.imageContainer}>
                                        <img src={image.url} className={classes.image} alt={image.alt}/>
                                    </div>
                                ) : (
                                    <Skeleton />
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </Grid>
                <SaveButtonBar
                    disabled={disabled || !onSubmit || !form.dirty || !form.isValid}
                    state={saveButtonBarState}
                    onCancel={onBack}
                    onDelete={onDelete}
                    onSave={form.handleSubmit}
                />
            </Container>
        </form>
    );
};
ShopImagePage.displayName = "ShopImagePage";
export default ShopImagePage;
