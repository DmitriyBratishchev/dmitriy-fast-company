import { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { getIsLoggedIn, getUsersLoadingStatus, loadUsersList } from "../../../store/users";
import { loadQualitiesList } from "../../../store/qualities";
import { loadProfessions } from "../../../store/professons";

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());
  const isUsersLoading = useSelector(getUsersLoadingStatus());
  useEffect(() => {
    dispatch(loadQualitiesList());
    dispatch(loadProfessions());
    if (isLoggedIn) dispatch(loadUsersList());
  }, [isLoggedIn]);
  if (isUsersLoading) return "Loading";
  return children;
};

AppLoader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
};

export default AppLoader;
