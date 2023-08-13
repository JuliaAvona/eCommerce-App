import React from "react";
import {Nav, Navbar, NavbarBrand} from "react-bootstrap";
import NavbarToggle from "react-bootstrap/NavbarToggle";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import {Pages} from "../../types/enums";

export function Navigation () {
    return (
        <Navbar collapseOnSelect expand="lg" variant="dark" bg="dark">
            <NavbarBrand className='m-1' href={Pages.main}> Eco </NavbarBrand>
            <NavbarToggle aria-controls="responsive-navbar-nav"/>
            <NavbarCollapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href={Pages.main}>Home</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href={Pages.signup} className='m-2'>SignUp</Nav.Link>
                    <Nav.Link href={Pages.login} className='m-2'>Login</Nav.Link>
                </Nav>
            </NavbarCollapse>
        </Navbar>
    )
}