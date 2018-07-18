import React from 'react';
import PropTypes from 'prop-types';
import GuestInputForm from './GuestInputForm'


const Header = props => 
  <header>
    <h1>RSVP</h1>
    <p>An RSVP App to end ALL RSVP Apps</p>
    <GuestInputForm 
      handleNameInput={props.handleNameInput} 
      newGuestSubmitHandler={props.newGuestSubmitHandler} 
      pendingGuest={props.pendingGuest}
      />
  </header>

Header.propTypes = {
    handleNameInput: PropTypes.func.isRequired,
    newGuestSubmitHandler: PropTypes.func.isRequired,
    pendingGuest: PropTypes.string.isRequired,
} 

export default Header