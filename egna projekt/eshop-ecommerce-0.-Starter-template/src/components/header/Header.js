import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";

const logo = (
  <div className={styles.logo}>
    <Link to={"/"}>
      <h2>
        e<span>Shop</span>.
      </h2>
    </Link>
  </div>
);

const cart = (
  <span className={styles.cart}>
    <Link to={"/cart"}>
      Cart
      <AiOutlineShoppingCart size={20} />
      <p>0</p>
    </Link>
  </span>
);

const ActiveLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };
  return (
    <header>
      <div className={styles.header}>
        {logo}
        <nav
          className={
            showMenu ? `${styles["show-nav"]} ` : `${styles["hide-nav"]}`
          }
        >
          <div
            onClick={hideMenu}
            className={
              showMenu
                ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                : `${styles["nav-wrapper"]}`
            }
          ></div>

          <ul onClick={hideMenu}>
            <li className={styles["logo-mobile"]}>
              {logo}
              <FaTimes size={22} color="white" onClick={hideMenu} />
            </li>
            <li>
              <NavLink to={"/"} className={ActiveLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to={"/contact"} className={ActiveLink}>
                Contact Us
              </NavLink>
            </li>
          </ul>

          <div className={styles["header-right"]} onClick={hideMenu}>
            <span className={styles.links}>
              <NavLink className={ActiveLink} to={"/login"}>
                Login
              </NavLink>

              <NavLink className={ActiveLink} to={"/register"}>
                Register
              </NavLink>
              <NavLink className={ActiveLink} to={"/order-history"}>
                My Orders
              </NavLink>
            </span>
            {cart}
          </div>
        </nav>
        <div className={styles["menu-icon"]}>
          <GiHamburgerMenu size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
