import React, {Component} from 'react';
import PhonebookForm from './PhonebookForm/PhonebookForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import Container from './Container/Container';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const { v4: uuidv4 } = require('uuid');



class App extends Component {
     
    state = {
        contacts: [],
        filter: ''
    };
    
  

    componentDidMount(){
       const savedContacts = localStorage.getItem('contact')
       const parsedContact = JSON.parse(savedContacts)
       
       if( parsedContact ){
           this.setState({contacts: parsedContact})
        }
    }

   

    componentDidUpdate(prevProps, prevState){
        if ( this.state.contacts !== prevState.contacts )
           { localStorage.setItem('contact', JSON.stringify(this.state.contacts))}
        }
 


    handlerFormSubmit = (data) => {
        const user = {
           id: uuidv4(),
           name: data.name,
           number: data.number
        }
        
        const sameNameArr = this.findName(this.state.contacts, data)
        
        if(sameNameArr.length > 0){
            toast.error('This contact is already exists')
            return
        }
        
        this.setState((prevState) => ({
            contacts:[...prevState.contacts, user]
        }));
    };
    

    findName (arr, user){
        return arr.filter(el=> el.name === user.name)
    };
    

    handleFilter = (e) => {
        this.setState({
            filter: e.currentTarget.value
        })
    };
    

    filterContact = () => {
        const normalizedFilter = this.state.filter.toLowerCase()
        return this.state.contacts.filter(el =>el.name.toLowerCase().includes(normalizedFilter))
    };
    

    handleDeliteContact = (id) => {
        this.setState((prevState) =>({
            contacts: prevState.contacts.filter(el => el.id !== id)
        }))
    };
    
    
    
    render () {
        const filterContact = this.filterContact();
        return  <Container>
        <h1>Phonebook</h1>
        <PhonebookForm onSubmit ={this.handlerFormSubmit}/>
        
        {this.state.contacts.length > 0? 
          <>
              <h2 >Contacts</h2>
              <Filter value ={this.state.filter} onChange ={this.handleFilter}/>
              <ContactList arr ={filterContact} onDel ={this.handleDeliteContact}/>
              
          </> : '' }
          <ToastContainer closeOnClick autoClose ={3000}/>
          </Container>
        }
}


export default App;