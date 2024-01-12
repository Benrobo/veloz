const env = {
  BASE_URL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://tryveloz.com",
};

export default env;
