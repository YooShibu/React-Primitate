/// <reference types="react" />
import * as React from "react";
import { PrimitateClass } from "primitate";
export declare function PrimitateComponent<State>(PrimitateItem: PrimitateClass<State>): (...pickers: ((state: State) => any)[]) => <Props>(wrappedElement: (state: State, props: Props) => React.ReactElement<{}>) => React.ComponentClass<Props>;
