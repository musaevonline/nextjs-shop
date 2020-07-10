import React from "react";
import * as yup from "yup";
import {IS_REQUIRED_TEXT} from "@temp/core/constants";
import {useFormik} from "formik";
import {Button} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {Rating} from "@material-ui/lab";
import FormHelperText from "@material-ui/core/FormHelperText";

const schema = yup.object().shape({
    rating: yup.number()
        .required(IS_REQUIRED_TEXT)
        .min(1, "Минимальное значение 1")
        .max(5, "Максимально значение 5"),
    title: yup.string().required(IS_REQUIRED_TEXT)
        .max(100, "Максимально значение 100 символов"),
    content: yup.string().required(IS_REQUIRED_TEXT)
        .max(1000, "Максимально значение 1000 символов"),
    advantages: yup.array().max(5, "Максимально значение 200 символов"),
    flaws: yup.array().max(5, "Максимально значение 200 символов"),
});

export type TProductReviewFormData = {
    rating: number,
    title: string,
    content: string,
    advantages: string[],
    flaws: string[]
}

const defaultInitialValues = {
    rating: 5,
    title: "",
    content: "",
    advantages: [],
    flaws: []
};

const ProductReviewForm:React.FC<{
    initialValues?: TProductReviewFormData,
    onSubmit(values: TProductReviewFormData):void,
    loading: boolean
}> = ({ initialValues, onSubmit, loading }) => {

    const form = useFormik({
        initialValues: initialValues || defaultInitialValues,
        validationSchema: schema,
        onSubmit: values => {
            onSubmit(values);
        }
    });
    return(
        <form onSubmit={form.handleSubmit}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <div className="mb-10">
                        <div className="pl-5 text-xs text-gray-600">Оценка</div>
                        <Rating
                            name="rating"
                            value={form.values.rating}
                            onChange={(e, val) => form.setFieldValue("rating", val)}
                            onBlur={form.handleBlur}
                            max={5}
                        />
                        {form.errors.rating && <FormHelperText error={true}>{form.errors.rating}</FormHelperText>}
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <TextField value={form.values.title}
                               name="title"
                               error={form.dirty && form.touched.title && !!form.errors.title}
                               helperText={form.dirty  && form.touched.title && form.errors.title}
                               onChange={form.handleChange}
                               onBlur={form.handleBlur}
                               label="Заглавие"
                               variant="outlined"
                               fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField value={form.values.content}
                               name="content"
                               error={form.dirty && form.touched.content && !!form.errors.content}
                               helperText={form.dirty  && form.touched.content && form.errors.content}
                               onChange={form.handleChange}
                               onBlur={form.handleBlur}
                               label="Комментарий"
                               variant="outlined"
                               rows={3}
                               rowsMax={5}
                               multiline
                               fullWidth
                    />
                </Grid>
            </Grid>
            <div className="flex justify-end mt-10">
                <Button type="submit"
                        variant="contained"
                        color="primary"
                        disabled={!form.dirty || loading || !form.isValid}>
                    Сохранить
                </Button>
            </div>
        </form>
    )
};

export default ProductReviewForm;