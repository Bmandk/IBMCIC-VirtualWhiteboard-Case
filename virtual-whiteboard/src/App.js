import { Whiteboard } from './Whiteboard';
import './App.css';
import { socket, SocketContext } from './Socket';

function App() {
    return (
        <SocketContext.Provider value={socket}>
            <Whiteboard></Whiteboard>
        </SocketContext.Provider>
    );
}

export default App;
