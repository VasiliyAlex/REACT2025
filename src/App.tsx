import React from 'react';
import { CardList } from './components/CardList';
import './App.css';

interface State {
  query: string;
  triggerError: boolean;
}

export class App extends React.Component<Record<string, never>, State> {
  state: State = {
    query: localStorage.getItem('searchQuery') || '',
    triggerError: false,
  };

  render() {
    return (
      <div className="flex flex-col min-h-screen">
        <CardList search={this.state.query} />
      </div>
    );
  }
}
