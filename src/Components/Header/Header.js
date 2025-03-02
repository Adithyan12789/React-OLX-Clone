import React, {useContext} from 'react';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../store/Contexts';
import { useNavigate } from 'react-router-dom';

function Header() {

  const {user} = useContext(AuthContext);
  const navigate = useNavigate();
  const {firebase} = useContext(FirebaseContext);

  const handleLogout = () => {
    firebase.auth().signOut()
      .then(() => {
        navigate('/');
      });
  };

  const handleSell = () => {
    navigate(user ? '/create' : '/');
  }

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo />
        </div>
        <div className="placeSearch">
          <Search />
          <input type="text" />
          <Arrow />
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car, mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff" />
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow />
        </div>
        <div className="loginPage" onClick={() => navigate(user ? '/' : '/login')}>
          <span>
            {user ? `Welcome ${user.displayName}` : 'Login'}
          </span>
          <hr />
        </div>

        {user && <span onClick={handleLogout}>Logout</span>}

        <div className="sellMenu">
          <SellButton />
          <div className="sellMenuContent">
            <SellButtonPlus />
            <span onClick={handleSell}>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
