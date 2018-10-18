import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

chai.use(chaiHttp);
const { should } = chai;
should();

describe('Search Functionality tests', () => {
  describe('User can perform a search', () => {
    it('should return results when a keyword is passed', (done) => {
      chai
        .request(app)
        .get('/api/v1/articles/search?keyword=Online')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.searchResult.count.should.equal(5);
          done();
        });
    });
    it('should return results when author is passed', (done) => {
      chai
        .request(app)
        .get('/api/v1/articles/search?author=postm')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.searchResult.count.should.equal(8);
          done();
        });
    });
    it('should return results when a tag is passed', (done) => {
      chai
        .request(app)
        .get('/api/v1/articles/search?tag=living')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.searchResult.count.should.equal(1);
          done();
        });
    });
    it('should fail when neither author, tag or keyword is passed', (done) => {
      chai
        .request(app)
        .get('/api/v1/articles/search?some=postm')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.status.should.equal('fail');
          res.body.data.message.should.equal(
            'Request not understood. You can search with either a keyword, author or tag'
          );
          done();
        });
    });
    it('should fail if passed query does not return results', (done) => {
      chai
        .request(app)
        .get('/api/v1/articles/search?keyword=postmuywte')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.status.should.equal('fail');
          res.body.data.message.should.equal(
            'No results for the keyword "postmuywte"'
          );
          done();
        });
    });
    it('should fail if current page exceeds total pages', (done) => {
      chai
        .request(app)
        .get('/api/v1/articles/search?author=postman&page=70')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.status.should.equal('fail');
          res.body.data.message.should.equal(
            'End of results for the author "postman"'
          );
          done();
        });
    });
  });
});
