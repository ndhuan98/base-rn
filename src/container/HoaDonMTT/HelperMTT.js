import _ from 'lodash'

const statusInvoiceMTT = {
    new: 0,
    saved: 1,
    exported: 2,
    exportedEndSendCQT: 3,
    signed: 6

}

// Hàm tính tồng tiền VAT 5%
function MttTongVAT5(products) {
    let tongVAT5 = 0;
    let productsWithVat5 = [];
    if (_.isEmpty(products)) {
        return tongVAT5;
    }
    productsWithVat5 = _.filter(products, item => {
        return item.vat == 5;
    });
    tongVAT5 = _.sumBy(productsWithVat5, item => {
        return item.vatTien;
    });
    return tongVAT5;
}

//Hàm tính tổng vat VAT 8%
function MttTongVAT8(products) {
    let tongVAT8 = 0;
    let productsWithVat8 = [];
    if (_.isEmpty(products)) {
        return tongVAT8;
    }
    productsWithVat8 = _.filter(products, item => {
        return item.vat == 8;
    });
    tongVAT8 = _.sumBy(productsWithVat8, item => {
        return item.vatTien;
    });
    return tongVAT8;
}

// Hàm tính tổng tiền VAT 10%
function MttTongVAT10(products) {
    let tongVAT10 = 0;
    let productsWithVat10 = [];
    if (_.isEmpty(products)) {
        return tongVAT10;
    }
    productsWithVat10 = _.filter(products, item => {
        return item.vat == 10;
    });
    tongVAT10 = _.sumBy(productsWithVat10, item => {
        return item.vatTien;
    });
    return tongVAT10;
}

// Hàm cộng tiền hàng
function MttCongTienHang(products) {
    let congTienHang = 0;
    if (_.isEmpty(products)) {
        return congTienHang;
    }
    congTienHang = _.sumBy(products, item => {
        return item.thanhTien;
    });
    return congTienHang;
}

// Hàm tính tổng thanh toán
function MttTongThanhToan(congTienHang, vat5, vat10, vat8) {
    return congTienHang + vat5 + vat10 + vat8;
}

// Hàm trả ra loại hoá đơn MTT

const typeHoaDonMTT = {
    GTGT: 'GTGT_MTT',
    BH: 'BH_MTT'
}
const typeMaLoaiHoaDonMTT = {
    GTGT: '01',
    BH: '02'
}


export { statusInvoiceMTT, MttTongVAT10, MttTongVAT5, MttTongVAT8, MttCongTienHang, MttTongThanhToan, typeHoaDonMTT, typeMaLoaiHoaDonMTT }