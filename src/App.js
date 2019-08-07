import React, { Component } from 'react';
import contacts from './data/contacts.json';
import './App.css';

class App extends Component {
  state = {
    myContacts: contacts.splice(0,5),
    contacts,
  }
  
  handleNewRandomContact = () => {
    const {contacts, myContacts} = this.state;
   
    const randomIndex = Math.round(Math.random() * contacts.length -1);
    const newContact = contacts[randomIndex];
    
    const newMyContacts = [...myContacts];
    newMyContacts.push(newContact);
    this.setState({
      myContacts: newMyContacts,
    })
  }

  handleSortByPopularity = () => {
    const {myContacts} = this.state;
    const newMyContacts = [...myContacts];
    newMyContacts.sort((a,b) => {
      return b.popularity - a.popularity
    });
    this.setState({
      myContacts: newMyContacts
    })
  }

  handleSortByName = () => {
    const {myContacts} = this.state;
    const newMyContacts = [...myContacts];
    
    newMyContacts.sort((a,b) => {
        if(a.name < b.name) { 
        return -1; 
      }
      if(a.name > b.name) { 
        return 1; 
      }
      return 0;
    })
    
    this.setState({
      myContacts: newMyContacts
    })
  }


  handleDeleteContact = (index) => {
    const {myContacts} = this.state;
    const newMyContacts = [...myContacts];
    
    newMyContacts.splice(index,1);
    this.setState({
      myContacts: newMyContacts
    })
  }

  render() {
    return (
      <div className="App">
        <h1>IronContacts</h1>
        <button onClick={this.handleNewRandomContact}>Add Random Contact</button>
        <button onClick={this.handleSortByPopularity}>Sort by popularity</button>
        <button onClick={this.handleSortByName}>Sort by name</button>
          <table>
            <thead>
              <tr>
                <th>Picture</th>
                <th>Name</th>
                <th>Popularity</th>
              </tr>
            </thead>
            <tbody>
              
                {
                  this.state.myContacts.map((contact, index) => {
                    return (
                      <tr key={index}>
                        <td><img src={contact.pictureUrl} alt={contact.name} /></td>
                        <td><p>{contact.name}</p></td>
                        <td><p>{contact.popularity}</p></td>
                        <td><button onClick={() => {this.handleDeleteContact(index)}}>Delete</button></td>
                      </tr>
                    )
                  })
                }
            </tbody>
          </table>
      </div>
    );
  }
}

export default App;
