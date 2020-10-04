import {OrderStatus, PaymentChargeStatusEnum} from "@temp/types/globalTypes";

const ORDER_PAYMENT_STATUS = {
    [PaymentChargeStatusEnum.FULLY_CHARGED]: 'Оплачен',
    [PaymentChargeStatusEnum.FULLY_REFUNDED]: 'Деньги возвращены',
    [PaymentChargeStatusEnum.NOT_CHARGED]: 'Не оплачен',
    [PaymentChargeStatusEnum.PARTIALLY_CHARGED]: 'Частично оплачен',
    [PaymentChargeStatusEnum.PARTIALLY_REFUNDED]: 'Частично деньги возвращены',
}
const ORDER_STATUS = {
    [OrderStatus.FULFILLED]: 'Выполнен',
    [OrderStatus.DRAFT]: 'Черновик',
    [OrderStatus.CANCELED]: 'Отменён',
    [OrderStatus.PARTIALLY_FULFILLED]: 'Частично выполнен',
    [OrderStatus.UNFULFILLED]: 'Ожидает выполнения',
}

export const getOrderPaymentStatus = (status: PaymentChargeStatusEnum) => {
    return ORDER_PAYMENT_STATUS[status] || '';
}

export const getOrderStatus = (status: OrderStatus) => {
    return ORDER_STATUS[status] || '';
}