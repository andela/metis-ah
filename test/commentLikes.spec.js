import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

chai.use(chaiHttp);
const { should } = chai;
should();

let token;

describe('User can like a comment test', () => {
  describe('like an article', () => {
    before((done) => {
      chai
        .request(app)
        .post('/api/v1/users/auth/login')
        .send({
          email: 'johndoe@gmail.com',
          password: 'paSS1234',
        })
        .end((err, res) => {
          // token = res.body.data.token;
          ({ token } = res.body.data);
          res.body.should.have.property('data');
          done();
        });
    });
    it('should like a comment', (done) => {
      chai
        .request(app)
        .post('/api/v1/articles/1/comments/like')
        .set('Authorization', token)
        .send({ id: 1, type: 'comment' })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.data.message.should.equal('Comment liked');
          done();
        });
    });
    it('should remove a comment', (done) => {
      chai
        .request(app)
        .post('/api/v1/articles/1/comments/like')
        .set('Authorization', token)
        .send({ id: 1, type: 'comment' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.message.should.equal('Comment reaction removed');
          done();
        });
    });
    it('should like a reply', (done) => {
      chai
        .request(app)
        .post('/api/v1/articles/1/comments/like')
        .set('Authorization', token)
        .send({ id: 1, type: 'reply' })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.data.message.should.equal('Reply liked');
          done();
        });
    });
    it('should remove a reply', (done) => {
      chai
        .request(app)
        .post('/api/v1/articles/1/comments/like')
        .set('Authorization', token)
        .send({ id: 1, type: 'reply' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.message.should.equal('Reply reaction removed');
          done();
        });
    });
    it('should like a reply again', (done) => {
      chai
        .request(app)
        .post('/api/v1/articles/1/comments/like')
        .set('Authorization', token)
        .send({ id: 1, type: 'reply' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.message.should.equal('Reply liked');
          done();
        });
    });
    it('should return errors if like object is empty', (done) => {
      chai
        .request(app)
        .post('/api/v1/articles/1/comments/like')
        .set('Authorization', token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.data.messages.length.should.equal(2);
          done();
        });
    });
    it('should return invalid if comment/like id is NAN', (done) => {
      chai
        .request(app)
        .post('/api/v1/articles/1/comments/like')
        .set('Authorization', token)
        .send({ id: 'some', type: 'reply' })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.data.messages[0].should.equal('Invalid id');
          done();
        });
    });
    it('should return error if type is neither comment nor like', (done) => {
      chai
        .request(app)
        .post('/api/v1/articles/1/comments/like')
        .set('Authorization', token)
        .send({ id: 1, type: 'some' })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.data.messages[0].should.equal('Type must be either "comment" or "reply"');
          done();
        });
    });
  });
});
