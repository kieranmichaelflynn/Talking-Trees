import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <main className="flex-row justify-center mb-4">

      {data ? (
        <p>
          Success! You may now head{' '}
          <Link to="/">back to the homepage.</Link>
        </p>
      ) : (
        <div className="form">
          <div className="title">Welcome back!</div>
          <div className="subtitle">Login to your account</div>
          <form onSubmit={handleFormSubmit}>
            <div className="input-container ic1">
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
                <label for="email" className="placeholder">Email</label>
              
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
              <div className="cut"></div>
                <label for="password" className="placeholder">Password</label>
              
              <button
                className="btn submit"
                style={{ cursor: 'pointer' }}
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}

      {error && (
        <div className="my-3 p-3 bg-danger text-white">
          {error.message}
        </div>
      )}
    </main >
  );
};

export default Login;
