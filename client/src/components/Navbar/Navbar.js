import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo-image">
                <Link to="/">
                    <img src={"http://localhost:3001/images/hermanmiller.jpg"} alt={"img unavailable"}/>
                </Link>
            </div>
            
            <h1>
                <Link to="/">Home</Link>
            </h1>
            <h1>
                <Link to="/cart">Cart</Link>
            </h1>
        </nav>
    )
}

export default Navbar;


