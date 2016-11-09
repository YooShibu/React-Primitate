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


const Counter = Primitate(0);
const Counter_Comp = PrimitateComponent(
  Counter,
  count => (
    createElement("div", null
    , createElement("p", null, count)
    )
));


// Counter_Comp is a Ract.ComponentClass so you can use like  
// <Counter_Comp/> or React.createElement(Counter_Comp) 

```

## LICENSE
MIT