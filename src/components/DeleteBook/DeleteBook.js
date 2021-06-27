import React, { useContext } from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import { BookContext } from '../../BookContext';
import api from '../../api/books'

const useStyles = makeStyles({
  deleteButton: {
    cursor: 'pointer',
    width: '35px',
    height: '35px'
  }
})
const DeleteBook = ({id}) => {

const classes = useStyles();
const [books, setBooks] = useContext(BookContext)

  
  const handleDeleteBook =  async (id) => {
    await api.delete(`/books/${id}`)
    const filteredBooks = books.filter((book) => {
      return book.id !== id
    })
    setBooks(filteredBooks)
  }

  return (
    <>
      <DeleteIcon className={classes.deleteButton} onClick={() => handleDeleteBook(id)} />
    </>
  )
}

export default DeleteBook
