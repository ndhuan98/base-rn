import _ from 'lodash';

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}
/**
 * return validate email with a space at last
 * @param {*} email
 */
function validateEmailAdviseOther(email) {
  var re = /\S+@\S+\.\S+\s/;
  return re.test(email);
}

function validateUrl(link) {
  var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return regexp.test(link);
}
function format_curency(money) {
  return money.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

function format_mst(mst) {
  var regex = /[0-9]{10}-[0-9]{3}$|^[0-9]{10}$/;
  return regex.test(mst);
}
function special_characters(ma) {
  var regex = /[$&+:;=?#|'<>-^*()%!]/;
  return regex.test(ma);
}
function email_multiple(email) {
  var regex = /^\s*(?:([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})\b\,*)+$/i
  return regex.test(email)
}
function validate_phone(phone) {
  var regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g
  return regex.test(phone)
}
function validate_CMT(num) {
  var regex = /[0-9]{9}/
  return regex.test(num)
}

function validate_CCDD(num) {
  var regex = /[0-9]{12}/
  return regex.test(num)
}

function validateIsNumber(num) {
  var regex = /^\d+$/;
  return regex.test(num)
}


export {
  validateEmail,
  validateEmailAdviseOther,
  validateUrl,
  format_curency,
  format_mst,
  special_characters,
  validate_phone,
  email_multiple,
  validate_CCDD,
  validate_CMT,
  validateIsNumber
};
