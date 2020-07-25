import { WindowTitle } from "@temp/components/WindowTitle";
import useNavigator from "@temp/hooks/useNavigator";
import useNotifier from "@temp/hooks/useNotifier";
import { useProductVariantBulkCreateMutation } from "@temp/sections/products/mutations";
import { useCreateMultipleVariantsData } from "@temp/sections/products/queries";
import { productUrl } from "@temp/sections/products/urls";
import React from "react";
import { useIntl } from "react-intl";

import ProductVariantCreatorPage from "../../components/ProductVariantCreatorPage";

interface ProductVariantCreatorProps {
    id: string;
}

const ProductVariantCreator: React.FC<ProductVariantCreatorProps> = ({
                                                                         id
                                                                     }) => {
    const navigate = useNavigator();
    const notify = useNotifier();
    const intl = useIntl();
    const { data } = useCreateMultipleVariantsData({
        displayLoader: true,
        variables: { id }
    });
    const [
        bulkProductVariantCreate,
        bulkProductVariantCreateOpts
    ] = useProductVariantBulkCreateMutation({
        onCompleted: data => {
            if (data.productVariantBulkCreate.errors.length === 0) {
                notify({
                    text: intl.formatMessage({ id: 'successfully_created',
                        defaultMessage: "Successfully created variants",
                        description: "success message"
                    })
                });
                navigate(productUrl(id));
            }
        }
    });

    const onSubmit = (inputs) => {
        bulkProductVariantCreate({
            variables: { id, inputs }
        });
    }

    return (
        <>
            <WindowTitle
                title={intl.formatMessage({ id: 'create_variants',
                    defaultMessage: "Create Variants",
                    description: "window title"
                })}
            />
            <ProductVariantCreatorPage
                defaultPrice={data?.product?.basePrice.amount.toString()}
                errors={
                    bulkProductVariantCreateOpts.data?.productVariantBulkCreate.errors ||
                    []
                }
                attributes={data?.product?.productType?.variantAttributes || []}
                currencySymbol={"USD"}
                onSubmit={onSubmit}
            />
        </>
    );
};
ProductVariantCreator.displayName = "ProductVariantCreator";
export default ProductVariantCreator;
