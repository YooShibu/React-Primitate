/// <reference types="react" />
import { createAction, subscribe } from "primitate";
import * as React from "react";
export declare type connect<ACTION, STATE> = (...pickers: ((state: STATE) => any)[]) => <P>(getProps: (state: STATE, acctions?: ACTION) => P) => <PROP>(wrappedComponent: React.ComponentClass<P> | React.StatelessComponent<P>) => React.ComponentClass<PROP>;
export default function initConnector<A extends {}>(actions?: A): <S>(createAction: createAction<S>, subscribe: subscribe<S>) => (...pickers: ((state: S) => any)[]) => <P>(getProps: (state: S, actions: A) => P) => <PROP>(wrappedComponent: React.ComponentClass<P> | React.StatelessComponent<P>) => React.ComponentClass<PROP>;
