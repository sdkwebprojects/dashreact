import React from 'react';
import { render } from 'react-dom';
import App from '_app'

class Magento extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <App />
        )
    }
}

const App = () => /*#__PURE__*/React.createElement(Magento, {});
