export const formatDate = () => {
    const day = 24 * 60 * 60 * 1000 * 7;
    const date = new Date(new Date().getTime() - day).toISOString();
    return date;
  };