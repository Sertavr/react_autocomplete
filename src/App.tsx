import React, { useRef, useState } from 'react';
import './App.scss';
import { peopleFromServer } from './data/people';
import { Dropdown } from './components/Dropdown/Dropdown';
import { Notification } from './components/Notification/Notification';
import { Title } from './components/Title/Title';
import { Person } from './types/Person';

const DELAY = 300;

export const App = () => {
  const [query, setQuery] = useState('');
  const [people, setPeople] = useState(peopleFromServer);
  const [select, setSelect] = useState<Person | null>(null);
  const timerId = useRef(0);

  const filteredPeople = (value: string) =>
    setPeople(() => {
      const normalizeQuery = value.toLowerCase();

      return peopleFromServer.filter(person =>
        person.name.toLowerCase().includes(normalizeQuery),
      );
    });

  const handleSelectPerson = (person: Person) => {
    setSelect(person);
    setQuery(person.name);
  };

  const saveQuery = (delay = 300) => {
    clearTimeout(timerId.current);

    timerId.current = window.setTimeout(() => {
      filteredPeople(query);
    }, delay);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    delay?: number,
  ) => {
    setSelect(null);
    setQuery(event.target.value);
    saveQuery(delay);
  };

  return (
    <div className="container">
      <main className="section is-flex is-flex-direction-column">
        <Title user={select} />
        <Dropdown
          users={people}
          handleChange={handleChange}
          query={query}
          handleSelectPerson={handleSelectPerson}
          delay={DELAY}
        />

        {people.length === 0 && <Notification />}
      </main>
    </div>
  );
};
