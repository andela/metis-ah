import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';
import generateToken from '../server/helpers/generateToken';

chai.use(chaiHttp);
const { should, expect } = chai;
should();

describe('ARTICLES RATING TESTS', () => {
  const token = generateToken(7200, { id: 1, isVerified: true });
  const token2 = generateToken(7200, { id: 3, isVerified: true });
  const tokenStone = generateToken(7200, { id: 2, isVerified: true });

  it('incorrect articleId', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles/ed/rate')
      .set('authorization', token)
      .send({
        rating: 5
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.data).to.be.a('object');
        expect(res.body.data).to.have.property('message');
        expect(res.body.data.message).to.equal('Article not found');
        done();
      });
  });

  it('article not found', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles/10000000/rate')
      .set('authorization', token)
      .send({
        rating: 5
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.data).to.be.a('object');
        expect(res.body.data).to.have.property('message');
        expect(res.body.data.message).to.equal('Article not found');
        done();
      });
  });

  it('rating out of range', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles/1/rate')
      .set('authorization', token)
      .send({
        rating: 8
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.data).to.be.a('object');
        expect(res.body.data).to.have.property('message');
        expect(res.body.data.message).to.equal('Rating out of range. (Accepted range: 1 - 5.)');
        done();
      });
  });

  it('invalid rating', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles/1/rate')
      .set('authorization', token)
      .send({
        rating: 'five'
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.data).to.have.property('message');
        expect(res.body.data.message).to.eql('Rating must be a number.');
        done();
      });
  });

  it('no rating', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles/1/rate')
      .set('authorization', token)
      .send({
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.data).to.be.a('object');
        expect(res.body.data).to.have.property('messages');
        expect(res.body.data.messages).to.eql(['Please provide rating']);
        done();
      });
  });

  it('cannot rate own article', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles/1/rate')
      .set('authorization', token)
      .send({
        rating: 3
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.data).to.be.a('object');
        expect(res.body.data).to.have.property('message');
        expect(res.body.data.message).to.equal('User cannot rate his own article');
        done();
      });
  });

  it('correct rating', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles/1/rate')
      .set('authorization', tokenStone)
      .send({
        rating: 3
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.data).to.be.a('object');
        expect(res.body.data).to.have.property('averageRating');
        expect(res.body.data.averageRating).to.equal(3);
        done();
      });
  });

  it('correct rating', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles/1/rate')
      .set('authorization', token2)
      .send({
        rating: 5
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.data).to.be.a('object');
        expect(res.body.data).to.have.property('averageRating');
        expect(res.body.data.averageRating).to.equal(4);
        done();
      });
  });
});
