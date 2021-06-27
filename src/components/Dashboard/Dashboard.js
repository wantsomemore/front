import React, { useContext } from "react";
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddBook from '../AddBook/AddBook'
import DeleteBook from '../DeleteBook/DeleteBook'
import { BookContext } from "../../BookContext";
import "./style.scss";

import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  tableHead: {
    background: '#d17f13'
  },
  columnHeader: {
    fontSize: '26px',
    lineHeight: '30px',
    fontWeight: 700,
    color: '#eeeeee'
  },
  rowCell: {
    fontSize: '18px',
    lineHeight: '20px',
    fontWeight: 500,
    color: '#323232'
    }
});

const Dashboard = () => {

  const [books, setBooks] = useContext(BookContext)
  const classes = useStyles();
 
  return (
    <>
    <header className="header-container">
      <div className="title">
        Book App
      </div>
      <AddBook />
    </header>
    <TableContainer>
      <Table className={classes.table}>
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell className={classes.columnHeader}>Title</TableCell>
            <TableCell className={classes.columnHeader}>Author</TableCell>
            <TableCell className={classes.columnHeader}>Category</TableCell>
            <TableCell className={classes.columnHeader}>ISBN</TableCell>
            <TableCell className={classes.columnHeader}>Edit</TableCell>
            <TableCell className={classes.columnHeader}>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map(book => (
            <TableRow key={book.id}>
              <TableCell className={classes.rowCell}>{book.title}</TableCell>
              <TableCell className={classes.rowCell}>{book.author}</TableCell>
              <TableCell className={classes.rowCell}>{book.category}</TableCell>
              <TableCell className={classes.rowCell}>{book.isbn}</TableCell>
              <TableCell className={classes.rowCell}>
              <Link 
                to={{pathname: `edit/${book.id}`, 
                state: {id: book.id, title: book.title, author: book.author, category: book.category, isbn: book.isbn} }}>
                <EditIcon/>
              </Link>
              </TableCell>
              <TableCell className={classes.rowCell}><DeleteBook id={book.id} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default Dashboard;
