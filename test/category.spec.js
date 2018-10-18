import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';

chai.use(chaiHttp);
const { expect } = chai;
let userToken;
describe('TEST ALL CATEGORY ENDPOINT', () => {
  before('get a user token', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/auth/login')
      .send({
        email: 'metis.ah2018@gmail.com',
        password: 'IamAdminFolks'
      })
      .end((err, res) => {
        userToken = res.body.data.token;
        done(err);
      });
  });
  it('should get all categories', (done) => {
    chai
      .request(app)
      .get('/api/v1/categories')
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.data.categories);
        done(err);
      });
  });
  it('should get a category', (done) => {
    chai
      .request(app)
      .get('/api/v1/categories/1')
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.data.category);
        expect(res.body.data.articles);
        done(err);
      });
  });
  it('should not get a category for wrong id', (done) => {
    chai
      .request(app)
      .get('/api/v1/categories/12923')
      .end((err, res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.data.message);
        done(err);
      });
  });
  it('should not get a category for wrong id', (done) => {
    chai
      .request(app)
      .get('/api/v1/categories/asas')
      .end((err, res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.data.message);
        done(err);
      });
  });
  it('should not create a category without image', (done) => {
    chai
      .request(app)
      .post('/api/v1/categories')
      .set('authorization', userToken)
      .send({
        name: 'NewCategory',
        description: 'new description'
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.data.message);
        done(err);
      });
  });
  it('should not create a category without description', (done) => {
    chai
      .request(app)
      .post('/api/v1/categories')
      .set('authorization', userToken)
      .send({
        name: 'NewCategory',
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.data.message);
        done(err);
      });
  });
  it('should update a category', (done) => {
    chai
      .request(app)
      .put('/api/v1/categories/2')
      .set('authorization', userToken)
      .send({
        name: 'update',
        description: 'new description'
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.data.category);
        done(err);
      });
  });
  it('should not update a category without description', (done) => {
    chai
      .request(app)
      .put('/api/v1/categories/2')
      .set('authorization', userToken)
      .send({
        name: 'NewCategory',
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.data.message);
        done(err);
      });
  });
  it('should not update when id is not a number', (done) => {
    chai
      .request(app)
      .put('/api/v1/categories/asd')
      .set('authorization', userToken)
      .send({
        name: 'NewCategory',
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.data.message);
        done(err);
      });
  });
  it('should update a category with image', (done) => {
    chai
      .request(app)
      .put('/api/v1/categories/2')
      .set('authorization', userToken)
      .send({
        name: 'update',
        image: './uploads/dummy-profile.png',
        description: 'new description'
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.data.category);
        done(err);
      });
  });
  it('should successfully update category', (done) => {
    chai
      .request(app)
      .put('/api/v1/categories/3')
      .set('authorization', userToken)
      .send({
        name: 'MATHEMATICS',
        description: 'new description'
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.data.message);
        done(err);
      });
  });
  it('should not update a category not existing', (done) => {
    chai
      .request(app)
      .put('/api/v1/categories/300')
      .set('authorization', userToken)
      .send({
        name: 'Fashion',
        description: 'new description'
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.data.message);
        done(err);
      });
  });
  it('should delete a category', (done) => {
    chai
      .request(app)
      .delete('/api/v1/categories/4')
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.data.message);
        done(err);
      });
  });

  it('should not delete a category', (done) => {
    chai
      .request(app)
      .delete('/api/v1/categories/asa')
      .set('authorization', userToken)
      .end((err, res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.data.message);
        done(err);
      });
  });
});
