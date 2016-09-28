# React-Primitate
[![Build Status](https://travis-ci.org/YooShibu/React-Primitate.svg?branch=master)](https://travis-ci.org/YooShibu/React-Primitate)

React-Primitate is an official addon for the [Primitate](https://github.com/YooShibu/Primitate)
to connect Primitate and React.

## Install

```sh
npm install react-primitate
```

## Example

```js
const { createElement } = require("react");
const startPrimitate = require("primitate").default;
const initConnector = require("react-primitate").default;

const { createAction, applyAddon } = startPrimitate({ counter: { count: 0 } });


const increment$ = createAction( state => state.counter )( counter => {
    return { count: counter.count + 1 }
  });

const Counter = ({ count, increment }) => (
  createElement("div", null
  , createElement("button", { onClick: increment}, "+")
  , createElement("p", null, count)
  )
);


const connect = applyAddon( initConnector({ increment$ }) );


// ConnectedComp has two state 'count' and 'increment'
// The count will update when you emmit increment$

const ConnectedComp = connect( state => state.counter )( (counter, actions) => ({
  count: counter.count,
  increment: actions.increment$
}))(Counter);
```

## LICENSE
MIT