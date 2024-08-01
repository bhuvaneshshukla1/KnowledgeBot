import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {io} from 'socket.io-client';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import './App.css';
import Header from "./Components/Header.jsx";
import {useLocation, useNavigate} from "react-router-dom"; // Import your CSS file


const Chat = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const username = location.state?.username;
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const bottomRef = useRef(null);
    const socket = useRef(null);

    useEffect(() => {
        // Fetch initial messages from the server
        if(!socket.current) {
            socket.current = io('http://localhost:5000');

        }
        const fetchMessages = async () => {
            try {
                const response = await axios.get('http://localhost:5000/messages');
                // Flatten the messages to separate user and server messages
                const flattenedMessages = response.data.messages.flatMap(msg => ([
                    { text: msg.queryText, from: 'user' },
                    { text: msg.queryResponse, from: 'server' }
                ]));
                setMessages(flattenedMessages);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();

        // Listen for new messages from the server via WebSocket
        socket.current.on('message', (msg) => {
            setMessages(prevMessages => [...prevMessages, { text: msg, from: 'server' }]);
        });

        // Log connection status
        socket.current.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        socket.current.on('disconnect', () => {
            console.log('Disconnected from WebSocket server');
        });

        // Clean up the socket connection on component unmount
        return () => {
            socket.current.off('message');
            socket.current.off('connect');
            socket.current.off('disconnect');
        };
    }, []); // Dependency array ensures this effect runs only once

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = () => {
        // Send message via WebSocket
        console.log("Sending message:", message);
        socket.current.emit('message', message);
        console.log("Message sent");
        setMessages(prevMessages => [...prevMessages, { text: message, from: 'user' }]); // Append the sent message to the chat head
        setMessage('');
    };

    return (
        <div>
        <Header username={username} />
        <Container fluid className="d-flex flex-column vh-100 p-0">
            <Row className="flex-grow-1 overflow-auto">
                <Col md={{ span: 8, offset: 2 }} className="d-flex flex-column">
                    <div className="flex-grow-1 w-100 d-flex flex-column">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`message-box ${msg.from === 'user' ? 'message-right' : 'message-left'}`}
                            >
                                {msg.text}
                            </div>
                        ))}
                        <div ref={bottomRef} />
                    </div>
                </Col>
            </Row>
            <Row className="w-100 fixed-bottom bg-white py-3">
                <Col md={{ span: 8, offset: 2 }}>
                    <Form className="d-flex prompt-input">
                                <Form.Control
                                    type="text"
                                    placeholder="Type a message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleSendMessage();
                                        }
                                    }}
                            className="flex-grow-1"
                                />
                        <Button variant="primary" onClick={handleSendMessage} className="ml-2 ">Send</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
            </div>
    );
};

export default Chat;
