import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppColors, AppSizes, AppStyles } from '../../../theme'
import moment from 'moment'

const RowInfo = ({ title, value, color }) => {
    return (
        <View style={{ flexDirection: 'row', marginVertical: AppSizes.marginXXSml }}>
            <Text numberOfLines={1} style={{ ...AppStyles.smallText }}>{title}<Text numberOfLines={1} style={{ ...AppStyles.baseText, color: color ? color : AppColors.black, paddingRight: 5 }}> {value}</Text>
            </Text>
        </View>
    )
}

const Item = ({ item, thongBao, index }) => {
    return (
        <View style={{ flexDirection: 'row', width: "100%", borderWidth: 1, borderRadius: 5, borderColor: AppColors.border, paddingVertical: AppSizes.paddingSml, marginBottom: AppSizes.marginSml }}>
            <Text style={{ ...AppStyles.baseText, color: AppColors.black, width: '7%', textAlign: 'center' }}>{index + 1}</Text>
            <View style={{ width: '93%' }}>
                <Text>{thongBao.tendv}</Text>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    {/* row 1 */}
                    <View style={{ width: '70%' }}>
                        <Text numberOfLines={2} style={{ ...AppStyles.baseText, height: 40 }} >{"Lý do: " + item.lyDoXuLy} </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ ...AppStyles.baseText }}>Trạng thái: </Text>
                            <Text style={{ ...AppStyles.baseText, color: AppColors.black }}>{item?.trangThaiTruyenNhanString}</Text>
                        </View>
                    </View>
                    {/* row 2 */}
                    <View style={{ width: '30%', justifyContent: 'flex-end', alignItems: 'flex-end', paddingRight: AppSizes.paddingSml }}>
                        <Text style={{ ...AppStyles.baseText, color: AppColors.black }}> {item?.mauSo + item?.kyHieu} </Text>
                        <Text style={{ ...AppStyles.baseText, fontWeight: '700', color: AppColors.red }}>{item?.soHoaDon}</Text>
                        <Text style={{ ...AppStyles.baseText }}>{moment(item?.ngayHoaDon).format('DD/MM/YYYY')}</Text>
                    </View>

                </View>


            </View>

        </View>
    )
}

const PhieuThongBao = (props) => {
    const { thongBao, thongBaoChiTiet } = props
    let colorStatus = AppColors.black
    if (thongBao?.trangThaiTruyenNhan >= 9) {
        colorStatus = AppColors.customSuccess
    }
    if (thongBao?.trangThaiTruyenNhan < 0) {
        colorStatus = AppColors.customError
    }
    return (
        <View style={styles.container}>
            <View style={{ width: '100%', paddingHorizontal: AppSizes.paddingSml, height: '100%' }}>
                <FlatList
                    data={thongBaoChiTiet}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={() => {
                        return <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ ...AppStyles.boldText, color: AppColors.black }}>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</Text>
                            <Text style={{ ...AppStyles.baseText }}>Độc lập - Tự do - Hạnh phúc</Text>
                            <Text style={{ ...AppStyles.smallText, color: AppColors.black }}>----------oOo----------</Text>
                            <Text style={{ ...AppStyles.boldText, color: AppColors.black }}>THÔNG BÁO HOÁ ĐƠN ĐIỆN TỬ CÓ SAI SÓT</Text>
                            <View style={{ width: '100%', marginVertical: AppSizes.marginSml, paddingHorizontal: AppSizes.paddingSml }}>
                                <RowInfo title="Số thông báo:" value={thongBao?.soThongBao} />
                                <RowInfo title="Loại thông báo:" value={thongBao?.loaiThongBaoString} />
                                <RowInfo title="CQT tiếp nhận:" value={thongBao?.cqtQuanLy} />
                                <RowInfo title="Tên người nộp thuế:" value={thongBao?.tendv} />
                                <RowInfo title="Mã số thuế:" value={thongBao?.madv} />
                                <RowInfo title="Trạng thái:" color={colorStatus} value={thongBao?.trangThaiTruyenNhanString} />
                                <Text style={{ ...AppStyles.smallText }}>{'Người nộp thuế thông báo về việc hoá đơn diện tử có sai sót như sau:'}</Text>
                            </View>
                            <View style={{ height: 3, width: '100%', backgroundColor: '#F1F1F2' }} />
                            <Text style={{ ...AppStyles.boldText, color: AppColors.black, textAlign: 'left', width: '100%', marginVertical: AppSizes.marginSml }} >Danh sách hóa đơn sai sót</Text>
                        </View>
                    }}
                    renderItem={({ item, index }) => {
                        return <Item item={item} thongBao={thongBao} index={index} />
                    }}
                    ListFooterComponent={() => {
                        return <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-end', marginTop: AppSizes.margin }}>
                            <View style={{ width: '80%', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ ...AppStyles.baseText, color: AppColors.black }}>{`Hà Nội, ngày ${moment().date()} tháng ${moment().month()} năm ${moment().year()}.`}</Text>
                                <Text style={{ ...AppStyles.boldText, color: AppColors.black }}>
                                    NGƯỜI NỘP THUẾ hoặc
                                </Text>
                                <Text style={{ ...AppStyles.boldText, color: AppColors.black }}>
                                    ĐẠI DIỆN HỢP PHÁP CỦA NGƯỜI NỘP THUẾ
                                </Text>
                                <Text style={{ ...AppStyles.smallText }} >(Chữ ký số, chữ ký điện tử của người nộp thuế)</Text>
                            </View>
                        </View>
                    }}
                />

            </View>
        </View>
    )
}

export default PhieuThongBao

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})