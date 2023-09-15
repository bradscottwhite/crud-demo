import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Book from './pages/Book';
import EditBook from './pages/EditBook';

const App = () => {
  const [books, setBooks] = useState<any[]>([]);

  const getBooks = async () => {
    const res = await fetch(`${import.meta.env.VITE_PORT}/allbooks`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'access-control-allow-origin, access-control-allow-headers'
      },
    });

    const content = await res.json()
    return content;
  };

  useEffect(() => {
    (async () => {
      setBooks(await getBooks());
    })();
  }, []);


  return (
    <div className='App'>
      <BrowserRouter>
        <main>
          <Routes>
            <Route path='/' element={<Home books={books} setBooks={setBooks} />} />
            <Route path='/book/:id' element={<Book books={books} setBooks={setBooks} />} />
            <Route path='/editBook/:id' element={<EditBook books={books} setBooks={setBooks} />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
};

export default App;
