const Ajv = require('ajv').default;

const ajv = new Ajv();
module.exports = (schema) => {
  const compiler = ajv.compile(schema);
  const validator = {
    validate: (data) => compiler(data),
    getError: () => compiler.errors,
  };

  return validator;
};
