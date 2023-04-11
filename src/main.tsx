import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Route } from 'wouter';
import CrewList from './pages/CrewList';
import CrewDetail from './pages/CrewDetails';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Route path="/" component={App} />
    <Route path="/crews" component={CrewList} />
    <Route path="/crew/:id" component={CrewDetail} />
  </React.StrictMode>
);
