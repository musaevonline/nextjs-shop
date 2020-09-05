import DialogContentText from "@material-ui/core/DialogContentText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ActionDialog from "@temp/components/ActionDialog";
import { configurationMenuUrl } from "@temp/configuration";
import useBulkActions from "@temp/hooks/useBulkActions";
import useListSettings from "@temp/hooks/useListSettings";
import useNavigator from "@temp/hooks/useNavigator";
import useNotifier from "@temp/hooks/useNotifier";
import usePaginator, {
    createPaginationState
} from "@temp/hooks/usePaginator";
import useShop from "@temp/hooks/useShop";
import useUser from "@temp/hooks/useUser";
import { commonMessages } from "@temp/intl";
import { getStringOrPlaceholder, maybe } from "@temp/misc";
import { ListViews } from "@temp/types";
import createDialogActionHandlers from "@temp/utils/handlers/dialogActionHandlers";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import ShippingMethodListPage from "../components/ShippingMethodListPage";
import {
    useDefaultWeightUnitUpdate,
    useShippingMethodBulkDelete,
    useShippingMethodDelete
} from "../mutations";
import {useShippingMethodList} from "../queries";
import {
    shippingMethodAddUrl,
    shippingMethodListUrl,
    ShippingMethodListUrlDialog,
    ShippingMethodListUrlQueryParams,
    shippingMethodUrl
} from "../urls";

interface ShippingMethodListProps {
    params: ShippingMethodListUrlQueryParams;
}

export const ShippingMethodList: React.FC<ShippingMethodListProps> = ({
                                                                          params
                                                                      }) => {
    const navigate = useNavigator();
    const notify = useNotifier();
    const paginate = usePaginator();
    const shop = useShop();
    const { user } = useUser();
    const { isSelected, listElements, reset, toggle, toggleAll } = useBulkActions(
        params.ids
    );
    const { updateListSettings, settings } = useListSettings(
        ListViews.SHIPPING_METHODS_LIST
    );
    const intl = useIntl();

    const paginationState = createPaginationState(settings.rowNumber, params);

    const [openModal, closeModal] = createDialogActionHandlers<
        ShippingMethodListUrlDialog,
        ShippingMethodListUrlQueryParams
        >(navigate, shippingMethodListUrl, params);

    const { data, loading, refetch } = useShippingMethodList({
        displayLoader: true,
        variables: paginationState
    });

    const [deleteShippingMethod, deleteShippingMethodOpts] = useShippingMethodDelete({
        onCompleted: data => {
            if (data.shippingMethodDelete.errors.length === 0) {
                notify({
                    text: intl.formatMessage(commonMessages.savedChanges)
                });
                closeModal();
                refetch();
            }
        }
    });

    const [
        updateDefaultWeightUnit,
        updateDefaultWeightUnitOpts
    ] = useDefaultWeightUnitUpdate({
        onCompleted: data => {
            if (data.shopSettingsUpdate.shopErrors.length === 0) {
                notify({
                    text: intl.formatMessage(commonMessages.savedChanges)
                });
            }
        }
    });

    const [
        bulkDeleteShippingMethod,
        bulkDeleteShippingMethodOpts
    ] = useShippingMethodBulkDelete({
        onCompleted: data => {
            if (data.shippingMethodBulkDelete.errors.length === 0) {
                notify({
                    text: intl.formatMessage(commonMessages.savedChanges)
                });
                closeModal();
                reset();
                refetch();
            }
        }
    });

    const { loadNextPage, loadPreviousPage, pageInfo } = paginate(
        maybe(() => data.shippingMethods.pageInfo),
        paginationState,
        params
    );
    return (
        <>
            <ShippingMethodListPage
                defaultWeightUnit={maybe(() => shop.defaultWeightUnit)}
                settings={settings}
                disabled={
                    loading ||
                    deleteShippingMethodOpts.loading ||
                    updateDefaultWeightUnitOpts.loading
                }
                shippingMethods={maybe(() =>
                    data.shippingMethods.edges.map(edge => edge.node)
                )}
                pageInfo={pageInfo}
                onAdd={() => navigate(shippingMethodAddUrl)}
                onBack={() => navigate(configurationMenuUrl)}
                onUpdateListSettings={updateListSettings}
                onNextPage={loadNextPage}
                onPreviousPage={loadPreviousPage}
                onRemove={id =>
                    openModal("remove", {
                        id
                    })
                }
                onRowClick={id => () => navigate(shippingMethodUrl(id))}
                onSubmit={unit =>
                    updateDefaultWeightUnit({
                        variables: { unit }
                    })
                }
                isChecked={isSelected}
                selected={listElements.length}
                toggle={toggle}
                toggleAll={toggleAll}
                toolbar={
                    <IconButton
                        color="primary"
                        onClick={() =>
                            openModal("remove-many", {
                                ids: listElements
                            })
                        }
                    >
                        <DeleteIcon />
                    </IconButton>
                }
                userPermissions={user?.userPermissions || []}
            />

            <ActionDialog
                open={params.action === "remove"}
                confirmButtonState={deleteShippingMethodOpts.status}
                variant="delete"
                title={intl.formatMessage({
                    id: "deleteShippingMethod",
                    defaultMessage: "Delete Shipping Method",
                    description: "dialog header"
                })}
                onClose={closeModal}
                onConfirm={() =>
                    deleteShippingMethod({
                        variables: { id: params.id }
                    })
                }
            >
                <DialogContentText>
                    <FormattedMessage
                        id="sureDeleteShippingMethod{shippingMethodName}"
                        defaultMessage="Are you sure you want to delete {shippingMethodName} shipping method?"
                        values={{
                            shippingMethodName: (
                                <strong>
                                    {maybe(
                                        () =>
                                            data.shippingMethods.edges.find(
                                                edge => edge.node.id === params.id
                                            ).node.name,
                                        "..."
                                    )}
                                </strong>
                            )
                        }}
                    />
                </DialogContentText>
            </ActionDialog>
            <ActionDialog
                open={params.action === "remove-many"}
                confirmButtonState={bulkDeleteShippingMethodOpts.status}
                variant="delete"
                title={intl.formatMessage({
                    id: "deleteShippingMethods",
                    defaultMessage: "Delete Shipping Methods",
                    description: "dialog header"
                })}
                onClose={closeModal}
                onConfirm={() =>
                    bulkDeleteShippingMethod({
                        variables: { ids: params.ids }
                    })
                }
            >
                <DialogContentText>
                    <FormattedMessage
                        id="{counter,plural,one}sureDeleteShippingMethodText{displayQuantity}"
                        defaultMessage="{counter,plural,one{Are you sure you want to delete this shipping method?} other{Are you sure you want to delete {displayQuantity} shipping methods?}}"
                        description="dialog content"
                        values={{
                            counter: params.ids?.length,
                            displayQuantity: (
                                <strong>
                                    {getStringOrPlaceholder(params.ids?.length.toString())}
                                </strong>
                            )
                        }}
                    />
                </DialogContentText>
            </ActionDialog>
        </>
    );
};
ShippingMethodList.displayName = "ShippingMethodList";
export default ShippingMethodList;
