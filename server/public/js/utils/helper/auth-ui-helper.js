import { showToast } from "../common/toast-utils.js";
// Signup-specific validation logic
export function validateSignupForm(data) {
  const { username, phone, email, password, confirmPassword } = data;

  const errors = [];

  if (username.length < 4) {
    errors.push("Username must be at least 4 characters");
  }

  if (!/^\d{10}$/.test(phone)) {
    errors.push("Phone number must be exactly 10 digits");
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.push("Please enter a valid email address");
  }

  if (password.length < 4) {
    errors.push("Password must be at least 4 characters");
  }

  if (password !== confirmPassword) {
    errors.push("Passwords do not match");
  }

  if (errors.length) {
    showToast(errors.join("\n"), "error"); // 👈 Show all errors at once
    return false;
  }
  return true;
}

export async function callSendOtpAPI(email) {
  try {
    const response = await fetch(`http://localhost:8000/api/auth/send-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to send OTP");
    }

    showToast("OTP sent successfully!", "success");
    return data;
  } catch (err) {
    showToast(err.message || "Something went wrong", "error");
  }
}
