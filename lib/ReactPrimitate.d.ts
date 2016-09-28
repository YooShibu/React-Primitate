/// <reference types="react" />
import { createAction, subscribe } from "primitate";
import * as React from "react";
export default function initConnector<A>(actions?: A): <S>(createAction: createAction<S>, subscribe: subscribe<S>) => <T>(pick: (state: S) => T) => <P>(getProps: (state: T, actions?: A | undefined) => P) => <PROP extends {}>(wrappedComponent: React.ComponentClass<P> | React.StatelessComponent<P> | React.ClassType<P, React.ClassicComponent<P, React.ComponentState>, React.ClassicComponentClass<P>>) => React.ClassicComponentClass<PROP>;
