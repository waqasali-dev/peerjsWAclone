import React from "react";
import "./chatapp.css";
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SendIcon from '@mui/icons-material/Send';

const Chatapp: React.FC = () => {
    return (
        <div className="Chatapp-container">
            <div className="chatapp-content">
                <div className="chatapp-header">
                    <PersonIcon style={{ fontSize: 40, color: '#000000ff' }} />
                    <PersonAddIcon style={{ fontSize: 40, color: '#000000ff', marginLeft: 45 }} />
                </div>
                <div className="chatapp-messages">
                    <div className="chatapp-message">
                        <div className="sent-message">
                            Hello! How are you?
                        </div>
                        <div className="received-message">
                            I'm good, thanks! How about you?
                        </div>
                    </div>
                </div>
                <div className="chatapp-input">
                    <div className="input-container">
                        <textarea className="mesgInput" placeholder="Type a message..." />
                        <SendIcon style={{ fontSize: 50, color: '#000000ff', marginLeft: 10, cursor: 'pointer' }} />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Chatapp;