// import logo from "../images/logoWhite.png";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
      <div className="header">
        <div className="headerNav row">
          <div className="headerNav_logo">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/imrajat24/image/upload/v1657198906/logoWhite.7208d9659242baef9f0d_g5e0ty.png"
                alt="spicelearn-logo"
              />
              {/* <span>Image</span> */}
            </Link>
          </div>
          <div className="headerNav_heading">
            <h1> Viva Voice Assesment</h1>
            <h3 className="headerNav_heading-session">Session 2022-23</h3>
          </div>
          <div className="headerNav_misc"></div>
        </div>
      </div>
    </>
  );
};

export default Header;
