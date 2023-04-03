export enum AccumulateRuleAction {
  REGISTER = 0,
  UPDATE_INFORMATION, // Chặn update tần suất
  SURVEY,
  SKNN_SURVEY, // Chặn update tần suất
  DKLV_SURVEY, // Chặn update tần suất
  REQUIRE_ADVICE,
  REQUIRE_COMPLAIN,
  READ_POST,
  FIRST_UPDATE_INFORMATION,
  SHARE_TO_FRIEND,
}

export enum PayType {
  PRE_PAY = 1002,
  POST_PAID = 1003,
}

export enum GiftExchangeType {
  MOBILE_CARD = 1,
  TOP_UP = 2,
}
