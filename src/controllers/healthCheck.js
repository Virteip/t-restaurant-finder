const healthCheck = module.exports;

const { APP_NAME } = process.env;

healthCheck.status = async (req, res) => {
  const status = {
    name: `${APP_NAME}`,
    time: Date.now(),
    status: 'OK',
  };
  return res.send(status).status(200);
};
