import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';
import GetAuthorsOfTheWeekHelpers from '../server/helpers/GetAuthorsOfTheWeekHelpers';

chai.use(chaiHttp);
const { assert, expect, should } = chai;
should();

const {
  getArticlesAndLikesCountForTheWeek, getPopularArticles
} = GetAuthorsOfTheWeekHelpers;

describe('Tests for Getting popular articles', () => {
  describe('Unit Tests for GetAuthorsOfTheWeekHelpers functions', () => {
    it('popularArticles should return an array with length of 5', async () => {
      const result = await getArticlesAndLikesCountForTheWeek();
      const popularArticles = getPopularArticles(result);

      assert.isArray(popularArticles);
      expect(popularArticles).to.have.lengthOf.above(5);
    });
  });
  describe('Integration Tests for popular articles', () => {
    it('should return an array of length equal to 5', (done) => {
      chai
        .request(app)
        .get('/api/v1/articles/popular')
        .end((err, res) => {
          res.body.status.should.equal('success');
          res.body.data.articles.should.be.an('array');
          res.body.data.articles.should.have.lengthOf.above(5);
          done();
        });
    });
  });
});
