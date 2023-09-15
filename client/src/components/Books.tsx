import { Link } from 'react-router-dom';

const Books = ({ books, setBooks }: { books: any[], setBooks: (book: any) => void }) => {
  return books.map(({ ID, title, author }) => (
    <Link to={`/book/${ID}`} key={title}>
      <div>
        <h2>{title}</h2>
        <p>{author}</p>
      </div>
    </Link>
  ));
};

export default Books;
