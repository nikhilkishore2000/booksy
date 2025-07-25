// Utility: Get form data as an object
export function getFormData(form) {
  const formData = new FormData(form);
  return Object.fromEntries(formData.entries());
}
