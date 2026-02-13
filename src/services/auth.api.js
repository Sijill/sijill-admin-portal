
export const getApiErrorMessage = (error, fallbackMessage = 'An error occurred') => {
  if (error.response?.data?.message) {
    if (Array.isArray(error.response.data.message)) {
      return error.response.data.message.join(', ');
    }
    return error.response.data.message;
  }

  if (error.message) {
    return error.message;
  }

  return fallbackMessage;
};