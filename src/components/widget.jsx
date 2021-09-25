import React from "react";
import GetDate from "./widgets/date";
import Map from "./widgets/map";
import Rate from "./widgets/rate";
import Complete from "./widgets/complete";

// The widget section
function Widget ({socket, command, messageListener, handleView}) {
    // depending on the injection from parent Messages component, it shows the content
    // because the commands comes in random order, it compares the command to see what it should show
    const handleContent = () => {
        if( command ) {
                    return (
                        <div className="modal-content rounded-4">
                            { [...Object.values(command)][1].type === "date" && <GetDate socket={socket} data={[...Object.values(command)][1].data} messageListener={messageListener} close={handleView}/> }
                            { [...Object.values(command)][1].type === "map" && <Map command={[...Object.values(command)][1].data} /> }
                            { [...Object.values(command)][1].type === "rate" && <Rate socket={socket} messageListener={messageListener} close={handleView} /> }
                            { [...Object.values(command)][1].type === "complete" && <Complete socket={socket} messageListener={messageListener} close={handleView}  /> }
                        </div>
                    );
        } else {
          return ( <h2 className="fw-bold mb-0">No command supplied</h2> );
        }
    }

    return handleContent();
}

export default Widget;