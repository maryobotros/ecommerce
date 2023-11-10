import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
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


