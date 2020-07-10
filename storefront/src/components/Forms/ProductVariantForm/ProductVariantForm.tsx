import "./scss/index.scss";

import React, {useEffect} from "react";
import * as Yup from "yup";
import {useFormik} from "formik";
import {FormControl, TextField} from "@material-ui/core";
import AutocompleteFormSelect from "@temp/components/Forms/AutoCompleteFormSelect";
import Grid from "@material-ui/core/Grid";
import {ProductVariant} from "@sdk/fragments/types/ProductVariant";
import {MAX_CHECKOUT_VARIANT_LINES} from "@temp/core/constants";
import _ from "lodash";
import Button from "@material-ui/core/Button";
import {ProductWithVariants} from "@sdk/fragments/types/ProductWithVariants";

export type TFormProductVariantData = {
    variant: string,
    quantity: number
}

interface ProductVariantFormProps {
    product: ProductWithVariants,
    addVariantToCheckoutSubmit(values: TFormProductVariantData): void,
    setSelectedVariant(variant: ProductVariant): void,
    setSelectedQuantity(quantity: number),
    selectedVariant: ProductVariant | null,
    checkoutVariantQuantity: (selectedVariantId:string) => number
}

const ProductVariantForm:React.FC<ProductVariantFormProps> = ({product, addVariantToCheckoutSubmit,
                                                                  setSelectedVariant, setSelectedQuantity,
                                                                  selectedVariant, checkoutVariantQuantity
                                                              }) =>{
    let selectedVariantStockQuantity = 0;
    let availableQuantity = MAX_CHECKOUT_VARIANT_LINES;
    if (selectedVariant){
        selectedVariantStockQuantity = _.sumBy(selectedVariant.stocks,
            stock => stock.stockQuantity);
        availableQuantity = Math.min(selectedVariantStockQuantity - checkoutVariantQuantity(selectedVariant.id), MAX_CHECKOUT_VARIANT_LINES);
    }

    const isManyVariants = product.variants?.length > 1;
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

    const form = useFormik({
        initialValues: {
            variant: isManyVariants ? '' : product.variants[0]?.id || '',
            quantity: 1
        },
        validationSchema: schema,
        onSubmit: (values:TFormProductVariantData) => {
            addVariantToCheckoutSubmit(values);
            form.resetForm();
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
    let variantsOptions = product.variants.map(variant => ({
        label: variant.name,
        value: variant.id
    }));
    if (isManyVariants){
        variantsOptions = [{
            label: 'Вариант...',
            value: ''
        }, ...variantsOptions];
    }

    return(
        <div className="product-form">
            <form onSubmit={form.handleSubmit}>
                <Grid container spacing={2}>
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
                    <Grid item xs={12} sm={8}>
                        <div className="product-form__variant">
                            <FormControl margin="normal" fullWidth>
                                <AutocompleteFormSelect form={form}
                                                        label="Вариант"
                                                        name="variant"
                                                        options={variantsOptions}/>
                            </FormControl>
                        </div>
                    </Grid>
                </Grid>
                <div className="pt-10">
                    <Button  type="submit"
                             variant="contained"
                             color="primary"
                             size="large"
                             fullWidth
                             disabled={!form.isValid || !selectedVariantStockQuantity}>
                        Добавить в корзину
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ProductVariantForm;