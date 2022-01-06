import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
// import API from "../../../api";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import { useHistory } from "react-router";
// import { toast } from "react-toastify";
import { useQualities } from "../../../hooks/useQuality";
import { useProfession } from "../../../hooks/useProfession";
import { useAuth } from "../../../hooks/useAuth";

const UserEditPage = ({ match }) => {
  const id = match.params.id;
  console.log(id);
  const { goBack } = useHistory();
  const { currentUser: user, createUser } = useAuth();
  const { isLoading: isLoadingQualities, qualities, getQuality } = useQualities();
  const qualitiesList = qualities.map(q => ({ label: q.name, value: q._id }));
  const { isLoading: isLoadingProffesion, professions } = useProfession();

  const [data, setData] = useState();
  const [errors, setErrors] = useState({});
  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    if (user && !isLoadingQualities && !isLoadingProffesion) {
      // if (id !== user._id) {
      //   toast.info("Редактировать можно только свой профиль!");
      //   push("/users/" + user._id + "/edit");
      // }
      setData({
        ...user,
        qualities: getQuality(user.qualities)
          .map((el) => ({
            label: el.name,
            value: el._id
          })
          )
      });
    }
  }, [user, isLoadingQualities, isLoadingProffesion]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const newData = { ...data, qualities: data.qualities.map(q => q.value) };
    console.log("newData", newData);
    try {
      const data = await createUser(newData);
      console.log("newData", data);
      goBack();
    } catch (error) {
      setErrors(error);
    }
  };
  console.log("user", user);
  console.log("data", data);
  if (user && data && qualities) {
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
            <h1>{user.name} (Рfffgggfffедактирование)</h1>
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
                options={ qualitiesList }
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
