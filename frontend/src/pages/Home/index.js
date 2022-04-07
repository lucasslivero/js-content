import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import {
  Card,
  Container,
  Header,
  ListHeader,
  InputSearchContainer,
} from './styles';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import Loader from '../../components/Loader';
import ContactsService from '../../services/ContactsService';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const contactsFiltered = useMemo(() => contacts.filter(
    (contact) => contact.name.toLowerCase().includes(search.toLowerCase()),
  ), [contacts, search]);

  useEffect(async () => {
    setIsLoading(true);
    try {
      const data = await ContactsService.listContacts(orderBy);
      setContacts(data);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  }, [orderBy]);

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }

  function handleSearchChange(event) {
    setSearch(event.target.value);
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />

      <InputSearchContainer>
        <input
          type="search"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search contact"
        />
      </InputSearchContainer>
      <Header>
        <strong>
          {`${contactsFiltered.length} ${contactsFiltered.length === 1 ? 'Contact' : 'Contacts'}`}
        </strong>
        <Link to="/new">New Contact</Link>
      </Header>

      <ListHeader orderBy={orderBy}>
        <button
          type="button"
          className="sort-button"
          onClick={handleToggleOrderBy}
        >
          <span>Name</span>
          <img src={arrow} alt="order direction" />
        </button>
      </ListHeader>

      {contactsFiltered.map((contact) => (
        <Card key={contact.id}>
          <div className="info">
            <div className="contact-name">
              <strong>{contact.name}</strong>
              {contact.category_name && <small>{contact.category_name}</small>}
            </div>
            <span>{contact.email}</span>
            <span>{contact.phone}</span>
          </div>

          <div className="actions">
            <Link to={`/edit/${contact.id}`}>
              <img src={edit} alt="Button to edit contact" />
            </Link>
            <button type="button">
              <img src={trash} alt="Button to delete contact" />
            </button>
          </div>
        </Card>
      ))}
    </Container>
  );
}
