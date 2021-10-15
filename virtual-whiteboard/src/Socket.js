import {io} from "socket.io-client";
import React from "react";

const SOCKET_URL = "http://jonathanhertz.dk:3002"
export const socket = io(SOCKET_URL);
export const SocketContext = React.createContext();