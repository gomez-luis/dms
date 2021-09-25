import React from "react";

// the user choose if exit or not
// the functionality of leave is not activated for demo proposes
function Complete ({socket, messageListener, close}) {

    // process user election
    const onChose = (chose) => {
        // close the widget
        close();

        // create and send a message to the chat
        let answer = chose === 'Yes' ? 'I want to close the chat' : 'I decided to stay in the chat';
        const message = { author: 'Client', message: answer };
        //emit the messages for both sides
        socket.emit('message', message);
        messageListener(message);
    }

    return (
        <React.Fragment>
            <div className="modal-body p-4 text-center">
                <h5 className="mb-0">Really do you wanna close the chat?</h5>
            </div>
            <div className="modal-footer flex-nowrap p-0">
                <button onClick={() => onChose('Yes')} type="button" className="btn btn-lg btn-link fs-6 text-decoration-none col-6 m-0 rounded-0 border-right"><strong>Yes</strong></button>
                <button onClick={() => onChose('No')} type="button" className="btn btn-lg btn-link fs-6 text-decoration-none col-6 m-0 rounded-0" data-bs-dismiss="modal">No</button>
            </div>
        </React.Fragment>
    );
}

export default Complete;