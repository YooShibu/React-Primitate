"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
function PrimitateComponent(PrimitateItem, wrappedElement) {
    var pickers = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        pickers[_i - 2] = arguments[_i];
    }
    return (function (_super) {
        __extends(class_1, _super);
        function class_1(props) {
            _super.call(this, props);
            this.state = { __PrimitateElm: PrimitateItem.getCurrentState() };
        }
        class_1.prototype.componentWillMount = function () {
            var _this = this;
            this.unsubscribe = PrimitateItem
                .subscribe.apply(PrimitateItem, [function (state) { return _this.setState({ __PrimitateElm: state }); }].concat(pickers));
        };
        class_1.prototype.componentWillUnmount = function () {
            this.unsubscribe();
        };
        class_1.prototype.render = function () {
            return wrappedElement(this.state.__PrimitateElm, this.props);
        };
        return class_1;
    }(React.Component));
}
exports.PrimitateComponent = PrimitateComponent;
//# sourceMappingURL=ReactPrimitate.js.map