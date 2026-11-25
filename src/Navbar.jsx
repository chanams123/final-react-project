import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header>
      <div className="container">
        <div className="row header-row">
          <div className="logo__img">
            <img
              src="https://img.favpng.com/19/2/23/drama-theatre-dance-clip-art-png-favpng-g7BrrMK22NUEdi35dwZ8RGHnn.jpg"
              alt="Moovies logo"
            />
          </div>
          <nav className="navbar">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><a href="#viewall">View All</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#about">About</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}