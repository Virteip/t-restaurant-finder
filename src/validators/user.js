module.exports = {
  title: 'userSchema',
  type: 'object',
  properties: {
    username: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
  },
  required: [
    'username',
    'password',
  ],
};
