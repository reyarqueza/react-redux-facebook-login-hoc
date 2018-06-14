import React from 'react';

export default (props) => {
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
            <a href="#" className="logout" onClick={props.handleLogout}>Logout</a>
        </div>
    )
}
