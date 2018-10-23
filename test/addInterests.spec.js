import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

chai.use(chaiHttp);
const { assert, expect } = chai;
let userToken1;

describe('TEST ADD INTERESTS/CATEGORY', () => {
  before('get a user token', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/auth/login')
      .send({
        email: 'johndoe@gmail.com',
        password: 'paSS1234'
      })
      .end((err, res) => {
        userToken1 = res.body.data.token;
        done(err);
      });
  });
  it('should return "Interest added"', (done) => {
    chai
      .request(app)
      .put('/api/v1/users/interests')
      .set('authorization', userToken1)
      .send({ category: 13 })
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.data.message).to.equal('Interest added');
        done(err);
      });
  });
  it('should return "Interest already exists"', (done) => {
    chai
      .request(app)
      .put('/api/v1/users/interests')
      .set('authorization', userToken1)
      .send({ category: 13 })
      .end((err, res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.data.message).to.equal('Interest already exists');
        done(err);
      });
  });
  it('should return "Unable to add interest; a corresponding category does not exist"', (done) => {
    chai
      .request(app)
      .put('/api/v1/users/interests')
      .set('authorization', userToken1)
      .send({ category: 133456 })
      .end((err, res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.data.message).to.equal('Unable to add interest; a corresponding category does not exist');
        done(err);
      });
  });
  it('should fail if category is not provided', (done) => {
    chai
      .request(app)
      .put('/api/v1/users/interests')
      .set('authorization', userToken1)
      .send({ categoryyy: 13 })
      .end((err, res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.data.messages[0]).to.equal('Please provide category');
        done(err);
      });
  });
  it('should fail if category value is not an integer', (done) => {
    chai
      .request(app)
      .put('/api/v1/users/interests')
      .set('authorization', userToken1)
      .send({ category: '13ab' })
      .end((err, res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.data.message).to.equal('Category value must be an integer');
        done(err);
      });
  });
});
