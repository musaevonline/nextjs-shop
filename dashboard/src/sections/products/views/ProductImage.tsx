import DialogContentText from "@material-ui/core/DialogContentText";
import ActionDialog from "@temp/components/ActionDialog";
import NotFoundPage from "@temp/components/NotFound";
import useNavigator from "@temp/hooks/useNavigator";
import useNotifier from "@temp/hooks/useNotifier";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { maybe } from "@temp/misc";
import ProductImagePage from "../components/ProductImagePage";
import {
  TypedProductImageDeleteMutation,
  TypedProductImageUpdateMutation
} from "../mutations";
import { TypedProductImageQuery } from "../queries";
import { ProductImageUpdate } from "../types/ProductImageUpdate";
import {
  productImageUrl,
  ProductImageUrlQueryParams,
  productUrl
} from "../urls";

interface ProductImageProps {
  imageId: string;
  productId: string;
  params: ProductImageUrlQueryParams;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  imageId,
  productId,
  params
}) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const intl = useIntl();

  const handleBack = () => navigate(productUrl(productId));
  const handleUpdateSuccess = (data: ProductImageUpdate) => {
    if (data.productImageUpdate.errors.length === 0) {
      notify({ text: "Saved changes" });
    }
  };
  return (
    <TypedProductImageQuery
      displayLoader
      variables={{
        imageId,
        productId
      }}
    >
      {({ data, loading }) => {
        const product = data?.product;

        if (product === null) {
          return <NotFoundPage />;
        }

        return (
          <TypedProductImageUpdateMutation onCompleted={handleUpdateSuccess}>
            {(updateImage, updateResult) => (
              <TypedProductImageDeleteMutation onCompleted={handleBack}>
                {(deleteImage, deleteResult) => {
                  const handleDelete = () =>
                    deleteImage({ variables: { id: imageId } });
                  const handleImageClick = (id: string) => () =>
                    navigate(productImageUrl(productId, id));
                  const handleUpdate = (formData: { description: string }) => {
                    updateImage({
                      variables: {
                        alt: formData.description,
                        id: imageId
                      }
                    });
                  };
                  const image = data && data.product && data.product.mainImage;

                  return (
                    <>
                      <ProductImagePage
                        disabled={loading}
                        product={maybe(() => data.product.name)}
                        image={image || null}
                        images={maybe(() => data.product.images)}
                        onBack={handleBack}
                        onDelete={() =>
                          navigate(
                            productImageUrl(productId, imageId, {
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
                          navigate(productImageUrl(productId, imageId), true)
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
              </TypedProductImageDeleteMutation>
            )}
          </TypedProductImageUpdateMutation>
        );
      }}
    </TypedProductImageQuery>
  );
};
export default ProductImage;
