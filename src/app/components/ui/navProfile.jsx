import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Avatar from "./avatar";
import { getCurrentUser } from "../../store/users";

const NavProfile = () => {
  const currentUser = useSelector(getCurrentUser());
  const [isOpen, setOpen] = useState(false);
  const toggleMenu = () => { setOpen(prev => !prev); };
  if (!currentUser) return "loading";
  return (
    <div className="dropdown" onClick={ toggleMenu }>
      <div className="btn dropdown-toggle d-flex align-items-center">
        <div className="me-2">{ currentUser.name }</div>
        <Avatar
          imageLink={ currentUser.image }
          width="40"
        />
      </div>
      <div className={ "w-100 dropdown-menu" + (isOpen ? " show" : "") }>
        <Link to={ `/users/${currentUser._id}` } className="dropdown-item">Profile</Link>
        <Link to="/logout" className="dropdown-item">Logout</Link>
      </div>
    </div>
  );
};

export default NavProfile;
