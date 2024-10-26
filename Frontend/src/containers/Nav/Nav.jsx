import logo from '../../data/nav.json';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./../../store/reducers/login.reducer";
import { getProfile } from './../../store/actions/user.action';



export default function Nav() {
    const dispatch = useDispatch();
    const isLogged = useSelector(state => state.loginReducer.isLogged);
    const token = useSelector((state) => state.loginReducer.token);
    const userName = useSelector((state) => state.userReducer.userName);

    const handleLogout = () => {
        dispatch(logout()); // Appeler l'action de déconnexion
    };

    useEffect(() => {
        // Obtient le profil de l'utilisateur lorsqu'on dispose d'un token d'authentification.
        try {
            if (token && !userName) {
                dispatch(getProfile({ token }));
            }
        } catch (error) {
            console.error(error);
            dispatch(logout());
            // navigate
            // Si on n'échoue dans la récupération de l'utilisateur, cela signifie peut-être que le token est expiré ou invalide. 
            // Dans ce cas, on va rediriger vers la page de connexion. Avant cela, on va forcer une déconnexion (via handleLogout par exemple.)
        }
    }, [token, userName, dispatch]); // Ajoute `dispatch` ici

    return (
        <header>
            <nav className="main-nav">
                <Link to="/" className="main-nav-logo">
                    <img
                        className="main-nav-logo-image"
                        src={logo.nav}
                        alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </Link>
                <div>
                    <Link to="/sign-in" className="main-nav-item" onClick={handleLogout}>
                        { 
                            isLogged 
                            ? (<><i className="fa fa-user-circle"></i>{userName}<i className="fa fa-sign-out"></i>Sign Out</>) 
                            : (<><i className="fa fa-user-circle"></i>Sign-in</>) 
                        }
                    </Link>
                </div>
            </nav>
        </header>
    )
}
