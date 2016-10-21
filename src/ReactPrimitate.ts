import { createAction, subscribe } from "primitate"
import * as React from "react"

export declare type connect<ACTION, STATE> = (...pickers: ((state: STATE) => any)[]) => 
  <P>(getProps: (state: STATE, acctions?: ACTION) => P) => <PROP>(
    wrappedComponent: React.ComponentClass<P> | React.StatelessComponent<P>
  ) => React.ComponentClass<PROP> 

export default function initConnector<A extends {}>(actions: A = <A>{}) {
  return <S>(createAction: createAction<S>, subscribe: subscribe<S>) => {
    return (...pickers: ((state: S) => any)[]) => {
      return <P>(getProps: (state: S, actions: A) => P) => {
        return <PROP>(
          wrappedComponent: React.ComponentClass<P> | React.StatelessComponent<P>
        ): React.ComponentClass<PROP> => {

          return class extends React.Component<PROP, P> {
            unsubscribe: () => void
            
            constructor(props: PROP) { super(props); }
            
            componentWillMount() {
              const subscriber = <(listener: (state: S) => void) => () => void>subscribe.apply(null, pickers);
              this.unsubscribe = subscriber( state => {
                const props = getProps(state, actions);
                this.setState(props);
              });
            }

            componentWillUnmount() {
              this.unsubscribe();
            }

          render() {
              const props: { [key: string]: any} = {};
              for (let key in this.props) props[key] = (<{ [key: string]: any}>this.props)[key];
              for (let key in this.state) props[key] = (<{ [key: string]: any}>this.state)[key];
              return React.createElement(wrappedComponent, <P>props);
            }
          }
        }
      }
    }
  }
}
