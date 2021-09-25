import React, {useState} from "react";

// Local Login component
function Login () {
    const [classStyle, setClassStyle] = useState(false);
    // fake credentials
    const credentials = { user: 'participant@mail.com', password: '1234567' };
    // input references
    const username = React.createRef();
    const password = React.createRef();

    // process the user credentials to determine if pass or not
    const onLogin = () => {
        const user = username.current.value;
        const pass = password.current.value;

        // possible Ajax call here to submit credentials
        if( user.localeCompare(credentials.user) === 0 && pass.localeCompare(credentials.password) === 0 ){
                localStorage.setItem('localSession', 'active');
                window.location.reload();
        }else{
            // if credentials does not match, show a message
            if(!classStyle)
                setClassStyle((prevClassStyle) => {
                    return !prevClassStyle;
                });
        }
    }

    return (
    <div className="modal-content rounded-5 border-0">
        {/* Warning message */}
        <div className="p-5 pb-4 border-bottom-0">
            <h2 className="fw-bold mb-0 text-center">Please sign up</h2>
            <div className={ `alert alert-danger mt-2 ${ classStyle ? 'widgetShow':'widgetHide'}`} role="alert">
                Email or Password invalid
            </div>
        </div>

        <div className="modal-body p-5 pt-0">
                <div className="form-floating mb-3">
                    <input ref={username} type="email" className="form-control rounded-4" id="floatingInput" placeholder="name@example.com" />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-3">
                    <input ref={password} type="password" className="form-control rounded-4" id="floatingPassword" placeholder="Password" />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <button onClick={() => onLogin()} className="w-100 mb-2 btn btn-lg rounded-4 btn-primary" type="submit">Sign up</button>
        </div>
    </div>
    );
}

export default Login;