import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';
import generateToken from '../server/helpers/generateToken';

chai.use(chaiHttp);
const { should, expect } = chai;
should();

describe('REPORT ARTICLES:', () => {
  const token = generateToken(7200, { id: 5, isVerified: true });

  it('should return a descriptive message if there are no cases found', (done) => {
    chai
      .request(app)
      .get('/api/v1/cases')
      .set({
        authorization: token
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.data.cases.length).to.eql(0);
        expect(res.body.data.message).to.equal('There are no cases');
        done();
      });
  });

  it('should return a success message if the case was reported', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles/1/report/cases')
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

  it('should return an already reported conflict error if article has been reported already', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles/1/report/cases')
      .set({
        authorization: token
      })
      .send({
        violation: 'Discrimination',
        description: 'This article depicts men as ignorant!'
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.data).to.have.property('message');
        expect(res.body.data.message).to.eql('You have reported this article already');
        done();
      });
  });

  it('should return an article not found error if the article doesn\'t exist', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles/10000000/report/cases')
      .set({
        authorization: token
      })
      .send({
        violation: 'Discrimination',
        description: 'This article depicts men as ignorant!'
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.data).to.have.property('message');
        expect(res.body.data.message).to.equal('Article not found');
        done();
      });
  });

  it('should return an invalid violation message if the violation specified is wrong', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles/1/report/cases')
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

  it('should return an invalid request body if all the parameters where not sent', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles/1/report/cases')
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

  it('should return all the reported cases if the all conditions pass', (done) => {
    chai
      .request(app)
      .get('/api/v1/cases')
      .set({
        authorization: token
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.data.cases.length).to.eql(1);
        done();
      });
  });

  it('should return no case if specified articles have no reported cases', (done) => {
    chai
      .request(app)
      .get('/api/v1/cases/?articles=0,2,3,ed')
      .set({
        authorization: token
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.data.cases.length).to.eql(0);
        expect(res.body.data.message).to.equal('There are no cases');
        done();
      });
  });
});

describe('RESOLVE REPORTED CASES', () => {
  const token = generateToken(7200, { id: 5, isVerified: true });

  it('should return incorrect case id message if the case id is wrong', (done) => {
    chai
      .request(app)
      .put('/api/v1/cases/100/resolve')
      .set({
        authorization: token
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.data.message).to.equal('Case not found');
        done();
      });
  });

  it('should return a success message if the case was successfully resolved', (done) => {
    chai
      .request(app)
      .put('/api/v1/cases/1/resolve')
      .set({
        authorization: token
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.data.message).to.equal('Case resolved');
        done();
      });
  });
});
