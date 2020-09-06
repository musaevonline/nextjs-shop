import useNavigator from "@temp/hooks/useNavigator";
import useNotifier from "@temp/hooks/useNotifier";
import {commonMessages} from "@temp/intl";
import React from "react";
import {useIntl} from "react-intl";

import {useShippingMethodDelete, useShippingMethodUpdate} from "../mutations";
import {shippingMethodListUrl, ShippingMethodUrlQueryParams} from "../urls";
import useShop from "@temp/hooks/useShop";
import {ShippingMethodDetailsFormData} from "@temp/sections/shipping/components/ShippingMethodDetailsForm";
import {useShippingMethod} from "@temp/sections/shipping/queries";
import ShippingMethodUpdatePage from "@temp/sections/shipping/components/ShippingMethodUpdatePage";
import {ShippingMethodTypeEnum} from "@temp/types/globalTypes";

export interface ShippingMethodDetailsProps {
    id: string;
    params: ShippingMethodUrlQueryParams;
}

const ShippingMethodDetailsView: React.FC<ShippingMethodDetailsProps> = ({
                                                                             id,
                                                                             params
                                                                         }) => {
    const navigate = useNavigator();
    const notify = useNotifier();
    const intl = useIntl();
    const shop = useShop();

    const { data, loading } = useShippingMethod({
        displayLoader: true,
        variables: { id }
    });

    const [updateShippingMethod, updateShippingMethodOpts] = useShippingMethodUpdate({
        onCompleted: data => {
            if (data.shippingMethodUpdate.errors.length === 0) {
                notify({
                    text: intl.formatMessage(commonMessages.savedChanges)
                });
            }
        }
    });

    const [deleteShippingMethod, deleteShippingRateMethod] = useShippingMethodDelete({
        onCompleted: data => {
            if (data.shippingMethodDelete.errors.length === 0) {
                notify({
                    text: intl.formatMessage({
                        id: "shippingMethodDeleted",
                        defaultMessage: "Shipping method deleted"
                    })
                });
                navigate(shippingMethodListUrl(), true);
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
        updateShippingMethod({
            variables: {
                id,
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
        <ShippingMethodUpdatePage defaultCurrency={shop?.defaultCurrency || "BYN"}
                                  defaultWeightUnit={shop?.defaultWeightUnit || ""}
                                  shippingMethod={data?.shippingMethod}
                                  disabled={updateShippingMethodOpts.loading ||
                                  deleteShippingRateMethod.loading ||
                                  loading
                                  }
                                  errors={updateShippingMethodOpts.data?.shippingMethodUpdate.errors || []}
                                  onBack={() => navigate(shippingMethodListUrl())}
                                  onSubmit={onSubmit}
                                  saveButtonBarState={updateShippingMethodOpts.status}
                                  onDelete={() => deleteShippingMethod({variables: {id}})}

        />
    );
};
export default ShippingMethodDetailsView;
