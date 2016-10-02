/// <reference types="react" />
import { createAction, subscribe } from "primitate";
import * as React from "react";
export default function initConnector<A>(actions?: A): <S>(createAction: createAction<S>, subscribe: subscribe<S>) => <T>(...pickers: ((state: S) => T)[]) => <P>(getProps: (state: S, actions?: A | undefined) => P) => (wrappedComponent: React.ComponentClass<P> | React.StatelessComponent<P> | React.ClassType<P, React.ClassicComponent<P, React.ComponentState>, React.ClassicComponentClass<P>>) => React.ClassicComponentClass<{}>;
