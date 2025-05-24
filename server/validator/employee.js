import joi from "joi";
const addEmployeeSchema = joi.object({
  name: joi.string().min(2).max(100).required(),
  email: joi.string().email().required(),
  employeeId: joi.string().required(),
  dob: joi.date().less("now").required(),
  gender: joi.string().valid("male", "female", "other").required(),
  maritalStatus: joi
    .string()
    .valid("single", "married", "divorced", "widowed")
    .required(),
  designation: joi.string().required(),
  department: joi.string().required(),
  salary: joi.number().positive().required(),
  password: joi.string().min(6).required(),
  role: joi.string().valid("admin", "employee", "manager").required(),
});

export { addEmployeeSchema };
