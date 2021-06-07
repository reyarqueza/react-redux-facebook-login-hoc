import React from 'react';

export default (props) => {
    return (
        <div className="facebook-login">
            <a className="name login-button" href="#" onClick={props.handleLogin}>
                <i className="fab fa-facebook"></i>
                <span>Login with Facebook</span>
            </a>
        </div>
    )
}
