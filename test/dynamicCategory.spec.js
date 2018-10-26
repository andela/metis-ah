import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

chai.use(chaiHttp);
const { assert, expect } = chai;
let userToken1;
let userToken2;
const invalidToken = '864d50ce352424924fa44bf7c3c5d761d939c3135b7e2e412a5466a32a09c423b28a4a3e69859b6858d1d68b505266c828de0fd9840a614f90291d0b68e4fd683dbf9d7deec9b07bdad538f788d322b6fd06aea220c653952c1d73740356735b6fd56f7f7d5c1148fd08e9d99c7cb8d96badc68c298ed7dab4f274bc85defe0c27426aabb84f7d07b8305feff382894f25b0e22288ae3f5f99a584ccf65080aab1b0d346590297afeefe09333880a748fc7f54f97b';

describe('TEST DYNAMIC CATEGORY', () => {
  before('get user1 token', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/auth/login')
      .send({
        email: 'postman@gmail.com',
        password: 'Password'
      })
      .end((err, res) => {
        userToken1 = res.body.data.token;
        done(err);
      });
  });
  before('get user2 token', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/auth/login')
      .send({
        email: 'johndoe@gmail.com',
        password: 'paSS1234'
      })
      .end((err, res) => {
        userToken2 = res.body.data.token;
        done(err);
      });
  });
  it('should return 10 categories for user with 10 or more interests', (done) => {
    chai
      .request(app)
      .get('/api/v1/categories')
      .set('authorization', userToken1)
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.data.categories);
        assert.notExists(res.body.data.metadata);
        done(err);
      });
  });
  it('should return 10 categories for user with less than 10 interests', (done) => {
    chai
      .request(app)
      .get('/api/v1/categories')
      .set('authorization', userToken2)
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.data.categories);
        assert.notExists(res.body.data.metadata);
        done(err);
      });
  });
  it('should return default categories if user is not logged in', (done) => {
    chai
      .request(app)
      .get('/api/v1/categories')
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        assert.exists(res.body.data.metadata);
        done(err);
      });
  });
  it('should return default categories if token is invalid', (done) => {
    chai
      .request(app)
      .get('/api/v1/categories')
      .set('authorization', invalidToken)
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        assert.exists(res.body.data.metadata);
        done(err);
      });
  });
});
