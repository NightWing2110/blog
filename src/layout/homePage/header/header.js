import React, { Component } from "react";
import "./header.css";
import Logo from "../../../images/logo.png";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  Collapse,
  NavbarToggler,
  DropdownToggle,
  Button,
  Col,
  Row,
} from "reactstrap";
import { Form, FormControl } from "react-bootstrap";
import { connect } from "react-redux";
import firebase from "../../../Config/firebase";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      type: "administrator",
    };
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  static getDerivedStateFromProps(nextProps) {
    if (!nextProps.auth.isEmpty) {
      firebase
        .auth()
        .currentUser.getIdTokenResult()
        .then((clain) => {});
    }
    return null;
  }

  render() {
    return (
      <Row>
        <Navbar className="navbar" expand="md" dark fixed="top">
          <Col md="3" className="logo-section">
            <NavbarBrand className="full" href="/blog/">
              <img className="logo" src={Logo} alt="logo"></img>
            </NavbarBrand>
          </Col>

          <NavbarToggler onClick={this.toggle} />
          <Col md="9" className="head_right">
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem className="navItem">
                  <NavLink className="navLink" href="/blog/">
                    Trang chủ
                  </NavLink>
                </NavItem>
                <NavItem className="navItem">
                  <NavLink className="navLink" href="/blog/about">
                    Blog
                  </NavLink>
                </NavItem>
                <NavItem className="navItem">
                  <NavLink className="navLink" href="/blog/contact">
                    Liên hệ 
                  </NavLink>
                </NavItem>
              </Nav>

              <UncontrolledDropdown>
                <DropdownToggle nav>
                  <h5 className="user">
                    {this.props.auth.isEmpty ? "" : this.props.auth.displayName}
                    <i className="fas fa-user"></i>
                  </h5>
                </DropdownToggle>
                <DropdownMenu right>
                  {this.props.auth.isEmpty ? (
                    <DropdownItem>
                      <NavLink className="new_post" href="/blog/login">
                        Đăng nhập
                      </NavLink>
                    </DropdownItem>
                  ) : (
                    <DropdownItem>
                      <NavLink
                        onClick={() => firebase.auth().signOut()}
                        className="new_post"
                      >
                        Đăng xuất
                      </NavLink>
                    </DropdownItem>
                  )}
                  {this.props.auth.uid === "hyggTR6K5thQqR457BRnRgGbaDo1" || this.props.auth.uid === "ZuLPiPTMY5aTcKYNdN8RPTxudy63" ? (
                    <DropdownItem>
                      <NavLink className="new_post" href="/blog/new-article">
                        Thêm bài viết
                      </NavLink>
                    </DropdownItem>
                  ) : (
                    ""
                  )}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Collapse>
          </Col>
        </Navbar>
      </Row>
    );
  }
}

const enhance = connect(({ firebase: { auth, profile } }) => ({
  auth,
  profile,
}));
export default enhance(Header);
