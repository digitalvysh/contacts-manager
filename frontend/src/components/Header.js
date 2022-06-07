import React from "react";
import { useStateValue } from "../content/StateProvider";
import { actionType } from "../content/reducer";
import user from "../utils/user.svg";
import { motion } from "framer-motion";
import "./header.css";

const Header = () => {
    const [state, dispatch] = useStateValue();
  const handleChange = (e) => {
    dispatch({ type: actionType.SEARCH, payload: { key: e.target.value } });
  };
  return (
    <div className="header-bar">
      <ul>
          <li className="text">Total Contacts</li>
          <li>
          <input
            type="search"
            placeholder="Search email address"
            className="searchBox"
            onChange={handleChange}
          />
          </li>
          <motion.li whileTap={{ scale: 0.6 }} className="userField">
          <img src={user} alt="user" />
          <div>
            <p>
              {state.user.email.split("@")[0][0].toUpperCase() +
                state.user.email.split("@")[0].slice(1).toLowerCase()}
            </p>
            <p className="userType">Normal User</p>
          </div>
        </motion.li>
      </ul>
     
    </div>
  )
}

export default Header
