import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import {
  Card,
  Container,
  Header,
  ListHeader,
  InputSearchContainer,
  ErrorContainer,
  EmptyListContainer,
  SearchNotFoundContainer,
} from './styles';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import Loader from '../../components/Loader';
import ContactsService from '../../services/ContactsService';
import sad from '../../assets/images/sad.svg';
import emptyBox from '../../assets/images/empty-box.svg';
import magnifierQuestion from '../../assets/images/magnifier-question.svg';
import Button from '../../components/Button';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const contactsFiltered = useMemo(
    () => contacts.filter((contact) => contact.name.toLowerCase().includes(search.toLowerCase())),
    [contacts, search],
  );

  async function loadContacts() {
    setIsLoading(true);
    try {
      const data = await ContactsService.listContacts(orderBy);
      setContacts(data);
      setHasError(false);
    } catch (error) {
      setHasError(true);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    loadContacts();
  }, [orderBy]);

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }

  function handleSearchChange(event) {
    setSearch(event.target.value);
  }

  function handleTryAgain() {
    loadContacts();
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />
      {(!hasError && contacts.length > 0) && (
        <InputSearchContainer>
          <input
            type="search"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search contact"
          />
        </InputSearchContainer>
      )}
      <Header justifyContent={
        // eslint-disable-next-line no-nested-ternary
        hasError
          ? 'flex-end'
          : (
            contacts.length > 0
              ? 'space-between'
              : 'center'
          )
      }
      >
        {!hasError && contacts.length > 0 && (
          <strong>
            {contactsFiltered.length}
            {contactsFiltered.length === 1 ? ' Contact' : ' Contacts'}
          </strong>
        )}
        <Link to="/new">New Contact</Link>
      </Header>

      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="" />
          <div className="details">
            <strong>There was an error getting your contacts</strong>
            <Button onClick={handleTryAgain}>Try Again</Button>
          </div>
        </ErrorContainer>
      )}

      {!hasError && (
        <>

          {
            (contacts.length === 0 && !isLoading) && (
              <EmptyListContainer>
                <img src={emptyBox} alt="emptyBox" />
                <p>
                  You don`t have any contact inserted !
                  Click in the button <strong>"New Contact" </strong>
                  ahead to insert your first contact
                </p>
              </EmptyListContainer>
            )
          }

          {
            (contacts.length > 0 && contactsFiltered.length < 1) && (
              <SearchNotFoundContainer>
                <img src={magnifierQuestion} alt="Not Found Search Icon" />
                <span>Any results found for "{search}"</span>
              </SearchNotFoundContainer>
            )
          }

          {contactsFiltered.length > 0 && (
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
          )}

          {contactsFiltered.map((contact) => (
            <Card key={contact.id}>
              <div className="info">
                <div className="contact-name">
                  <strong>{contact.name}</strong>
                  {contact.category_name && (
                    <small>{contact.category_name}</small>
                  )}
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
        </>
      )}
    </Container>
  );
}
