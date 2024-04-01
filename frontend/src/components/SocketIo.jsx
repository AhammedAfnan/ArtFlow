import socketIOClient ,{ io } from 'socket.io-client';
import BASE_URL from '../config/api';

const socket = io('http://localhost:5000'); // Replace with your server URL

export default socket;