// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from "../utils/constants"
import axios from "axios"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMgs, setErrMgs] = useState("")
  const navigate = useNavigate();
  const [logSuccess, setLogSuccess] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Login attempted with:', { email, password });
    // For demo, redirect to home page
    // navigate('/');

    try {
      const resData = await axios.post(`${API}/login`, { email, password }, { withCredentials: true }).then((res) => {
        console.log(res)
        console.log(res.data)
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token)
          setLogSuccess(true)
          setTimeout(() => {
            navigate("/")
          }, 3000);
        }
      })
    } catch (err) {
      console.error("Error===>", err.response.data)
      setErrMgs(err.response.data)
    }

  };
  const goTo = (str) => {
    navigate(str)
    console.log("clicked")
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-3xl font-bold text-center mb-4">
            Welcome Back!
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>

            <div className="form-control">
              <button type="submit" className="btn btn-primary w-full">
                Login
              </button>
            {
              !logSuccess &&
              <div>
              {
                errMgs && 
                <div role="alert" class="alert alert-error alert-soft">
                  <span>{errMgs}</span>
                </div>
              }
            </div>
            }
            </div>
          </form>

          {
            logSuccess && <div className="alert alert-success mt-4">
              <div className="flex-1">
                <label>Success</label>
                <p>Login successful</p>
              </div>
            </div>

          }

          <div className="divider">OR</div>

          <div className="flex justify-center gap-2">
            <button className="btn btn-outline btn-circle">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                {/* Google icon */}
                <path
                  fill="currentColor"
                  d="M12.24 10.32V14.4h4.56c-.36 2.28-2.64 4.08-4.8 4.08-2.88 0-5.28-2.4-5.28-5.28s2.4-5.28 5.28-5.28c1.32 0 2.52.48 3.36 1.32l2.64-2.64C16.56 4.56 14.52 3.6 12.24 3.6 7.68 3.6 4.08 7.2 4.08 12s3.6 8.4 8.16 8.4c4.8 0 8.04-3.36 8.04-8.16 0-.6-.12-1.2-.24-1.68h-7.8z"
                />
              </svg>
            </button>
            <button className="btn btn-outline btn-circle">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                {/* Facebook icon */}
                <path
                  fill="currentColor"
                  d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24h-1.918c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"
                />
              </svg>
            </button>
          </div>

          <p className="text-center mt-4">
            Don't have an account?{' '}
            <span onClick={() => goTo("/signup")} className="link link-primary">
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;