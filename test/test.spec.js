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
    it('signup incomplete properties', (done) => {
      chai
        .request(app)
        .post('/api/users/auth/signup')
        .send({
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.property('status');
          res.body.should.have.property('messages');
          res.body.messages.should.eql(['Please provide firstname', 'Please provide lastname', 'Please provide email', 'Please provide password']);
          done();
        });
    });
    it('signup firstname and lastname error', (done) => {
      chai
        .request(app)
        .post('/api/users/auth/signup')
        .send({
          firstname: '     ',
          lastname: '      ',
          email: 'test.tester@email.com',
          password: 'jdwndsiIUBDIijbikb'
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.property('status');
          res.body.should.have.property('messages');
          res.body.messages.should.eql(['Firstname cannot be an empty string', 'Lastname cannot be an empty string']);
          done();
        });
    });
    it('signup email error', (done) => {
      chai
        .request(app)
        .post('/api/users/auth/signup')
        .send({
          firstname: 'Opeoluwa',
          lastname: 'Iyi-Kuyoro',
          email: 'test.testeremail.com',
          password: 'PasswordDD'
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.property('status');
          res.body.should.have.property('messages');
          res.body.messages.should.eql(['Invalid email provided']);
          done();
        });
    });
    it('signup password error', (done) => {
      chai
        .request(app)
        .post('/api/users/auth/signup')
        .send({
          firstname: 'Opeoluwa',
          lastname: 'Iyi-Kuyoro',
          email: 'test.tester@email.com',
          password: 'asswordlksndv'
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.property('status');
          res.body.should.have.property('messages');
          res.body.messages.should.eql(['Password must include at least one uppercase and lowercase character']);
          done();
        });
    });
    it('signup password error', (done) => {
      chai
        .request(app)
        .post('/api/users/auth/signup')
        .send({
          firstname: 'Opeoluwa',
          lastname: 'Iyi-Kuyoro',
          email: 'test.tester@email.com',
          password: 'asDndv'
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.property('status');
          res.body.should.have.property('messages');
          res.body.messages.should.eql(['Password should be more than 8 characters']);
          done();
        });
    });
  });

  // TODO: Tomi please adjust this as approprate
  describe('Successful signup', () => {
    it('users successfully signup', (done) => {
      chai
        .request(app)
        .post('/api/users/auth/signup')
        .send({
          firstname: 'Opeoluwa',
          lastname: 'Iyi-Kuyoro',
          email: 'test.tester@email.com',
          password: 'jdwndsiIUBDIijbikb'
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.property('messages');
          res.body.messages.should.eql(['everything is ok, good to go']);
          done();
        });
    });
  });
});
