import React from 'react';

export default (props) => {

    if (!props.facebookInfo) {
        return null;
    }

    if (props.facebookInfo.picture) {
        return (
            <div className="facebook-login">
                <span className="profile">
                    <img
                        src={props.facebookInfo.picture.data.url}
                        width={props.facebookInfo.picture.data.width}
                        height={props.facebookInfo.picture.data.height}
                        alt="Profile Picture"
                    />
                    <span className="name">
                        <span className="firstName">{props.facebookInfo.first_name}</span>
                        <span className="lastName">{props.facebookInfo.last_name}</span>
                    </span>
                </span>
                <a className="logout" href="#" onClick={props.handleLogout}>Logout</a>
            </div>
        )
    }

    return (
        <div className="facebook-login">
            <span className="name">
                <span className="firstName">{props.facebookInfo.first_name}</span>
                <span className="lastName">{props.facebookInfo.last_name}</span>
            </span>
            <a className="logout" onClick={props.handleLogout}>Logout</a>
        </div>
    )
}
