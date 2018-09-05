import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

chai.use(chaiHttp);
const { should, expect } = chai;
should();

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
          res.body.should.have.property('messages');
          res.body.messages.should.eql(['Please provide username', 'Please provide email', 'Please provide password']);
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
          res.body.should.have.property('messages');
          res.body.messages.should.eql(['username cannot be an empty string']);
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
          res.body.should.have.property('messages');
          res.body.messages.should.eql(['Invalid email provided']);
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
          res.body.should.have.property('messages');
          res.body.messages.should.eql(['Password must include at least one uppercase and lowercase character']);
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
        .post('/api/v1/users/auth/signup')
        .send({
          username: 'IyiKuyoro',
          email: 'test.tester@email.com',
          password: 'jdwndsiIUBDIijbikb'
        })
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.data.message).to.equal('user is signed up successfully');
          done();
        });
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
        expect(res.body.data.message).to.equal('user is signed up successfully');
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
