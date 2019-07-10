import React from 'react';
import HeaderWithSideMenu from './pageComponents/HeaderWithSideMenu';
import './App.css';

function App() {
  return (
    <div className="App">
      <HeaderWithSideMenu appName="Employee App" drawerItems={['Nothing to see here']}/>
    </div>
  );
}

export default App;
