import * as React from "react"
import { PrimitateClass } from "primitate"


export function PrimitateComponent<State, Props extends { [key: string]: any }>(
    PrimitateItem: PrimitateClass<State>
  , wrappedElement: (state: State, props: Props) => React.ReactElement<{}>
  , pickers?: ((state: State) => any)[]
  , isLazy?: boolean
  ): React.ComponentClass<Props> {
  return class extends React.Component<Props, { __PrimitateElm: State }> {
    private unsubscribe: () => void
    
    constructor(props: Props) {
      super(props);
      this.state = { __PrimitateElm: PrimitateItem.getCurrentState() };
    }
    
    componentDidMount() {
      this.unsubscribe = PrimitateItem
        .subscribe((state: State) =>
          this.setState({ __PrimitateElm: state }), pickers, isLazy);
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

    render() {
      return wrappedElement(this.state.__PrimitateElm, this.props);
    }
  }
}
