import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/app';
import generateToken from '../server/helpers/generateToken';

chai.use(chaiHttp);
const { expect } = chai;

describe('ROLE BASED ACCESS:', () => {
  const tokenAdmin = generateToken(7200, { id: 5, isVerified: true, roleId: 1 });
  const token = generateToken(7200, { id: 5, isVerified: true, roleId: 2 });

  it('should return a failure when non admin tires to access', (done) => {
    chai
      .request(app)
      .get('/api/v1/roles')
      .set({
        authorization: token
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.data).to.have.property('message');
        expect(res.body.data.message).to.equal('Only an admin can access this resource');
        done();
      });
  });

  it('should return a success message on [GET] all roles', (done) => {
    chai
      .request(app)
      .get('/api/v1/roles')
      .set({
        authorization: tokenAdmin
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.data).to.have.property('roles');
        expect(res.body.data.roles.length).to.eql(2);
        done();
      });
  });

  it('should return a error when non admin tries to post roles', (done) => {
    chai
      .request(app)
      .post('/api/v1/roles')
      .set({
        authorization: token
      })
      .send({
        role: 'reader',
        permissions: ['read']
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.data).to.have.property('message');
        expect(res.body.data.message).to.eql('Only an admin can access this resource');
        done();
      });
  });

  it('should return a 201 when trying to create a new role', (done) => {
    chai
      .request(app)
      .post('/api/v1/roles')
      .set({
        authorization: tokenAdmin
      })
      .send({
        role: 'reader',
        permissions: ['read']
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.data).to.have.property('role');
        expect(res.body.data.message).to.eql('New role saved');
        done();
      });
  });

  it('should return a 400 when trying pass invalid permission', (done) => {
    chai
      .request(app)
      .post('/api/v1/roles')
      .set({
        authorization: tokenAdmin
      })
      .send({
        role: 'reader',
        permissions: ['feed']
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.data.message).to.eql('This permission is invalid');
        done();
      });
  });

  it('should return a 409 when trying create a role that exists already', (done) => {
    chai
      .request(app)
      .post('/api/v1/roles')
      .set({
        authorization: tokenAdmin
      })
      .send({
        role: 'user',
        permissions: ['read']
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.data.message).to.eql('Role already exists');
        expect(res.body.data).to.have.property('role');
        done();
      });
  });

  it('should return a fail when non admin tries to edit a role', (done) => {
    chai
      .request(app)
      .put('/api/v1/roles')
      .set({
        authorization: token
      })
      .send({
        role: 'user',
        removePermissions: ['read'],
        addPermissions: ['write']
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.data.message).to.eql('Only an admin can edit roles');
        done();
      });
  });

  it('should return a 200 when trying edit a role', (done) => {
    chai
      .request(app)
      .put('/api/v1/roles')
      .set({
        authorization: tokenAdmin
      })
      .send({
        role: 'user',
        removePermissions: ['read'],
        addPermissions: ['write']
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.data.message).to.eql('Role successfully edited');
        expect(res.body.data).to.have.property('role');
        done();
      });
  });

  it('should return a 404 if the role is not found when trying to edit', (done) => {
    chai
      .request(app)
      .put('/api/v1/roles')
      .set({
        authorization: tokenAdmin
      })
      .send({
        role: 'juice',
        removePermissions: ['read'],
        addPermissions: ['write']
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.data.message).to.eql('Role not found');
        done();
      });
  });

  it('should return a fail when non admin tries to delete a role', (done) => {
    chai
      .request(app)
      .delete('/api/v1/roles')
      .set({
        authorization: token
      })
      .send({
        role: 'reader',
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.data.message).to.eql('Only an admin can delete a role');
        done();
      });
  });

  it('should return a 200 on successful delete', (done) => {
    chai
      .request(app)
      .delete('/api/v1/roles')
      .set({
        authorization: tokenAdmin
      })
      .send({
        role: 'reader',
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.data.message).to.eql('Role has been deleted');
        done();
      });
  });

  it('should return a 400 when trying to delete the admin', (done) => {
    chai
      .request(app)
      .delete('/api/v1/roles')
      .set({
        authorization: tokenAdmin
      })
      .send({
        role: 'admin',
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.data.message).to.eql('Admin cannot be deleted');
        done();
      });
  });

  it('should return a 400 when trying to delete the user role', (done) => {
    chai
      .request(app)
      .delete('/api/v1/roles')
      .set({
        authorization: tokenAdmin
      })
      .send({
        role: 'user',
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.data.message).to.eql('user cannot be deleted');
        done();
      });
  });

  it('should return a 424 when trying  to delete an assigned role', (done) => {
    chai
      .request(app)
      .delete('/api/v1/roles')
      .set({
        authorization: tokenAdmin
      })
      .send({
        role: 'user',
      })
      .end((err, res) => {
        expect(res.body.status).to.equal('fail');
        expect(res.body.data.message).to.eql('This role is still assigned to a user');
        done();
      });
  });
});
