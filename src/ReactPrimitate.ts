import * as React from "react"
import { PrimitateClass } from "primitate"


export function PrimitateComponent<State, Props>(
    PrimitateItem: PrimitateClass<State>
  , wrappedElement: (state: State, props: Props) => React.ReactElement<{}>
  , ...pickers: ((state: State) => any)[]
  ): React.ComponentClass<Props> {
    return class extends React.Component<Props, { __PrimitateElm: State }> {
      private unsubscribe: () => void
      
      constructor(props: Props) {
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
        return wrappedElement(this.state.__PrimitateElm, this.props);
      }
    }
  }
