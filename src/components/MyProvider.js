import MyContext from './MyContext';
import React, { Component } from "react";
const { Provider, Consumer } = React.createContext();

class MyProvider extends Component {
    state = {
        token: ""
    };

    render() {
        return (
            <Provider
                value={{
                    token: this.state.token,
                    
                }}
            >
                {this.props.children}
            </Provider>
        );
    }
}



  

export { MyProvider, Consumer as MyProviderConsumer };