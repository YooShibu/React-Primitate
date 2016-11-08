import * as React from "react"
import { PrimitateClass } from "primitate"

function createPrimitateComponent<State, PROPS>(
  PrimitateItem: PrimitateClass<State>
, pickers: ((state: State) => any)[]
, WrappedElement: (state: State, props: PROPS) => React.ReactElement<{}>): React.ComponentClass<PROPS> {
  return class extends React.Component<PROPS, { __PrimitateElm: State }> {
    private unsubscribe: () => void
    
    constructor(props: PROPS) {
      super(props);
      this.state = { __PrimitateElm: PrimitateItem.getCurrentState() };
    }
    
    componentWillMount() {
      this.unsubscribe = PrimitateItem
        .subscribe.apply(
          PrimitateItem
        , [(state: State) => this.setState({ __PrimitateElm: state })].concat(pickers)
        );
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
  return <Props>(
    wrappedElement: (state: State, props: Props) => React.ReactElement<{}>
  , ...pickers: ((state: State) => any)[]
  ): React.ComponentClass<Props> => {
    return createPrimitateComponent(PrimitateItem, pickers, wrappedElement);
  }
}
