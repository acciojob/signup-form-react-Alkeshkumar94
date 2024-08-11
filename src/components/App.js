import React, { useState } from "react";
import '../styles/App.css';

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "male",
    phoneNumber: "",
    password: "",
  });
  
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const validateForm = () => {
    const { name, email, gender, phoneNumber, password } = formData;
    setError("");

    if (!name || !email || !phoneNumber || !password) {
      return 'All fields are mandatory';
    }
    if (!/^[a-zA-Z0-9 ]+$/.test(name)) {
      return 'Name is not alphanumeric';
    }
    if (!email.includes('@')) {
      return 'email must contain @';
    }
    if (!['male', 'female', 'other'].includes(gender)) {
      return 'Please identify as male, female or others';
    }
    if (!/^\d+$/.test(phoneNumber)) {
      return 'Phone Number must contain only numbers';
    }
    if (password.length < 6) {
      return 'Password must contain atleast 6 letters';
    }
    return "";
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    
    if (validationError) {
      setError(validationError);
      setMessage('');
    } else {
      const username = formData.email.split('@')[0];
      setMessage(`Hello ${username.toUpperCase()}`);
      setError('');
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  return (
    <div id="main">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input 
            name="name" 
            value={formData.name} 
            data-testid='name' 
            type="text" 
            onChange={handleInput}
          />
        </div>
        <br />
        <div>
          <label>Email address:</label>
          <input 
            name="email" 
            value={formData.email} 
            onChange={handleInput} 
            data-testid='email' 
          />
        </div>
        <br />
        <span>
          <label>Gender:</label>
          <select 
            value={formData.gender} 
            onChange={handleInput} 
            name="gender" 
            data-testid='gender'
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </span>
        <br />
        <div>
          <label>Phone Number:</label>
          <input 
            value={formData.phoneNumber} 
            onChange={handleInput} 
            name="phoneNumber" 
            data-testid='phoneNumber' 
            type="text"
          />
        </div>
        <br />
        <div>
          <label>Password:</label>
          <input 
            value={formData.password} 
            onChange={handleInput} 
            name="password" 
            data-testid='password' 
            type="password"
          />
        </div>
        <br />
        <div>
          <button type="submit" data-testid='submit'>Submit</button>
        </div>
      </form>
      {error && <span className="error">{error}</span>}
      {message && <h2 className="welcome">{message}</h2>}
    </div>
  );
}

export default App;
