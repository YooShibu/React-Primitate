/// <reference path="../node_modules/@types/jasmine/index.d.ts" />

const { jsdom } = require("jsdom");
const { createElement } = require("react");
const { renderIntoDocument, Simulate } = require("react-addons-test-utils");
const { findDOMNode } = require("react-dom");
const startPrimitate = require("primitate").default
const initConnector = require("../lib/ReactPrimitate").default


// setup
global.document = jsdom("<!doctype html><html><body></body></html>");
global.window = document.defaultView;


describe("React Primitate", () => {

  it("React component will render when state changed", () => {
    const { createAction, applyAddon } = startPrimitate({ counter: { count: 0 } }, true);
    const increment$ = createAction( state => state.counter )( previousState => ({ count: previousState.count + 1 }));

    const connect = applyAddon(initConnector());


    const Counter = ({ count }) => (
      createElement("div", null, count)
    );
    
    const ConnectedComp = connect( state => state.counter )( counter => ({
      count: counter.count
    }))(Counter);

    const tree = renderIntoDocument(createElement(ConnectedComp));
    expect(tree.state.count).toBe(0);
    increment$();
    expect(tree.state.count).toBe(1)
    increment$();
    expect(tree.state.count).toBe(2);
  });


  it("can pass actions", () => {
    const { createAction, applyAddon } = startPrimitate({ counter: { count: 0 } }, true);

    const increment$ = createAction( state => state.counter )( counter => ({ count: counter.count + 1 }));
    const connect = applyAddon(initConnector({ increment$ }));


    const Counter = ({ count, increment }) => (
      createElement("div", null
      , createElement("button", { onClick: increment })
      , createElement("p", null, count)
      )
    );

    const ConnectedComp = connect( state => state.counter )( (state, actions) => ({
      count: state.count
    , increment: actions.increment$
    }))(Counter);


    const tree = renderIntoDocument(createElement(ConnectedComp));
    const btn = findDOMNode(tree).children[0];
    const p = findDOMNode(tree).children[1];

    expect(p.textContent).toBe("0");
    Simulate.click(btn);
    expect(p.textContent).toBe("1");
    Simulate.click(btn);
    expect(p.textContent).toBe("2");
    
  });
  
});
