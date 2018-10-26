import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

chai.use(chaiHttp);
const { expect } = chai;
let userToken1;

describe('TEST INTERESTS/CATEGORY', () => {
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
  it('should successfully add interests', (done) => {
    chai
      .request(app)
      .put('/api/v1/users/interests')
      .set('authorization', userToken1)
      .send({ category: [1, 2, 3, 4] })
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.data.message).to.equal('1 interests were added; 2 interests already existed');
        done(err);
      });
  });
  it('should return "Interest already exists"', (done) => {
    chai
      .request(app)
      .put('/api/v1/users/interests')
      .set('authorization', userToken1)
      .send({ category: [1, 2, 3, 4] })
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.data.message).to.equal('0 interests were added; 3 interests already existed');
        done(err);
      });
  });
  it('should fail if category is not provided', (done) => {
    chai
      .request(app)
      .put('/api/v1/users/interests')
      .set('authorization', userToken1)
      .send({ categoryyy: [] })
      .end((err, res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.data.messages[0]).to.equal('Please provide category');
        done(err);
      });
  });
  it('should fail if category value is not an array', (done) => {
    chai
      .request(app)
      .put('/api/v1/users/interests')
      .set('Authorization', userToken1)
      .send({ category: '13ab' })
      .end((err, res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.data.messages).to.equal('Interests must be an array of category ids');
        done(err);
      });
  });
  it('should fail if category array is empty', (done) => {
    chai
      .request(app)
      .put('/api/v1/users/interests')
      .set('Authorization', userToken1)
      .send({ category: [] })
      .end((err, res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.data.messages).to.equal('Category ids array is empty');
        done(err);
      });
  });
  it('should fail if category value is not an integer', (done) => {
    chai
      .request(app)
      .put('/api/v1/users/interests')
      .set('Authorization', userToken1)
      .send({ category: [1, '2a', 3, 4] })
      .end((err, res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.data.messages).to.equal('Interests array elements must be integers');
        done(err);
      });
  });
  it('should successfully remove interests', (done) => {
    chai
      .request(app)
      .delete('/api/v1/users/interests')
      .set('authorization', userToken1)
      .send({ category: [1, 2, 3, 4] })
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.data.message).to.equal('3 interests were removed; 1 of the interests were not associated with you');
        done(err);
      });
  });
  it('should return "0" removed', (done) => {
    chai
      .request(app)
      .delete('/api/v1/users/interests')
      .set('authorization', userToken1)
      .send({ category: [1, 2, 3, 4] })
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.data.message).to.equal('0 interests were removed; 4 of the interests were not associated with you');
        done(err);
      });
  });
});
