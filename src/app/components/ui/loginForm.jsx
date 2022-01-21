import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import CheckBoxField from "../common/form/checkBoxField";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { deleteAuthError, getAuthError, login } from "../../store/users";

const LoginForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const loginError = useSelector(getAuthError());
  const [data, setData] = useState({ email: "", password: "", stayOn: true });
  const [errors, setErrors] = useState({});
  const isValid = Object.keys(errors).length === 0;

  useEffect(() => validate(), [data]);

  const validatorConfig = {
    email: {
      isRequired: {
        // message: "Это поле обязательно для заполнения"
      },
      isEmail: {
        rule: (data) => !/^\S+@\S+\.\S+$/g.test(data),
        message: "Неверный формат для Email."
      }
    },
    password: {
      isRequired: {
        message: "Поле 'пароль' обязательно для заполнения"
      },
      isCapitalSybol: {
        rule: (data) => !/[A-Z]+/g.test(data),
        message: "Пароль должен содержать хотя бы одну заглавную букву"
      },
      isContainDigit: {
        rule: (data) => !/\d+/g.test(data),
        message: "Пароль должен содержать хотя бы одну цифру"
      },
      min: {
        rule: (data) => data.length < 8,
        message: "Пароль должен состоять минимум из 8 символов"
      }
    }
  };
  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return isValid;
  };

  const handleChange = (target) => {
    setData((prev) => ({
      ...prev,
      [target.name]: target.value
    }));
    dispatch(deleteAuthError());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const redirect = history.location.state ? history.location.state.from.pathname : "/";
    dispatch(login({ payload: data, redirect }));
  };
  return (
    <form onSubmit={ handleSubmit }>
      <TextField
        label="Электронная почта"
        placeholder="Это обязательное для заполнения поле"
        name="email"
        onChange={ handleChange }
        value={ data.email }
        error={ errors.email }
      />
      <TextField
        label="password"
        name="password"
        type="password"
        onChange={ handleChange }
        value={ data.password }
        error={ errors.password }
      />
      <CheckBoxField value={ data.stayOn } onChange={ handleChange } name="stayOn">
        Оставаться в системе
      </CheckBoxField>
      { loginError && <p className="text-danger">{ loginError }</p> }
      <button disabled={ !isValid || loginError } className="btn btn-primary w-100 mx-auto">
        Отправить
      </button>
    </form>
  );
};

export default LoginForm;
