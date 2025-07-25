import { showToast } from "../utils/common/toast-utils.js";
import { getFormData } from "../utils/common/ui-utils.js";
import { validateForm } from "../utils/common/form-utils.js";
import { callSendOtpAPI } from "../utils/helper/auth-ui-helper.js";

export const signup = async (event) => {
  event.preventDefault();
  const form = event.target;
  const data = getFormData(form);
  const isValidated = validateForm("signup", data);
  if (isValidated) {
    const res = await callSendOtpAPI(data.email);
  }
};
