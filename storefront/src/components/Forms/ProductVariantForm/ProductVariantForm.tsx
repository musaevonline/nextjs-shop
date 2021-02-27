import "./scss/index.scss";

import React, {useEffect} from "react";
import * as Yup from "yup";
import {useFormik} from "formik";
import {FormControl, TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {ProductVariant} from "@sdk/fragments/types/ProductVariant";
import {MAX_CHECKOUT_VARIANT_LINES} from "@temp/core/constants";
import _ from "lodash";
import Button from "@material-ui/core/Button";
import {ProductWithVariants, ProductWithVariants_variants_attributes} from "@sdk/fragments/types/ProductWithVariants";
import {getProductVariantsAttributes, selectVariantByAttributes} from "@temp/views/ProductDetails/utils";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    select: {
        padding: "10px 14px"
    }
}))

export type TFormProductVariantData = {
    variant: string,
    quantity: number
}

interface ProductVariantFormProps {
    product: ProductWithVariants,
    addVariantToCheckoutSubmit(values: TFormProductVariantData): void,
    setSelectedVariant(variant: ProductVariant | null): void,
    setSelectedQuantity(quantity: number),
    selectedVariant: ProductVariant | null,
    checkoutVariantQuantity: (selectedVariantId:string) => number
}

const getInitialAttributes = (attrs: ProductWithVariants_variants_attributes[]) => {
    const data = {};
    if (attrs){
        attrs.forEach(attr => {
            if (!!attr.values.length) {
                data[attr.attribute.id] = attr.values[0].id
            }
        })
    }
    return data
}

const ProductVariantForm:React.FC<ProductVariantFormProps> = ({product, addVariantToCheckoutSubmit,
                                                                  setSelectedVariant, setSelectedQuantity,
                                                                  selectedVariant, checkoutVariantQuantity
                                                              }) =>{
    const classes = useStyles();
    const [selectedAttrs, setSelectedAttrs] = React.useState(getInitialAttributes(product.variants[0]?.attributes))
    let selectedVariantStockQuantity = 0;
    let availableQuantity = MAX_CHECKOUT_VARIANT_LINES;
    if (selectedVariant){
        selectedVariantStockQuantity = _.sumBy(selectedVariant.stocks,
            stock => stock.stockQuantity);
        availableQuantity = Math.min(selectedVariantStockQuantity - checkoutVariantQuantity(selectedVariant.id), MAX_CHECKOUT_VARIANT_LINES);
    }


    const schema = Yup.object().shape({
        variant: Yup.string()
            .required('Вариант не выбран'),
        quantity: Yup.number()
            .required('Минимальное количество заказа 1')
            .integer('Должно быть целое число')
            .positive('Минимальное количество заказа 1')
            .max(availableQuantity,
                `Доступно ${availableQuantity}`)
    });
    const attributes = getProductVariantsAttributes(product);
    const form = useFormik({
        enableReinitialize: true,
        initialValues: {
            variant: product.variants[0]?.id || '',
            quantity: 1
        },
        validationSchema: schema,
        onSubmit: (values:TFormProductVariantData) => {
            addVariantToCheckoutSubmit(values);
            form.resetForm();
            setSelectedAttrs(getInitialAttributes(product.variants[0]?.attributes));
        }
    });

    useEffect(() =>{
        const selectedVariant = product.variants.filter(el => el.id === form.values.variant)[0];
        setSelectedVariant(selectedVariant || null);
        setSelectedQuantity(form.values.quantity);
    }, [form.values]);

    useEffect(() => {
        form.setFieldValue('quantity',1);
    }, [form.values.variant]);

    useEffect(() =>{
        form.resetForm();
    }, [product]);

    const onChangeAttribute = (attrId) => (e) => {
        const newAttrs = {
            ...selectedAttrs,
            [attrId]: e.target.value
        }
        setSelectedAttrs(newAttrs);
        const newSelectedVariant = selectVariantByAttributes(product.variants, newAttrs);
        form.setFieldValue('variant', newSelectedVariant?.id);
    }

    return(
        <div className="product-form">
            <form onSubmit={form.handleSubmit}>
                <Grid container spacing={0}>
                    {attributes.map(attr => {
                        const options = attr.values.map(val => ({label: val.name, value: val.id}));
                        if (!options.length) return null;
                        return(
                            <Grid key={attr.id} item xs={12}>
                                <FormControl margin="normal" fullWidth>
                                    <InputLabel id={`variant-select-label_${attr.id}`}>{attr.name}</InputLabel>
                                    <Select
                                        labelId={`variant-select-label_${attr.id}`}
                                        id="variant-select"
                                        value={selectedAttrs[attr.id] || null}
                                        onChange={onChangeAttribute(attr.id)}
                                        variant="outlined"
                                        label={attr.name}
                                        MenuProps={{
                                            variant: "menu"
                                        }}
                                        classes={{
                                            outlined: classes.select
                                        }}
                                        fullWidth
                                    >
                                        {options.map((opt, i) => {
                                            return(
                                                <MenuItem key={i} value={opt.value}>{opt.label}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                                {/*<Autocomplete*/}
                                {/*    id={attr.id}*/}
                                {/*    options={options}*/}
                                {/*    onChange={onChangeAttribute(attr.id)}*/}
                                {/*    value={selectedAttrs[attr.id] || null}*/}
                                {/*    disableClearable*/}
                                {/*    autoHighlight*/}
                                {/*    getOptionLabel={option => option?.label || null}*/}
                                {/*    renderOption={option => option?.label || null}*/}
                                {/*    getOptionSelected={(option, value) => option?.value === value.value}*/}
                                {/*    size="small"*/}
                                {/*    noOptionsText="Нет вариантов"*/}
                                {/*    renderInput={params => (*/}
                                {/*        <TextField*/}
                                {/*            {...params}*/}
                                {/*            label={attr.name}*/}
                                {/*            variant="outlined"*/}
                                {/*            fullWidth*/}
                                {/*            inputProps={{*/}
                                {/*                ...params.inputProps*/}
                                {/*            }}*/}
                                {/*        />*/}
                                {/*    )}*/}
                                {/*    fullWidth*/}
                                {/*/>*/}
                            </Grid>
                        )
                    })}
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={4}>
                        <div className="product-form__quantity">
                            <FormControl margin="normal" fullWidth>
                                <TextField id="id_quantity"
                                           name="quantity"
                                           label="Количество"
                                           disabled={availableQuantity === 0}
                                           inputProps={{
                                               min: 1,
                                               max: availableQuantity,
                                               step: 1
                                           }}
                                           type="number"
                                           helperText={(form.touched.quantity && form.errors.quantity)}
                                           error={!!(form.touched.quantity && form.errors.quantity)}
                                           onChange={form.handleChange}
                                           value={form.values.quantity}
                                           onBlur={form.handleBlur}
                                           variant="outlined"
                                           fullWidth
                                />
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={8} className="flex items-center">
                        <div className="pt-5 w-full">
                            <Button  type="submit"
                                     variant="contained"
                                     color="secondary"
                                     size="large"
                                     fullWidth
                                     disabled={!form.isValid || !selectedVariantStockQuantity}>
                                Добавить в корзину
                            </Button>
                        </div>
                    </Grid>
                </Grid>

            </form>
        </div>
    );
};

export default ProductVariantForm;