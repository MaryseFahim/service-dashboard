"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const users = [
        {
          username: "user1@g.com",
          password: "user1",
        },
        {
          username: "user2",
          password: "user2",
        },
      ];

      const foundUser = users.find(
        (user) => user.username === username && user.password === password
      );

      if (foundUser) {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", true);
        router.push("/dashboard");
      } else {
        alert("Invalid login credentials");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="container-fluid px-0">
      <div className="row g-0">
        <div className="leftColumn col-lg-5 vh-100 d-flex flex-column justify-content-center align-items-center text-light">
          <div className="d-flex align-items-baseline">
            <h1 style={{ fontSize: "86px" }}>XO</h1>
            <h1 style={{ fontSize: "50px" }}>rithm</h1>
          </div>
          <div>
            {/* <h1 className="mainTitle">XOrithm</h1> */}
            <p>Where you experience the power of tech transformation.</p>
          </div>
        </div>
        <div className="col-lg-7 vh-100 bg-light d-flex flex-column justify-content-center align-items-center">
          <h1>Welcome Back</h1>
          <h2>Sign In</h2>
          <div className="">
              <form onSubmit={handleLogin}>
                <div className="form-group mt-4 ">
                  <label htmlFor="emailAddress">Email Address</label>
                  <input
                    type="email"
                    className="form-control mt-2"
                    placeholder="Enter Email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group mt-4">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control mt-2"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary mt-4">
                  Sign In
                </button>
              </form>
          </div>
          <p>Or</p>
          <h5>Sign in using</h5>
          <div className=" d-flex justify-content-around">
            <a href="#" className="fa fa-facebook mx-1"></a>
            <a href="#" className="fa fa-google mx-1"></a>
            {/* <a href="#" className="fa fa-linkedin mx-1"></a>
            <a href="#" className="fa fa-yahoo mx-1"></a> */}
          </div>
          <div className="pt-2">
            <p>
              Don't have an account?
              <Link href="/signup" className="signUpLink px-2">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
