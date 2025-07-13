import React from 'react';
import { CardList } from './components/CardList';
import { Search } from './components/Search';
import { ErrorButton } from './components/ErrorButton';
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
    if (this.state.triggerError) {
      throw new Error('Test error');
    }
    return (
      <div className="flex flex-col min-h-screen">
        <Search onSearch={this.handleSearch} />
        <CardList search={this.state.query} />
        <ErrorButton onClick={() => this.setState({ triggerError: true })} />
      </div>
    );
  }
}
