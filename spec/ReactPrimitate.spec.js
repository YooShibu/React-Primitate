/// <reference path="../node_modules/@types/jasmine/index.d.ts" />

const { jsdom } = require("jsdom");
// setup
global.document = jsdom("<!doctype html><html><body></body></html>");
global.window = document.defaultView;
global.navigator = document.defaultView.navigator

const { DOM, createElement } = require("react");
const { renderIntoDocument, Simulate } = require("react-addons-test-utils");
const { findDOMNode } = require("react-dom");
const { Primitate } = require("primitate");
const { PrimitateComponent } = require("../lib/ReactPrimitate");


function increment(x) { return x + 1; }
function identity(x) { return x; }

describe("React Primitate", () => {


  it("create element", done => {
    const Counter = Primitate(0);
    const increment$ = Counter.createAction(increment);

    const createPComponent = PrimitateComponent(Counter);
    const Counter_Element = createPComponent( count => (
      DOM.div(null, count)
    ));

    const tree = renderIntoDocument(createElement(Counter_Element));
    setTimeout( () => {
      expect(findDOMNode(tree).textContent).toBe('0');
    }, 20);
    setTimeout( () => {
      expect(increment$()).toBe(1);
    }, 25);
    setTimeout( () => {
      expect(findDOMNode(tree).textContent).toBe('1');
      done();
    }, 30);
  });
});
