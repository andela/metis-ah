import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

chai.use(chaiHttp);
const { should } = chai;
should();

let token;

describe('Tests for Comments', () => {
  describe('Create comment tests', () => {
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

    it('User should not be able to comment if not authenticated', (done) => {
      chai
        .request(app)
        .post('/api/v1/articles/1/comments')
        .send({
          content: 'Your post was not inspiring.'
        })
        .end((err, res) => {
          res.body.status.should.equal('fail');
          res.body.data.message.should.equal('No token provided');
          done();
        });
    });

    it('User should receive an error if authentication fails', (done) => {
      chai
        .request(app)
        .post('/api/v1/articles/1/comments')
        .set('Authorization', '8beccb8ef75986c7096888907ddf4165889255315b67be782a3333eeeeee')
        .send({
          content: 'Your post was not inspiring.'
        })
        .end((err, res) => {
          res.body.status.should.equal('fail');
          res.body.data.message.should.equal('Failed to authenticate token! Valid token required');
          done();
        });
    });

    it('It should fail if comment is empty', (done) => {
      chai
        .request(app)
        .post('/api/v1/articles/1/comments')
        .set('Authorization', token)
        .send({
          content: ''
        })
        .end((err, res) => {
          res.body.status.should.equal('fail');
          res.body.data.should.equal('Comment is empty');
          done();
        });
    });

    it('It should return an object containing a user and a comment object', (done) => {
      chai
        .request(app)
        .post('/api/v1/articles/1/comments')
        .set('Authorization', token)
        .send({
          content: 'Your post was not inspiring.'
        })
        .end((err, res) => {
          res.body.data.should.have.property('user');
          res.body.data.comment.content.should.equal('Your post was not inspiring.');
          done();
        });
    });

    it('It should fail is article does not exist', (done) => {
      chai
        .request(app)
        .post('/api/v1/articles/13431/comments')
        .set('Authorization', token)
        .send({
          content: 'Your post was not inspiring.'
        })
        .end((err, res) => {
          res.body.status.should.equal('fail');
          res.body.data.message.should.equal('Article not found');
          done();
        });
    });
  });
});
