interface ItemInvoiceGoods {
    idhanghoa:string;
    loai_hang:string;
    don_vi_tinh:string;
    ten_hang:string;
    ma_hang:string;
    gia_xuat:number;
}

interface Invoice {
    dhoadonid:string;
    tongThanhToan:number;
    tongTienHangNt:number;
    kyHieu:string;
    mauSo:string;
    dHoaDonHangs:string;
    trangThaiHoaDon: billStatus;
}
interface billStatus {
    new: number,
    saved: number,
    exported: number,
    exportedEndSendCQT: number,
    signed: number
}
interface IVSentoCQT {
    trangThaiPhanHoi:number,
    trangThaiGui:number,
    tenThongDiep:string,
    soLuong: string,
    thoiGianGuiTextFull:string,
    dungLuongFormat:string,
    trangThaiPhanHoiText:string
}

export type {
    ItemInvoiceGoods,
    Invoice,
    billStatus,
    IVSentoCQT
  };
  