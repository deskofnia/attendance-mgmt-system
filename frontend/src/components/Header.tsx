import { useNavigate } from 'react-router-dom';
import './css/Header.css'

export default function Header() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/login');
    }

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light primary-gradient shadow">
                <div className="nav-link brand mx-auto">
                    <h1>Employee Management</h1>
                    <button onClick={logout}>Logout</button>
                </div>
            </nav>
        </header>
    )
}
