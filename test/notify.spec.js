import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

chai.use(chaiHttp);
const { expect } = chai;
let userToken;
describe('TEST ALL NOTIFICATION ENDPOINTS', () => {
  before('get a user token', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/auth/login')
      .send({
        email: 'postman@gmail.com',
        password: 'Password'
      })
      .end((err, res) => {
        userToken = res.body.data.token;
        done(err);
      });
  });
  it('should get all unread notifications', (done) => {
    chai
      .request(app)
      .get('/api/v1/notifications')
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.data.notifications);
        expect(res.body.data.notifications[0].isRead).to.equal(false);
        done(err);
      });
  });
  it('should get all notifications history', (done) => {
    chai
      .request(app)
      .get('/api/v1/notifications/history')
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.data.notifications);
        done(err);
      });
  });
  it('should get one notifications', (done) => {
    chai
      .request(app)
      .get('/api/v1/notifications/8')
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.data.user);
        done(err);
      });
  });
  it('should mark one notifications as read ', (done) => {
    chai
      .request(app)
      .put('/api/v1/notifications/7')
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.data.notifications);
        done(err);
      });
  });
  it('should clear one notifications', (done) => {
    chai
      .request(app)
      .delete('/api/v1/notifications/2')
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.data.notifications);
        done(err);
      });
  });
  it('should clear all read notifications', (done) => {
    chai
      .request(app)
      .delete('/api/v1/notifications/read')
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.data.notifications);
        done(err);
      });
  });
  it('should mark all notifications as read', (done) => {
    chai
      .request(app)
      .put('/api/v1/notifications')
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.data.notifications);
        done(err);
      });
  });
  it('should clear all notifications', (done) => {
    chai
      .request(app)
      .delete('/api/v1/notifications')
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.data.notifications);
        done(err);
      });
  });
});
