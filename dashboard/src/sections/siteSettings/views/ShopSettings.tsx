import {WindowTitle} from "@temp/components/WindowTitle";
import useNavigator from "@temp/hooks/useNavigator";
import useNotifier from "@temp/hooks/useNotifier";
import {commonMessages, sectionNames} from "@temp/intl";
import React from "react";
import {useIntl} from "react-intl";

import {configurationMenuUrl} from "@temp/configuration";
import {findInEnum, maybe} from "@temp/misc";
import {AuthorizationKeyType, CountryCode} from "@temp/types/globalTypes";
import SiteSettingsKeyDialog, {SiteSettingsKeyDialogForm} from "../components/SiteSettingsKeyDialog";
import SiteSettingsPage, {
  areAddressInputFieldsModified,
  SiteSettingsPageFormData
} from "../components/SiteSettingsPage";
import {
  TypedAuthorizationKeyAdd,
  TypedAuthorizationKeyDelete,
  TypedShopImageCreateMutation, TypedShopImageDeleteMutation, TypedShopImagesReorder,
  TypedShopSettingsUpdate
} from "../mutations";
import {TypedSiteSettingsQuery} from "../queries";
import {AuthorizationKeyAdd} from "../types/AuthorizationKeyAdd";
import {AuthorizationKeyDelete} from "../types/AuthorizationKeyDelete";
import {ShopSettingsUpdate} from "../types/ShopSettingsUpdate";
import {shopImagePath, siteSettingsUrl, SiteSettingsUrlQueryParams} from "../urls";
import placeholderImg from "@assets/images/placeholder255x255.png";
import {ShopImageCreate} from "@temp/sections/siteSettings/types/ShopImageCreate";
import {ShopImageDelete} from "@temp/sections/siteSettings/types/ShopImageDelete";
import {ShopImageReorder} from "@temp/sections/siteSettings/types/ShopImageReorder";
import {createShopImageReorderHandler} from "@temp/sections/siteSettings/handlers";

export interface SiteSettingsProps {
  params: SiteSettingsUrlQueryParams;
}

