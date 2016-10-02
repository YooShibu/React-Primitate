import { createAction, subscribe } from "primitate"
import * as React from "react"

export default function initConnector<A>(actions?: A) {
  return <S>(createAction: createAction<S>, subscribe: subscribe<S>) => {
    return <T>(pick: (state: S) => T) => {
      return <P>(getProps: (state: S, actions?: A) => P) => {
        return (wrappedComponent: React.ComponentClass<P> | React.StatelessComponent<P> | React.ClassType<P, React.ClassicComponent<P, React.ComponentState>, React.ClassicComponentClass<P>> ) => {
          return React.createClass<{}, P>({
            componentWillMount() {
              this.unsubscribe = subscribe(pick)( state => {
                const props = getProps(state, actions);
                this.setState(props);
              });
            }
          , componentWillUnmount() {
              this.unsubscribe();
          }
          , render() {
              const props: { [key: string]: any} = {};
              for (let key in this.props) props[key] = this.props[key];
              for (let key in this.state) props[key] = this.state[key];
              return React.createElement(wrappedComponent, <P>props);
            }
          });
        }
      }
    }
  }
}
