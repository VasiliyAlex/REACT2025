import React from 'react';
import { CardList } from './components/CardList';
import { Search } from './components/Search';
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

  handleSearch = (query: string) => {
    this.setState({ query });
  };

  render() {
    return (
      <div className="flex flex-col min-h-screen">
        <Search onSearch={this.handleSearch} />
        <CardList search={this.state.query} />
      </div>
    );
  }
}
