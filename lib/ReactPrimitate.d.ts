/// <reference types="react" />
import { createAction, subscribe } from "primitate";
import * as React from "react";
export declare type connect<Action, State> = <T>(...pickers: ((state: State) => T)[]) => <P>(getProps: (state: State, acctions?: Action) => P) => <PROP>(wrappedComponent: React.ComponentClass<P> | React.StatelessComponent<P>) => React.ComponentClass<PROP>;
export default function initConnector<A extends {}>(actions?: A): <S>(createAction: createAction<S>, subscribe: subscribe<S>) => <T>(...pickers: ((state: S) => T)[]) => <P>(getProps: (state: S, actions: A) => P) => <PROP>(wrappedComponent: React.ComponentClass<P> | React.StatelessComponent<P>) => React.ComponentClass<PROP>;
