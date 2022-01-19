const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const assert = require('assert');
const bcrypt = require('bcrypt');
const app = require('../index');

const usersRepository = require('../src/repositories/users');
const { getToken } = require('../src/repositories/cache');

const { APP_NAME } = process.env;

const sandbox = sinon.createSandbox();
const API_PATH = `/api/${APP_NAME}`;
const API_KEY = '1234';

chai.use(chaiHttp);

describe('Users management', async () => {
  afterEach(() => sandbox.restore());

  it('Should register user in DB', async () => {
    sandbox.stub(usersRepository, 'saveUser').resolves('');

    return chai
      .request(app)
      .post(`${API_PATH}/user/register`)
      .set('Authorization', 'sergio')
      .set('API_KEY', API_KEY)
      .send({
        username: 'sergio',
        password: '1234',
      })
      .then(({ status }) => {
        assert.equal(status, 201);
      });
  });

  it('Should fail registration if body is wrong', async () => chai
    .request(app)
    .post(`${API_PATH}/user/register`)
    .set('Authorization', 'sergio')
    .set('API_KEY', API_KEY)
    .send({
      usme: 'sergio',
      paord: '1234',
    })
    .then(({ status }) => {
      assert.equal(status, 400);
    }));

  it('Should fail registration if credentials are not sent', async () => chai
    .request(app)
    .post(`${API_PATH}/user/register`)
    .send({
      username: 'sergio',
      password: '1234',
    })
    .then(({ status }) => {
      assert.equal(status, 401);
    }));

  it('Should login user with token returned', async () => chai
    .request(app)
    .post(`${API_PATH}/user/login`)
    .set('Authorization', 'sergio')
    .set('API_KEY', API_KEY)
    .send({
      username: 'sergio',
      password: '1234',
    })
    .then(({ status }) => {
      assert.equal(status, 200);
    }));

  it('Should fail login if it wasnt previously registered', async () => {
    sandbox.stub(bcrypt, 'compareSync').resolves(false);

    // user jhoncena was not registered in first test
    return chai
      .request(app)
      .post(`${API_PATH}/user/login`)
      .set('Authorization', 'sergio')
      .set('API_KEY', API_KEY)
      .send({
        username: 'jhoncena',
        password: '1234',
      })
      .then(({ status }) => {
        assert.equal(status, 401);
      });
  });

  it('Should fail login if request body is not formatted', async () => chai
    .request(app)
    .post(`${API_PATH}/user/login`)
    .set('Authorization', 'sergio')
    .set('API_KEY', API_KEY)
    .send({
      mee: 'jhoncena',
      seeks: '1234',
    })
    .then(({ status }) => {
      assert.equal(status, 400);
    }));

  it('Should logout user', async () => {
    await chai
      .request(app)
      .get(`${API_PATH}/user/logout/sergio`)
      .set('Authorization', 'sergio')
      .set('API_KEY', API_KEY)
      .then(({ status }) => {
        assert.equal(status, 200);
      });

    const searchResult = await getToken('sergio');
    assert.equal(searchResult, undefined);
  });

  it('Should get user transactions (requests for restaurant locations)', async () => chai
    .request(app)
    .get(`${API_PATH}/user/transactions/sergio`)
    .set('Authorization', 'sergio')
    .set('API_KEY', API_KEY)
    .then(({ status }) => {
      assert.equal(status, 200);
    }));
});
