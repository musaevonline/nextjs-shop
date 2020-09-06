import useNavigator from "@temp/hooks/useNavigator";
import useNotifier from "@temp/hooks/useNotifier";
import {commonMessages} from "@temp/intl";
import React from "react";
import {useIntl} from "react-intl";

import ShippingMethodCreatePage from "../components/ShippingMethodCreatePage";
import {useShippingMethodCreate} from "../mutations";
import {shippingMethodListUrl, shippingMethodUrl} from "../urls";
import useShop from "@temp/hooks/useShop";
import {ShippingMethodDetailsFormData} from "@temp/sections/shipping/components/ShippingMethodDetailsForm";
import {ShippingMethodTypeEnum} from "@temp/types/globalTypes";

const ShippingMethodCreate: React.FC<{}> = () => {
    const navigate = useNavigator();
    const notify = useNotifier();
    const intl = useIntl();
    const shop = useShop()

    const [createShippingMethod, createShippingMethodOpts] = useShippingMethodCreate({
        onCompleted: data => {
            if (data.shippingMethodCreate.errors.length === 0) {
                notify({
                    text: intl.formatMessage(commonMessages.savedChanges)
                });
                navigate(shippingMethodUrl(data.shippingMethodCreate.shippingMethod.id));
            }
        }
    });

    const onSubmit = (formData: ShippingMethodDetailsFormData) => {
        const minmaxPrice = formData.type === ShippingMethodTypeEnum.PRICE ? {
            minimumOrderPrice: formData.noLimits ? 0 : formData.minValue,
            maximumOrderPrice: formData.noLimits ? null: formData.maxValue,
            minimumOrderWeight: null,
            maximumOrderWeight: null
        } : {
            minimumOrderPrice: null,
            maximumOrderPrice: null,
            minimumOrderWeight: formData.noLimits ? 0 : formData.minValue,
            maximumOrderWeight: formData.noLimits ? null: formData.maxValue
        };
        createShippingMethod({
            variables: {
                input: {
                    ...minmaxPrice,
                    name: formData.name,
                    description: formData.description,
                    price: formData.isFree ? 0 : formData.price,
                    type: formData.type,
                }
            }
        })

    };

    return (
        <ShippingMethodCreatePage defaultCurrency={shop?.defaultCurrency || "BYN"}
                                  defaultWeightUnit={shop?.defaultWeightUnit || ""}
                                  disabled={createShippingMethodOpts.loading}
                                  errors={createShippingMethodOpts.data?.shippingMethodCreate.errors || []}
                                  onBack={() => navigate(shippingMethodListUrl())}
                                  onSubmit={onSubmit}
                                  saveButtonBarState={createShippingMethodOpts.status}
        />
    );
};
export default ShippingMethodCreate;
