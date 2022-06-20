import { INote, INoteValues } from './types';

export const api = {
  getAll: async (): Promise<INote[]> => {
    const response = await fetch(
      'https://myrestapiwithmongo.herokuapp.com/api/notes',
      {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    const data = await response.json();
    return data;
  },
  create: async (noteValues: INoteValues) => {
    const response = await fetch(
      'https://myrestapiwithmongo.herokuapp.com/api/notes',
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(noteValues)
      }
    );
    const data = await response.json();
    return data;
  },
  update: async (id: string, noteValues: INoteValues) => {
    const response = await fetch(
      'https://myrestapiwithmongo.herokuapp.com/api/notes/' + id,
      {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(noteValues)
      }
    );
    const data = await response.json();
    return data;
  },
  getNote: async (id: string) => {
    const response = await fetch(
      'https://myrestapiwithmongo.herokuapp.com/api/notes/' + id
    );
    const data = await response.json();
    return data;
  },
  delete: async (id: string) => {
    const response = await fetch(
      'https://myrestapiwithmongo.herokuapp.com/api/notes/' + id,
      {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      }
    );
    const data = await response.json();
    return data;
  }
};
