import React from 'react';

// the input box section
const TextBox = ({socket, messageListener}) => {

    // handle the event in case of press enter
    const handleMessage = e => {
        if(e.key === 'Enter') {
            onSendMessage();
        }
    }

    // input reference
    const textInput = React.createRef();

    // emit the content of the input in both sides
    const onSendMessage = () => {
        const message = {author: 'Client', message: textInput.current.value};
        textInput.current.value = '';

        // server
        socket.emit('message', message);
        // local screen
        messageListener(message);
    }

    return (
            <React.Fragment>
                <nav className="navbar bg-white navbar-expand-sm d-flex justify-content-between">
                    <div className="d-flex justify-content-between align-items-center textBox w-100">
                        <input ref={ textInput } onKeyPress={(e) => handleMessage(e)} type="text" name="text" className="form-control w-100 me-1" placeholder="Type a message..." />
                        <i className="fas fa-paper-plane iconBtn icons-chat" onClick={() => onSendMessage() } />
                    </div>
                </nav>
            </React.Fragment>
    );
};

export default TextBox;