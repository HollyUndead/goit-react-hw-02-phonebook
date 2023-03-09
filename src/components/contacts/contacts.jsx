import { Component } from "react";
import { ContactItem } from "./contact";
import { nanoid } from "nanoid";
import { FormCreateContact } from "components/form/form";
import { Filter } from "components/filter/filter";
import './contacts.css'

export class ContactsList extends Component{
    state = {
        contacts: [],
        filter: '',
        name: '',
        number: ''
    }

    setNewContact = ({name, number}) => {
        let newState = {...this.state}
        const names = this.state.contacts.map((el) =>{
            return el.name.toLowerCase()
        })
        if(names.includes(name.toLowerCase())){
            alert(`${name} is already in contacts`)
        }
        else{newState.name = name
        newState.number = number
        newState.contacts.push({name, number, key: nanoid()})
        this.setState({...newState})}
    }

    deleteFromState = (key) => {
        let newState = {...this.state}
        newState.contacts = newState.contacts.filter((el) => {
            if(el.key !== key){
                return el
            }
        })
        this.setState({...newState})
    }

    setFilter = (filter) => {
        let newState = {...this.state}
        newState.filter = filter
        this.setState({...newState})
    }

    render(){
        return(
            <div
            style={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                // alignItems: 'center',
                fontSize: 40,
                color: '#010101'
            }}
            >
                <h1>Phonebook</h1>
                <FormCreateContact setNewState={this.setNewContact}/>
                <h2>Contacts</h2>
                <Filter setFilter={this.setFilter}/>
                <ul>
                    {this.state.contacts.map((el) => {
                        const reg = new RegExp(this.state.filter.toLowerCase())
                        const name = el.name.toLowerCase()
                        if(reg.test(name)){
                            return(
                                <ContactItem state={el} key={el.key} deleteFromState={this.deleteFromState} />
                            )
                        }
                    })}
                </ul>
            </div>
        )
    }
}