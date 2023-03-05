import React, {useState, useEffect} from 'react';
import './App.css';

function App() {

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [contactList, setContactList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/read")
      .then(response => response.json())
      .then(data => {
        setContactList(data);
      })
      .catch(error => console.error(error));
  }, []);
  

  const addToList = () => {
    fetch('http://localhost:8000/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, phone, email })
    })
      .then(response => response.json())
      .then(data => {
        setContactList([...contactList, data]);
      })
      .catch(error => console.error(error));
  };

  return (
    <div className='App'>
   <h1>Contact List App</h1>

   <label>Name</label>
   <input type='text'placeholder='Name' onChange={(event) => setName(event.target.value)}/>
    <label>Phone</label>
   <input type='text'placeholder='Phone' onChange={(event) => setPhone(event.target.value)}/>
    <label>Email</label>
    <input type='text'placeholder='Email' onChange={(event) => setEmail(event.target.value)}/>
    <button onClick={addToList}>Add</button>

    <h1>Contacts</h1>
    {contactList.map((val, key) => {
      return <div key={key}>
        <h3>{val.name}</h3>
        <h3>{val.phone}</h3>
        <h3>{val.email}</h3>
    </div>
    })}
    </div>
  );
}

export default App;
