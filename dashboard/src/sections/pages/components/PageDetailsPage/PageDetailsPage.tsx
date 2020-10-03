import AppHeader from "@temp/components/AppHeader";
import CardSpacer from "@temp/components/CardSpacer";
import { ConfirmButtonTransitionState } from "@temp/components/ConfirmButton";
import Container from "@temp/components/Container";
import Grid from "@temp/components/Grid";
import PageHeader from "@temp/components/PageHeader";
import SaveButtonBar from "@temp/components/SaveButtonBar";
import VisibilityCard from "@temp/components/VisibilityCard";
import useDateLocalize from "@temp/hooks/useDateLocalize";
import { sectionNames } from "@temp/intl";
import { PageErrorFragment } from "@temp/sections/pages/types/PageErrorFragment";
import React from "react";
import { useIntl } from "react-intl";

import { maybe } from "@temp/misc";
import { PageDetails_page } from "../../types/PageDetails";
import PageInfo from "../PageInfo";
import PageSlug from "../PageSlug";
import {useFormik} from "formik";

export interface FormData {
  content: string;
  isPublished: boolean;
  publicationDate: string;
  slug: string;
  title: string;
}

export interface PageDetailsPageProps {
  disabled: boolean;
  errors: PageErrorFragment[];
  page: PageDetails_page;
  saveButtonBarState: ConfirmButtonTransitionState;
  onBack: () => void;
  onRemove: () => void;
  onSubmit: (data: FormData) => void;
}

const PageDetailsPage: React.FC<PageDetailsPageProps> = ({
                                                           disabled,
                                                           errors,
                                                           page,
                                                           saveButtonBarState,
                                                           onBack,
                                                           onRemove,
                                                           onSubmit
                                                         }) => {
  const intl = useIntl();
  const localizeDate = useDateLocalize();

  const initialForm: FormData = React.useMemo(() => ({
    content: maybe(() => page.content, ""),
    isPublished: maybe(() => page.isPublished, false),
    publicationDate: maybe(() => page.publicationDate, ""),
    slug: maybe(() => page.slug, ""),
    title: maybe(() => page.title, "")
  }), [page]);

  const form = useFormik({
      enableReinitialize: true,
      initialValues: initialForm,
      onSubmit
  })

  return (
      <form onSubmit={form.handleSubmit}>
            <Container>
              <AppHeader onBack={onBack}>
                {intl.formatMessage(sectionNames.pages)}
              </AppHeader>
              <PageHeader
                  title={
                    page === null
                        ? intl.formatMessage({
                          id: "create_page",
                          defaultMessage: "Create Page",
                          description: "page header"
                        })
                        : maybe(() => page.title)
                  }
              />
              <Grid>
                <div>
                  <PageInfo
                      data={form.values}
                      disabled={disabled}
                      errors={errors}
                      page={page}
                      onChange={form.handleChange}
                  />
                  <CardSpacer />
                </div>
                <div>
                  <PageSlug
                      data={form.values}
                      disabled={disabled}
                      errors={errors}
                      onChange={form.handleChange}
                  />
                  <CardSpacer />
                  <VisibilityCard
                      data={form.values}
                      errors={errors}
                      disabled={disabled}
                      hiddenMessage={intl.formatMessage(
                          {
                            id: "will_be_visible_from{date}",
                            defaultMessage: "will be visible from {date}",
                            description: "page"
                          },
                          {
                            date: localizeDate(form.values.publicationDate)
                          }
                      )}
                      onChange={form.handleChange}
                      visibleMessage={intl.formatMessage(
                          {
                            id: "since{date}",
                            defaultMessage: "since {date}",
                            description: "page"
                          },
                          {
                            date: localizeDate(form.values.publicationDate)
                          }
                      )}
                  />
                </div>
              </Grid>
              <SaveButtonBar
                  disabled={disabled || !form.isValid || !form.dirty}
                  state={saveButtonBarState}
                  onCancel={onBack}
                  onDelete={page === null ? undefined : onRemove}
                  onSave={form.handleSubmit}
              />
            </Container>
      </form>
  );
};
PageDetailsPage.displayName = "PageDetailsPage";
export default PageDetailsPage;
