import { Link, useHistory, useLocation } from "react-router-dom";

function Navbar() {
  let location = useLocation();
  const history=useHistory();
  const logout=()=>{
    localStorage.removeItem('token');
    history.push("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          iNotebook
        </Link>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">
                About
              </Link>
            </li>
          </ul>
          {!localStorage.getItem('token')?<form className="d-flex"> 
          <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
          <Link className="btn btn-primary mx-1" to="/signup" role="button">SignUp</Link>
          </form>:<button className="btn btn-primary mx-1" onClick={logout}>LogOut</button>}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
