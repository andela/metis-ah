import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';
import generateToken from '../server/helpers/generateToken';

chai.use(chaiHttp);
const { should, expect } = chai;
should();

describe('REPORT AN ARTICLE:', () => {
  const token = generateToken(2, 7200);

  it('successful', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles/1/report')
      .set({
        authorization: token
      })
      .send({
        violation: 'Discrimination',
        description: 'This article depicts men as ignorant!'
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.data).to.have.property('message');
        expect(res.body.data.message).to.equal('This case has been recorded and will be reviewed');
        done();
      });
  });

  it('report same article', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles/1/report')
      .set({
        authorization: token
      })
      .send({
        violation: 'Discrimination',
        description: 'This article depicts men as ignorant!'
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('You have reported this article already');
        done();
      });
  });

  // it('article not found', (done) => {
  //   chai
  //     .request(app)
  //     .post('/api/v1/articles/10000000/report')
  //     .set({
  //       authorization: token
  //     })
  //     .send({
  //       violation: 'Discrimination',
  //       description: 'This article depicts men as ignorant!'
  //     })
  //     .end((err, res) => {
  //       expect(res.body.status).to.equal('fail');
  //       expect(res.body.data).to.have.property('message');
  //       expect(res.body.data.message).to.equal('Article not found');
  //       done();
  //     });
  // });

  it('invalid violation', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles/1/report')
      .set({
        authorization: token
      })
      .send({
        violation: 'Stupid',
        description: 'This article is just stupid and I don\'t like it'
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.data).to.have.property('message');
        expect(res.body.data.message).to.equal('Invalid violation. Violation can be [\'Discrimination\', \'Plagiarism\', \'Sexual Content\', \'Offensive Language\']');
        done();
      });
  });

  it('invalid request body', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles/1/report')
      .set({
        authorization: token
      })
      .send({
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.data).to.have.property('messages');
        expect(res.body.data.messages).to.eql(['Please provide violation', 'Please provide description']);
        done();
      });
  });
});
