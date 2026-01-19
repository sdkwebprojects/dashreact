"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _NavigationMenu = _interopRequireDefault(require("../components/NavigationMenu"));
var _UserTypeSelector = _interopRequireDefault(require("../components/UserTypeSelector"));
var _AuthContext = require("../contexts/AuthContext");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function AppContent(_ref) {
  var Component = _ref.Component,
    pageProps = _ref.pageProps;
  var _useAuth = (0, _AuthContext.useAuth)(),
    isLoading = _useAuth.isLoading,
    logout = _useAuth.logout,
    userInfo = _useAuth.userInfo;
  if (isLoading) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "flex items-center justify-center min-h-screen"
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "text-center"
    }, /*#__PURE__*/_react["default"].createElement("p", {
      className: "text-lg"
    }, "Chargement...")));
  }
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col gap-6 mx-auto my-12 w-[1208px] min-h-[842px] font-['Open_Sans']"
  }, /*#__PURE__*/_react["default"].createElement(_UserTypeSelector["default"], null), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex gap-6"
  }, /*#__PURE__*/_react["default"].createElement(_NavigationMenu["default"], {
    onLogout: logout,
    userType: userInfo === null || userInfo === void 0 ? void 0 : userInfo.userType
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/_react["default"].createElement(Component, pageProps))));
}
function App(props) {
  return /*#__PURE__*/_react["default"].createElement(_AuthContext.AuthProvider, null, /*#__PURE__*/_react["default"].createElement(AppContent, props));
}
var _default = exports["default"] = App;
