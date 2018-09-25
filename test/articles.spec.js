// globals assert, expect, describe
import chai from 'chai';
import chaiHttp from 'chai-http';
import nock from 'nock';
import fs from 'fs';
import app from '../server/app';
import response from './responses/cloudinaryApiResponse';
import generateToken from '../server/helpers/generateToken';

chai.use(chaiHttp);
const { expect, should } = chai;
should();

let hashedToken;

describe('ARTICLE ENDPOINT TESTS', () => {
  // REGISTERS A NEW USER TO AVOID FOREIGN KEY ERROR
  before('Register a new user', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/auth/login')
      .send({
        email: 'postman@gmail.com',
        password: 'Password'
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        hashedToken = res.body.data.token;
        done();
      });
  });

  describe('CREATE ARTICLE ENDPOINT TESTS', () => {
    beforeEach(() => {
      nock('https://api.cloudinary.com/v1_1/dbsxxymfz')
        .post('/image/upload')
        .reply(200, response);
    });

    it('should return with a status of 201 on successful creation of articles without image being uploaded', (done) => {
      chai
        .request(app)
        .post('/api/v1/articles')
        .set('authorization', hashedToken)
        .set('Content-Type', 'multipart/form-data')
        .field('title', 'How I Learnt React in Andela')
        .field('description', 'How I Learnt React in Andela, a very descriptive way to introduce an article')
        .field('body', 'How I Learnt React in Andela. Now tell us everthing you know about how you learnt reactjs in andela')
        .field('categoryId', 2)
        .type('form')
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
        .post('/api/v1/articles')
        .set('Content-Type', 'multipart/form-data')
        .attach('image', fs.readFileSync(`${__dirname}/images/test.png`), 'test.png')
        .field('title', 'How I Learnt React in Andela')
        .field('description', 'How I Learnt React in Andela, a very descriptive way to introduce an article')
        .field('body', 'How I Learnt React in Andela. Now tell us everthing you know about how you learnt reactjs in andela')
        .type('form')
        .end((err, res) => {
          res.status.should.equal(401);
          res.body.data.message.should.equal('No token provided');
          done();
        });
    });

    it('should fail when token is Invalid', (done) => {
      chai
        .request(app)
        .post('/api/v1/articles')
        .set('Content-Type', 'multipart/form-data')
        .set('authorization', 'some43tinvalidtoken324')
        .attach('image', fs.readFileSync(`${__dirname}/images/test.png`), 'test.png')
        .field('title', 'How I Learnt React in Andela')
        .field('description', 'How I Learnt React in Andela, a very descriptive way to introduce an article')
        .field('body', 'How I Learnt React in Andela. Now tell us everthing you know about how you learnt reactjs in andela')
        .end((err, res) => {
          res.status.should.equal(401);
          res.body.data.message.should.equal('Failed to authenticate token! Valid token required');
          done();
        });
    });

    it('should fail when required fields are sent with empty value', (done) => {
      chai
        .request(app)
        .post('/api/v1/articles')
        .set('authorization', hashedToken)
        .set('Content-Type', 'multipart/form-data')
        .field('title', '')
        .field('description', '')
        .field('body', '')
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.data.should.have.property('error');
          res.body.data.message.should.equal('You submitted Invalid Data!');
          done();
        });
    });

    it('should fail when a required field is not provided or undefined', (done) => {
      // TITLE IS NOT PROVIDED
      chai
        .request(app)
        .post('/api/v1/articles')
        .set('authorization', hashedToken)
        .set('Content-Type', 'multipart/form-data')
        .field('description', 'How I Learnt React in Andela, a very descriptive way to introduce an article')
        .field('body', 'How I Learnt React in Andela. Now tell us everthing you know about how you learnt reactjs in andela')
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.data.should.have.property('error');
          res.body.data.message.should.equal('You submitted Invalid Data!');
          done();
        });
    });

    it('should upload image successfully when provided with an image', (done) => {
      chai
        .request(app)
        .post('/api/v1/articles')
        .set('Content-Type', 'multipart/form-data')
        .set('authorization', hashedToken)
        .attach('image', fs.readFileSync(`${__dirname}/images/test.png`), 'test.png')
        .field('title', 'How I Learnt React in Andela')
        .field('description', 'How I Learnt React in Andela, a very descriptive way to introduce an article')
        .field('tags', 'javascript,business,commerce,joji, jojis,latest')
        .field('body', 'How I Learnt React in Andela. Now tell us everthing you know about how you learnt reactjs in andela')
        .field('categoryId', 1)
        .type('form')
        .end((err, res) => {
          res.body.status.should.equal('success');
          res.status.should.equal(201);
          res.body.data.article.imageUrl.should.be.a('string');
          res.body.data.article.imageUrl.length.should.be.greaterThan(0);
          done();
        });
    });
  });

  describe('GET ARTICLES WITH PAGINATION', () => {
    it('should return articles successfully for an authenticated user', (done) => {
      chai
        .request(app)
        .get('/api/v1/articles')
        .set('authorization', hashedToken)
        .end((err, res) => {
          res.body.status.should.equal('success');
          res.status.should.equal(200);
          res.body.data.articles.should.be.an('Array');
          res.body.data.articles.length.should.be.greaterThan(0);
          done();
        });
    });

    it('should return articles successfully with current page = 1 when page number is undefined', (done) => {
      chai
        .request(app)
        .get('/api/v1/articles')
        .query({ page: undefined, limit: 1 })
        .set('authorization', hashedToken)
        .end((err, res) => {
          res.body.status.should.equal('success');
          res.status.should.equal(200);
          res.body.data.articles.should.be.an('Array');
          res.body.data.articles.length.should.be.greaterThan(0);
          res.body.data.metadata.currentPage.should.equal(1);
          done();
        });
    });

    it('should return articles successfully with current page = 1 when page number is not a number', (done) => {
      chai
        .request(app)
        .get('/api/v1/articles')
        .query({ page: 'kjhs3w', limit: 1 })
        .set('authorization', hashedToken)
        .end((err, res) => {
          res.body.status.should.equal('success');
          res.status.should.equal(200);
          res.body.data.articles.should.be.an('Array');
          res.body.data.articles.length.should.be.greaterThan(0);
          res.body.data.metadata.currentPage.should.equal(1);
          done();
        });
    });

    it('should return articles successfully with current page = 1, when page number is less than 1', (done) => {
      chai
        .request(app)
        .get('/api/v1/articles')
        .query({ page: -4, limit: 1 })
        .set('authorization', hashedToken)
        .end((err, res) => {
          res.body.status.should.equal('success');
          res.status.should.equal(200);
          res.body.data.articles.should.be.an('Array');
          res.body.data.articles.length.should.be.greaterThan(0);
          res.body.data.metadata.currentPage.should.equal(1);
          done();
        });
    });

    it('should return default 10 articles article successfully when limit is less than 1', (done) => {
      chai
        .request(app)
        .get('/api/v1/articles')
        .query({ limit: -2, page: 1 })
        .set('authorization', hashedToken)
        .end((err, res) => {
          res.body.status.should.equal('success');
          res.status.should.equal(200);
          res.body.data.articles.should.be.an('Array');
          res.body.data.articles.length.should.equal(10);
          done();
        });
    });

    it('should return successfully with a default of 10 articles when limit is not a number', (done) => {
      chai
        .request(app)
        .get('/api/v1/articles')
        .query({ limit: '', page: [] })
        .set('authorization', hashedToken)
        .end((err, res) => {
          res.body.status.should.equal('success');
          res.status.should.equal(200);
          res.body.data.articles.should.be.an('Array');
          res.body.data.articles.length.should.equal(10);
          done();
        });
    });

    it('should return 12 article successfully when limit equals 12', (done) => {
      chai
        .request(app)
        .get('/api/v1/articles')
        .query({ limit: 12, page: 1 })
        .set('authorization', hashedToken)
        .end((err, res) => {
          res.body.status.should.equal('success');
          res.status.should.equal(200);
          res.body.data.articles.should.be.an('Array');
          res.body.data.articles.length.should.equal(12);
          done();
        });
    });


    it('should return first item first', (done) => {
      chai
        .request(app)
        .get('/api/v1/articles')
        .query({ limit: 5, page: 1 })
        .set('authorization', hashedToken)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.status.should.equal('success');
          res.body.data.articles.should.be.an('Array');
          done();
        });
    });

    it('should return successfully with required metadata', (done) => {
      chai
        .request(app)
        .get('/api/v1/articles')
        .query({ limit: 5, page: 1 })
        .set('authorization', hashedToken)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.status.should.equal('success');
          res.body.data.articles.should.be.an('Array');
          res.body.data.should.have.property('metadata');
          res.body.data.metadata.should.have.property('limit');
          res.body.data.metadata.should.have.property('currentPage');
          res.body.data.metadata.should.have.property('totalPages');
          done();
        });
    });
  });
});

