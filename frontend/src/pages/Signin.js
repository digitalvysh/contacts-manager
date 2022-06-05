import "./signin.css";
import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "../content/StateProvider";
// import { actionType } from "../content/reducer";
// import Alert from "../components/Alert";
import dot from "../utils/dot.svg";
import bigCircleL from "../utils/bigCircleL.svg";
import bigCircleR from "../utils/bigCircleR.svg";
import eye from "../utils/eye.svg";
import { motion } from "framer-motion";

const Signin = () => {
  const navigate = useNavigate();
  // const [msg, setMsg] = useState(null);
  const passRef = useRef();
  // eslint-disable-next-line
  const [state, dispatch] = useStateValue();

  const handleSubmit = async (e) => {
    console.log(e)
    e.preventDefault();
    const data = {
      email: e.target.elements.log_email.value,
      password: e.target.elements.log_password.value,
    };
    console.log(data)

    const proRes = await fetch(process.env.REACT_APP_API+ "/api/v1/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    console.log(proRes.status)
    console.log(typeof(proRes.status))
    const res = await proRes.json();
    console.log(res)
    console.log(typeof(res))
    console.log(res.token)
    if (res.status === 400 || !data){
      window.alert("User not found")
    }if(res.status === 404){
      window.alert("Invalid password")
    }
    if(res.status===200){
      window.alert("signin successfull")
      navigate("/contact")
    }
  };


  const refreshUser = async () => {
    const jsonData = await fetch("", {
      method: "GET",
      headers: {
        authorization: state.user.token,
      },
    });

    const data = await jsonData.json();
    if (data.status === "sucess") {
      navigate("/contact");
    }
  };

  useEffect(() => {
    refreshUser();
    // eslint-disable-next-line
  }, []);

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
        <img src={dot} alt="dotLeft" className="dotLeft" />

        {/* {msg ? <Alert msg={msg} /> : ""} */}

        <form method="POST" className="signForm" onSubmit={handleSubmit}>
          <div className="logo">Logo</div>

          <div className="detail">
            Enter your credentials to access your account
          </div>
          <input
            type="email"
            placeholder="User Id"
            id="log_email"
            className="inputauth"
            required
          />
          <input
            type="password"
            placeholder="Password"
            id="log_password"
            className="inputauth"
            required
            ref={passRef}
          />
          <motion.img
            whileTap={{ scale: 0.95 }}
            src={eye}
            alt="eye"
            onClick={showPassword}
            className="signineye"
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="btn"
          >
            Sign In
          </motion.button>
          <Link to="/signup" className="linkLogin">
            Sign up
          </Link>
        </form>

        <img src={dot} alt="dotRight" className="dotRight" />
      </div>
      <img src={bigCircleR} alt="bigCircle" className="bigCircle right" />
    </section>
  );
};

export default Signin;
