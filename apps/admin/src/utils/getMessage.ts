export function getMessage(message: string, errors?: string[]): string {
  if (errors && Array.isArray(errors) && errors.length > 0) {
    const errMessage = errors.join(", ") || message || "Ocurrió un error inesperado.";
    return errMessage;
  }

  if (Array.isArray(message)) {
    return message[0] || "Ocurrió un error inesperado.";
  }
  return message || "Ocurrió un error inesperado.";
}
