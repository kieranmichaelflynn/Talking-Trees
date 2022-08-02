import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main>
      {data ? (
        <p>
          Success! You may now head{' '}
          <Link to="/">back to the homepage.</Link>
        </p>
      ) : (
        <div className="form">
          <div className="title">Welcome!</div>
          <div className="subtitle">Let's create your account</div>
          <form onSubmit={handleFormSubmit}>
            <div className="input-container ic1">

              <input
                className="input"
                placeholder=" "
                name="username"
                id="username"
                type="text"
                value={formState.name}
                onChange={handleChange}
              />
              <div className="cut"></div>
              <label for="username" className="placeholder">Username</label>
            </div>

            <div className="input-container ic2">

              <input
                className="input"
                placeholder=" "
                name="email"
                id="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
              />
              <div className="cut"></div>
              <label for="email" className="placeholder">Your email</label>
            </div>

            <div className="input-container ic2">

              <input
                className="input"
                placeholder=" "
                name="password"
                id="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
              />
              <div className="cut cut-short"></div>
              <label for="password" className="placeholder">******</label>
            </div>
            <button
              className="btn submit"
              style={{ cursor: 'pointer' }}
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      )}

      {error && (
        <div className="alert">
          {error.message}
        </div>
      )}
    </main>
  );
};

export default Signup;
