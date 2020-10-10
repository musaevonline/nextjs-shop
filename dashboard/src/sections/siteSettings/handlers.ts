import {ReorderEvent} from "@temp/types";
import {arrayMove} from "react-sortable-hoc";
import {SiteSettings_shop} from "@temp/sections/siteSettings/types/SiteSettings";
import {ShopImageReorderVariables} from "@temp/sections/siteSettings/types/ShopImageReorder";

export function createShopImageReorderHandler(
  shop: SiteSettings_shop,
  reorderImages: (variables: ShopImageReorderVariables) => void
) {
  return ({ newIndex, oldIndex }: ReorderEvent) => {
    let ids = shop.images.map(image => image.id);
    ids = arrayMove(ids, oldIndex, newIndex);
    reorderImages({
      imagesIds: ids
    });
  };
}