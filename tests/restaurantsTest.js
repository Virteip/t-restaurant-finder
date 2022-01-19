const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const assert = require('assert');
const app = require('../index');

const cache = require('../src/repositories/cache');
const restaurantsProvider = require('../src/providers/restaurantsLocator');

const { APP_NAME } = process.env;

const sandbox = sinon.createSandbox();
const API_PATH = `/api/${APP_NAME}`;
const API_KEY = '1234';

chai.use(chaiHttp);

describe('Restaurants locator tests', async () => {
  afterEach(() => sandbox.restore());

  it('Logged user should request restaurants with lat and long', async () => {
    sandbox.stub(cache, 'getToken').resolves('1token1234');
    sandbox.stub(restaurantsProvider, 'locate').resolves('Fancy Eats');

    return chai
      .request(app)
      .get(`${API_PATH}/restaurant/locate?lat=4.703797&lng=20,-74.029817`)
      .set('Authorization', 'sergio')
      .set('API_KEY', API_KEY)
      .set('token', '1token1234')
      .set('user', 'segio')
      .then(({ status }) => {
        assert.equal(status, 200);
      });
  });

  it('Should fail users request if token does not match', async () => {
    sandbox.stub(cache, 'getToken').resolves('space');

    return chai
      .request(app)
      .get(`${API_PATH}/restaurant/locate?lat=4.703797&lng=20,-74.029817`)
      .set('Authorization', 'sergio')
      .set('API_KEY', API_KEY)
      .set('token', '0000')
      .set('user', 'segio')
      .then(({ status }) => {
        assert.equal(status, 401);
      });
  });

  it('Should fail users request if auth headers are missing', async () => {
    sandbox.stub(cache, 'getToken').resolves('space');

    return chai
      .request(app)
      .get(`${API_PATH}/restaurant/locate?lat=4.703797&lng=20,-74.029817`)
      .then(({ status }) => {
        assert.equal(status, 401);
      });
  });
});
