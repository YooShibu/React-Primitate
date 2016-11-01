"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
function createPrimitateElement(PrimitateItem, pickers, wrappedElement) {
    return (function (_super) {
        __extends(class_1, _super);
        function class_1(props) {
            _super.call(this, props);
        }
        class_1.prototype.componentWillMount = function () {
            var _this = this;
            var subscriber = PrimitateItem.subscribe.apply(PrimitateItem, pickers);
            this.unsubscribe = subscriber(function (state) { return _this.setState({ __PrimitateElm: state }); });
        };
        class_1.prototype.componentWillUnmount = function () {
            this.unsubscribe();
        };
        class_1.prototype.render = function () {
            if (this.state === null)
                return React.DOM.span();
            return wrappedElement(this.state.__PrimitateElm);
        };
        return class_1;
    }(React.Component));
}
function PrimitateElement(PrimitateItem) {
    return function () {
        var pickers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            pickers[_i - 0] = arguments[_i];
        }
        return function (wrappedElement) {
            return createPrimitateElement(PrimitateItem, pickers, wrappedElement);
        };
    };
}
exports.PrimitateElement = PrimitateElement;
//# sourceMappingURL=ReactPrimitate.js.map