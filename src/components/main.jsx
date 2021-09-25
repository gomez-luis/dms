import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '../App.css';
import io from 'socket.io-client';
import Messages from "./messages";
import Login from "./login";

// the main component
function Main() {
    // sockets variables
    const [socket, setSocket] = useState(null);
    // Session information for logged user
    const session = localStorage.getItem('localSession') || null;

    useEffect(() => {
        // Connection to socket server
        const newSocket = io(`https://demo-chat-server.on.ag/`);
        setSocket(newSocket);

        return () => newSocket.close();
    }, [setSocket]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-6 m-auto p-5">
                    <div className="modal-content rounded-5 shadow">
                        <div className="modal-body p-5">
                            {   // Show components depending if user is logged
                                session ? (
                                     socket ? (
                                            <React.Fragment>
                                                <Messages socket={socket} />
                                            </React.Fragment>
                                        ) : (
                                            <div>Not Connected</div>
                                        )
                                ) : (
                                    <Login />
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;