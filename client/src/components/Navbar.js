import React, { useState , useEffect} from "react";
import '../styles/Styles.css'
import { GiHamburgerMenu } from "react-icons/gi";
import { TiDeleteOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import logo from './wingrow-logo.webp'

const Navbar = () => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showCustomerBoard, setshowCustomerBoard] = useState(false);
  const [showFarmersBoard, setshowFarmersBoard] = useState(false);
  const [CurrentUser, setCurrentUser] = useState(undefined);

  const handleLogout = () => {
    alert("logged out successfully")
    setShowMediaIcons(false);
    AuthService.logout();
    setCurrentUser(undefined)
    setshowFarmersBoard(false)
    setshowCustomerBoard(false)
    setShowAdminBoard(false)
  }
      
  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      if(user.role === "admin"){
        setShowAdminBoard(true);
      }
      else if(user.role === "farmer"){
        setshowFarmersBoard(true)
      }else{
        setshowCustomerBoard(true)
      }
    }
  }, []);

  return (
    <>
      <nav className="main-nav">
        {/* 1st logo part  */}
        <div className="logo">
          <img alt="logo" className="logo_img_navbar" src={logo}/>
        </div>

        {/* 2nd menu part  */}
        <div
          className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }>
          <ul>

            <li className="medialinks">
              <Link onClick={()=>{setShowMediaIcons(false)}} to="/">
                <div className="profile_wrapper">
                <img className="profile_logo" src="https://i.pinimg.com/originals/0c/02/ce/0c02ce4850d6b88d44f87271ff5f4a71.png" alt="logo"/>
                <p>Home</p>
                </div>
              </Link>
            </li>

            {showCustomerBoard && 
              <li className="medialinks">
              <Link onClick={()=>{setShowMediaIcons(false)}} to="/customers">
              <div className="profile_wrapper">
                <img className="profile_logo" src="https://cdn0.iconfinder.com/data/icons/shopping-at-store/237/mobile-purchase-payment-search-006-512.png" alt="logo"/>
                <p>Customers</p>
                </div>
              </Link>
            </li>
            }
            {showFarmersBoard &&
              <li className="medialinks">
              <Link onClick={()=>{setShowMediaIcons(false)}} to="/farmers">
                <div className="profile_wrapper">
                <img className="profile_logo" src="https://www.freeiconspng.com/thumbs/market-icons/market-icon-18.png" alt="logo"/>
                <p>Book My Stall</p>
                </div>
              </Link>
            </li>
            }

            {showAdminBoard &&
              <li className="medialinks">
              <Link onClick={()=>{setShowMediaIcons(false)}} to="/admin">
                <div className="profile_wrapper">
                  <img className="profile_logo" src="https://www.nicepng.com/png/detail/263-2635962_png-file-svg-admin-icon-png.png" alt="logo"/>
                  <p>Admin</p>
                  </div>
              </Link>
            </li>
            }

            {CurrentUser?
            <>
              <li className="medialinks">
              <Link onClick={handleLogout} to="/login">
              <div className="profile_wrapper">
                <img className="profile_logo" src="http://cdn.onlinewebfonts.com/svg/img_476656.png" alt="logo"/>
                <p>Logout</p>
                </div>
              </Link>
              </li>
              <li className="medialinks">
              <Link onClick={()=>{setShowMediaIcons(false)}} to="/profile">
                <div className="profile_wrapper">
                <img className="profile_logo" src="https://cdn-icons-png.flaticon.com/512/47/47774.png" alt="logo"/>
                <span>{CurrentUser.firstname}</span>
                </div>
              </Link>
              </li>
            </> : 
            <>
              <li className="medialinks">
                <Link onClick={()=>{setShowMediaIcons(false)}} to="/login">
                  <div className="profile_wrapper">
                    <img className="profile_logo" src="https://cdn-icons-png.flaticon.com/512/2609/2609282.png" alt="logo"/>
                    <span>Login</span>
                  </div>
                </Link>
              </li>

              <li className="medialinks">
                <Link onClick={()=>{setShowMediaIcons(false)}} to="/register">
                  <div className="profile_wrapper">
                      <img className="profile_logo" src="https://cdn-icons-png.flaticon.com/512/2910/2910756.png" alt="logo"/>
                      <span>Register</span>
                    </div>
                </Link>
              </li>
            </>
            }
          </ul>
        </div>

        <div className="social-media">
          <div className="hamburger-menu">
            <span onClick={() => setShowMediaIcons(!showMediaIcons)}>
              {showMediaIcons?<TiDeleteOutline />:<GiHamburgerMenu />}
            </span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;