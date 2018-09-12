// globals assert, expect, describe
import chai from 'chai';
import chaiHttp from 'chai-http';
import nock from 'nock';
import fs from 'fs';
import app from '../server/app';
import response from './responses/cloudinaryApiResponse';

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

  describe('CREATE ARTICLE ENDPOINT TESTS', () => {
    beforeEach(() => {
      nock('https://api.cloudinary.com/v1_1/dbsxxymfz')
        .post('/image/upload')
        .reply(200, response);
    });

    it('should return with a status of 201 on successful creation of articles without image being uploaded', (done) => {
      chai
        .request(app)
        .post('/api/v1/articles')
        .set('authorization', hashedToken)
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
          res.body.data.message.should.equal('No token provided');
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
          res.body.data.message.should.equal('Failed to authenticate token! Valid token required');
          done();
        });
    });

    it('should fail when required fields are sent with empty value', (done) => {
      chai
        .request(app)
        .post('/api/v1/articles')
        .set('authorization', hashedToken)
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
        .set('authorization', hashedToken)
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

    it('should fail when uploading an image beyond 2 mb', (done) => {
      chai
        .request(app)
        .post('/api/v1/articles')
        .set('Content-Type', 'multipart/form-data')
        .set('authorization', hashedToken)
        .field('title', 'How I Learnt React in Andela')
        .field('description', 'How I Learnt React in Andela, a very descriptive way to introduce an article')
        .field('body', 'How I Learnt React in Andela. Now tell us everthing you know about how you learnt reactjs in andela')
        .attach('image', fs.readFileSync(`${__dirname}/images/Ft5_3mb.JPG`), 'Ft5_3mb.JPG')
        .end((err, res) => {
          res.body.status.should.equal('fail');
          res.status.should.equal(500);
          res.body.data.should.have.property('error');
          res.body.data.error.should.contain('maxFileSize exceeded');
          done();
        });
    });

    it('should upload image successfully when provided with an image', (done) => {
      chai
        .request(app)
        .post('/api/v1/articles')
        .set('Content-Type', 'multipart/form-data')
        .set('authorization', hashedToken)
        .attach('image', fs.readFileSync(`${__dirname}/images/test.png`), 'test.png')
        .field('title', 'How I Learnt React in Andela')
        .field('description', 'How I Learnt React in Andela, a very descriptive way to introduce an article')
        .field('body', 'How I Learnt React in Andela. Now tell us everthing you know about how you learnt reactjs in andela')
        .end((err, res) => {
          res.body.status.should.equal('success');
          res.status.should.equal(201);
          res.body.data.article.imageUrl.should.be.a('string');
          res.body.data.article.imageUrl.length.should.be.greaterThan(0);
          done();
        });
    });
  });
});

describe('Articles likes test', () => {
  it('should return Invalid likeType', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles/1/adam')
      .set('authorization', hashedToken)
      .send()
      .end((err, res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.data.message).to.equal('Invalid likeType... likeType has to be - like, dislike or unlike');
        done();
      });
  });

  it('should return Invalid likeType', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles/a/like')
      .set('authorization', hashedToken)
      .send()
      .end((err, res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.data.message).to.equal('Invalid articleId');
        done();
      });
  });

  it('should return you liked the article', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles/1/like')
      .set('authorization', hashedToken)
      .send()
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.data.message).to.equal('you liked the article');
        done();
      });
  });

  it('should return you unliked the articlee', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles/1/unlike')
      .set('authorization', hashedToken)
      .send()
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.data.message).to.equal('you unliked the article');
        done();
      });
  });

  it('should return you unliked the articlee', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles/100/unlike')
      .set('authorization', hashedToken)
      .send()
      .end((err, res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.data.message).to.equal('Article not found');
        done();
      });
  });
});
