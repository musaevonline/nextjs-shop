import { decimal } from "@temp/misc";
import { ProductUpdatePageSubmitData } from "../../components/ProductUpdatePage";
import { ProductDetails_product } from "@temp/sections/products/types/ProductDetails";
import { ProductImageCreateVariables } from "@temp/sections/products/types/ProductImageCreate";
import { ProductImageReorderVariables } from "@temp/sections/products/types/ProductImageReorder";
import { ProductUpdateVariables } from "@temp/sections/products/types/ProductUpdate";
import { SimpleProductUpdateVariables } from "@temp/sections/products/types/SimpleProductUpdate";
import { mapFormsetStockToStockInput } from "@temp/sections/products/utils/data";
import { ReorderEvent } from "@temp/types";
import { arrayMove } from "react-sortable-hoc";

export function createUpdateHandler(
  product: ProductDetails_product,
  updateProduct: (variables: ProductUpdateVariables) => void,
  updateSimpleProduct: (variables: SimpleProductUpdateVariables) => void
) {
  return (data: ProductUpdatePageSubmitData) => {
    const productVariables: ProductUpdateVariables = {
      attributes: data.attributes.map(attribute => ({
        id: attribute.id,
        values: attribute.value[0] === "" ? [] : attribute.value
      })),
      basePrice: decimal(data.basePrice),
      category: data.category,
      description: data.description,
      id: product.id,
      isPublished: data.isPublished,
      name: data.name,
      publicationDate:
        data.publicationDate !== "" ? data.publicationDate : null,
    };

    if (product.productType.hasVariants) {
      updateProduct(productVariables);
    } else {
      updateSimpleProduct({
        ...productVariables,
        addStocks: data.addStocks.map(mapFormsetStockToStockInput),
        deleteStocks: data.removeStocks,
        productVariantId: product.variants[0].id,
        productVariantInput: {
          sku: data.sku
        },
        updateStocks: data.updateStocks.map(mapFormsetStockToStockInput)
      });
    }
  };
}

export function createImageUploadHandler(
  id: string,
  createProductImage: (variables: ProductImageCreateVariables) => void
) {
  return (file: File) =>
    createProductImage({
      alt: "",
      image: file,
      product: id
    });
}

export function createImageReorderHandler(
  product: ProductDetails_product,
  reorderProductImages: (variables: ProductImageReorderVariables) => void
) {
  return ({ newIndex, oldIndex }: ReorderEvent) => {
    let ids = product.images.map(image => image.id);
    ids = arrayMove(ids, oldIndex, newIndex);
    reorderProductImages({
      imagesIds: ids,
      productId: product.id
    });
  };
}