describe('Articles likes test', () => {
  it('should return Invalid likeType', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles/1/like/adam')
      .set('authorization', hashedToken)
      .send()
      .end((err, res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.data.message).to.equal('Invalid likeType... likeType has to be - like, dislike or unlike');
        done();
      });
  });

  it('should return Invalid articleId', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles/a/like/like')
      .set('authorization', hashedToken)
      .send()
      .end((err, res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.data.message).to.equal('Invalid articleId');
        done();
      });
  });

  it('should return you liked the article', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles/1/like/like')
      .set('authorization', hashedToken)
      .send()
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.data.message).to.equal('you liked the article');
        done();
      });
  });

  it('should return you unliked the article', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles/1/like/unlike')
      .set('authorization', hashedToken)
      .send()
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.data.message).to.equal('you unliked the article');
        done();
      });
  });

  it('should return you article not found', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles/100/like/unlike')
      .set('authorization', hashedToken)
      .send()
      .end((err, res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.data.message).to.equal('Article not found');
        done();
      });
  });

  describe('DELETE BOOKMARK', () => {
    it('should return 200 when bookmark is successfully deleted', (done) => {
      chai
        .request(app)
        .delete('/api/v1/articles/bookmarks/1')
        .set('authorization', hashedToken)
        .end((err, res) => {
          res.status.should.equal(204);
          done();
        });
    });
    it('should return 401 when bookmark is not found', (done) => {
      chai.request(app)
        .delete('/api/v1/articles/bookmarks/1213121')
        .set('authorization', hashedToken)
        .end((err, res) => {
          expect(res.body.data.message).to.equal('Bookmark not found!');
          done();
        });
    });
  });
});


