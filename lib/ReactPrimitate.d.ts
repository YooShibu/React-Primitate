/// <reference types="react" />
import * as React from "react";
import { PrimitateClass } from "primitate";
export declare function PrimitateComponent<State, Props extends {
    [key: string]: any;
}>(PrimitateItem: PrimitateClass<State>, wrappedElement: (state: State, props: Props) => React.ReactElement<{}>, pickers?: ((state: State) => any)[]): React.ComponentClass<Props>;
