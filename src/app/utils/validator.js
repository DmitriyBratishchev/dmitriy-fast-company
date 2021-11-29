export function validator(data, config) {
  // console.log("------------------------------------------------");
  const errors = {};
  function validate(validateMethod, data, { rule, message }) {
    if (rule) {
      if (rule(data)) return message || "";
    } else {
      switch (validateMethod) {
      case "isRequired":
        if (data?.trim() === "") return message || "Это поле обязательно для заполнения";
        break;
      default:
        break;
      }
    }
  }
  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      // console.log("==========");
      // console.log(fieldName, validateMethod);
      const error = validate(
        validateMethod,
        data[fieldName],
        config[fieldName][validateMethod]
      );
      // console.log(error || "валидно");
      if (error && !errors[fieldName]) {
        errors[fieldName] = error;
      }
    }
  }

  return errors;
}
