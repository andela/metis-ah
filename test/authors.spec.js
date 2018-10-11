import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';
import GetAuthorsOfTheWeekHelpers from '../server/helpers/GetAuthorsOfTheWeekHelpers';

chai.use(chaiHttp);
const { assert, expect, should } = chai;
should();

const {
  getThisWeekSunday, getArticlesAndLikesCountForTheWeek, getAuthors
} = GetAuthorsOfTheWeekHelpers;

describe('Tests for Getting authors of the week', () => {
  describe('Unit Tests for GetAuthorsOfTheWeekHelpers functions', () => {
    it('getThisWeekSunday should return an integer greater than 1.5 trillion', () => {
      expect(getThisWeekSunday(new Date())).to.be.above(1500000000000);
    });
    it('getArticlesAndLikesCountForTheWeek should return an array with length of 4', async () => {
      const result = await getArticlesAndLikesCountForTheWeek();

      assert.isArray(result);
      expect(result).to.have.lengthOf(4);
    });
    it('getAuthors should return an array with length of 3', async () => {
      const result = await getArticlesAndLikesCountForTheWeek();
      const authors = getAuthors(result);

      assert.isArray(authors);
      expect(authors).to.have.lengthOf(3);
    });
  });
  describe('Integration Tests for authors of the week', () => {
    it('should return an array of length equal to 3', (done) => {
      chai
        .request(app)
        .get('/api/v1/authors/authors-of-the-week')
        .end((err, res) => {
          res.body.status.should.equal('success');
          res.body.data.authors.should.be.an('array');
          res.body.data.authors.should.have.lengthOf(3);
          done();
        });
    });
  });
});
