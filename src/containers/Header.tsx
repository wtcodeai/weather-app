import  { FC } from "react";

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import { CustomToggle } from "../components/CustomToggle";
import { CustomDropdown } from "../components/CustomDropdown";
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getCurrentGeolocation } from '../store/slice';
import { clear } from '../components/GeolocationSelect/slice';

export const Header: FC = () => {
  const dispatch = useAppDispatch()
  const geo = useAppSelector(getCurrentGeolocation)

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand 
          href="#home"
        >
          Weather App (Test Case)
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <span>Ваш город: </span>
          <Dropdown className="ms-2">
            <Dropdown.Toggle 
              as={CustomToggle} 
              style={{ textDecorationStyle: 'dotted'}}
              id="dropdown-custom-components"
              onSuccessfullyClicked={() => dispatch(clear())}
            >
              {geo.name}
            </Dropdown.Toggle>

            <Dropdown.Menu as={CustomDropdown} />
          </Dropdown>
        </Navbar.Collapse>
      </Container>
 
    </Navbar>
  )
}