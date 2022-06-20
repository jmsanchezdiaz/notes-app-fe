import { FormEvent, useEffect, useState } from 'react';
import { api } from './api';
import { useForm } from './hooks/useForm';
import { INote, INoteValues } from './types';

function App() {
  const [notes, setNotes] = useState<INote[]>([]);
  const { fvalues, body, author, handleInput, resetForm } = useForm({
    body: '',
    author: ''
  });

  useEffect(() => {
    api
      .getAll()
      .then((res) => setNotes(res))
      .catch((err) => console.error(err));
  }, []);

  const createNote = (values: INoteValues) => {
    if (!values.body) return;
    api.create(values).then((res) => setNotes([...notes, res]));
  };

  const updateNote = (id: string, values: INoteValues) => {
    if (Object.values(values).every((e) => !e) || !id) return;

    api
      .update(id, values)
      .then((res) =>
        setNotes(notes.map((note) => (note._id === id ? res : note)))
      );
  };

  const deleteNote = (id: string) => {
    if (!id) return;
    api.delete(id).then(() => setNotes(notes.filter(({ _id }) => _id !== id)));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createNote(fvalues);
    resetForm();
  };

  return (
    <div className='p-3 d-flex'>
      <section className='w-30'>
        <h1>Note's App</h1>
        <form onSubmit={handleSubmit} className='form'>
          <div className='mb-3'>
            <label className='form-label' htmlFor='body'>
              Body:
            </label>
            <input
              className='form-control'
              type='text'
              name='body'
              value={body}
              onChange={handleInput}
              id='body'
              placeholder='note body...'
            />
          </div>
          <div className='mb-3'>
            <label className='form-label' htmlFor='author'>
              Author:
            </label>
            <input
              className='form-control'
              type='text'
              name='author'
              id='author'
              value={author}
              onChange={handleInput}
              placeholder='note author...'
            />
          </div>

          <button className='m-auto d-block w-75 btn btn-success' type='submit'>
            Create
          </button>
        </form>
      </section>
      <section>
        <ul>
          {notes?.map((note) => (
            <li
              className='my-2 d-flex gap-2 border-bottom border-gray align-items-center justify-content-between'
              key={note._id}>
              <blockquote>
                <span
                  className={
                    note.isActive ? '' : 'text-decoration-line-through'
                  }>
                  {note.body}
                </span>
                <cite className='d-block'>{note.author}</cite>
              </blockquote>
              <div className='d-flex gap-2'>
                <button
                  onClick={() => deleteNote(note._id)}
                  className='btn btn-danger'>
                  Delete
                </button>
                <button
                  onClick={() => updateNote(note._id, fvalues)}
                  className='btn btn-primary'>
                  Update
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
