import { io } from "socket.io-client";

const socketInit = async () => {
  const options = {
    forceNew: true,
    transports: ["websocket"],
    timeout: 10000,
  };

  return io(process.env.REACT_APP_SERVER_URI as string, options);
};

export default socketInit;
