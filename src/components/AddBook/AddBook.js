import React from 'react'
import { useHistory } from 'react-router-dom'
import './style.scss'
const AddBook = () => {
  const history = useHistory()
  const handleAddBook = () => history.push('/form')
  return (
    <div>
      <button className="add-btn" onClick={handleAddBook}>Add Book</button>
    </div>
  )
}

export default AddBook
