import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/actions/login.action";

export default function Form() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const dispatch = useDispatch();
  const error = useSelector(({ loginReducer }) => loginReducer.error);
  
  function handleSubmit($event) {
    $event.preventDefault();
    try {
        dispatch(login({ email: username, password, remember }));
      } catch (error) {
        console.error('Login error:', error.message);
      }
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <label htmlFor="username">Username</label>
        <input 
          required 
          type="text" 
          id="username" 
          onChange={({target}) => setUsername(target.value)} 
          autoComplete="username"  // Ajout de l'attribut autocomplete
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">Password</label>
        <input 
          required 
          type="password" 
          id="password" 
          onChange={({target}) => setPassword(target.value)} 
          autoComplete="current-password" // Ajout de l'attribut autocomplete
        />
      </div>
      <div className="input-remember">
        <input 
          type="checkbox" 
          id="remember-me" 
          checked={remember} 
          onChange={() => setRemember(prev => !prev)} 
        />
        <label htmlFor="remember-me">Remember me</label>
      </div>
      <button type="submit" className="sign-in-button">Sign In</button>
    </form>
      { error && <div><p>{error}</p></div> }
    </>
  );
}
