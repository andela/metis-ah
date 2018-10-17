import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';
import GetAuthorsOfTheWeekHelpers from '../server/helpers/GetAuthorsOfTheWeekHelpers';
import generateToken from '../server/helpers/generateToken';

chai.use(chaiHttp);
const { assert, expect, should } = chai;
should();

const {
  getThisWeekSunday, getArticlesAndLikesCountForTheWeek, getAuthors
} = GetAuthorsOfTheWeekHelpers;

const verifiedToken = generateToken(7200, { id: 2, isVerified: true, roleId: 2 });

describe('Tests for Getting authors of the week', () => {
  describe('Unit Tests for GetAuthorsOfTheWeekHelpers functions', () => {
    it('getThisWeekSunday should return an integer greater than 1.5 trillion', () => {
      const today = new Date().getTime();
      const weekStartDate = new Date(getThisWeekSunday()).getTime();
      const diff = (today - weekStartDate) / 86400000;
      expect(diff).to.be.below(7);
    });
    it('getArticlesAndLikesCountForTheWeek should return an array with length of 4', async () => {
      const result = await getArticlesAndLikesCountForTheWeek();

      assert.isArray(result);
      expect(result).to.have.lengthOf.above(3);
    });
    it('getAuthors should return an array with length of 4', async () => {
      const result = await getArticlesAndLikesCountForTheWeek();
      const authors = getAuthors(result);

      assert.isArray(authors);
      expect(authors).to.have.lengthOf(4);
    });
  });
  describe('Integration Tests for authors of the week', () => {
    it('should return an array of length equal to 4', (done) => {
      chai
        .request(app)
        .get('/api/v1/authors/authors-of-the-week')
        .end((err, res) => {
          res.body.status.should.equal('success');
          res.body.data.authors.should.be.an('array');
          res.body.data.authors.should.have.lengthOf(4);
          done();
        });
    });
  });
});

describe('Checks the validity of the user', () => {
  it('should return authors articles', (done) => {
    chai.request(app)
      .get('/api/v1/authors/articles/1')
      .set('Authorization', verifiedToken)
      .end((error, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data.message).to.equal('All articles');
        assert.isObject(res.body, 'is an object containing the user details');
        assert.isArray(res.body.data.articles);
        done();
      });
  });
  it('should show a not found message', (done) => {
    chai.request(app)
      .get('/api/v1/authors/articles/13333')
      .set('Authorization', verifiedToken)
      .end((message, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data.message).to.equal('You do not have any article');
        assert.isArray(res.body.data.articles);
        done();
      });
  });
  it('should not return  a user if id is an alphabet', (done) => {
    chai.request(app)
      .get('/api/v1/authors/articles/abd')
      .set('Authorization', verifiedToken)
      .end((message, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Invalid user details');
        done();
      });
  });
});
