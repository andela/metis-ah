// globals assert, expect, describe
import chai from 'chai';
import chaiHttp from 'chai-http';
import nock from 'nock';
import fs from 'fs';
import app from '../server/app';
import response from './responses/cloudinaryApiResponse';
import generateToken from '../server/helpers/generateToken';

chai.use(chaiHttp);
const { assert, expect, should } = chai;
should();

const verifiedToken = generateToken(7200, { id: 2, isVerified: true });
describe('Users end point test', () => {
  // REGISTERS A NEW USER TO AVOID FOREIGN KEY ERROR
  before('Register a new user', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/auth/signup')
      .send({
        username: 'joeeasy',
        email: 'joeeasy@gmail.com',
        password: 'ABcdEFgh'
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.data.message).to.equal('User is signed up, an email is sent to your mail account, please verify your mail account to complete registration');
        done();
      });
  });
});

describe('Update User Endpoint /api/v1/users/update', () => {
  beforeEach(() => {
    nock('https://api.cloudinary.com/v1_1/dbsxxymfz')
      .post('/image/upload')
      .reply(200, response);
  });
  it('Should not update profile if user is not logged in', (done) => {
    chai
      .request(app)
      .put('/api/v1/users/update')
      .send({
        firstname: 'joe',
        lastname: 'easy',
        email: 'joe.test@testmail.com',
        username: 'joeeasy',
        bio: 'Hello, here is a brief information about me',
        interest: 'gaming, movies, music, tech',
        image: './uploads/dummy-profile.png',
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body.data.message).to.equal('No token provided');
        done();
      });
  });
  it('Should not update profile if invalid token is provided', (done) => {
    chai
      .request(app)
      .put('/api/v1/users/update')
      .set('Authorization', '97f94698d465204dac1c69ccc409bd0b103c61507c03fbb2d4f389b8f668ca510fed14dfe7da06a1f74b471b2cdfc403cb033878fd4001ca310fa028c7273e92fb1db2088763c6960abea008086b0758df46bf236d27909b21994d1857747dd9148e209a077472c6fba2d95a48a4c86f98d9614d2b275882bbb0bc19105b767970270a2557a8dcacf8a3058b58cfefbef4')
      .send({
        firstname: 'joe',
        lastname: 'easy',
        email: 'joe.test@testmail.com',
        username: 'joeeasy',
        bio: 'Hello, here is a brief information about me',
        interest: 'gaming, movies, music, tech',
        image: './uploads/dummy-profile.png',
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body.data.message).to.equal('Failed to authenticate token! Valid token required');
        done();
      });
  });
  it('should return successfully when a users profile is successfully updated', (done) => {
    chai
      .request(app)
      .put('/api/v1/users/update')
      .set('Authorization', verifiedToken)
      .send({
        firstname: 'joe',
        lastname: 'easy',
        email: 'joe.test@testmail.com',
        username: 'joeeasy',
        bio: 'Hello, here is a brief information about me',
        interest: 'gaming, movies, music, tech',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data.user[1].firstname).to.equal('joe');
        expect(res.body.data.user[1].lastname).to.equal('easy');
        expect(res.body.data.user[1].bio).to.equal('Hello, here is a brief information about me');
        expect(res.body.data.message).to.equal('Your profile has been updated successfully');
        done();
      });
  });
  it('should upload image successfully when provided with an image', (done) => {
    chai
      .request(app)
      .put('/api/v1/users/update')
      .set('Content-Type', 'multipart/form-data')
      .set('authorization', verifiedToken)
      .attach('image', fs.readFileSync(`${__dirname}/images/test.png`), 'test.png')
      .field('username', 'joeeasy')
      .field('firstname', 'jehonadab')
      .field('lastname', 'hehehehehe')
      .field('bio', 'Here is a brief information about me')
      .field('interest', 'runing')
      .field('email', 'joeeasy@gmail.com')
      .type('form')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data.user[1].firstname).to.equal('jehonadab');
        expect(res.body.data.user[1].lastname).to.equal('hehehehehe');
        expect(res.body.data.user[1].bio).to.equal('Here is a brief information about me');
        expect(res.body.data.message).to.equal('Your profile has been updated successfully');
        done();
      });
  });
});

describe('Checks the validity of the user', () => {
  it('should return a user', (done) => {
    chai.request(app)
      .get('/api/v1/users/3')
      .set('Authorization', verifiedToken)
      .end((error, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data.message).to.equal('User details');
        expect(res.body.data.user.firstname).to.equal('John');
        expect(res.body.data.user.lastname).to.equal('Doe');
        expect(res.body.data.user.bio).to.equal('I like to eat');
        assert.isObject(res.body, 'is an object containing the user details');
        done();
      });
  });
  it('should show a not found message', (done) => {
    chai.request(app)
      .get('/api/v1/users/1333')
      .set('Authorization', verifiedToken)
      .end((message, res) => {
        expect(res).to.have.status(404);
        expect(res.body.data.message).to.equal('No user found');
        done();
      });
  });
  it('should not return  a user if id is an alphabet', (done) => {
    chai.request(app)
      .get('/api/v1/users/abcd')
      .set('Authorization', verifiedToken)
      .end((message, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('Invalid user details');
        done();
      });
  });
});
