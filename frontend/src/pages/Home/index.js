import { Link } from 'react-router-dom';
import {
  Card, Container, Header, ListContainer, InputSearchContainer,
} from './styles';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import Modal from '../../components/Modal';

export default function Home() {
  return (
    <Container>
      <Modal danger />
      <InputSearchContainer>
        <input type="search" placeholder="Search contact" />
      </InputSearchContainer>
      <Header>
        <strong>3 Contacts</strong>
        <Link to="/new">New Contact</Link>
      </Header>
      <ListContainer>
        <header>
          <button type="button" className="sort-button">
            <span>Name</span>
            <img src={arrow} alt="order direction" />
          </button>
        </header>

        <Card>
          <div className="info">
            <div className="contact-name">
              <strong>Lucas Silvestre</strong>
              <small>instagram</small>
            </div>
            <span>lucasilvestre1@gmail.com</span>
            <span>(92) 98105-1027</span>
          </div>

          <div className="actions">
            <Link to="/edit/123">
              <img src={edit} alt="Button to edit contact" />
            </Link>
            <button type="button">
              <img src={trash} alt="Button to delete contact" />
            </button>
          </div>
        </Card>
      </ListContainer>
    </Container>
  );
}
