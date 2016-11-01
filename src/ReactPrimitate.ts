import * as React from "react"
import { PrimitateClass } from "primitate"

function createPrimitateElement<State>(
  PrimitateItem: PrimitateClass<State>
, pickers: ((state: State) => any)[]
, wrappedElement: (state: State) => React.ReactElement<{}>): React.ComponentClass<{}> {
  return class extends React.Component<{}, { __PrimitateElm: State }> {
    private unsubscribe: () => void
    
    constructor(props: State) { super(props); }
    
    componentWillMount() {
      const subscriber =
        <(listener: (state: State) => void) => () => void>PrimitateItem.subscribe.apply(PrimitateItem, pickers);
      this.unsubscribe = subscriber( state => this.setState({ __PrimitateElm: state}) );
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

    render() {
      if (this.state === null)
        return React.DOM.span();
      return wrappedElement(this.state.__PrimitateElm);
    }
  }
}

export function PrimitateElement<State>(PrimitateItem: PrimitateClass<State>) {
  return (...pickers: ((state: State) => any)[]) => {
    return <PROPS>(wrappedElement: (state: State) => React.ReactElement<PROPS>): React.ComponentClass<{}> => {
      return createPrimitateElement(PrimitateItem, pickers, wrappedElement);
    }
  }
}
