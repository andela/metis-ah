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
      .get('/api/v1/notifications/2')
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body).to.have.property('notify');
        expect(res.body.notify).to.have.property('receiverId');
        expect(res.body.notify).to.have.property('actorId');
        expect(res.body.notify).to.have.property('action');
        expect(res.body.notify).to.have.property('notifiable');
        expect(res.body.notify).to.have.property('notifiableId');
        expect(res.body.notify).to.have.property('isRead');
        expect(res.body.notify).to.have.property('createdAt');
        expect(res.body.notify).to.have.property('updatedAt');
        done(err);
      });
  });
  it('should mark a notifications as read', (done) => {
    chai
      .request(app)
      .put('/api/v1/notifications/4')
      .set('authorization', userToken)
      .set('Accept', 'application/json')
      .send({ readStatus: 'setAsRead' })
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('Notification successfully marked as read');
        done(err);
      });
  });
  it('should not mark a notifications as read twice', (done) => {
    chai
      .request(app)
      .put('/api/v1/notifications/4')
      .set('authorization', userToken)
      .set('Accept', 'application/json')
      .send({ readStatus: 'setAsRead' })
      .end((err, res) => {
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('Notification has all ready been marked as read');
        done(err);
      });
  });
  it('returns an error if no body is provided', (done) => {
    chai
      .request(app)
      .put('/api/v1/notifications/4')
      .set('authorization', userToken)
      .set('Accept', 'application/json')
      .send({ readStatus: '' })
      .end((err, res) => {
        expect(res.body.status).to.equal('error');
        expect(res.body.error).to.equal('You need to set this notification as read');
        done(err);
      });
  });
  it('should clear one notification', (done) => {
    chai
      .request(app)
      .delete('/api/v1/notifications/3')
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('Notification deleted successfully');
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
        expect(res.body.message).to.equal('All read notifications have been deleted');
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
        expect(res.body.message).to.equal('All notifications have been marked as read');
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
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('All Notifications have been deleted');
        done(err);
      });
  });
});
