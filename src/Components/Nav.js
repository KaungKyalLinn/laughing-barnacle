import { Link } from "react-router-dom";

const Nav = () => {
  return ( 
    <nav className="navBar">
      <div className="navHalf"></div>
      <div className="navHalf">
        <ul className="navUl">
          <li className="navLinks">
            <Link to="/">Home</Link>
          </li>
          <li className="navLinks">
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
    </nav>
   );
}
 
export default Nav;