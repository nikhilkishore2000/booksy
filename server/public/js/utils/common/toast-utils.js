// ✅ Toastify helper
export function showToast(messages, type = "error") {
  const isError = type === "error";
  const text = Array.isArray(messages) ? messages.join("<br>") : messages;
  Toastify({
    text: messages,
    duration: 3000,
    gravity: "top",
    position: "right",
    backgroundColor: type === "success" ? "#28a745" : "#dc3545",
    duration: isError ? -1 : 3000,
    close: isError,
    style: {
      whiteSpace: "pre-line",
    },
  }).showToast();
}
