"use strict";
var React = require("react");
function initConnector(actions) {
    return function (createAction, subscribe) {
        return function (pick) {
            return function (getProps) {
                return function (wrappedComponent) {
                    return React.createClass({
                        componentWillMount: function () {
                            var _this = this;
                            this.unsubscribe = subscribe(pick)(function (state) {
                                var props = getProps(state, actions);
                                _this.setState(props);
                            });
                        },
                        componentWillUnmount: function () {
                            this.unsubscribe();
                        },
                        render: function () {
                            var props = {};
                            for (var key in this.props)
                                props[key] = this.props[key];
                            for (var key in this.state)
                                props[key] = this.state[key];
                            return React.createElement(wrappedComponent, props);
                        }
                    });
                };
            };
        };
    };
}
exports.__esModule = true;
exports["default"] = initConnector;
//# sourceMappingURL=ReactPrimitate.js.map