// TESTS FOR GET ALL ARTICLES
describe('GET ARTICLES WITH PAGINATION', () => {
  it('should return articles successfully for an authenticated user', (done) => {
    chai
      .request(app)
      .get('/api/v1/articles')
      .set('authorization', hashedToken)
      .end((err, res) => {
        res.body.status.should.equal('success');
        res.status.should.equal(200);
        res.body.data.articles.should.be.an('Array');
        res.body.data.articles.length.should.be.greaterThan(0);
        done();
      });
  });

  it('should return articles successfully with current page = 1 when page number is undefined', (done) => {
    chai
      .request(app)
      .get('/api/v1/articles')
      .query({ page: undefined, limit: 1 })
      .set('authorization', hashedToken)
      .end((err, res) => {
        res.body.status.should.equal('success');
        res.status.should.equal(200);
        res.body.data.articles.should.be.an('Array');
        res.body.data.articles.length.should.be.greaterThan(0);
        res.body.data.metadata.currentPage.should.equal(1);
        done();
      });
  });

  it('should return articles successfully with current page = 1 when page number is not a number', (done) => {
    chai
      .request(app)
      .get('/api/v1/articles')
      .query({ page: 'kjhs3w', limit: 1 })
      .set('authorization', hashedToken)
      .end((err, res) => {
        res.body.status.should.equal('success');
        res.status.should.equal(200);
        res.body.data.articles.should.be.an('Array');
        res.body.data.articles.length.should.be.greaterThan(0);
        res.body.data.metadata.currentPage.should.equal(1);
        done();
      });
  });

  it('should return articles successfully with current page = 1, when page number is less than 1', (done) => {
    chai
      .request(app)
      .get('/api/v1/articles')
      .query({ page: -4, limit: 1 })
      .set('authorization', hashedToken)
      .end((err, res) => {
        res.body.status.should.equal('success');
        res.status.should.equal(200);
        res.body.data.articles.should.be.an('Array');
        res.body.data.articles.length.should.be.greaterThan(0);
        res.body.data.metadata.currentPage.should.equal(1);
        done();
      });
  });

  it('should return default 10 articles article successfully when limit is less than 1', (done) => {
    chai
      .request(app)
      .get('/api/v1/articles')
      .query({ limit: -2, page: 1 })
      .set('authorization', hashedToken)
      .end((err, res) => {
        res.body.status.should.equal('success');
        res.status.should.equal(200);
        res.body.data.articles.should.be.an('Array');
        res.body.data.articles.length.should.equal(10);
        done();
      });
  });

  it('should return successfully with a default of 10 articles when limit is not a number', (done) => {
    chai
      .request(app)
      .get('/api/v1/articles')
      .query({ limit: '', page: [] })
      .set('authorization', hashedToken)
      .end((err, res) => {
        res.body.status.should.equal('success');
        res.status.should.equal(200);
        res.body.data.articles.should.be.an('Array');
        res.body.data.articles.length.should.equal(10);
        done();
      });
  });

  it('should return 12 article successfully when limit equals 12', (done) => {
    chai
      .request(app)
      .get('/api/v1/articles')
      .query({ limit: 12, page: 1 })
      .set('authorization', hashedToken)
      .end((err, res) => {
        res.body.status.should.equal('success');
        res.status.should.equal(200);
        res.body.data.articles.should.be.an('Array');
        res.body.data.articles.length.should.equal(12);
        done();
      });
  });

  it('should return first item first', (done) => {
    chai
      .request(app)
      .get('/api/v1/articles')
      .query({ limit: 5, page: 1 })
      .set('authorization', hashedToken)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.status.should.equal('success');
        res.body.data.articles.should.be.an('Array');
        res.body.data.articles[0].id.should.equal(1);
        done();
      });
  });

  it('should return successfully with required metadata', (done) => {
    chai
      .request(app)
      .get('/api/v1/articles')
      .query({ limit: 5, page: 1 })
      .set('authorization', hashedToken)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.status.should.equal('success');
        res.body.data.articles.should.be.an('Array');
        res.body.data.should.have.property('metadata');
        res.body.data.metadata.should.have.property('limit');
        res.body.data.metadata.should.have.property('currentPage');
        res.body.data.metadata.should.have.property('totalPages');
        done();
      });
  });
});

