import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import API from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";

const RegisterForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    sex: "Мужской",
    qualities: [],
    licence: false
  });
  const [qualities, setQualities] = useState({});
  const [professions, setProfessions] = useState();
  const [errors, setErrors] = useState({});
  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    API.professions.fetchAll().then((data) => setProfessions(data));
    API.qualities.fetchAll().then((data) => setQualities(data));
  });

  useEffect(() => validate(), [data]);

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Это поле обязательно для заполнения"
      },
      isEmail: {
        rule: (data) => !/^\S+@\S+\.\S+$/g.test(data),
        message: "Неверный формат для Email."
      }
    },
    password: {
      isRequired: {
        message: "Это поле обязательно для заполнения"
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
    },
    profession: {
      isRequired: {}
    },
    licence: {
      isRequired: {
        rule: () => !data.licence,
        message:
          "Вы не можете использовать наш сервис без подтвеждения лицензионного соглашения"
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

  const handleSubmit = (e) => {
    event.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Электронная почта"
        placeholder="Это обязательное для заполнения поле"
        name="email"
        onChange={handleChange}
        value={data.email}
        error={errors.email}
      />
      <TextField
        label="password"
        name="password"
        type="password"
        onChange={handleChange}
        value={data.password}
        error={errors.password}
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
        label="Твой пол"
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
        name="qualities"
        label="Укажите свои качества"
      />
      <CheckBoxField
        value={data.licence}
        onChange={handleChange}
        name="licence"
        error={errors.licence}
      >
        Подтвердите <a>лицензионное соглашение</a>
      </CheckBoxField>
      <button disabled={!isValid} className="btn btn-primary w-100 mx-auto">
        Отправить
      </button>
    </form>
  );
};

export default RegisterForm;
