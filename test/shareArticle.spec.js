import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

chai.use(chaiHttp);
const { expect } = chai;

describe('Share Article Test', () => {
  let testToken;
  before('Login user', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/auth/login')
      .send({
        email: 'postman@gmail.com',
        password: 'Password'
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        testToken = res.body.data.token;
        done();
      });
  });

  it('should return Invalid articleId', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles/a/share')
      .set('authorization', testToken)
      .send()
      .end((err, res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.data.message).to.equal('Invalid articleId');
        done();
      });
  });

  it('should return article not found', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles/900/share')
      .set('authorization', testToken)
      .send()
      .end((err, res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.data.message).to.equal('Article not found');
        done();
      });
  });

  it('should return share successful', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles/1/share')
      .set('authorization', testToken)
      .send({
        sharedPlatform: 'twitter',
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.data.message).to.equal('Article has been shared');
        done();
      });
  });
});
