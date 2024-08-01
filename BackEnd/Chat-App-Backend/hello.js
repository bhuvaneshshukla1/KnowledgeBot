const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const morgan = require('morgan');
const ChatModel = require('./ChatModel');
const AWS = require('aws-sdk')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');

AWS.config.update({
    accessKeyId: 'AKIAVRUVWLUUOIXJRY6O',
    secretAccessKey: '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',
    region: 'us-east-1'
});

const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'welcomebot-users';
const historyTable = 'history-db';

async function fetchHistory(userId) {
    const params = {
        TableName: historyTable,
        KeyConditionExpression: 'id = :userId',
        ExpressionAttributeValues: {
            ':userId': userId
        }
    };

    try {
        const data = await dynamodb.query(params).promise();
        return data.Items;
    } catch (error) {
        console.error('Error fetching history:', error);
        throw new Error('Could not fetch history');
    }
}

const app = express();

const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

let history = {};

async function saveHistory(userId, history) {
    const timestamp = new Date().toISOString();
    const params = {
        TableName: historyTable,
        Item: {
            id: userId,
            timestamp: timestamp,
            messages: history.messages
        }
    };

    try {
        await dynamodb.put(params).promise();
    } catch (error) {
        console.error('Error saving history:', error);
        throw new Error('Could not save history');
    }
}

// Sign Up
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Check if user already exists
        const params = {
            TableName: userTable,
            Key: {
                id: username
            }
        };
        const user = await dynamodb.get(params).promise();
        if (user.Item) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Store user in DynamoDB
        const putParams = {
            TableName: userTable,
            Item: {
                id: username,
                password: hashedPassword
            }
        };
        await dynamodb.put(putParams).promise();

        const payload = { user: { id: username } };
        jwt.sign(payload, 'yourSecretKey', { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(username);
    console.log(password);
    try {
        // Get user from DynamoDB
        const params = {
            TableName: userTable,
            Key: {
                id: username
            }
        };
        const user = await dynamodb.get(params).promise();
        if (!user.Item) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.Item.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials: No match' });
        }

        const userHistory = await fetchHistory(username);
        console.log(userHistory);
        history = { id: username, messages: userHistory.length===0 ? [] : userHistory[0].messages};

        const payload = { user: { id: username } };
        jwt.sign(payload, 'yourSecretKey', { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// logout
app.post('/logout', async (req, res) => {
    const { username } = req.body;
    try {
        await saveHistory(username, history);
        history = {}
        res.json({ msg: 'Logged out and history saved' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// REST API endpoints
app.get('/messages', (req, res) => {
    res.json(history);
});

// WebSocket event handling
io.on('connection', (socket) => {
    //console.log('A user connected');



    socket.on('message', async (msg) => {
        console.log(`Received WebSocket message: ${msg}`);
        //send query to lambda function which will perform the following tasks:-
        //1. generate embeddings for the query - done
        //2. send embedded query to vectorDB for finding similar context - done
        //3. retrieve context from vectorDB - done
        //4. combine query + history + context and send to LLM - done
        //5. gather response back from LLM as queryResponse - done

        const response = await axios.post("http://localhost:8081/query", {query: msg, history: history})
                .catch((err) => {
                    console.log("error occured while generating response");
                    io.emit('message',"error occured while generating response");
                });
        const reply = response.data.response || "No response generated by LLM";

        history.messages.push(new ChatModel(msg, reply));
        io.emit('message', reply);  // Broadcast the message to all clients
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
