import useNavigator from "@temp/hooks/useNavigator";
import useNotifier from "@temp/hooks/useNotifier";
import {commonMessages} from "@temp/intl";
import React from "react";
import {useIntl} from "react-intl";

import ShippingMethodCreatePage from "../components/ShippingMethodCreatePage";
import {useShippingMethodCreate} from "../mutations";
import {shippingMethodListUrl, shippingMethodUrl} from "../urls";
import useShop from "@temp/hooks/useShop";
import {ShippingMethodTypeEnum} from "@temp/types/globalTypes";
import {ShippingMethodDetailsFormData} from "@temp/sections/shipping/components/ShippingMethodDetailsForm";

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
  return (
      <ShippingMethodCreatePage defaultCurrency={shop?.defaultCurrency || "BYN"}
                                disabled={createShippingMethodOpts.loading}
                                errors={createShippingMethodOpts.data?.shippingMethodCreate.errors || []}
                                onBack={() => navigate(shippingMethodListUrl())}
                                onSubmit={(formData: ShippingMethodDetailsFormData) =>
                                    createShippingMethod({
                                      variables: {
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
                                saveButtonBarState={createShippingMethodOpts.status}
      />
  );
};
export default ShippingMethodCreate;
