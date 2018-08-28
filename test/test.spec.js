import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const { assert, expect, should } = chai;
should();

describe('TEST ALL ENDPOINT', () => {
describe('Initial testing', () => {
    it('should return welcome to sims', (done) => {
        chai
            .request(app)
            .get('/')
            .end((err, res) => {
                res.body.should.be.an('object');
                res.body.should.have.property('message');
                res.body.message.should.eql('Welcome to the sims program');
                done();
            });
        });
    });
});