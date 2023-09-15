import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const EditBook = ({ books, setBooks }: { books: any[], setBooks: (book: any) => void }) => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');

  useEffect(() => {
    books.map(({ ID, title: bookTitle, author: bookAuthor }) => {
      if (ID == id) {
        setTitle(bookTitle);
        setAuthor(bookAuthor);
      }
    });
  }, [ books ]);

  const updateBook = ({ title, author }: { title: string; author: string; }) => {
    fetch(`${import.meta.env.VITE_PORT}/update`, {
      method: 'PUT',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'access-control-allow-origin, access-control-allow-headers',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Title: title,
        Author: author
      })
    });
  };

  const editBook = async () => {
    updateBook({ title, author });
    setBooks(books.map(book => {
      if (book.ID == id) return { ...book, title, author };
      return book;
    }));
    navigate('/');
  };

  return (
    <div>
      {title}
      <input value={author} onChange={e => setAuthor(e.target.value)} />
      <button onClick={() => editBook()}>
        Edit
      </button>
      <Link to='/'>
        <button>Cancel</button>
      </Link>
    </div>
  );
};

export default EditBook;
