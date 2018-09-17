import chai from 'chai';
import Cryptr from 'cryptr';
import chaiHttp from 'chai-http';
import app from '../server/app';
import generateToken from '../server/helpers/generateToken';

const secret = process.env.SECRET;
const cryptr = new Cryptr(secret);
chai.use(chaiHttp);
const { should, expect } = chai;
should();
const token = generateToken(7200, { id: 1, isVerified: true, roleId: 1 });
const faketoken = cryptr.encrypt('nothing');

describe('USER WITHOUT TOKEN', () => {
  it('should return user does not valid token', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/1/follow')
      .set('authorization', faketoken)
      .end((err, res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.data.message).to.equal('Failed to authenticate token! Valid token required');
        done();
      });
  });
  it('should return user does not have token', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/1/follow')
      .end((err, res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.data.message).to.equal('No token provided');
        done();
      });
  });
});
describe('USER CAN FOLLOW OTHER USERS', () => {
  it('should return user does not exist', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/109/follow')
      .set('authorization', token)
      .end((err, res) => {
        expect(res.body.status).to.equal('error');
        expect(res.body.message).to.equal('No such user exist');
        done();
      });
  });

  it('should return user can not follow himself', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/1/follow')
      .set('authorization', token)
      .end((err, res) => {
        expect(res.body.status).to.equal('error');
        expect(res.body.message).to.equal('you cannot follow yourself');
        done();
      });
  });

  it('should return user can follow user', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/2/follow')
      .set('authorization', token)
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.data.message).to.equal('you are now following postman2');
        done();
      });
  });

  it('should return user can not follow user more than once', (done) => {
    chai
      .request(app)
      .post('/api/v1/users/2/follow')
      .set('authorization', token)
      .end((err, res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.data.message).to.equal('You are already following postman2');
        done();
      });
  });
});
describe('USER CAN SEE FOLLOWERS', () => {
  it('should return user with followers and followed', (done) => {
    chai
      .request(app)
      .get('/api/v1/users/followings')
      .set('authorization', token)
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        done();
      });
  });
});
describe('USER CAN UNFOLLOW OTHER USERS', () => {
  it('should return user can not unfollow user that does not exist', (done) => {
    chai
      .request(app)
      .delete('/api/v1/users/23/unfollow')
      .set('authorization', token)
      .end((err, res) => {
        expect(res.body.status).to.equal('error');
        expect(res.body.message).to.equal('No such user exist');
        done();
      });
  });

  it('should return user can not unfollow user himself', (done) => {
    chai
      .request(app)
      .delete('/api/v1/users/1/unfollow')
      .set('authorization', token)
      .end((err, res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.data.message).to.equal('you cannot unfollow yourself');
        done();
      });
  });
  it('should return user no following user anymore', (done) => {
    chai
      .request(app)
      .delete('/api/v1/users/2/unfollow')
      .set('authorization', token)
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.data.message).to.equal('you are no longer following postman2');
        done();
      });
  });
  it('should return user not following user ', (done) => {
    chai
      .request(app)
      .delete('/api/v1/users/2/unfollow')
      .set('authorization', token)
      .end((err, res) => {
        expect(res.body.status).to.equal('error');
        expect(res.body.message).to.equal('you are not following postman2');
        done();
      });
  });
});
