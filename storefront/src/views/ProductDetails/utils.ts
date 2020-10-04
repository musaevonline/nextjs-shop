import _ from "lodash";
import {
    ProductDetails_product,
    ProductDetails_product_variants_attributes_attribute
} from "@sdk/queries/types/ProductDetails";
import {ProductWithVariants, ProductWithVariants_variants} from "@sdk/fragments/types/ProductWithVariants";

export const getProductVariantsAttributes = (product: ProductDetails_product | ProductWithVariants): ProductDetails_product_variants_attributes_attribute[] => {
    const attributes = _.flatMapDeep(product?.variants.map(variant => variant.attributes)) || [];
    const attributesValues = {};
    attributes.forEach(attr => {
        const el = attributes.find(el => el.attribute.id === attr.attribute.id);
        const prev = attributesValues[attr.attribute.id] || [];
        attributesValues[attr.attribute.id] = _.uniqBy([...prev, ...el.values, ...attr.values], el => el.id);
    });
    const uniqueAttrs = _.uniqBy(attributes.map(attr => attr.attribute), attr => attr.id);
    return uniqueAttrs.map(attr => {
        return {
            ...attr,
            values: attributesValues[attr.id]
        }
    });
};

export const selectVariantByAttributes = (
    variants: ProductWithVariants_variants[],
    attrs: {[key: string]: {label: string, value: string}}
): ProductWithVariants_variants | null => {
    const attrsKeys = Object.keys(attrs);
    const filteredVariants = variants.filter(variant => {
        let found = true;
        if (variant.attributes.length !== attrsKeys.length){
            found = false
        }else{
            for (let i = 0; i < attrsKeys.length; i++){
                const attributeId = attrsKeys[i];
                const attr = attrs[attributeId];
                const variantAttr = variant.attributes.find(el => !!el.values.find(val => val.id === attr.value));
                if (!variantAttr) {
                    found = false;
                    break;
                }
            }
        }
        return found
    });

    return filteredVariants[0] || null;
}