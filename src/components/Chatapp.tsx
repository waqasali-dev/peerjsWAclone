import React, { useState, useEffect } from "react";
import "./chatapp.css";
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SendIcon from '@mui/icons-material/Send';
import { v4 as uuidv4 } from 'uuid';
import Peer, { DataConnection } from "peerjs";

const Chatapp: React.FC = () => {

    const [uniqueId, setUniqueId] = useState<string>("");
    const [idViewed, setIdViewed] = useState<boolean>(false);
    const [addperson, setAddperson] = useState<boolean>(false);
    const [peer, setPeer] = useState<Peer | null>(null);
    const [connection, setConnection] = useState<DataConnection | null>(null);
    const [messages, setMessages] = useState<Array<{ text: string, isOwn: boolean }>>([]);
    const [inputMessage, setInputMessage] = useState<string>("");
    const [connectedTo, setConnectedTo] = useState<string>("");
    const [contactId, setContactId] = useState<string>("");

    useEffect(() => {
        const savedID = localStorage.getItem('uniqueId');
        if (savedID) {
            setUniqueId(savedID);
        } else {
            const newID = uuidv4();
            setUniqueId(newID);
            localStorage.setItem('uniqueId', newID);
        }
    }, []);

    useEffect(() => {

        const newPeer = new Peer(uniqueId);

        newPeer.on('open', (id) => {
            console.log('My peer ID is: ' + id);
            setPeer(newPeer);
        });

        newPeer.on('connection', (conn) => {
            conn.on('open', () => {
                console.log('Connection established with: ' + conn.peer);
                setConnectedTo(conn.peer);
                setConnection(conn);

                conn.on('data', (data) => {
                    console.log('Received', data);
                    setMessages(prevMessages => [...prevMessages, { text: data as string, isOwn: false }]);
                });
            });
        });

        return () => {
            newPeer.destroy();
        }
    }, [uniqueId]);

    const connectToPeer = (peerId: string) => {
        if (peer && peerId) {
            const conn = peer.connect(peerId);
            conn.on('open', () => {
                console.log('Connection established with: ' + peerId);
                setConnectedTo(peerId);
                setConnection(conn);
            });

            conn.on('data', (data) => {
                console.log('Received', data);
                setMessages(prevMessages => [...prevMessages, { text: data as string, isOwn: false }]);
            });

            setConnection(conn);
        }
    };

    const sendMessage = () => {
        if (connection && inputMessage.trim() !== "") {
            connection.send(inputMessage);
            setMessages(prevMessages => [...prevMessages, { text: inputMessage, isOwn: true }]);
            setInputMessage("");
        }
    };

    return (
        <div className="Chatapp-container">
            <div className="chatapp-content">
                <div className="chatapp-header">
                    <PersonIcon
                        onClick={() => setIdViewed(!idViewed)}
                        style={{ fontSize: 40, color: '#000000ff' }}
                    />
                    <PersonAddIcon
                        onClick={() => setAddperson(!addperson)}
                        style={{ fontSize: 40, color: '#000000ff', marginLeft: 45 }}
                    />
                    {connectedTo && (
                        <span style={{ color: 'white', marginLeft: '20px' }}>
                            Connected to: {connectedTo}
                        </span>
                    )}
                </div>
                <div className="chatapp-messages">
                    <div className="chatapp-message">

                        {messages.map((msg, index) => (
                            <div key={index} className={msg.isOwn ? "sent-message" : "received-message"}>
                                {msg.text}
                            </div>
                        ))}

                    </div>
                </div>
                <div className="chatapp-input">
                    <div className="input-container">
                        <textarea
                            className="mesgInput"
                            placeholder="Type a message..."
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                        />
                        <SendIcon
                            onClick={sendMessage}
                            style={{ fontSize: 50, color: '#000000ff', marginLeft: 10, cursor: 'pointer' }}
                        />
                    </div>
                </div>

            </div>
            <div className="overlay" onClick={() => setIdViewed(!idViewed)} style={{ visibility: idViewed ? 'visible' : 'hidden' }}>
                <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
                    <h2>Welcome to ChatApp!</h2>
                    <p>Your unique ID is:</p>
                    <p className="unique-id">{uniqueId}</p>
                    <p>Share this ID with others to start chatting.</p>
                </div>
            </div>
            <div className="overlay" onClick={() => setAddperson(!addperson)} style={{ visibility: addperson ? 'visible' : 'hidden' }}>
                <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
                    <h2>Add a New Contact</h2>
                    <input
                        type="text"
                        placeholder="Enter contact ID"
                        className="contact-input"
                        onChange={(e) => setContactId(e.target.value)}
                    />
                    <button
                        className="add-contact-button"
                        onClick={() => {
                            connectToPeer(contactId)
                            setAddperson(false);
                        }}
                    >
                        Add Contact
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Chatapp;