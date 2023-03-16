'use strict';
/**
 * Kiểm tra kết nối internet của APP
 */

module.exports = {
  _isConnected: true,

  updateNetworkStatus(connected) {
    this._isConnected = connected;
  },

  isConnected() {
    return this._isConnected;
  },
};
