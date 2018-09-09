// globals assert, expect, describe
import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
import app from '../server/app';
import getRawToken from '../server/helpers/getRawToken';

chai.use(chaiHttp);
const { assert, expect, should } = chai;
should();

describe('ARTICLE ENDPOINT TESTS', () => {
  // REGISTERS A NEW USER TO AVOID FOREIGN KEY ERROR
  before('Register a new user', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/auth/signup')
      .send({
        username: 'johngorithm',
        email: 'johngorithm@email.com',
        password: 'jdwndsiIUBDIijbikb'
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.data.message).to.equal('user is signed up successfully');
        done();
      });
  });

  describe('CREATE ARTICLE ENDPOINT TESTS', () => {
    it('should return with a status of 201 on successful creation of articles without image being uploaded', (done) => {
      chai
        .request(app)
        .post('/api/v1/articles')
        .set('authorization', getRawToken(1, 90000))
        .set('Content-Type', 'multipart/form-data')
        .field('title', 'How I Learnt React in Andela')
        .field('description', 'How I Learnt React in Andela, a very descriptive way to introduce an article')
        .field('body', 'How I Learnt React in Andela. Now tell us everthing you know about how you learnt reactjs in andela')
        .end((err, res) => {
          res.status.should.equal(201);
          res.body.should.be.an('object');
          res.body.data.should.have.property('message');
          res.body.should.have.property('status');
          res.body.status.should.equal('success');
          done();
        });
    });

    it('should fail when token is not sent with it', (done) => {
      chai
        .request(app)
        .post('/api/v1/articles')
        .set('Content-Type', 'multipart/form-data')
        .attach('image', fs.readFileSync(`${__dirname}/images/test.png`), 'test.png')
        .field('title', 'How I Learnt React in Andela')
        .field('description', 'How I Learnt React in Andela, a very descriptive way to introduce an article')
        .field('body', 'How I Learnt React in Andela. Now tell us everthing you know about how you learnt reactjs in andela')
        .end((err, res) => {
          res.status.should.equal(401);
          res.body.message.should.equal('No token provided');
          done();
        });
    });

    it('should fail when token is Invalid', (done) => {
      chai
        .request(app)
        .post('/api/v1/articles')
        .set('Content-Type', 'multipart/form-data')
        .set('authorization', 'some43tinvalidtoken324')
        .attach('image', fs.readFileSync(`${__dirname}/images/test.png`), 'test.png')
        .field('title', 'How I Learnt React in Andela')
        .field('description', 'How I Learnt React in Andela, a very descriptive way to introduce an article')
        .field('body', 'How I Learnt React in Andela. Now tell us everthing you know about how you learnt reactjs in andela')
        .end((err, res) => {
          res.status.should.equal(401);
          res.body.message.should.equal('Failed to authenticate token! Valid token required');
          done();
        });
    });

    it('should fail when required fields are sent with empty value', (done) => {
      chai
        .request(app)
        .post('/api/v1/articles')
        .set('authorization', getRawToken(1, 90000))
        .set('Content-Type', 'multipart/form-data')
        .field('title', '')
        .field('description', '')
        .field('body', '')
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.data.should.have.property('error');
          res.body.data.message.should.equal('You submitted Invalid Data!');
          done();
        });
    });

    it('should fail when a required field is not provided or undefined', (done) => {
      // TITLE IS NOT PROVIDED
      chai
        .request(app)
        .post('/api/v1/articles')
        .set('authorization', getRawToken(1, 90000))
        .set('Content-Type', 'multipart/form-data')
        .field('description', 'How I Learnt React in Andela, a very descriptive way to introduce an article')
        .field('body', 'How I Learnt React in Andela. Now tell us everthing you know about how you learnt reactjs in andela')
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.data.should.have.property('error');
          res.body.data.message.should.equal('You submitted Invalid Data!');
          done();
        });
    });
  });
});
