import useNavigator from "@temp/hooks/useNavigator";
import useNotifier from "@temp/hooks/useNotifier";
import {commonMessages} from "@temp/intl";
import React from "react";
import {useIntl} from "react-intl";

import {useShippingMethodDelete, useShippingMethodUpdate} from "../mutations";
import {shippingMethodListUrl, ShippingMethodUrlQueryParams} from "../urls";
import useShop from "@temp/hooks/useShop";
import {ShippingMethodTypeEnum} from "@temp/types/globalTypes";
import {ShippingMethodDetailsFormData} from "@temp/sections/shipping/components/ShippingMethodDetailsForm";
import {useShippingMethod} from "@temp/sections/shipping/queries";
import ShippingMethodUpdatePage from "@temp/sections/shipping/components/ShippingMethodUpdatePage";

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
    const shop = useShop()

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
                    text: intl.formatMessage(commonMessages.savedChanges)
                });
            }
        }
    });

    return (
        <ShippingMethodUpdatePage defaultCurrency={shop?.defaultCurrency || "BYN"}
                                  shippingMethod={data?.shippingMethod}
                                  disabled={updateShippingMethodOpts.loading ||
                                  deleteShippingRateMethod.loading ||
                                  loading
                                  }
                                  errors={updateShippingMethodOpts.data?.shippingMethodUpdate.errors || []}
                                  onBack={() => navigate(shippingMethodListUrl())}
                                  onSubmit={(formData: ShippingMethodDetailsFormData) =>
                                      updateShippingMethod({
                                          variables: {
                                              id,
                                              input: {
                                                  name: formData.name,
                                                  price: formData.price,
                                                  type: ShippingMethodTypeEnum.PRICE,
                                                  minimumOrderPrice: formData.minValue,
                                                  maximumOrderPrice: formData.maxValue,
                                                  minimumOrderWeight: null,
                                                  maximumOrderWeight: null
                                              }
                                          }
                                      })
                                  }
                                  saveButtonBarState={updateShippingMethodOpts.status}
                                  onDelete={() => deleteShippingMethod({variables: {id}})}

        />
    );
};
export default ShippingMethodDetailsView;
