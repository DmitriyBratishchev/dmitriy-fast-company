import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import API from "../../../api";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import { useHistory } from "react-router";

const UserEditPage = ({ match }) => {
  const id = match.params.id;
  const { goBack } = useHistory();
  const [user, setUser] = useState();
  const [data, setData] = useState();
  const [qualities, setQualities] = useState({});
  const [professions, setProfessions] = useState();
  const [errors, setErrors] = useState({});
  const isValid = Object.keys(errors).length === 0;
  useEffect(() => {
    API.users.getById(id).then((res) => setUser(res));
    API.professions.fetchAll().then((data) => setProfessions(data));
    API.qualities.fetchAll().then((data) => setQualities(data));
  }, []);

  useEffect(() => {
    if (user) {
      setData({
        ...user,
        profession: user.profession._id,
        qualities: user.qualities.map((el) => ({
          label: el.name,
          value: el._id
        }))
      });
    }
  }, [user]);

  useEffect(() => validate(), [data]);

  const validatorConfig = {
    name: {
      isRequired: {
        message: "Поле \"Имя\" обязательно для заполнения"
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
    event.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const userProfession =
      professions[Object.keys(professions).find((key) => professions[key]._id === data.profession)];
    const userQualities = Object.keys(qualities)
      .filter((key) => data.qualities.map(el => el.value).includes(qualities[key]._id))
      .map((key) => qualities[key]);
    API.users
      .update(id, {
        ...data,
        profession: userProfession,
        qualities: userQualities
      })
      .then(() => goBack());
  };
  if (user && data) {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-2">
            <button
              type="button"
              // disabled={!isValid}
              className="btn btn-primary w-100 mx-auto m-4"
              onClick={handleGoBack}
            >
              <i className="bi bi-caret-left"></i>
              Назад
            </button>
          </div>
          <div className="col-md-6 offset-md-1 shadow p-4">
            <h1>{user.name} (Редактирование)</h1>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Имя"
                name="name"
                onChange={handleChange}
                value={data.name}
                error={errors.name}
              />
              <TextField
                label="Электронная почта"
                placeholder="Это обязательное для заполнения поле"
                name="email"
                onChange={handleChange}
                value={data.email}
                error={errors.email}
              />
              <SelectField
                label="Выбери свою профессию"
                defaultOption="не выбранно ..."
                name="profession"
                value={data.profession}
                options={professions}
                onChange={handleChange}
                error={errors.profession}
              />
              <RadioField
                label="Пол"
                options={[
                  { name: "Мужской", value: "male" },
                  { name: "Женский", value: "female" },
                  { name: "Другой", value: "other" }
                ]}
                name="sex"
                onChange={handleChange}
                value={data.sex}
              />
              <MultiSelectField
                onChange={handleChange}
                options={qualities}
                value={data.qualities}
                name="qualities"
                label="Качества"
              />
              <button
                disabled={!isValid}
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

UserEditPage.propTypes = {
  match: PropTypes.object
};

export default UserEditPage;
