import DialogContentText from "@material-ui/core/DialogContentText";
import ActionDialog from "@temp/components/ActionDialog";
import NotFoundPage from "@temp/components/NotFound";
import useNavigator from "@temp/hooks/useNavigator";
import useNotifier from "@temp/hooks/useNotifier";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { maybe } from "@temp/misc";
import ShopImagePage, {ShopImageFormData} from "../components/ShopImagePage";
import {
  TypedShopImageDeleteMutation,
  TypedShopImageUpdateMutation
} from "../mutations";
import { TypedSiteSettingsQuery } from "../queries";
import { ShopImageUpdate } from "../types/ShopImageUpdate";
import {
  shopImageUrl,
  ShopImageUrlQueryParams,
  siteSettingsUrl
} from "../urls";

interface ShopImageProps {
  imageId: string;
  params: ShopImageUrlQueryParams;
}

export const ShopImage: React.FC<ShopImageProps> = ({
  imageId,
  params
}) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const intl = useIntl();

  const handleBack = () => navigate(siteSettingsUrl());
  const handleUpdateSuccess = (data: ShopImageUpdate) => {
    if (data.shopImageUpdate.errors.length === 0) {
      notify({ text: "Saved changes" });
    }
  };
  return (
    <TypedSiteSettingsQuery displayLoader>
      {({ data, loading }) => {
        const shop = data?.shop;

        if (shop === null) {
          return <NotFoundPage />;
        }

        return (
          <TypedShopImageUpdateMutation onCompleted={handleUpdateSuccess}>
            {(updateImage, updateResult) => (
              <TypedShopImageDeleteMutation onCompleted={handleBack}>
                {(deleteImage, deleteResult) => {
                  const handleDelete = () =>
                    deleteImage({ variables: { id: imageId } });
                  const handleImageClick = (id: string) => () =>
                    navigate(shopImageUrl(id));
                  const handleUpdate = (formData: ShopImageFormData) => {
                    updateImage({
                      variables: {
                        alt: formData.alt,
                        description: formData.description,
                        id: imageId
                      }
                    });
                  };
                  const image = maybe(() => data.shop.images.find(img => img.id === imageId));

                  return (
                    <>
                      <ShopImagePage
                        disabled={loading}
                        shop={maybe(() => data.shop.name)}
                        image={image || null}
                        images={maybe(() => data.shop.images)}
                        onBack={handleBack}
                        onDelete={() =>
                          navigate(
                            shopImageUrl(imageId, {
                              action: "remove"
                            })
                          )
                        }
                        onRowClick={handleImageClick}
                        onSubmit={handleUpdate}
                        saveButtonBarState={updateResult.status}
                      />
                      <ActionDialog
                        onClose={() =>
                          navigate(shopImageUrl(imageId), true)
                        }
                        onConfirm={handleDelete}
                        open={params.action === "remove"}
                        title={intl.formatMessage({ id: 'delete_image',
                          defaultMessage: "Delete Image",
                          description: "dialog header"
                        })}
                        variant="delete"
                        confirmButtonState={deleteResult.status}
                      >
                        <DialogContentText>
                          <FormattedMessage id="sure_delete_image" defaultMessage="Are you sure you want to delete this image?" />
                        </DialogContentText>
                      </ActionDialog>
                    </>
                  );
                }}
              </TypedShopImageDeleteMutation>
            )}
          </TypedShopImageUpdateMutation>
        );
      }}
    </TypedSiteSettingsQuery>
  );
};
export default ShopImage;
