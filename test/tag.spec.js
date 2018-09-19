import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

chai.use(chaiHttp);
const { expect } = chai;
let userToken;
describe('TEST ALL TAGS ENDPOINT', () => {
  before('get a user token', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/auth/login')
      .send({
        username: 'tagger',
        email: 'tagger@gmail.com',
        password: 'Password'
      })
      .end((err, res) => {
        userToken = res.body.data.token;
        done(err);
      });
  });
  it('should get all tags', (done) => {
    chai
      .request(app)
      .get('/api/v1/tags')
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.data.tags);
        done(err);
      });
  });
  it('should get a tag', (done) => {
    chai
      .request(app)
      .get('/api/v1/tags/nodejs')
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.data.tag);
        expect(res.body.data.tag.articles);
        done(err);
      });
  });
  it('should not get a tag for wrong name', (done) => {
    chai
      .request(app)
      .get('/api/v1/tags/wrongName')
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.data.message);
        done(err);
      });
  });
});
