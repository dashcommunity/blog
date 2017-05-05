import React from 'react';
import { auth } from '../../Auth';
import './login-button.css';

const LoginButton = React.createClass({
    propTypes: {
        onSubmit: React.PropTypes.func,
    },

    onClick() {
        auth.gitHubPopupLogin()
            .then(() => this.props.onSubmit());
    },

    render() {
        return (
          <div className="button-container">
            <button
              onClick={this.onClick}
              className="login-button"
              aria-label="Sign in to GitHub"
            >
              <span>Sign In</span>
              <span className="fa fa-github" />
            </button>

            <span>in order to post</span>
          </div>
        );
    },
});


export default LoginButton;
