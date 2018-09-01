import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

chai.use(chaiHttp);
const { should } = chai;
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
    it('signup incomplete properties', () => {
      chai
        .request(app)
        .post('/users/auth/signup')
        .send({
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.property('status');
          res.body.should.have.property('message');
          res.body.message.should.eql('Please provide firstname\nPlease provide lastname\nPlease provide email\nPlease provide password\n');
        });
    });
    it('signup firstname and lastname error', () => {
      chai
        .request(app)
        .post('/users/auth/signup')
        .send({
          firstname: '     ',
          lastname: '      ',
          email: 'test.tester@email.com',
          password: 'jdwndsiIUBDIijbikb'
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.property('status');
          res.body.should.have.property('message');
          res.body.message.should.eql('Firstname cannot be an empty string\nLastname cannot be an empty string\n');
        });
    });
    it('signup email error', () => {
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
        });
    });
    it('signup password error', () => {
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
        });
    });
    it('signup password error', () => {
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
