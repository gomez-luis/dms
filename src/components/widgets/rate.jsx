import React from "react";

// emit the message  in the screen about the rate depending on the user election
function Rate ({socket, messageListener, close}) {

    const onRate = (rate) => {
        close();
        let message;
        switch (rate){
            case 1:
                 message = {author: 'Client', message: "Sorry, my experience has been bad :(" };
                break;
            case 2:
                message = {author: 'Client', message: "I'm not really happy with the experience..." };
                break;
            case 3:
                message = {author: 'Client', message: "It was ok, you can work to be better!" };
                break;
            case 4:
                message = {author: 'Client', message: "You are good!" };
                break;
            case 5:
                message = {author: 'Client', message: "You are super! :)" };
                break;
            default:
                break;
        }
        socket.emit('message', message);
        messageListener(message);
    }

    return (
            <React.Fragment>

                    <h5 className="m-3 text-center">Please rate your experience</h5>
                    <div className="d-flex justify-content-around align-items-center p-3">
                        <div>
                            <i onClick={ () => onRate(1) } className="fas fa-star icons-chat iconBtn"/>
                            <p className="m-0">Bad!</p>
                        </div>
                        <div>
                            <i onClick={ () => onRate(2) } className="fas fa-star icons-chat iconBtn"/>
                            <p className="m-0">Regular</p>
                        </div>
                        <div>
                            <i onClick={ () => onRate(3) } className="fas fa-star icons-chat iconBtn"/>
                            <p className="m-0">Normal</p>
                        </div>
                        <div>
                            <i onClick={ () => onRate(4) } className="fas fa-star icons-chat iconBtn"/>
                            <p className="m-0">Good</p>
                        </div>
                        <div>
                            <i onClick={ () => onRate(5) } className="fas fa-star icons-chat iconBtn"/>
                            <p className="m-0">Super!</p>
                        </div>
                    </div>
            </React.Fragment>
    );
}

export default Rate;