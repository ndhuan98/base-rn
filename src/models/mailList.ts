interface FiltersBill {
    title:string;
    value:string
}

interface ItemBill {
    so_hoa_don:number;
    hoaDonCoMa:number;
    trang_thai_hoa_don:string;
    so_xac_thuc:string;
    mau_so:string;
    ky_hieu:string;
    ngay_hoa_don:string;
    trang_thai_dieu_chinh_text:string;
    thong_bao_truyen_nhan:string;
    email_sendtime:string;
    dhoadonid:string
    trang_thai_email:string;
    ten_don_vi:string
}
export type {
    FiltersBill,
    ItemBill
}