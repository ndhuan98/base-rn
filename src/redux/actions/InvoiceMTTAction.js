export const TYPE_GET_DATA_EINVOICE_MTT_GTGT = 'TYPE_GET_DATA_EINVOICE_MTT';

export const TYPE_CLEAR_DATA_EINVOICE_MTT_GTGT = 'TYPE_CLEAR_DATA_EINVOICE_MTT'

export const TYPE_UPDATE_CUSTOMER_MTT_GTGT = 'TYPE_UPDATE_CUSTOMER_MTT_GTGT'

export const TYPE_UPDATE_TEMPLATE_CODE_MTT_GTGT = 'TYPE_UPDATE_TEMPLATE_CODE_MTT_GTGT'

export const TYPE_ADD_HANGHANG_MTT_GTGT = 'TYPE_ADD_HANGHANG_MTT_GTGT'

export const TYPE_DOC_TIEN_MTT_GTGT = 'TYPE_DOC_TIEN_MTT_GTGT'

export const TYPE_DELETE_DONG_HANG_MTT_GTGT = 'TYPE_DELETE_DONG_HANG_MTT_GTGT'

export const TYPE_UPDATE_CHIET_KHAU_MTT_GTGT = 'TYPE_UPDATE_CHIET_KHAU_MTT_GTGT'



// Action Get INFO_INVOICE_MTT
export function INFO_INVOICE_MTT_GTGT(data) {
    return { type: TYPE_GET_DATA_EINVOICE_MTT_GTGT, payload: data };
}
// Action clear INFO_INVOICE_MTT
export function CLEAR_INFO_INVOICE_MTT_GTGT(data) {
    return { type: TYPE_CLEAR_DATA_EINVOICE_MTT_GTGT, payload: data };
}

// Action update  info customer
export function UPDATE_INFO_CUSTOMER_MTT_GTGT(data) {
    return { type: TYPE_UPDATE_CUSTOMER_MTT_GTGT, payload: data }
}
// Action update "Ký hiệu mẫu hoá đơn"
export function UPDATE_TEMPLATE_CODE_MTT_GTGT(data) {
    return { type: TYPE_UPDATE_TEMPLATE_CODE_MTT_GTGT, payload: data }
}
// Action update "Danh sách hàng hoá"
export function ADD_HANGHANG_MTT_GTGT(data) {
    return { type: TYPE_ADD_HANGHANG_MTT_GTGT, payload: data }
}
// Action update "Tổng tiền bằng chữ"
export function DOC_TIEN_MTT_GTGT(data) {
    return { type: TYPE_DOC_TIEN_MTT_GTGT, payload: data }
}
// Action delete dòng hàng
export function DELETE_DONG_HANG_MTT_GTGT(data) {
    return { type: TYPE_DELETE_DONG_HANG_MTT_GTGT, payload: data }
}
// Action update chiet khau
export function UPDATE_CHIET_KHAU_MTT_GTGT(data) {
    return {
        type: TYPE_UPDATE_CHIET_KHAU_MTT_GTGT,
        payload: data
    }
}
