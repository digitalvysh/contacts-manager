import React, { useState, useRef } from "react";
// import Alert from "../components/Alert";
import dot from "../utils/dot.svg";
import bigCircleL from "../utils/bigCircleL.svg";
import bigCircleR from "../utils/bigCircleR.svg";
import eye from "../utils/eye.svg";
import { motion } from "framer-motion";

const Signup = () => {
  // const navigate = useNavigate();
  // const [msg, setMsg] = useState(null);
  const passRef = useRef();
  const [wrongPass, setWrongPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      e.target.elements.reg_password.value !==
      e.target.elements.c_reg_password.value
    ) {
      setTimeout(() => {
        setWrongPass(false);
      }, 2500);
      return setWrongPass(true);
    }
    const data = {
      email: e.target.elements.reg_email.value,
      password: e.target.elements.reg_password.value,
      confirmpassword:e.target.elements.c_reg_password.value,
    };
    console.log(data)
    const proRes = await fetch(process.env.REACT_APP_API + "/api/v1/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const res =await proRes.json();
    console.log(res);
    console.log(res.status)
    if (res.status === 400 || !data){
      window.alert("Invalid Credentials")
    }else{
      window.alert("signup successfull");
      // navigate("http://localhost:3000");
    }
   };

  function showPassword(e) {
    var x = passRef.current;
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
  return (
    <section className="loginContainer">
      <img src={bigCircleL} alt="bigCircle" className="bigCircle left" />
      <div className="mainLogIn">
        {/* {msg ? <Alert msg={msg} /> : ""} */}
        {wrongPass ? <div className="alert">Password does't match</div> : ""}
        <img src={dot} alt="dotLeft" className="dotLeft" />

        <form action="" className="signForm" onSubmit={handleSubmit}>
          <div className="logo">Logo</div>

          <div className="detail">Create New Account</div>
          <input
            type="email"
            placeholder="User Id"
            id="reg_email"
            className="inputauth"
            required
          />
          <input
            type="password"
            placeholder="Password"
            id="reg_password"
            className="inputauth"
            required
            ref={passRef}
          />
          <input
            type="password"
            id="c_reg_password"
            placeholder="Confirm Password"
            className="inputauth"
            required
          />
          <motion.img
            whileTap={{ scale: 0.95 }}
            src={eye}
            alt="eye"
            onClick={showPassword}
            className="signupeye"
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="btn"
          >
            Sign Up
          </motion.button>
        </form>

        <img src={dot} alt="dotRight" className="dotRight" />
      </div>
      <img src={bigCircleR} alt="bigCircle" className="bigCircle right" />
    </section>
  );
};

export default Signup;
