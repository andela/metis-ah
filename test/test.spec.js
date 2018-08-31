import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

chai.use(chaiHttp);
const { assert, expect, should } = chai;
should();

describe('TEST ALL ENDPOINT', () => {
  describe('Initial testing', () => {
    it('should return welcome to sims', (done) => {
      chai
        .request(app)
        .get('/')
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.should.eql('Welcome to the sims program');
          done();
        });
    });
  });

  describe('Descriptive error messages:', () => {
    it('signup firstname error', (done) => {
      chai
        .request(app)
        .post('/users/auth/signup')
        .send({
          firstname: '     ',
          lastname: 'Iyi-Kuyoro',
          email: 'test.tester@email.com',
          password: 'jdwndsiIUBDIijbikb'
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.property('status');
          res.body.should.have.property('message');
          res.body.message.should.eql('Firstname cannot be an empty string');
          done();
        });
    });
    it('signup lastname error', (done) => {
      chai
        .request(app)
        .post('/users/auth/signup')
        .send({
          firstname: 'ndcsdocn',
          lastname: '    ',
          email: 'test.tester@email.com',
          password: 'jdwndsiIUBDIijbikb'
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.property('status');
          res.body.should.have.property('message');
          res.body.message.should.eql('Lastname cannot be an empty string');
          done();
        });
    });
    it('signup email error', (done) => {
      chai
        .request(app)
        .post('/users/auth/signup')
        .send({
          firstname: 'Opeoluwa',
          lastname: 'Iyi-Kuyoro',
          email: 'test.testeremail.com',
          password: 'PasswordDD'
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.property('status');
          res.body.should.have.property('message');
          res.body.message.should.equal('Invalid email provided\n');
          done();
        });
    });
    it('signup password error', (done) => {
      chai
        .request(app)
        .post('/users/auth/signup')
        .send({
          firstname: 'Opeoluwa',
          lastname: 'Iyi-Kuyoro',
          email: 'test.tester@email.com',
          password: 'asswordlksndv'
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.property('status');
          res.body.should.have.property('message');
          res.body.message.should.equal('Password must include at least one uppercase and lowercase character\n');
          done();
        });
    });
    it('signup password error', (done) => {
      chai
        .request(app)
        .post('/users/auth/signup')
        .send({
          firstname: 'Opeoluwa',
          lastname: 'Iyi-Kuyoro',
          email: 'test.tester@email.com',
          password: 'assndv'
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.property('status');
          res.body.should.have.property('message');
          res.body.message.should.equal('Password should be more than 8 characters\n');
          done();
        });
    });
  });

  // TODO: Tomi please adjust this as approprate
  describe('Successful signup', () => {
    it('users successfully signup', (done) => {
      chai
        .request(app)
        .post('/users/auth/signup')
        .send({
          firstname: 'Opeoluwa',
          lastname: 'Iyi-Kuyoro',
          email: 'test.tester@email.com',
          password: 'jdwndsiIUBDIijbikb'
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.property('message');
          res.body.message.should.eql('everything is ok, good to go');
          done();
        });
    });
  });
});
