import joi from "joi";
const addLeaveSchema = joi.object({
  userId: joi.string().required(),
  leaveType: joi
    .string()
    .valid("Sick Leave", "Casual Leave", "Annual Leave")
    .required(),
  startDate: joi.date().required(),
  endDate: joi.date().min(joi.ref("startDate")).required(),
  reason: joi.string().min(3).required(),
});
export { addLeaveSchema };
