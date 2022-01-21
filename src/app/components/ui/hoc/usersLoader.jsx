import { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { getDataStatus, loadUsersList } from "../../../store/users";

const UsersLoader = ({ children }) => {
  const dispatch = useDispatch();
  const dataStatus = useSelector(getDataStatus());
  useEffect(() => {
    if (!dataStatus) dispatch(loadUsersList());
  }, []);
  if (!dataStatus) return "Loading";
  return children;
};

UsersLoader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
};

export default UsersLoader;
