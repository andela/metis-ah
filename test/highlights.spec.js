// globals assert, expect, describe
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';
import generateToken from '../server/helpers/generateToken';

chai.use(chaiHttp);
const { expect, should } = chai;
should();

const verifiedToken = generateToken(7200, { id: 1, isVerified: true });
describe('HIGHTLIGHT AN ARTICLE', () => {
  it('Should create an highlight', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles/highlights/1/1')
      .set('Authorization', verifiedToken)
      .send({
        comment: 'How I Learnt React in Andela',
        color: '#333333',
        highlightedText: 'This how we learn react'
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body.data.message).to.equal('Your comment has been saved');
        done();
      });
  });
  it('Should not highlight a portion twice', (done) => {
    const highlightedText = 'This how we learn react';
    chai
      .request(app)
      .post('/api/v1/articles/highlights/1/1')
      .set('Authorization', verifiedToken)
      .send({
        comment: 'How I Learnt React in Andela',
        color: '#333333',
        highlightedText
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.data.message).to.equal(`You have already commented on ${highlightedText}`);
        done();
      });
  });
  it('Should not highlight an article when articleId is empty or not a number', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles/highlights/hda/1')
      .set('Authorization', verifiedToken)
      .send({
        comment: 'How I Learnt React in Andela',
        color: '#333333',
        highlightedText: 'This how we learn react'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.data.message).to.equal('Your request is not valid');
        done();
      });
  });
  it('Should not highlight an article when authorId is empty or not a number', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles/highlights/1/dbajd')
      .set('Authorization', verifiedToken)
      .send({
        comment: 'How I Learnt React in Andela',
        color: '#333333',
        highlightedText: 'This how we learn react'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.data.message).to.equal('Your request is not valid');
        done();
      });
  });
  it('Should not highlight an article when there are no comments', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles/highlights/1/dbajd')
      .set('Authorization', verifiedToken)
      .send({
        comment: 'How I Learnt React in Andela',
        color: '#333333',
        highlightedText: 'This how we learn react'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.data.message).to.equal('Your request is not valid');
        done();
      });
  });
});

describe('FETCH ALL Higlights', () => {
  it('Should fetch all the users highlight on an article', (done) => {
    chai
      .request(app)
      .get('/api/v1/articles/highlights/1/1')
      .set('Authorization', verifiedToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data.message).to.equal('Highlighted text');
        done();
      });
  });
  it('Should fetch all the highlights on an article', (done) => {
    chai
      .request(app)
      .get('/api/v1/articles/highlights/1/1/all')
      .set('Authorization', verifiedToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data.message).to.equal('Highlighted text');
        done();
      });
  });
});
describe('UPDATE  Higlights', () => {
  it('Should update an highlight', (done) => {
    chai
      .request(app)
      .put('/api/v1/articles/highlights/1/1')
      .set('Authorization', verifiedToken)
      .send({
        comment: 'How I Learnt React in Andela',
        color: '#333',
        highlightedText: 'noted',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data.message).to.equal('Your highlight has been updated successfully');
        done();
      });
  });
});

describe('DELETE  Higlights', () => {
  it('Should delete an highlight', (done) => {
    chai
      .request(app)
      .delete('/api/v1/articles/highlights/1/1')
      .set('Authorization', verifiedToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data.message).to.equal('Your highlight have been deleted');
        done();
      });
  });
});
