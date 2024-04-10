import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const phoneRef = useRef();
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');

  const history = useHistory();
  const showLoginButton = () => {
    setIsSignedUp(true);
  };
  const showSignInButton = () => {
    setIsSignedUp(false);
  };

  const [profession, setProfession] = useState("");
  const [otherProfession, setOtherProfession] = useState("");

  const handleProfessionChange = (event) => {
    const { value } = event.target;
    setProfession(value);
    if (value !== "other") {
      setOtherProfession("");
    }
  };

  const handleOtherProfessionChange = (event) => {
    setOtherProfession(event.target.value);
  };

  async function sumbitHandler(e) {
    e.preventDefault();
    if (e.target.lastElementChild.firstChild.textContent === "Sign up") {
      const name = nameRef.current.value;
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const phone = phoneRef.current.value;
      const professionInp =
        profession === "other" ? otherProfession : profession;
      let fetchedData = JSON.stringify({
        name: name,
        email: email,
        password: password,
        phone: phone,
        profession: professionInp,
      });
      localStorage.setItem("userData", fetchedData);
      setLoginSuccess("Sign Up Successful!");
      nameRef.current.value = "";
      emailRef.current.value = "";
      passwordRef.current.value = "";
      phoneRef.current.value = "";
      setProfession("");
      setTimeout(()=>setIsSignedUp(true),2000);
      setTimeout(()=>setLoginSuccess(""),2000);
    }else{
      const name = nameRef.current.value;
      const password = passwordRef.current.value;
      const signupData=JSON.parse(localStorage.getItem('userData'));
      if(name===signupData.name&&password===signupData.password){
        setLoginError('');
        setLoginSuccess('Logged In Successfully!');
        setTimeout(()=>setLoginSuccess(''),2000);
        await localStorage.setItem('LoginSuccess',true);
        if(localStorage.getItem('LoginSuccess')==='true'){
          setTimeout(()=>history.push('/home'),2000);
        }
      }else{
        setLoginError('Invalid Credentials!');
        setTimeout(()=>setLoginError(''),2000);
      }
    }
  }
  return (
    <>
      <section className={classes.auth}>
        {!isSignedUp ? <h1>SignUp</h1> : <h1>Login</h1>}
        {loginError && <div className="text-center alert alert-danger p-2">{loginError}</div>}
        {isSignedUp&&loginSuccess && <div className="text-center alert alert-success p-2">{loginSuccess}</div>}
        {!isSignedUp&&loginSuccess && <div className="text-center alert alert-success p-2">{loginSuccess}</div>}
        <form onSubmit={sumbitHandler}>
          <div className={classes.control}>
            <label htmlFor="name">Name:</label>
            <input id="name" type="text" ref={nameRef} required />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password:</label>
            <input id="password" type="password" ref={passwordRef} required />
          </div>
          {!isSignedUp && (
            <>
              <div className={classes.control}>
                <label htmlFor="email">Email:</label>
                <input id="email" type="email" ref={emailRef} required />
              </div>
              <div className={classes.control}>
                <label htmlFor="phone">Phone Number:</label>
                <input id="phone" type="number" ref={phoneRef} required />
              </div>
              <div className={classes.control}>
                <label htmlFor="profession">Profession:</label>
                <select
                  id="profession"
                  className="form-select"
                  value={profession}
                  onChange={handleProfessionChange}
                  required
                >
                  <option value="" required disabled selected>
                    Select
                  </option>
                  <option value="Engineer">Engineer</option>
                  <option value="Banker">Banker</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Entrepreneur">Entrepreneur</option>
                  <option value="Fashion Designer">Fashion Designer</option>
                  <option value="Journalist">Journalist</option>
                  <option value="Photographer">Photographer</option>
                  <option value="other">Other</option>
                </select>
              </div>
              {profession === "other" && (
                <div className={classes.control}>
                  <label htmlFor="otherProfession">Other Profession:</label>
                  <input
                    type="text"
                    id="otherProfession"
                    name="otherProfession"
                    value={otherProfession}
                    onChange={handleOtherProfessionChange}
                    required
                  />
                </div>
              )}
            </>
          )}
          <div className={classes.actions}>
            {!isSignedUp ? <button>Sign up</button> : <button>Login</button>}
          </div>
        </form>
        <div className={classes.loginActions}>
          {!isSignedUp ? (
            <button onClick={showLoginButton}>Have an account? Login</button>
          ) : (
            <button onClick={showSignInButton}>
              Don't have an account? Sign up
            </button>
          )}
        </div>
      </section>
    </>
  );
};
export default AuthForm;
