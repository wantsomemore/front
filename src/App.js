import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Form from './components/Form/Form'
import Dashboard from './components/Dashboard/Dashboard'
import EditForm from './components/EditForm/EditForm'
import { BookContext } from './BookContext'
import api from './api/books'
const App = () => {

  const [books, setBooks] = useState([]);

  const getData = async () => {
    const response = await api.get('/books');
    const data = await response.data;
    setBooks(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Router>
    <Switch>
    <BookContext.Provider value={[books, setBooks]}>
     <Route exact path='/' component={Dashboard} />
     <Route path='/form' component={Form} />
     <Route path='/edit/:id' component={EditForm} />
    </BookContext.Provider>
    </Switch>
    </Router>
  )
}

export default App

