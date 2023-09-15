import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const Book = ({ books, setBooks }: { books: any[], setBooks: (book: any) => void }) => {
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

  const delBook = () => {
    fetch(`${import.meta.env.VITE_PORT}/delete`, {
      method: 'DELETE',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'access-control-allow-origin, access-control-allow-headers',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Title: title
      })
    });

    setBooks(books.filter(data => data.ID != id));

    navigate('/');
  };

  return (
    <div>
      <h2>{title}</h2>
      <p>{author}</p>
      <Link to={`/editBook/${id}`}>
        <button>
          Edit
        </button>
      </Link>
      <button onClick={delBook}>
        Delete
      </button>
    </div>
  );
};

export default Book;
