import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logInWithEmailAndPassword } from '../../firebase';
import { setAlert } from '../../store'
import "./Login.css"

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  const handleSubmit = async(event) => {
    event.preventDefault();

    if (email === '' || password === '') return
    logInWithEmailAndPassword(email, password).then((user) => {
      if (user){
        alert("Connexion réussie !");
        navigate('/')
      }else {
        alert("E-mail ou mot de passe incorrect, veuillez le saisir à nouveau.")
      }
    })

    // if (username === "admin" && password === "password") {
    //   alert("Connexion réussie !");
    //   navigate("/", {state: {username}});
    // } else {
    //   alert("La connexion a échoué, veuillez vérifier l'identifiant et le mot de passe.");
    // }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input 
            type="text" 
            id="email" 
            name="email"
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe:</label>
          <input 
            type="password" 
            id="password" 
            name="password"
            placeholder="Mot de passe" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required />
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default Login;
