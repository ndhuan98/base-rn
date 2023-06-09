export enum AuthAPI {
  LOGIN = '/auth/login',
  LOGOUT = '/auth/log-out',
  REFRESH_TOKEN = '/auth/refresh',
  REGISTER = '/auth/register',
  REQUEST_OTP = '/otp/phone/request',
  VALIDATE_PHONE = '/user/app/validatePhone',
  VERIFY_OTP = '/otp/phone/verify',
  FORGOT_PASSWORD = '/auth/forgot-password',
  RESET_PASSWORD = '/user/app/forgotPassword',
  CHANGE_PASSWORD = '/user/changePassword',
  GET_ALL_PROVINCES = '/provinces',
  UPLOAD_IMAGE_AVATAR = '/user/app/avatar',
  UPLOAD_IMAGE_MESSAGE = '/media/common/upload',
  UPLOAD_FILE = '/media/common/upload',
  USER_INFORMATION = '/user/app/',
  CHANGE_PHONE = '/user/app/changePhone',
  GET_PROVINCE_BY_CITY = '/provinces/:code/district',
  NOTIFICATION = '/notification/my-history',
  NOTIFICATION_DELETE = '/notification/my-history/delete',
  NOTIFICATION_UNSEEN_COUNT = '/notification/my-history/unseen-number',
  INACTIVE_ACCOUNT = '/user/app',
  GET_SURVEY_HOME = '/survey?status=3&page=1&limit=10',
  UNDEFINED = '/user/app/undefined',
}