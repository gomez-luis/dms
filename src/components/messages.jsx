import React, {useEffect, useRef, useState} from 'react';
import Widget from "./widget";
import TextBox from "./textBox";


// here keeps the main logic of the app
function Messages({ socket }) {
    // reference to Dom, used to keep the scroll on bottom
    const autoScroll = useRef(null);
    // operational states
    const [classStyle, setClassStyle] = useState(true);
    const [messages, setMessages] = useState({});
    const [commands, setCommands] = useState(false);
    // random number to assign to messages because there is not id or date from server
    let orderId = 0;

    // waits for messages changes on server
    const messageListener = React.useCallback(
        (message) => setMessages((prevMessages) => {
            const newMessages = {...prevMessages};
            newMessages[(orderId++)] = {author: message.author, message: message.message, date: getDate()};
            return newMessages;
        }),
        [orderId]
    );

    // waits for command changes on server
    const commandListener = React.useCallback(
        (command) => setCommands((prevCommands) => {
                    if(prevCommands !== command)
                        return command;
                    return false;
                }), []
    );

    // switch the view of the widget section
    const handleView = () => {
        setClassStyle((prevClassStyle) => {
            return !prevClassStyle;
        });
    }

    // emit the command event
    const handleWidget = () => {
        socket.emit('command');
        handleView();
    }

    // clear the session of user
    const onLogOut = () => {
        localStorage.clear();
        window.location.reload();
    }

    // generate a date, used to keep messages in order from old to new
    const getDate = () => {
        let date = new Date();
        date = date.getFullYear() +'-' + date.getMonth() + '-' + date.getDate() +
               ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        return date;
    }

    useEffect(() => {
        // waits for changes on server
        socket.on('message', messageListener);
        socket.on('command', commandListener);

        // keeps the scroll at the bottom
        if (autoScroll) {
            autoScroll.current.addEventListener('DOMNodeInserted', event => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
            });
        }

        return () => {
            socket.off('message', messageListener);
            socket.off('command', commandListener);
        };
    }, [socket, commandListener, messageListener]);

    return (
        <React.Fragment>
            <div className="d-flex justify-content-end mb-3">
                <i onClick={onLogOut} className="fas fa-door-open icons-chat iconBtn" data-bs-toggle="tooltip" data-bs-placement="top" title="Sign out"/>
            </div>
            <div className="px-2 scroll" ref={autoScroll}>
                {
                    [...Object.values(messages)]
                        .sort((a, b) => a.date - b.date)
                        .map((message) => (

                            message.author === 'ottonova bot' ?
                                    (
                                        <div key={(orderId++)} className="d-flex align-items-center">
                                            <img src="https://img.icons8.com/color/40/000000/bot.png" width="30" className="img1 m-lg-2" alt="" />
                                            <div className="pr-2 pl-1 me-lg-2">
                                                <span className="name">{message.author}</span>
                                                <p className="msg">{message.message}</p>
                                            </div>
                                        </div>
                                    )
                                    :
                                    (
                                        <div key={(orderId++)} className="d-flex align-items-center text-right justify-content-end">
                                            <div className="pr-2 pl-1 m-lg-2">
                                                <span className="name">{message.author}</span>
                                                <p className="msg">{message.message}</p>
                                            </div>
                                            <img src="https://img.icons8.com/color/40/000000/guest-male.png" width="30" className="img1 m-lg-2" alt="" />
                                        </div>
                                    )
                    ))
                }
            </div>
            {/* Widget Section */}
            <div className="widgetBox py-3">
                {/* Widget Button, hidden after pressed */}
                <div className={ `${ classStyle ? 'widgetShow':'widgetHide'}`}>
                    <button onClick={ () => handleWidget() } type="button" className="btn btn-outline-secondary">Widgets</button>
                </div>
                {/* Widget Content, showed when the button is pressed */}
                <div className={ `${ classStyle ? 'widgetHide':'widgetShow'}` }>
                    <div className="modal-header border-bottom-0 px-0">
                        <button  onClick={() => handleView()} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                    </div>
                    <Widget socket={socket} command={commands} messageListener={messageListener} handleView={handleView}/>
                </div>
            </div>

            {/* Input box section */}
            <TextBox socket={socket} messageListener={messageListener}/>
        </React.Fragment>
    );
}

export default Messages;