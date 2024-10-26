import Account from "../../components/Account/Account";
import Footer from '../../components/Footer/Footer';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "./../../store/actions/user.action";
import accountData from '../../data/account.json';

export default function User() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLogged = useSelector(state => state.loginReducer.isLogged);
    const firstName = useSelector(state => state.userReducer.firstName);
    const lastName = useSelector(state => state.userReducer.lastName);
    const userName = useSelector(state => state.userReducer.userName);
    const token = useSelector((state) => state.loginReducer.token);
    
    // Initialise newUserName avec une chaîne vide si userName est undefined
    const [newUserName, setNewUserName] = useState(userName || "");

    function handleSubmit(event) {
        event.preventDefault();
        try {
            dispatch(updateProfile({ token, userName: newUserName }));
            hide("edit");
        } catch (error) {
            console.error(error.message);
        }
    }

    function hide(name) {
        const WelcomeContainer = document.getElementById("headerWelcome");
        const editContainer = document.getElementById("edit-container");
        if (name === "edit") {
            editContainer.style.display = "none";
            WelcomeContainer.style.display = "inline";
        } else {
            editContainer.style.display = "flex";
            editContainer.style.justifyContent = "center";
            editContainer.style.padding = "0 2rem 2rem";
            WelcomeContainer.style.display = "none";
        }
    }

    function undo() {
        hide("edit");
    }

    useEffect(() => {
        if (!isLogged) {
            navigate("/sign-in");
        }
    }, [isLogged, navigate]);

    return (
        <div>
            <main className="user-main">
                <div className="header">
                    <div id="headerWelcome">
                        <h1>Welcome back<br />{userName} !</h1>
                        <button className="edit-button" 
                        onClick={() => hide("welcome")}
                        >Edit Name</button>
                    </div>
                </div>
                <form id="edit-container" onSubmit={handleSubmit}>
                    <div className="header-edit" id="headerEdit">
                        <h1>Edit user info</h1>
                        <div id="header-inputs">
                            <label htmlFor="username"> Username
                                <input
                                    type="text"
                                    id="username"
                                    value={newUserName} // Utilise newUserName directement
                                    onChange={event => setNewUserName(event.target.value)}
                                    autoComplete={userName}
                                    required
                                />
                            </label>
                            <label htmlFor="firstName"> First name
                                <input
                                    type="text"
                                    id="firstName"
                                    value={firstName || ""} // Assure que firstName n'est jamais null
                                    readOnly
                                />
                            </label>
                            <label htmlFor="lastName"> Last name
                                <input
                                    type="text"
                                    id="lastName"
                                    value={lastName || ""} // Assure que lastName n'est jamais null
                                    readOnly
                                />
                            </label>
                        </div>
                        <div className="header-edit-buttons">
                            <button type="submit">Save</button>
                            <button type="button" onClick={() => undo()}>Cancel</button>
                        </div>
                    </div>
                </form>
                {accountData.map(account =>
                    <Account account={account} key={account.id} />
                )}
            </main>
            <Footer />
        </div>
    );
}
