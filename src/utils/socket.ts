import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null; // This will hold our single socket instance

const socketInit = () => {
  // If there's no socket instance, or the socket is not connected, create a new one
  if (!socket || !socket.connected) {
    const options = {
      forceNew: true,
      transports: ['websocket'],
      timeout: 10000,
    };

    socket = io(process.env.NEXT_PUBLIC_SERVER_URI as string, options);
  }

  // Return the existing or newly created socket
  return socket;
};

export default socketInit;
