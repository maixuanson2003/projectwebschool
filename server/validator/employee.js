import joi from "joi";
const addEmployeeSchema = joi.object({
  name: joi
    .string()
    .pattern(/^[a-zA-Z0-9\s]+$/)
    .min(2)
    .max(100)
    .required(),
  email: joi.string().email().required(),
  employeeId: joi
    .string()
    .pattern(/^[a-zA-Z0-9\s]+$/)
    .required(),
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
