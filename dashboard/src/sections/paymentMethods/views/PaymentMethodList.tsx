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
import useUser from "@temp/hooks/useUser";
import { commonMessages } from "@temp/intl";
import { getStringOrPlaceholder, maybe } from "@temp/misc";
import { ListViews } from "@temp/types";
import createDialogActionHandlers from "@temp/utils/handlers/dialogActionHandlers";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import {
    usePaymentMethodBulkDelete,
    usePaymentMethodDelete
} from "../mutations";
import {usePaymentMethodList} from "../queries";
import {
    paymentMethodAddUrl,
    paymentMethodListUrl,
    PaymentMethodListUrlDialog,
    PaymentMethodListUrlQueryParams,
    paymentMethodUrl
} from "../urls";
import PaymentMethodListPage from "@temp/sections/paymentMethods/components/PaymentMethodListPage";

interface PaymentMethodListProps {
    params: PaymentMethodListUrlQueryParams;
}

export const PaymentMethodList: React.FC<PaymentMethodListProps> = ({
                                                                          params
                                                                      }) => {
    const navigate = useNavigator();
    const notify = useNotifier();
    const paginate = usePaginator();
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
        PaymentMethodListUrlDialog,
        PaymentMethodListUrlQueryParams
        >(navigate, paymentMethodListUrl, params);

    const { data, loading, refetch } = usePaymentMethodList({
        displayLoader: true,
        variables: paginationState
    });

    const [deletePaymentMethod, deletePaymentMethodOpts] = usePaymentMethodDelete({
        onCompleted: data => {
            if (data.paymentMethodDelete.errors.length === 0) {
                notify({
                    text: intl.formatMessage(commonMessages.savedChanges)
                });
                closeModal();
                refetch();
            }
        }
    });

    const [
        bulkDeletePaymentMethod,
        bulkDeletePaymentMethodOpts
    ] = usePaymentMethodBulkDelete({
        onCompleted: data => {
            if (data.paymentMethodBulkDelete.errors.length === 0) {
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
        maybe(() => data.paymentMethods.pageInfo),
        paginationState,
        params
    );
    return (
        <>
            <PaymentMethodListPage
                settings={settings}
                disabled={
                    loading ||
                    deletePaymentMethodOpts.loading
                }
                paymentMethods={maybe(() =>
                    data.paymentMethods.edges.map(edge => edge.node)
                )}
                pageInfo={pageInfo}
                onAdd={() => navigate(paymentMethodAddUrl)}
                onBack={() => navigate(configurationMenuUrl)}
                onUpdateListSettings={updateListSettings}
                onNextPage={loadNextPage}
                onPreviousPage={loadPreviousPage}
                onRemove={id =>
                    openModal("remove", {
                        id
                    })
                }
                onRowClick={id => () => navigate(paymentMethodUrl(id))}
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
                confirmButtonState={deletePaymentMethodOpts.status}
                variant="delete"
                title={intl.formatMessage({
                    id: "deletePaymentMethod",
                    defaultMessage: "Delete Payment Method",
                    description: "dialog header"
                })}
                onClose={closeModal}
                onConfirm={() =>
                    deletePaymentMethod({
                        variables: { id: params.id }
                    })
                }
            >
                <DialogContentText>
                    <FormattedMessage
                        id="sureDeletePaymentMethod{paymentMethodName}"
                        defaultMessage="Are you sure you want to delete {paymentMethodName} payment method?"
                        values={{
                            paymentMethodName: (
                                <strong>
                                    {maybe(
                                        () =>
                                            data.paymentMethods.edges.find(
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
                confirmButtonState={bulkDeletePaymentMethodOpts.status}
                variant="delete"
                title={intl.formatMessage({
                    id: "deletePaymentMethods",
                    defaultMessage: "Delete Payment Methods",
                    description: "dialog header"
                })}
                onClose={closeModal}
                onConfirm={() =>
                    bulkDeletePaymentMethod({
                        variables: { ids: params.ids }
                    })
                }
            >
                <DialogContentText>
                    <FormattedMessage
                        id="{counter,plural,one}sureDeletePaymentMethodText{displayQuantity}"
                        defaultMessage="{counter,plural,one{Are you sure you want to delete this payment method?} other{Are you sure you want to delete {displayQuantity} payment methods?}}"
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
PaymentMethodList.displayName = "PaymentMethodList";
export default PaymentMethodList;
