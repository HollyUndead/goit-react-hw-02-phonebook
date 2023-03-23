/* eslint-disable array-callback-return */
import { Component } from 'react';
import { ContactItem } from './contactItem';
import { nanoid } from 'nanoid';
import { FormCreateContact } from 'components/form/form';
import { Filter } from 'components/filter/filter';
import './contacts.css';

export class ContactsList extends Component {
  state = {
    contacts: [],
    filter: '',
    name: '',
    number: '',
  };

  transformNumber = (number) => {
    let numberArr = number.split('');
    return `${numberArr.slice(0, 3).join('')}-${numberArr
      .slice(3, 5)
      .join('')}-${numberArr.slice(5, 7).join('')}`;
  };

  setNewContact = ({ name, number, ev }) => {
    let newState = { ...this.state };
    const names = this.state.contacts.map(el => {
      return el.name.toLowerCase();
    });
    const numbers = this.state.contacts.map(el =>{
      return Number(el.number)
    })
    if (names.includes(name.toLowerCase())) {
      alert(`${name} is already in contacts`);
      return
    } else if(numbers.includes(Number(number))){
      alert(`${this.transformNumber(number)} is already in contacts`)
      return
    } else {
      newState.name = name;
      newState.number = number;
      newState.contacts.push({ name, number, key: nanoid() });
      this.setState({ ...newState });
    }
    ev.target.reset();
  };

  deleteFromState = key => {
    let newState = { ...this.state };
    newState.contacts = newState.contacts.filter(el => {
      if (el.key !== key) {
        return el;
      }
    });
    this.setState({ ...newState });
  };

  setFilter = filter => {
    let newState = { ...this.state };
    newState.filter = filter;
    this.setState({ ...newState });
  };

  render() {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          // alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <h1>Phonebook</h1>
        <FormCreateContact setNewState={this.setNewContact} />
        <h2>Contacts</h2>
        <Filter setFilter={this.setFilter} />
        <ul>
          {this.state.contacts.map(el => {
            const reg = new RegExp(this.state.filter.toLowerCase());
            const name = el.name.toLowerCase();
            if (reg.test(name)) {
              return (
                <ContactItem
                  state={el}
                  key={el.key}
                  deleteFromState={this.deleteFromState}
                  transformNumber={this.transformNumber}
                />
              );
            }
          })}
        </ul>
      </div>
    );
  }
}
