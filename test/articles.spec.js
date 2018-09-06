// globals assert, expect, describe
import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
import app from '../server/app';

const token = '789dfsd8s97sdf98798sfdf';
chai.use(chaiHttp);
const { assert, expect, should } = chai;
should();

describe('ARTICLE ENDPOINT TESTS', () => {
  describe('CREATE ARTICLE ENDPOINT TESTS', () => {
    it('should return with a status of 200 on successful creation of articles', (done) => {
      chai
        .request(app)
        .post('/api/articles')
        .set('authorization', token)
        .set('content-Type', 'multipart/form-data')
        .attach('imageUrl', fs.readFileSync(`${__dirname}/images/test.png`), 'test.png')
        .field('title', 'How I Learnt React in Andela')
        .field('slug', 'how-i-learnt-react-in-andela-89023ikje798e89')
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
        .post('/api/articles')
        .attach('imageUrl', fs.readFileSync(`${__dirname}/images/test.png`), 'test.png')
        .field('title', 'How I Learnt React in Andela')
        .field('slug', 'how-i-learnt-react-in-andela-89023ikje798e89')
        .field('description', 'How I Learnt React in Andela, a very descriptive way to introduce an article')
        .field('body', 'How I Learnt React in Andela. Now tell us everthing you know about how you learnt reactjs in andela')
        .end((err, res) => {
          res.status.should.not.equal(200);
          done();
        });
    });
  });
});
