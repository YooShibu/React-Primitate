/// <reference types="react" />
import * as React from "react";
import { PrimitateClass } from "primitate";
export declare function PrimitateComponent<State>(PrimitateItem: PrimitateClass<State>): (...pickers: ((state: State) => any)[]) => <PROPS>(wrappedElement: (state: State) => React.ReactElement<PROPS>) => React.ComponentClass<{}>;
