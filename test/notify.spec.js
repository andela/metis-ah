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
        expect(res).to.have.status(200);
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
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.data.notifications);
        done(err);
      });
  });
  it('should get one notifications', (done) => {
    chai
      .request(app)
      .get('/api/v1/notifications/2')
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.data.receiverId).to.equal(1);
        expect(res.body.data.actorId).to.equal(3);
        expect(res.body.data.notifiable).to.equal('articles');
        expect(res.body.data.notifiableId).to.equal(4);
        expect(res.body.data.isRead).to.equal(true);
        done(err);
      });
  });
  it('returns an error if a notification does not exist', () => {
    chai
      .request(app)
      .get('/api/v1/notifications/100')
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.status).to.equal('error');
        expect(res.body.message).to.equal('Notification does not exist');
      });
  });
  it('should mark a notifications as read', (done) => {
    chai
      .request(app)
      .put('/api/v1/notifications/4')
      .set('authorization', userToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.data).to.equal('Notification successfully marked as read');
        done(err);
      });
  });
  it('should not mark a notifications as read twice', (done) => {
    chai
      .request(app)
      .put('/api/v1/notifications/4')
      .set('authorization', userToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body.status).to.equal('error');
        expect(res.body.message).to.equal('Notification has all ready been marked as read');
        done(err);
      });
  });
  it('should clear one notification', (done) => {
    chai
      .request(app)
      .delete('/api/v1/notifications/3')
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.data).to.equal('Notification deleted successfully');
        done(err);
      });
  });
  it('returns an error if user tries to cldar a notification that does not exist', () => {
    chai
      .request(app)
      .delete('/api/v1/notifications/120')
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.status).to.equal('error');
        expect(res.body.message).to.equal('Notificaiton not found');
      });
  });
  it('should clear all read notifications', (done) => {
    chai
      .request(app)
      .delete('/api/v1/notifications/read')
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.data).to.equal('All read notifications have been deleted');
        done(err);
      });
  });
  it('should mark all notifications as read', (done) => {
    chai
      .request(app)
      .put('/api/v1/notifications')
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.data).to.equal('All notifications have been marked as read');
        done(err);
      });
  });
  it('should delete all notifications of a user', (done) => {
    chai
      .request(app)
      .delete('/api/v1/notifications')
      .set('authorization', userToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.data).to.equal('All Notifications have been deleted');
        done(err);
      });
  });
  it('returns an error if no notification exists for a user', () => {
    chai
      .request(app)
      .delete('/api/v1/notifications')
      .set('authorization', userToken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.status).to.equal('error');
        expect(res.body.message).to.equal('No notifications found');
      });
  });
});
