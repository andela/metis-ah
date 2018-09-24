// globals assert, expect, describe
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

chai.use(chaiHttp);
const { expect, should } = chai;
should();

let hashedToken;

describe('ARTICLE ENDPOINT TESTS', () => {
  // REGISTERS A NEW USER TO AVOID FOREIGN KEY ERROR
  before('Register a new user', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/auth/login')
      .send({
        email: 'postman@gmail.com',
        password: 'Password'
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        hashedToken = res.body.data.token;
        done();
      });
  });

  describe('USER READING STATISTICS ENDPOINT TESTS', () => {
    it('should fail when query string is defined but neither of these (week,month,all)', (done) => {
      chai
        .request(app)
        .get('/api/v1/users/me/statistics')
        .query({ q: 'tuesdaylastweek' })
        .set('authorization', hashedToken)
        .end((err, res) => {
          res.status.should.eq(400);
          res.body.status.should.eq('fail');
          res.body.data.message.should.eq('Invalid Query value. Expects q to equal (week|month|all)');
          done();
        });
    });

    it('should return all statistics data successfully when query string is not defined', (done) => {
      chai
        .request(app)
        .get('/api/v1/users/me/statistics')
        .set('authorization', hashedToken)
        .end((err, res) => {
          res.status.should.eq(200);
          res.body.status.should.eq('success');
          res.body.data.message.should.eq('Operation Successful');
          res.body.data.statisticsCount.should.be.a('number');
          done();
        });
    });

    it('should return 3 statistics data successfully when query string equal `week`', (done) => {
      chai
        .request(app)
        .get('/api/v1/users/me/statistics')
        .query({ q: 'week' })
        .set('authorization', hashedToken)
        .end((err, res) => {
          res.status.should.eq(200);
          res.body.status.should.eq('success');
          res.body.data.message.should.eq('Operation Successful');
          res.body.data.statisticsCount.should.eq(3);
          done();
        });
    });

    it('should return 5 statistics data successfully when query string equal `month`', (done) => {
      chai
        .request(app)
        .get('/api/v1/users/me/statistics')
        .query({ q: 'month' })
        .set('authorization', hashedToken)
        .end((err, res) => {
          res.status.should.eq(200);
          res.body.status.should.eq('success');
          res.body.data.message.should.eq('Operation Successful');
          res.body.data.statisticsCount.should.eq(5);
          done();
        });
    });

    it('should return all statistics data successfully when query string equal `all`', (done) => {
      chai
        .request(app)
        .get('/api/v1/users/me/statistics')
        .query({ q: 'all' })
        .set('authorization', hashedToken)
        .end((err, res) => {
          res.status.should.eq(200);
          res.body.status.should.eq('success');
          res.body.data.message.should.eq('Operation Successful');
          res.body.data.statisticsCount.should.eq(6);
          done();
        });
    });
  });
});
