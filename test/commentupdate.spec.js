import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

chai.use(chaiHttp);
const { should } = chai;
should();

let token;
let tokenJohn;

describe('Tests for Update Comments', () => {
  describe('update comment tests', () => {
    before((done) => {
      chai
        .request(app)
        .post('/api/v1/users/auth/login')
        .send({
          email: 'postman@gmail.com',
          password: 'Password'
        })
        .end((err, res) => {
          token = res.body.data.token;
          res.body.should.have.property('data');
          done();
        });
    });
    before((done) => {
      chai
        .request(app)
        .post('/api/v1/users/auth/login')
        .send({
          email: 'johndoe@gmail.com',
          password: 'paSS1234'
        })
        .end((err, res) => {
          tokenJohn = res.body.data.token;
          res.body.should.have.property('data');
          done();
        });
    });

    it('should fail if commentId is invalid', (done) => {
      chai
        .request(app)
        .put('/api/v1/articles/1/comments/err')
        .set('Authorization', token)
        .send({
          content: 'Your post was not inspiring.'
        })
        .end((err, res) => {
          res.body.status.should.equal('fail');
          res.body.data.message.should.equal('Invalid commentId');
          done();
        });
    });
    it('should fail if articleId is invalid', (done) => {
      chai
        .request(app)
        .put('/api/v1/articles/err/comments/1')
        .set('Authorization', token)
        .send({
          content: 'Your post was not inspiring.'
        })
        .end((err, res) => {
          res.body.status.should.equal('fail');
          res.body.data.message.should.equal('Invalid articleId');
          done();
        });
    });
    it('should fail if replyId is invalid', (done) => {
      chai
        .request(app)
        .put('/api/v1/articles/1/comments/1/reply/err')
        .set('Authorization', token)
        .send({
          content: 'I have changed my mind.'
        })
        .end((err, res) => {
          res.body.status.should.equal('fail');
          res.body.data.message.should.equal('Invalid replyId');
          done();
        });
    });
    it('should update comment', (done) => {
      chai
        .request(app)
        .put('/api/v1/articles/1/comments/1')
        .set('Authorization', token)
        .send({
          content: 'I have changed my mind: the comment.'
        })
        .end((err, res) => {
          res.body.status.should.equal('success');
          res.body.data.message.should.equal('Comment updated');
          done();
        });
    });
    it('should update reply', (done) => {
      chai
        .request(app)
        .put('/api/v1/articles/1/comments/1/reply/1')
        .set('Authorization', token)
        .send({
          content: 'I have changed my mind.'
        })
        .end((err, res) => {
          res.body.status.should.equal('success');
          res.body.data.message.should.equal('Reply updated');
          done();
        });
    });
    it('should update reply', (done) => {
      chai
        .request(app)
        .put('/api/v1/articles/1/comments/13726352')
        .set('Authorization', token)
        .send({
          content: 'I have changed my mind.'
        })
        .end((err, res) => {
          res.body.status.should.equal('fail');
          res.body.data.message.should.equal('comment does not exist');
          done();
        });
    });
    it('should fail if user attempts to update another users comment', (done) => {
      chai
        .request(app)
        .put('/api/v1/articles/1/comments/1')
        .set('Authorization', tokenJohn)
        .send({
          content: 'I have changed my mind.'
        })
        .end((err, res) => {
          res.body.status.should.equal('fail');
          res.body.data.message.should.equal('You cannot update this comment');
          done();
        });
    });
  });
});
