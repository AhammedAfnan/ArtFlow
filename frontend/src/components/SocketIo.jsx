import socketIOClient from 'socket.io-client';
import BASE_URL from '../config/api';

const socket = socketIOClient(BASE_URL); // Replace with your server URL

export default socket;