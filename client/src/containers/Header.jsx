import logo from "../images/logoWhite.png";
const Header = () => {
  return (
    <>
      <div className="header">
        <div className="headerNav row">
          <div className="headerNav_logo">
            <img src={logo} alt="spicelearn-logo" />
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
