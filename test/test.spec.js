import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';
import './socialLogin.spec';
import generateToken from '../server/helpers/generateToken';
import Mailer from '../server/helpers/utils/mailer';

chai.use(chaiHttp);
const { should, expect } = chai;
should();

const unVerifiedToken = generateToken(7200, { id: 1, isVerified: false });
const verifiedToken = generateToken(7200, { id: 1, isVerified: true });
describe('TEST ALL ENDPOINT', () => {
  describe('Initial testing', () => {
    it('should return welcome to sims', (done) => {
      chai
        .request(app)
        .get('/')
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.property('data');
          res.body.data.message.should.eql('Welcome to the sims program');
          done();
        });
    });
  });

  describe('Descriptive error messages:', () => {
    it('signup incomplete properties', (done) => {
      chai
        .request(app)
        .post('/api/v1/users/auth/signup')
        .send({
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.property('status');
          res.body.data.should.have.property('messages');
          res.body.data.messages.should.eql(['Please provide username', 'Please provide email', 'Please provide password']);
          done();
        });
    });
    it('login incomplete properties', (done) => {
      chai
        .request(app)
        .post('/api/v1/users/auth/login')
        .send({
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.property('status');
          res.body.data.should.have.property('messages');
          res.body.data.messages.should.eql(['Please provide email', 'Please provide password']);
          done();
        });
    });
    it('login incomplete properties', (done) => {
      chai
        .request(app)
        .post('/api/v1/users/auth/login')
        .send({
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.property('status');
          res.body.data.should.have.property('messages');
          res.body.data.messages.should.eql(['Please provide email', 'Please provide password']);
          done();
        });
    });
    it('signup username error', (done) => {
      chai
        .request(app)
        .post('/api/v1/users/auth/signup')
        .send({
          username: '     ',
          email: 'test.tester@email.com',
          password: 'jdwndsiIUBDIijbikb'
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.property('status');
          res.body.data.should.have.property('messages');
          res.body.data.messages.should.eql(['username cannot be an empty string']);
          done();
        });
    });
    it('signup email error', (done) => {
      chai
        .request(app)
        .post('/api/v1/users/auth/signup')
        .send({
          username: 'IyiKuyoro',
          email: 'test.testeremail.com',
          password: 'PasswordDD'
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.property('status');
          res.body.data.should.have.property('messages');
          res.body.data.messages.should.eql(['Invalid email provided']);
          done();
        });
    });
    it('login email error', (done) => {
      chai
        .request(app)
        .post('/api/v1/users/auth/login')
        .send({
          username: 'IyiKuyoro',
          email: 'test.testeremail.com',
          password: 'PasswordDD'
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.property('status');
          res.body.data.should.have.property('messages');
          res.body.data.messages.should.eql(['Invalid email provided']);
          done();
        });
    });
    it('login email error', (done) => {
      chai
        .request(app)
        .post('/api/v1/users/auth/login')
        .send({
          username: 'IyiKuyoro',
          email: 'test.testeremail.com',
          password: 'PasswordDD'
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.property('status');
          res.body.data.should.have.property('messages');
          res.body.data.messages.should.eql(['Invalid email provided']);
          done();
        });
    });
    it('signup password error', (done) => {
      chai
        .request(app)
        .post('/api/v1/users/auth/signup')
        .send({
          username: 'IyiKuyoro',
          email: 'test.tester@email.com',
          password: 'asswordlksndv'
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.property('status');
          res.body.data.should.have.property('messages');
          res.body.data.messages.should.eql(['Password must include at least one uppercase and lowercase character']);
          done();
        });
    });
    it('login password error', (done) => {
      chai
        .request(app)
        .post('/api/v1/users/auth/login')
        .send({
          email: 'test.tester@email.com',
          password: 'asswordlksndv'
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.property('status');
          res.body.data.should.have.property('messages');
          res.body.data.messages.should.eql(['Password must include at least one uppercase and lowercase character']);
          done();
        });
    });
    it('login password error', (done) => {
      chai
        .request(app)
        .post('/api/v1/users/auth/login')
        .send({
          email: 'test.tester@email.com',
          password: 'asswordlksndv'
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.property('status');
          res.body.data.should.have.property('messages');
          res.body.data.messages.should.eql(['Password must include at least one uppercase and lowercase character']);
          done();
        });
    });
    it('signup password error', (done) => {
      chai
        .request(app)
        .post('/api/v1/users/auth/signup')
        .send({
          username: 'IyiKuyoro',
          email: 'test.tester@email.com',
          password: 'asDndv'
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          res.body.should.have.property('status');
          res.body.data.should.have.property('messages');
          res.body.data.messages.should.eql(['Password should be more than 8 characters']);
          done();
        });
    });
  });
  describe('Successful signup', () => {
    it('users successfully signup', (done) => {
      chai
        .request(app)
        .post('/api/v1/users/auth/signup')
        .send({
          username: 'IyiKuyoro',
          email: 'test.tester@email.com',
          password: 'jdwndsiIUBDIijbikb'
        })
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.data.message).to.equal('User is signed up, an email is sent to your mail account, please verify your mail account to complete registration');
          done();
        });
    });
    it('users signup with google', (done) => {
      chai
        .request(app)
        .post('/api/users/auth/google/redirect')
        .send({
          user: {
            id: 1,
            firstname: 'Opeoluwa',
            lastname: 'Iyi-Kuyoro',
            email: 'op@ah.metis.com',
            created: true
          }
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          done();
        });
    });
    it('users signup with google', (done) => {
      chai
        .request(app)
        .post('/api/users/auth/google/redirect')
        .send({
          user: {
            id: 1,
            firstname: 'Opeoluwa',
            lastname: 'Iyi-Kuyoro',
            email: 'op@ah.metis.com',
            created: true
          }
        })
        .end((err, res) => {
          res.body.should.be.an('object');
          done();
        });
    });
  });
  describe('USER SIGN UP TEST', () => {
    it('should return user signed up successfully and return token', (done) => {
      chai
        .request(app)
        .post('/api/v1/users/auth/signup')
        .send({
          username: 'JojitoonName',
          email: 'user@gmail.com',
          password: 'Password'
        })
        .end((err, res) => {
          expect(res.body.status).to.equal('success');
          expect(res.body.data.token);
          expect(res.body.data.message).to.equal('User is signed up, an email is sent to your mail account, please verify your mail account to complete registration');
          done();
        });
    });

    it('should return email already exist', (done) => {
      chai
        .request(app)
        .post('/api/v1/users/auth/signup')
        .send({
          username: 'JojitoonName',
          email: 'user@gmail.com',
          password: 'Password'
        })
        .end((err, res) => {
          expect(res.body.data.message).to.equal('email already exist!');
          done();
        });
    });
  });
  describe('VERIFY ACCOUNT', () => {
    it('should send mail to a user', (done) => {
      const testMail = {
        email: 'daniel.adekunle@andela.com',
        subject: 'Just testing out function',
        message: '<strong>Please delete, I am just testing</strong>'
      };
      const result = Mailer.emailHelperfunc(testMail);
      expect(result).to.be.a('Promise');
      done();
    });
    it('Should return a 200 status code', (done) => {
      chai
        .request(app)
        .put(`/api/v1/users/verify/${unVerifiedToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('status');
          res.body.status.should.be.a('string');
          res.body.should.have.property('data');
          res.body.data.should.be.an('object');
          res.body.data.should.have.property('message');
          res.body.data.message.should.be.a('string');
          res.body.data.message.should.be.eql('Your account is verified successfully');
          res.body.data.should.have.property('token');
          res.body.data.token.should.be.a('string');
          done();
        });
    });
    it('Should return a 401 status code', (done) => {
      chai
        .request(app)
        .put(`/api/v1/users/verify/${verifiedToken}`)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.an('object');
          res.body.should.have.property('status');
          res.body.status.should.be.a('string');
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.message.should.be.eql('Your account is already been verified');
          done();
        });
    });
    it('Should return a 401 status code', (done) => {
      chai
        .request(app)
        .put('/api/v1/users/verify/hjgug878gyf65dr4uyiuo8fd5')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.an('object');
          res.body.should.have.property('auth');
          res.body.auth.should.be.a('boolean');
          res.body.auth.should.be.equal(false);
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.message.should.be.eql('Failed to authenticate token! Valid token required');
          done();
        });
    });
  });

  describe('Find All Users', () => {
    it('Should return a 401 status code', (done) => {
      chai
        .request(app)
        .get('/api/v1/users/all')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.an('object');
          res.body.should.have.property('auth');
          res.body.auth.should.be.a('boolean');
          res.body.auth.should.be.equal(false);
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.message.should.be.eql('No token provided');
          done();
        });
    });
    it('Should return a 401 status code', (done) => {
      chai
        .request(app)
        .get('/api/v1/users/all')
        .set('Authorization', `${unVerifiedToken}`)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.an('object');
          res.body.should.have.property('status');
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.message.should.be.eql('You dont have access. please verify your account');
          done();
        });
    });
    it('Should return a 401 status code', (done) => {
      chai
        .request(app)
        .get('/api/v1/users/all')
        .set('Authorization', 'afa0efneoinej8ehbfiow')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.an('object');
          res.body.should.have.property('auth');
          res.body.auth.should.be.a('boolean');
          res.body.auth.should.be.equal(false);
          res.body.should.have.property('message');
          res.body.message.should.be.a('string');
          res.body.message.should.be.eql('Failed to authenticate token! Valid token required');
          done();
        });
    });
    it('Should return a 200 status code', (done) => {
      chai
        .request(app)
        .get('/api/v1/users/all')
        .set('Authorization', `${verifiedToken}`)
        .end((err, res) => {
          const user = res.body.data.users;
          if (!user) {
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.should.have.property('status');
            res.body.status.should.be.a('string');
            res.body.should.have.property('data');
            res.body.data.should.be.an('object');
            res.body.data.should.have.property('message');
            res.body.data.message.should.be.a('string');
            res.body.data.message.should.be.eql('No User Found');
          }
          if (user) {
            res.should.have.status(200);
            res.body.should.be.an('object');
            res.body.should.have.property('status');
            res.body.status.should.be.a('string');
            res.body.should.have.property('data');
            res.body.data.should.be.an('object');
            res.body.data.should.have.property('message');
            res.body.data.message.should.be.a('string');
            res.body.data.message.should.be.eql('Success!');
          }
          done();
        });
    });
  });
  describe('USER SIGN IN TEST', () => {
    it('should return user doesnt exist', (done) => {
      chai
        .request(app)
        .post('/api/v1/users/auth/login')
        .send({
          username: 'myName',
          email: 'use@gmail.com',
          password: 'Password'
        })
        .end((err, res) => {
          expect(res.body.status).to.equal('error');
          expect(res.body.message).to.equal('Invalid credentials supplied');
          done();
        });
    });

    it('should return invalid credentials', (done) => {
      chai
        .request(app)
        .post('/api/v1/users/auth/login')
        .send({
          email: 'user@gmail.com',
          password: 'Passwwor'
        })
        .end((err, res) => {
          expect(res.body.status).to.equal('error');
          expect(res.body.message).to.equal('Invalid credentials supplied');
          done();
        });
    });

    it('should return sign in successful and return token', (done) => {
      chai
        .request(app)
        .post('/api/v1/users/auth/login')
        .send({
          email: 'user@gmail.com',
          password: 'Password'
        })
        .end((err, res) => {
          expect(res.body.status).to.equal('success');
          expect(res.body.data.token);
          expect(res.body.data.message).to.equal('user is signed in successfully');
          done();
        });
    });
  });
});
