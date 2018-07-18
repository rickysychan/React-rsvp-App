import React, { Component } from 'react';
import './App.css';

import MainContent from './MainContent';
import Header from './Header'

class App extends Component {

  state = {
    isFiltered: false,
    pendingGuest: "",
    guests: [],
    nextId: 0
  };

  toggleGuestPropertyAt = (property, idToChange) =>
    this.setState({
      guests: this.state.guests.map( guest  => {
        if (guest.id === idToChange) {
          return {
            ...guest,
            [property]: !guest[property]
          };
        }
        return guest;
      })
    });

  toggleConfirmationAt = id =>
    this.toggleGuestPropertyAt("isConfirmed", id);

  removeGuestAt = id => {
    this.setState({
      guests: this.state.guests.filter(guest => id !== guest.id)
    })
  }

  toggleEditingAt = id =>
    this.toggleGuestPropertyAt("isEditing", id)

  setNameAt = (name, idToChange) =>
    this.setState({
      guests: this.state.guests.map( guest => {
        if (guest.id === idToChange) {
          return {
            ...guest,
            name
          };
        }
        return guest;
      })
    });

  toggleFilter = () =>
    this.setState({ isFiltered: !this.state.isFiltered });

  handleNameInput = e =>
    this.setState({ pendingGuest: e.target.value });

  newGuestSubmitHandler = e => {

    e.preventDefault();
    
    this.setState({
      nextId: this.state.nextId + 1,
      guests: [
        {
          name: this.state.pendingGuest,
          isConfirmed: false,
          isEditing: false,
          id: this.state.nextId
        },
        ...this.state.guests
      ],
      pendingGuest: ''
    });
  }

  getTotalInvited = () => this.state.guests.length;

  getAttendingGuests = () =>
    this.state.guests.reduce(
      (total, guest) => guest.isConfirmed ? total + 1 : total,
      0
    );

  render() {
    const totalInvited = this.getTotalInvited();
    const numberAttending = this.getAttendingGuests();
    const numberUnconfirmed = totalInvited - numberAttending;

    return (
      <div className="App">
        <Header 
          newGuestSubmitHandler={this.newGuestSubmitHandler} 
          handleNameInput={this.handleNameInput} 
          pendingGuest={this.state.pendingGuest}
          />
        <MainContent 
              toggleFilter={this.toggleFilter}
              totalInvited={totalInvited}
              numberAttending={numberAttending}
              numberUnconfirmed={numberUnconfirmed}
              guests={this.state.guests}
              toggleConfirmationAt={this.toggleConfirmationAt}
              toggleEditingAt={this.toggleEditingAt}
              setNameAt={this.setNameAt}
              isFiltered={this.state.isFiltered}
              removeGuestAt={this.removeGuestAt}
              pendingGuest={this.state.pendingGuest}
        />
      </div>
    );
  }
}

export default App;
