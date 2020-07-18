import { WindowTitle } from "@temp/components/WindowTitle";
import useNavigator from "@temp/hooks/useNavigator";
import useNotifier from "@temp/hooks/useNotifier";
import React from "react";
import { useIntl } from "react-intl";

import { maybe } from "@temp/misc";
import CategoryCreatePage from "../components/CategoryCreatePage";
import { useCategoryCreateMutation } from "../mutations";
import { CategoryCreate } from "../types/CategoryCreate";
import { categoryListUrl, categoryUrl } from "../urls";
import {commonMessages} from "@temp/intl";

interface CategoryCreateViewProps {
  parentId: string;
}

export const CategoryCreateView: React.FC<CategoryCreateViewProps> = ({
  parentId
}) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const intl = useIntl();

  const handleSuccess = (data: CategoryCreate) => {
    if (data.categoryCreate.errors.length === 0) {
      notify({
        text: intl.formatMessage(commonMessages.categoryCreated)
      });
      navigate(categoryUrl(data.categoryCreate.category.id));
    }
  };

  const [createCategory, createCategoryResult] = useCategoryCreateMutation({
    onCompleted: handleSuccess
  });

  const errors = maybe(
    () => createCategoryResult.data.categoryCreate.errors,
    []
  );

  return (
    <>
      <WindowTitle
        title={intl.formatMessage(commonMessages.createNewCategory)}
      />
      <CategoryCreatePage
        saveButtonBarState={createCategoryResult.status}
        errors={errors}
        disabled={createCategoryResult.loading}
        onBack={() =>
          navigate(parentId ? categoryUrl(parentId) : categoryListUrl())
        }
        onSubmit={formData =>
          createCategory({
            variables: {
              input: {
                description: formData.description,
                name: formData.name,
              },
              parent: parentId || null
            }
          })
        }
      />
    </>
  );
};
export default CategoryCreateView;
