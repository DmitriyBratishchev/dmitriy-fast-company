import React, { useEffect, useState } from "react";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getQualities, getQualitiesLoadingStatus } from "../../../store/qualities";
import { getProfessions, getProfessionsLoadingStatus } from "../../../store/professons";
import { getCurrentUser, updateUserData } from "../../../store/users";

const UserEditPage = () => {
  const { goBack } = useHistory();
  const dispatch = useDispatch();

  const currentUser = useSelector(getCurrentUser());
  const professions = useSelector(getProfessions());
  const professionsLoading = useSelector(getProfessionsLoadingStatus());
  const qualities = useSelector(getQualities());
  const isLoadingQualities = useSelector(getQualitiesLoadingStatus());

  const qualitiesList = qualities.map(q => ({ label: q.name, value: q._id }));

  const [data, setData] = useState();
  const [errors, setErrors] = useState({});
  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    if (currentUser && !isLoadingQualities && !professionsLoading) {
      setData({
        ...currentUser,
        qualities: qualitiesList.filter(q => currentUser.qualities.indexOf(q.value) !== -1)
      });
    }
  }, [currentUser, isLoadingQualities, professionsLoading]);

  useEffect(() => validate(), [data]);

  const validatorConfig = {
    name: {
      isRequired: {
        message: "Поле \"Имя\" обязательно для заполнения"
      },
      min: {
        rule: (data) => data.length < 2,
        message: "Имя должно состоять минимум из 2 символов"
      }
    },
    email: {
      isRequired: {
        message: "Поле \"Электронная почта\" обязательно для заполнения"
      },
      isEmail: {
        rule: (data) => !/^\S+@\S+\.\S+$/g.test(data),
        message: "Неверный формат для Email."
      }
    },
    profession: {
      isRequired: {}
    },
    qualities: {
      min: {
        rule: (data) => data.length === 0,
        message: "Укажите качества."
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
  };

  const handleGoBack = () => {
    goBack();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const newData = { ...data, qualities: data.qualities.map(q => q.value) };
    dispatch(updateUserData(newData));
  };

  if (currentUser && data && qualities) {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-2">
            <button
              type="button"
              className="btn btn-primary w-100 mx-auto m-4"
              onClick={ handleGoBack }
            >
              <i className="bi bi-caret-left"></i>
              Назад
            </button>
          </div>
          <div className="col-md-6 offset-md-1 shadow p-4">
            <h1>{ currentUser.name } (Редактирование)</h1>
            <form onSubmit={ handleSubmit }>
              <TextField
                label="Имя"
                name="name"
                onChange={ handleChange }
                value={ data.name }
                error={ errors.name }
              />
              <TextField
                label="Электронная почта"
                placeholder="Это обязательное для заполнения поле"
                name="email"
                onChange={ handleChange }
                value={ data.email }
                error={ errors.email }
              />
              <SelectField
                label="Выбери свою профессию"
                defaultOption="не выбранно ..."
                name="profession"
                value={ data.profession }
                options={ professions }
                onChange={ handleChange }
                error={ errors.profession }
              />
              <RadioField
                label="Пол"
                options={ [
                  { name: "Мужской", value: "male" },
                  { name: "Женский", value: "female" },
                  { name: "Другой", value: "other" }
                ] }
                name="sex"
                onChange={ handleChange }
                value={ data.sex }
              />
              <MultiSelectField
                onChange={ handleChange }
                options={ qualitiesList }
                value={ data.qualities }
                name="qualities"
                label="Качества"
              />
              <button
                disabled={ !isValid }
                className="btn btn-primary w-100 mx-auto"
              >
                Обновить
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return <h3>Loading ...</h3>;
  }
};

export default UserEditPage;
