import chai from 'chai';
import chaiHttp from 'chai-http';
import nock from 'nock';
import app from '../server/app';

chai.use(chaiHttp);
const { should, expect } = chai;
should();

describe('SOCIAL MEDIA AUTHENTICATION', () => {
  before(() => {
    nock('https://accounts.google.com')
      .filteringPath(() => '/')
      .get('/')
      .reply(200, 'Google auth request sent.');

    nock('https://www.facebook.com/')
      .filteringPath(() => '/')
      .get('/')
      .reply(200, 'Facebook auth request sent.');
  });

  // This test proves that the google authentication route is called
  it('Authenticate with google', ((done) => {
    chai
      .request(app)
      .get('/api/v1/users/auth/google')
      .end((err, res) => {
        expect(res.text).to.be.equal('Google auth request sent.');
        done();
      });
  }));

  // This test proves that the facebook authentication route is called
  it('Authenticate with facebook', ((done) => {
    chai
      .request(app)
      .get('/api/v1/users/auth/facebook')
      .end((err, res) => {
        expect(res.text).to.be.equal('Facebook auth request sent.');
        done();
      });
  }));
});
