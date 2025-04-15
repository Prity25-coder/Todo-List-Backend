const { PORT } = process.env;

const ENV_CONFIG = Object.freeze({
  port: Number(PORT),
});

export default ENV_CONFIG;
