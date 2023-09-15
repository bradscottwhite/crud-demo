import { useState } from 'react';

const AddBook = ({ books, setBooks }: { books: any[], setBooks: (book: any) => void }) => {
  const [newTitle, setNewTitle] = useState<string>('');
  const [newAuthor, setNewAuthor] = useState<string>('');

  const createBook = async ({ title, author }: { title: string; author: string; }): Promise<any> => {
    const res = await fetch(`${import.meta.env.VITE_PORT}/addbook`, {
      method: 'POST',
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

    return await res.json();
  };

  const addBook = async () => {
    let data = await createBook({ title: newTitle, author: newAuthor });
    setBooks([ ...books, await data ]);
    setNewTitle('');
    setNewAuthor('');
  };

  return (
    <div>
      <input value={newTitle} onChange={e => setNewTitle(e.target.value)} />
      <input value={newAuthor} onChange={e => setNewAuthor(e.target.value)} />
      <button onClick={addBook}>
        Add Book
      </button>
    </div>
  );
};

export default AddBook;
