import * as React from "react"
import { PrimitateClass } from "primitate"

function createPrimitateElement<State, PROPS>(
  PrimitateItem: PrimitateClass<State>
, pickers: ((state: State) => any)[]
, WrappedElement: (state: State, props: PROPS) => React.ReactElement<PROPS>): React.ComponentClass<PROPS> {
  return class extends React.Component<PROPS, { __PrimitateElm: State }> {
    private unsubscribe: () => void
    
    constructor(props: PROPS) {
      super(props);
      this.state = { __PrimitateElm: PrimitateItem.getCurrentState() };
    }
    
    componentWillMount() {
      const subscriber =
        <(listener: (state: State) => void) => () => void>PrimitateItem.subscribe.apply(PrimitateItem, pickers);
      this.unsubscribe = subscriber( state => this.setState({ __PrimitateElm: state }) );
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

    render() {
      return WrappedElement(this.state.__PrimitateElm, this.props);
    }
  }
}

export function PrimitateComponent<State>(PrimitateItem: PrimitateClass<State>) {
  return (...pickers: ((state: State) => any)[]) => {
    return <Props>(
      wrappedElement: (state: State, props: Props) => React.ReactElement<Props>)
    : React.ComponentClass<Props> => {
      return createPrimitateElement(PrimitateItem, pickers, wrappedElement);
    }
  }
}
