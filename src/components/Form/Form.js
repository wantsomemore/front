import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Input, NativeSelect } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { BookContext } from "../../BookContext";
import api from "../../api/books";
import "./style.scss";

const useStyles = makeStyles({
  input: {
    padding: "6px 10px",
    fontSize: "18px",
    lineHeight: "20px",
    fontWeight: 500,
    outline: "none",
    border: "2px solid #323232",
    borderRadius: "8px",
    marginBottom: "20px",
  },
});

const Form = () => {
  const [books, setBooks] = useContext(BookContext);
  const classes = useStyles();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [isbn, setIsbn] = useState("");

  const handleCategory = (event) => setCategory(event.target.value);
  const handleAuthor = (event) => setAuthor(event.target.value);
  const handleTitle = (event) => setTitle(event.target.value);
  const handleIsbn = (event) => setIsbn(event.target.value);

  const idGenerator = () => "_" + Math.random().toString(36).substr(2, 11);

  const handleAddBook = async (event) => {
    event.preventDefault();

    const newBook = {
      id: idGenerator(),
      title,
      author,
      category,
      isbn,
    };
    console.log(newBook);
    const response = await api.post("/books", newBook);
    setBooks(...books, response.data);

    setTitle("");
    setAuthor("");
    setCategory("");
    setIsbn("");
  };

  return (
    <div className="form-container">
      <Link to="/">
        <button className="back-btn">Back to Dashboard</button>
      </Link>
      <form onSubmit={handleAddBook} className="form">
        <h1 className="form-title">Add book</h1>
        <Input
          className={classes.input}
          type="text"
          placeholder="Book"
          value={title}
          onChange={handleTitle}
          autoFocus
          disableUnderline
          required
        />
        <Input
          className={classes.input}
          type="text"
          placeholder="Author"
          value={author}
          onChange={handleAuthor}
          disableUnderline
          required
        />
        <NativeSelect
          className="select"
          onChange={handleCategory}
          placeholder="Category"
          disableUnderline
          required
        >
          <option value="" disabled selected>
            Category
          </option>
          <option value="Horror">Horror</option>
          <option value="Non-Fiction">Non-fiction</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Biography">Biography</option>
          <option value="Comedy">Comedy</option>
          <option value="Poems">Poems</option>
        </NativeSelect>
        <Input
          className={classes.input}
          type="number"
          placeholder="ISBN"
          value={isbn}
          onChange={handleIsbn}
          disableUnderline
          required
        />
        <button className="submit-btn" type="submit">
          Add book
        </button>
      </form>
    </div>
  );
};

export default Form;
