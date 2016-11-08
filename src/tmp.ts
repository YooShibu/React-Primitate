import { Primitate, PrimitateClass } from "primitate"
import { PrimitateComponent } from "./ReactPrimitate"

const Counter = Primitate({ count: 0 });

const createComp = PrimitateComponent(Counter);

