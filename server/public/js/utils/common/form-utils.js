import { validateSignupForm } from "../helper/auth-ui-helper.js";
// ✅ Main validation dispatcher
export function validateForm(type, data) {
  switch (type) {
    case "signup":
      return validateSignupForm(data);
    // case "login":
    //   return validateLoginForm(form);
    default:
      return "Unknown form type";
  }
}