export const SiteSettings: React.FC<SiteSettingsProps> = ({ params }) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const intl = useIntl();

  const handleAddKeySuccess = (data: AuthorizationKeyAdd) => {
    if (data.authorizationKeyAdd.errors.length === 0) {
      notify({
        text: intl.formatMessage(commonMessages.savedChanges)
      });
      navigate(siteSettingsUrl());
    }
  };
  const handleDeleteKeySuccess = (data: AuthorizationKeyDelete) => {
    if (data.authorizationKeyDelete.errors.length === 0) {
      notify({
        text: intl.formatMessage(commonMessages.savedChanges)
      });
    } else {
      notify({
        text: intl.formatMessage(commonMessages.somethingWentWrong)
      });
    }
  };
  const handleSiteSettingsSuccess = (data: ShopSettingsUpdate) => {
    if (
        data.shopDomainUpdate.errors.length === 0 &&
        data.shopSettingsUpdate.errors.length === 0 &&
        data.shopAddressUpdate.errors.length === 0
    ) {
      notify({
        text: intl.formatMessage(commonMessages.savedChanges)
      });
    }
  };
  const handleCreateImageSuccess = (data: ShopImageCreate) => {
    if (
        data.shopImageCreate.errors.length === 0
    ) {
      notify({
        text: intl.formatMessage(commonMessages.savedChanges)
      });
    }
  };
  const handleDeleteImageSuccess = (data: ShopImageDelete) => {
    if (
        data.shopImageDelete.errors.length === 0
    ) {
      notify({
        text: intl.formatMessage(commonMessages.savedChanges)
      });
    }
  };
  const handleReorderImageSuccess = (data: ShopImageReorder) => {
    if (
        data.shopImageReorder.errors.length === 0
    ) {
      notify({
        text: intl.formatMessage(commonMessages.savedChanges)
      });
    }
  };

  return (
      <TypedSiteSettingsQuery displayLoader>
        {siteSettings => (
            <TypedAuthorizationKeyAdd onCompleted={handleAddKeySuccess}>
              {(addAuthorizationKey, addAuthorizationKeyOpts) => (
                  <TypedAuthorizationKeyDelete onCompleted={handleDeleteKeySuccess}>
                    {(deleteAuthorizationKey, _) => (
                        <TypedShopImageCreateMutation onCompleted={handleCreateImageSuccess}>
                          {(createShopImage, createShopImageOpts) => (
                              <TypedShopImageDeleteMutation onCompleted={handleDeleteImageSuccess}>
                                {(deleteShopImage, deleteShopImageOpts) => (
                                    <TypedShopImagesReorder onCompleted={handleReorderImageSuccess}>
                                      {(reorderShopImage, reorderShopImageOpts) => (
                                          <TypedShopSettingsUpdate
                                              onCompleted={handleSiteSettingsSuccess}
                                          >
                                            {(updateShopSettings, updateShopSettingsOpts) => {
                                              const errors = [
                                                ...(updateShopSettingsOpts.data?.shopDomainUpdate
                                                    .errors || []),
                                                ...(updateShopSettingsOpts.data?.shopSettingsUpdate
                                                    .errors || []),
                                                ...(updateShopSettingsOpts.data?.shopAddressUpdate
                                                    .errors || [])
                                              ];
                                              const loading =
                                                  siteSettings.loading ||
                                                  addAuthorizationKeyOpts.loading ||
                                                  updateShopSettingsOpts.loading;

                                              const handleAuthenticationKeyAdd = (
                                                  data: SiteSettingsKeyDialogForm
                                              ) =>
                                                  addAuthorizationKey({
                                                    variables: {
                                                      input: {
                                                        key: data.key,
                                                        password: data.password
                                                      },
                                                      keyType: data.type
                                                    }
                                                  });
                                              const handleUpdateShopSettings = (
                                                  data: SiteSettingsPageFormData
                                              ) => {
                                                const addressInput = areAddressInputFieldsModified(data)
                                                    ? {
                                                      city: data.city,
                                                      companyName: data.companyName,
                                                      country: findInEnum(data.country, CountryCode) || CountryCode.BY,
                                                      countryArea: data.countryArea,
                                                      phone: data.phone,
                                                      postalCode: data.postalCode,
                                                      streetAddress1: data.streetAddress1,
                                                      streetAddress2: data.streetAddress2
                                                    }
                                                    : {
                                                      companyName: data.companyName
                                                    };
                                                updateShopSettings({
                                                  variables: {
                                                    addressInput,
                                                    shopDomainInput: {
                                                      domain: data.domain,
                                                      name: data.name
                                                    },
                                                    shopSettingsInput: {
                                                      customerSetPasswordUrl: data.customerSetPasswordUrl,
                                                      defaultMailSenderAddress:
                                                      data.defaultMailSenderAddress,
                                                      defaultMailSenderName: data.defaultMailSenderName,
                                                      description: data.description,
                                                      headerText: data.headerText
                                                    }
                                                  }
                                                });
                                              };

                                              const handleImageDelete = (id: string) => () =>
                                                  deleteShopImage({ variables: {id} });
                                              const handleImageEdit = (imageId: string) => () =>
                                                  navigate(shopImagePath(imageId));
                                              const handleImageUpload = (file: File) => createShopImage({
                                                  variables: {
                                                    image: file,
                                                    alt: "",
                                                    description: ""
                                                  }
                                                });
                                              const handleImageReorder = createShopImageReorderHandler(siteSettings.data?.shop,
                                                      (variables) => {
                                                        reorderShopImage({variables})});
                                              return (
                                                  <>
                                                    <WindowTitle
                                                        title={intl.formatMessage(sectionNames.siteSettings)}
                                                    />
                                                    <SiteSettingsPage
                                                        disabled={loading}
                                                        errors={errors}
                                                        shop={siteSettings.data?.shop}
                                                        onBack={() => navigate(configurationMenuUrl)}
                                                        onKeyAdd={() =>
                                                            navigate(
                                                                siteSettingsUrl({
                                                                  action: "add-key"
                                                                })
                                                            )
                                                        }
                                                        onKeyRemove={keyType =>
                                                            deleteAuthorizationKey({
                                                              variables: { keyType }
                                                            })
                                                        }
                                                        onSubmit={handleUpdateShopSettings}
                                                        saveButtonBarState={updateShopSettingsOpts.status}
                                                        placeholderImage={placeholderImg}
                                                        images={maybe(() => siteSettings.data?.shop.images)}
                                                        onImageUpload={handleImageUpload}
                                                        onImageEdit={handleImageEdit}
                                                        onImageDelete={handleImageDelete}
                                                        onImageReorder={handleImageReorder}
                                                        loadingImages={
                                                          createShopImageOpts.loading || deleteShopImageOpts.loading ||
                                                          reorderShopImageOpts.loading
                                                        }
                                                    />
                                                    <SiteSettingsKeyDialog
                                                        errors={
                                                          addAuthorizationKeyOpts.data?.authorizationKeyAdd
                                                              .errors || []
                                                        }
                                                        initial={{
                                                          key: "",
                                                          password: "",
                                                          type: AuthorizationKeyType.FACEBOOK
                                                        }}
                                                        open={params.action === "add-key"}
                                                        onClose={() => navigate(siteSettingsUrl())}
                                                        onSubmit={handleAuthenticationKeyAdd}
                                                    />
                                                  </>
                                              );
                                            }}
                                          </TypedShopSettingsUpdate>
                                      )}
                                    </TypedShopImagesReorder>
                                )}
                              </TypedShopImageDeleteMutation>
                          )}
                        </TypedShopImageCreateMutation>
                    )}
                  </TypedAuthorizationKeyDelete>
              )}
            </TypedAuthorizationKeyAdd>
        )}
      </TypedSiteSettingsQuery>
  );
};
export default SiteSettings;
