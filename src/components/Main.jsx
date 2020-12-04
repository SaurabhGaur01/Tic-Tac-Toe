import React from 'react';
import AppProvider from './AppProvider';
import Header from './Header/Header';
import Content from './Content/Content';
import './Main.scss';

const App = () => (
  <AppProvider>
    <div className="app">
      <Header />
      <Content />
    </div>
  </AppProvider>
);

export default App;