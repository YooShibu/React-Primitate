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
const { Primitate } = require("primitate");
const { PrimitateComponent } = require("react-primitate");

function identity(x) { return x; }

const Counter = Primitate(0);
const createPComponent = PrimitateComponent(Counter);

const Counter_Comp = createPComponent(identity)( count => (
  createElement("div", null
  , createElement("p", null, count)
  )
));



```

## LICENSE
MIT