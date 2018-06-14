import React from 'react';

export default (props) => {

    if (props.facebookLogin.picture) {
        return (
            <div>
                <span className="name">
                    <img 
                        src={props.facebookLogin.picture.data.url} 
                        width={props.facebookLogin.picture.data.width} 
                        height={props.facebookLogin.picture.data.height} 
                        alt="Profile Picture"
                    />
                    <span className="firstName">{props.facebookLogin.first_name}</span>
                    <span className="lastName">{props.facebookLogin.last_name}</span>
                </span>
                <a className="logout" onClick={props.handleLogout}>Logout</a>
            </div>
        )
    }

    return (
        <div>
            <span className="name">
                <span className="firstName">{props.facebookLogin.first_name}</span>
                <span className="lastName">{props.facebookLogin.last_name}</span>
            </span>
            <a className="logout" onClick={props.handleLogout}>Logout</a>
        </div>
    )
}
