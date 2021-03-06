import * as React from 'react';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import Person from 'material-ui/svg-icons/social/person';
import Menu from 'material-ui/svg-icons/navigation/menu';
import Logout from 'material-ui/svg-icons/navigation/subdirectory-arrow-left';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Input from '@material-ui/icons/Input';
import { RouteComponentProps } from 'react-router-dom';
import { ILoggedUser } from '@typings/state/loggedUser';
import { ICart } from '@typings/state/cart';
import { modal } from '@typings/modal';
import LoginModal from '../LoginModal';
import RegisterModal from '../RegisterModal';
import '@styles/Header.css';

interface Props extends RouteComponentProps {
  loggedUser: ILoggedUser;
  cart: ICart;
  getUser: () => void;
}

const styles = {
  menuBtn: {
    color: '#fff'
  },
  iconMenuBtn: {
    color: '#00BCD4',
    minWidth: '168px',
    textAlign: 'left'
  }
}

class Header extends React.Component<Props> {
  state = {
    activeModal: null
  }

  setActiveModal = (modal: modal) => {
    this.setState({ activeModal: modal });
  }

  componentDidMount() {
    this.props.getUser();
  }

  render() {
    const {
      history,
      loggedUser
    } = this.props;

    return (
      <div className="header">
        <div className="title">
          <div className="logo" onClick={() => history.push('/')}>
            <svg id="Layer_1" enable-background="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><g><path d="m448.8 94.267h-385.6c-8.284 0-15-6.716-15-15 0-43.686 35.526-79.267 79.25-79.267h257.083c43.779 0 79.267 35.414 79.267 79.267 0 8.284-6.716 15-15 15z" fill="#3c3a42"/><path d="m384.533 0h-128.533v94.267h192.8c8.284 0 15-6.716 15-15 0-43.853-35.488-79.267-79.267-79.267z" fill="#23232d"/><path d="m448.8 447.733h-385.6c-8.284 0-15-6.716-15-15v-192.8c0-8.284 6.716-15 15-15h385.6c8.284 0 15 6.716 15 15v192.8c0 8.285-6.716 15-15 15z" fill="#555055"/><path d="m463.8 432.733v-192.8c0-8.284-6.716-15-15-15h-192.8v222.8h192.8c8.284 0 15-6.715 15-15z" fill="#3c3a42"/><path d="m144.6 512h-81.4c-8.284 0-15-6.716-15-15v-79.267h96.4c8.284 0 15 6.716 15 15v64.267c0 8.284-6.716 15-15 15z" fill="#3c3a42"/><path d="m448.8 512h-81.4c-8.284 0-15-6.716-15-15v-64.267c0-8.284 6.716-15 15-15h96.4v79.267c0 8.284-6.716 15-15 15z" fill="#23232d"/><path d="m149.758 79.267c0-8.284-6.716-15-15-15h-71.558c-5.682 0-10.876 3.21-13.416 8.292l-48.2 96.4c-2.325 4.649-2.077 10.172.656 14.594s7.562 7.114 12.76 7.114h119.758c8.284 0 15-6.716 15-15z" fill="#ff405c"/><path d="m362.242 79.267c0-8.284 6.716-15 15-15h71.558c5.682 0 10.876 3.21 13.416 8.292l48.2 96.4c2.325 4.649 2.077 10.172-.656 14.594s-7.562 7.114-12.76 7.114h-119.758c-8.284 0-15-6.716-15-15z" fill="#d01273"/><path d="m352.4 309.2h-192.8c-8.284 0-15 6.716-15 15v187.8h222.8v-187.8c0-8.284-6.715-15-15-15z" fill="#e6e6e6"/><path d="m367.4 324.2c0-8.284-6.716-15-15-15h-96.4v202.8h111.4z" fill="#d7d7d7"/><path d="m307.2 64.267h-102.4c-8.284 0-15 6.716-15 15v81.4c0 8.284 6.716 15 15 15h102.4c8.284 0 15-6.716 15-15v-81.4c0-8.285-6.716-15-15-15z" fill="#ff405c"/><path d="m256 175.667h51.2c8.284 0 15-6.716 15-15v-81.4c0-8.284-6.716-15-15-15h-51.2z" fill="#d01273"/><path d="m310.557 190.667-14.143-126.4h80.828l42.428 126.4z" fill="#d7d7d7"/><path d="m201.443 190.667 14.143-126.4h-80.828l-42.428 126.4z" fill="#e6e6e6"/><path d="m102.4 160.667h-87.4c-8.284 0-15 6.716-15 15v64.267c0 8.284 6.716 15 15 15h87.4c8.284 0 15-6.716 15-15v-64.267c0-8.285-6.716-15-15-15z" fill="#ff7d47"/><path d="m409.6 160.667h87.4c8.284 0 15 6.716 15 15v64.267c0 8.284-6.716 15-15 15h-87.4c-8.284 0-15-6.716-15-15v-64.267c0-8.285 6.716-15 15-15z" fill="#ff405c"/><path d="m307.2 160.667h-102.4c-8.284 0-15 6.716-15 15v64.267c0 8.284 6.716 15 15 15h102.4c8.284 0 15-6.716 15-15v-64.267c0-8.285-6.716-15-15-15z" fill="#ff7d47"/><path d="m256 254.933h51.2c8.284 0 15-6.716 15-15v-64.267c0-8.284-6.716-15-15-15h-51.2z" fill="#ff405c"/><path d="m102.4 160.667h102.4v94.267h-102.4z" fill="#f5f5f5"/><path d="m307.2 160.667h102.4v94.267h-102.4z" fill="#e6e6e6"/></g></svg>
          </div>
          <div className="title-left">

          {
            loggedUser ?
              <div>
                <div className="menu">
                  <FlatButton
                    style={styles.menuBtn}
                    label="ACCOUNT"
                    icon={<Person />}
                    containerElement={<Link to="/account" />}
                  />
                  <FlatButton
                    style={styles.menuBtn}
                    label="CART"
                    icon={<ShoppingCart />}
                    containerElement={<Link to="/cart" />}
                  />
                  <FlatButton
                    style={styles.menuBtn}
                    label="LOGOUT"
                    icon={<Logout />}
                    containerElement={<a href="/auth/logout"/>}
                  />
                </div>
                <div className="icon-menu">
                  <IconMenu
                    iconButtonElement={<IconButton><Menu /></IconButton>}
                    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                    iconStyle={{ color: '#fff' }}
                  >
                    <FlatButton
                      label="ACCOUNT"
                      icon={<Person />}
                      containerElement={<Link to="/account" />}
                    /><br />
                    <FlatButton
                      label="CART"
                      icon={<ShoppingCart />}
                      containerElement={<Link to="/cart" />}
                    /><br />
                    <FlatButton
                      label="LOGOUT"
                      icon={<Logout />}
                      containerElement={<a href="/auth/logout" />}
                    />
                  </IconMenu>
                </div>
              </div> :
              <FlatButton
                label="LOGIN"
                labelPosition="before"
                icon={<Input/>}
                onClick={() => this.setActiveModal('login')}
              />
            }
          </div>

          </div>
        
        <LoginModal
          isOpen={this.state.activeModal === 'login'}
          onRequestClose={() => this.setActiveModal(null)}
          setActiveModal={this.setActiveModal}
        />
        <RegisterModal
          isOpen={this.state.activeModal === 'register'}
          onRequestClose={() => this.setActiveModal('register')}
          setActiveModal={this.setActiveModal}
        />
      </div>
    )
  }
};

export default Header;
