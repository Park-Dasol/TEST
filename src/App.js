import logo from './logo.svg';
import { useMemo } from 'react';
import './App.css';
import ChatRoom from './components/ChatRoom';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <ChatRoom/>
        
      </header>
    </div>
  );
}

export default App;
