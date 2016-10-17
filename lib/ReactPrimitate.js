"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var HigherOrderComponent = function (wrappedComponent) {
    return (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            _super.apply(this, arguments);
        }
        class_1.prototype.render = function () {
            var props = {};
            for (var key in this.props)
                props[key] = this.props[key];
            for (var key in this.state)
                props[key] = this.state[key];
            return React.createElement(wrappedComponent, props);
        };
        return class_1;
    }(React.Component));
};
function initConnector(actions) {
    return function (createAction, subscribe) {
        return function () {
            var pickers = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                pickers[_i - 0] = arguments[_i];
            }
            return function (getProps) {
                return function (wrappedComponent) {
                    return (function (_super) {
                        __extends(class_2, _super);
                        function class_2(props) {
                            _super.call(this, props);
                        }
                        class_2.prototype.componentWillMount = function () {
                            var _this = this;
                            var subscriber = subscribe.apply(null, pickers);
                            this.unsubscribe = subscriber(function (state) {
                                var props = getProps(state, actions);
                                _this.setState(props);
                            });
                        };
                        class_2.prototype.componentWillUnmount = function () {
                            this.unsubscribe();
                        };
                        class_2.prototype.render = function () {
                            var props = {};
                            for (var key in this.props)
                                props[key] = this.props[key];
                            for (var key in this.state)
                                props[key] = this.state[key];
                            return React.createElement(wrappedComponent, props);
                        };
                        return class_2;
                    }(React.Component));
                };
            };
        };
    };
}
exports.__esModule = true;
exports["default"] = initConnector;
//# sourceMappingURL=ReactPrimitate.js.map