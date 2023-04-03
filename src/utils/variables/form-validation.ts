import * as yup from 'yup';

export enum ValidateErrorMessage {
  REQUIRE = 'Thông tin bắt buộc',
  MIN_PASSWORD = 'Mật khẩu cần có ít nhất 8 ký tự',
  INVALID_PHONE = 'Số điện thoại gồm 10 số, bắt đầu bằng số 0',
  INVALID_PASSWORD = 'Mật khẩu phải có ít nhất 8 ký tự, gồm chữ và số',
  INVALID_DATE_FORMAT = 'Định dạng ngày phải là dd/mm/yyyy',
  INVALID_DATE = 'Ngày không hợp lệ',
  EXIST_PHONE = 'Số điện thoại đã tồn tại trên hệ thống',
  NOT_EXIST_PHONE = 'Số điện thoại chưa được đăng ký tài khoản',
  WRONG_LOGIN = 'Số điện thoại hoặc mật khẩu không đúng',
  REGISTER_FAILED = 'Đăng ký thất bại, vui lòng thử lại sau!',
  OUT_OF_REQUEST_OTP = 'Đã hết lượt gửi OTP trong ngày',
  INVALID_SMS_CODE = 'Mã xác minh không hợp lệ, vui lòng thử lại.',
  INVALID_CONFIRM_PASSWORD = 'Mật khẩu không trùng khớp',
  INVALID_OLD_PASSWORD = 'Mật khẩu mới không trùng khớp',
  INVALID_CONFIRM_NEW_PASSWORD = 'Mật khẩu mới không trùng khớp',
  LOCKED_ACCOUNT = 'Tài khoản của bạn đang bị khóa. Vui lòng liên hệ quản trị viên theo số điện thoại xxx để được hỗ trợ.',
}

export enum SuccessMessage {
  SUCCESS_PASSWORD_SETUP = 'Cài đặt mật khẩu thành công',
  CAN_USING_THIS_PHONE = 'Có thể dùng số điện thoại này',
}

export const customPattern = {
  phoneNumber: /^([0][3|5|7|8|9])+([0-9]{8})$\b/u,
  password: /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/,
  dateDDMMYYYY:
    /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
};

export const GeneralYupValidation = {
  generalRequire: yup.string().required(ValidateErrorMessage.REQUIRE),
  phone: yup
    .string()
    .trim()
    .required(ValidateErrorMessage.REQUIRE)
    .matches(customPattern.phoneNumber, ValidateErrorMessage.INVALID_PHONE)
    .min(10, ValidateErrorMessage.INVALID_PHONE)
    .max(10, ValidateErrorMessage.INVALID_PHONE),
  password: yup
    .string()
    .required(ValidateErrorMessage.REQUIRE)
    .matches(customPattern.password, ValidateErrorMessage.INVALID_PASSWORD)
    .min(8, ValidateErrorMessage.MIN_PASSWORD)
    .max(255, ValidateErrorMessage.INVALID_PASSWORD),
  birthday: yup
    .string()
    .required(ValidateErrorMessage.REQUIRE)
    .matches(customPattern.dateDDMMYYYY, ValidateErrorMessage.INVALID_DATE_FORMAT),
  gender: yup.string().required(ValidateErrorMessage.REQUIRE).nullable(),
  hometown: yup.string().required(ValidateErrorMessage.REQUIRE),
  industry: yup.string().required(ValidateErrorMessage.REQUIRE),
  company: yup.string().required(ValidateErrorMessage.REQUIRE),
  companyAddress: yup.string().required(ValidateErrorMessage.REQUIRE),
  startTime: yup.string().required(ValidateErrorMessage.REQUIRE),
  role: yup.string().required(ValidateErrorMessage.REQUIRE),
  confirmedPassword: yup
    .string()
    .required(ValidateErrorMessage.REQUIRE)
    .oneOf([yup.ref('password'), null], ValidateErrorMessage.INVALID_CONFIRM_PASSWORD),
  newPasswordConfirm: yup
    .string()
    .required(ValidateErrorMessage.REQUIRE)
    .oneOf([yup.ref('newPassword'), null], ValidateErrorMessage.INVALID_CONFIRM_NEW_PASSWORD),
  name: yup.string().trim().required(ValidateErrorMessage.REQUIRE),
  otpCode: yup.string().required(ValidateErrorMessage.REQUIRE),
  username: yup.string().required(ValidateErrorMessage.REQUIRE),
  messageText: yup.string().required(ValidateErrorMessage.REQUIRE).min(1).trim(),
  adviseTopicId: yup.number().required(ValidateErrorMessage.REQUIRE),
};

export const SortType = {
  desc: 'DESC',
  asc: 'ASC',
};

export enum AdviseRequestCode {
  WECHECK_APP = 1,
  FACEBOOK = 2,
  ZALO = 3,
  HOTLINE = 4,
  DIRECT = 5,
  LETTER = 6,
  OTHER = 7,
}

export enum AdviseRequestType {
  LABORLAW = 1,
  HEALTH = 2,
  APP_FEEDBACK = 3,
}

export enum MessageType {
  SITUATION = 1,
  DESCRIPTION_AND_RESULT,
  RELATION_AND_REACTION,
  YOURS_OFFER,
  NORMAL,
  NORMAL_QUESTION,
  FEEDBACK,
  CONTENT_USER_SENDING,
}

export enum AdviseRequestStatus {
  WAITING_FOR_PROGRESSING = 1, // chờ xử lý
  PROGRESSING, // đang tiến hành
  PAUSING, // tạm dừng
  DONE, // hoàn thành
  NEW, // mới
  CONFIRMING, //đang xác nhận
  UNFULFILLED, // chưa thực hiện
  REJECT, //từ chối
  CLOSED,
}

export enum FeedbackStatus {
  NEW = 1, //đã gửi
  WAITING_FOR_PROGRESSING,
  DONE,
  CLOSED,
}

export enum ChatEvent {
  SENDING_ANSWER = 1,
  MEET_EXPERTS,
  CALL_FOR_ADVISE,
  DOCTOR_APPOINTMENT,
}
