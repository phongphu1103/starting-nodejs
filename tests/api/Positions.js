process.env.NODE_ENV = "test"

import chai from "chai"
import chaiHttp from "chai-http"

import app from '../../src/app';
import Position from '../../src/models/Position';

const should = chai.should();

chai.use(chaiHttp)

const token = 'Token string';
/*
|--------------------------------------------------------------------------
| Test /Get routes
|--------------------------------------------------------------------------
*/
describe('/GET /api/v1/positions/index', () => {
    it('it should GET all the positions', (done) => {
        chai.request(app)
            .get('/api/v1/positions/index')
            .set('X-Access-Token', token)
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.data.should.not.be.empty;
                done();
            })
    })
})

/*
|--------------------------------------------------------------------------
| Test /Post routes
|--------------------------------------------------------------------------
*/
describe('/POST /api/v1/positions/index', () => {
    it('is should not POST data without code', (done) => {
        let params = {
            name: 'Manager',
        }
        chai.request(app)
            .post('/api/v1/positions/index')
            .send(params)
            .set('X-Access-Token', token)
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(400);
                res.body.errors.should.not.be.empty;
                res.body.should.have.property('status').eql('error');
                done();
            })
    }),
    it('is should not POST data with a registered code', (done) => {
        let params = {
            name: 'Manager',
            code: 'MNG01'
        }
        chai.request(app)
            .post('/api/v1/positions/index')
            .send(params)
            .set('X-Access-Token', token)
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(400);
                res.body.errors.should.not.be.empty;
                res.body.should.have.property('status').eql('error');
                done();
            })
    }),
    it('it should POST data to create new position', (done) => {
        let params = {
            name: 'Manager',
            code: 'MNG02'
        }
        chai.request(app)
            .post('/api/v1/positions/index')
            .send(params)
            .set('X-Access-Token', token)
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql('success');
                done();
            })
    })
})

/*
|--------------------------------------------------------------------------
| Test /Put routes
|--------------------------------------------------------------------------
*/
describe('/PUT /api/v1/positions/index/:id', () => {
    it('it should PUT data to update position', (done) => {
        let params = {
            name: 'Manager',
            code: 'MNG03'
        }
        Position.build(params).save().then(item => {
            chai.request(app)
                .put(`/api/v1/positions/index/${item.id}`)
                .set('X-Access-Token', token)
                .send(params)
                .end((err, res) => {
                    if (err) return done(err);
                    res.should.have.status(200)
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('success');
                    done()
                })
        })
    })
})