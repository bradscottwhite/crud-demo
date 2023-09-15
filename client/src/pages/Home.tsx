import Books from '../components/Books';
import AddBook from '../components/AddBook';

const Home = ({ books, setBooks }: { books: any[], setBooks: (book: any) => void }) => {
  return (
    <main>
      <Books books={books} setBooks={setBooks} />

      <AddBook books={books} setBooks={setBooks} />
    </main>
  );
};

export default Home;
