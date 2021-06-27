import React, { useState, useContext } from 'react'
import { Input, NativeSelect} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import api from '../../api/books'
import { BookContext } from '../../BookContext'

const useStyles = makeStyles({
  input: {
    padding: '6px 10px',
    fontSize: '18px',
    lineHeight: '20px',
    fontWeight: 500,
    outline: 'none',
    border: '2px solid #323232',
    borderRadius: '8px',
    marginBottom: '20px'
  },
  select: {
    fontSize: '18px',
    width: '240px',
    padding: '6px 10px',
    lineHeight: '20px',
    fontWeight: 500,
    outline: 'none',
    border: '2px solid #323232',
    borderRadius: '8px',
    marginBottom: '20px'
  }
})
const EditForm = ({location}) => {

  let history = useHistory()
  const [books, setBooks] = useContext(BookContext)
  const classes = useStyles()

  const [title, setTitle] = useState(location.state.title)
  const [author, setAuthor] = useState(location.state.author)
  const [category, setCategory] = useState(location.state.category)
  const [isbn, setIsbn] = useState(location.state.isbn)
  const [id, setId] = useState(location.state.id)

  const handleCategory = (event) => setCategory(event.target.value)
  const handleTitle = (event) => setTitle(event.target.value)
  const handleAuthor = (event) => setAuthor(event.target.value)
  const handleIsbn = (event) => setIsbn(event.target.value)
 
  const handleUpdateBook = async (event) => {
    event.preventDefault();
    const editedBook = {
      id,
      title,
      author,
      category,
      isbn
    }
    const response = await api.put(`/books/${id}`, editedBook)

    setBooks(books.map(book => {
      return book.id === id ? {...response.data} : book;
    }))
    history.push('/')
  }

  return (
    <form onSubmit={handleUpdateBook} className="form">
    <h1 className="form-title">Edit book</h1>
    <Input className={classes.input} type="text" placeholder="Book" value={title} onChange={handleTitle}  required autoFocus/>
    <Input className={classes.input} type="text" placeholder="Author" value={author}  onChange={handleAuthor} required/>
    <NativeSelect defaultValue={category} className="select" onChange={handleCategory} placeholder="Category" required  variant="standard">
      <option value="Horror">Horror</option>
      <option value="Non-Fiction">Non-fiction</option>
      <option value="Fantasy">Fantasy</option>
      <option value="Biography">Biography</option>
      <option value="Comedy">Comedy</option>
      <option value="Poems">Poems</option>
    </NativeSelect>
    <Input className={classes.input} type="text" placeholder="ISBN" value={isbn}  onChange={handleIsbn} required/>
    <button className="submit-btn" type="submit">Update</button>
  </form>
  )
}

export default EditForm
