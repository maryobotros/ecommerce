import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'isActive' : null;
    }

    return (
        <nav className="navbar">
            <div className="logo-image">
                <Link to="/">
                    <img src={"http://localhost:3001/images/hermanmiller.jpg"} alt={"img unavailable"}/>
                </Link>
            </div>
            
            <h1 className={isActive('/')}>
                <Link to="/">Home</Link>
            </h1>
            <h1 className={isActive('/cart')}>
                <Link to="/cart">Cart</Link>
            </h1>
        </nav>
    )
}

export default Navbar;


