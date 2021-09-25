import React from "react";
import ListDays from "../tools/listDays";

// The Date widget
function GetDate ({socket, data, messageListener, close}) {
    const days = ListDays(data);

    // take the day pressed and emit a message first to he local screen and then to the server
    const onChooseDay = (day) => {
        // close the widget
        close();

        // emit the message in both parts
        const message = {author: 'Client', message: "I have chosen: " + day };
        socket.emit('message', message);
        messageListener(message);
    }

    return (
        <React.Fragment>
                <h5 className="m-3 text-center">Please choose a day</h5>
                <div className="d-flex justify-content-start flex-wrap m-3" >
                    {days.map(day =>
                        <button key={day} onClick={() => onChooseDay(day)} type="button" className="btn btn-outline-secondary m-1">
                            {day}
                        </button>
                    )}
                </div>
        </React.Fragment>
    );
}

export default GetDate;