describe('GET FEATURED ARTICLES TESTS', () => {
  it('should return five (5) articles successfully when less than 5 has been created and rated', (done) => {
    chai
      .request(app)
      .get('/api/v1/articles/featured')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.status.should.equal('success');
        res.body.data.featuredArticles.should.be.an('Array');
        res.body.data.featuredArticles.length.should.be.greaterThan(4);
        res.body.data.featuredArticles[0].slug.should.be.contain('');
        done();
      });
  });

  it('should return specified number of articles successfully when limit is specified', (done) => {
    chai
      .request(app)
      .get('/api/v1/articles/featured')
      .query({ limit: 3 })
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.status.should.equal('success');
        res.body.data.featuredArticles.should.be.an('Array');
        res.body.data.featuredArticles.length.should.eql(3);
        done();
      });
  });
});

const verifiedToken = generateToken(7200, { id: 1, isVerified: true });
const verifiedToken2 = generateToken(7200, { id: 41, isVerified: true });
describe('BOOKMARK AN ARTICLE', () => {
  it('Should create a bookmark', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles/bookmarks/add/1')
      .set('Authorization', verifiedToken)
      .send({
        title: 'How I Learnt React in Andela',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body.data.message).to.equal('Your bookmark has been created successfully');
        done();
      });
  });
  it('Should not bookmark an article when it has already been bookmarked', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles/bookmarks/add/1')
      .set('Authorization', verifiedToken)
      .send({
        title: 'How I Learnt React in Andela',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.data.message).to.equal('You have already bookmarked this article');
        done();
      });
  });
  it('Should not bookmark an article when fields are empty or not a number', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles/bookmarks/add/bnnjk')
      .set('Authorization', verifiedToken)
      .send({
        title: 'Hello world',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.data.message).to.equal('Article is not valid');
        done();
      });
  });
  it('Should not bookmark an article when article does not exist', (done) => {
    chai
      .request(app)
      .post('/api/v1/articles/bookmarks/add/43')
      .set('Authorization', verifiedToken)
      .send({
        title: 'Hello world'
      })
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body).to.be.an('object');
        expect(res.body.data.message).to.equal('Something went wrong, please try again');
        done();
      });
  });
});
describe('FETCH ALL BOOKMARK', () => {
  it('Should fetch all the users bookmark', (done) => {
    chai
      .request(app)
      .get('/api/v1/articles/bookmarks/user/all')
      .set('Authorization', verifiedToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');

        done();
      });
  });
  it('Should fetch all the users bookmark', (done) => {
    chai
      .request(app)
      .get('/api/v1/articles/bookmarks/user/all')
      .set('Authorization', verifiedToken2)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        expect(res.body.data.message).to.equal('You have not bookmarked any article');
        done();
      });
  });
});
