import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import localStorageService, { removeAuthData, setTokens } from "../services/localStorage.service";
import { useHistory } from "react-router-dom";

export const httpAuth = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/",
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY
  }
});

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const history = useHistory();

  async function getUserData() {
    try {
      const { content } = await userService.getCurrentUser();
      setCurrentUser(content);
    } catch {
      errorCatcher(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getUserData();
    } else {
      setLoading(false);
    };
  }, []);
  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  async function signUp({ email, password, ...rest }) {
    // const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;
    try {
      const { data } = await httpAuth.post("accounts:signUp", { email, password, returnSecureToken: true });
      setTokens(data);
      await createUser({
        _id: data.localId,
        email,
        rate: randomInt(1, 5),
        completedMeetings: randomInt(0, 200),
        image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1).toString(36).slice(-5)}.svg`,
        ...rest
      });
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      if (code === 400) {
        if (message === "EMAIL_EXISTS") {
          const errorObject = { email: "Пользователь с таким email уже существует." };
          throw errorObject;
        }
      }
    }
  };

  function logOut() {
    // console.log("auth logout");
    removeAuthData();
    setCurrentUser(null);
    history.push("/");
  };

  async function logIn({ email, password }) {
    // const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
    try {
      const { data } = await httpAuth.post("accounts:signInWithPassword", { email, password, returnSecureToken: true });
      // console.log(data);
      setTokens(data);
      await getUserData();
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      // console.log(process.env);
      // console.log(code, message);
      if (code === 400) {
        if (message === "EMAIL_NOT_FOUND") {
          const errorObject = { email: "Пользователь с таким email не найден." };
          throw errorObject;
        }
        if (message === "INVALID_PASSWORD") {
          const errorObject = { password: "Пароль недействителен. Проверте правильность написания." };
          throw errorObject;
        }
      }
    }
  }

  async function createUser(data) {
    try {
      // console.log("createUser data", data);
      const { content } = await userService.create(data);
      // console.log("createUser", content);
      setCurrentUser(content);
    } catch (error) {
      errorCatcher(error);
    }
  }

  async function updateUserData(data) {
    try {
      const { content } = await userService.update(data);
      setCurrentUser(content);
    } catch (error) {
      errorCatcher(error);
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
    setLoading(false);
  }
  return (
    <AuthContext.Provider value={ { signUp, currentUser, logIn, logOut, updateUserData } }>
      { !isLoading ? children : "Loading ..." }
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default AuthProvider;
