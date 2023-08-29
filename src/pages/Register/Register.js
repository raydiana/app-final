import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerWithEmailAndPassword, logout } from '../../firebase';
import "./Register.css"

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  const handleRegister = async(event) => {
    event.preventDefault();
    if (
        email === '' ||
        password === ''
      )
      return
      registerWithEmailAndPassword(
        email,
        password,
      ).then((user) => {
        if (user) {
          logout().then(() => {
            console.log(666);
          })
        }
        alert("Votre compte a été enregistré avec succès! ");
        navigate("/Login");
      })
  };

  return (
    <div className="container">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="email">E-mail:</label>
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
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
}

export default Register;
