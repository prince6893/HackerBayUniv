process.env.NODE_ENV = 'test';
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let expect = chai.expect;
//let User = require('../db/Users.js');
let User = require('../db/passportConfig.js');
let server = require('../app.js');
chai.use(chaiHttp);
// Description a group of tests
describe('My tests', () => {
    // Description of a specific test
    describe('dumb test', () => {
        // The behaviour expected
        it('should return 4', done => {
            // what we are actually testing
            expect(2 + 2).to.equal(4);
            // when done() is called the test is finished
            done();
        })
    })
})
describe('first test', () => {
    // expected behaviour
    it('should return { status: "success" }', done => {
        // connecting to the server
        chai.request(server)
        // router
        .get('/')
        // response from the server
        .end((err, res) => {
            // assertions
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('object');
            expect(res.body).to.deep.equal({ status: "success" })
            // done should be called to finish the test
            done();
        })
    })
})
describe('second test', () => {
    // expected behaviour
    it('should return { data: "Any String"}', done => {
        // connecting to the server
        chai.request(server)
        // method and route
        .post('/data')
        // our request body
        .send({ data: "Any String"})
        // response from the server
        .end((err, res) => {
            // assertions
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('object');
            expect(res.body).to.deep.equal({ data: "Any String"})
           
            done();
        })
    })
})
describe('third test', () => {
    // expected behaviour
    it('should return { data: "Any String"}', done => {
        // connecting to the server
        chai.request(server)
        // method and route
        .get('/data')
        // response from the server
        .end((err, res) => {
            // assertions
            expect(res.status).to.equal(200);
            expect(res.body).to.be.a('object');
            expect(res.body).to.deep.equal({ data: "Any String"})
            
            done();
        })
    })
})
//Task 2 Tests
describe('Tests for task 2', () => {
	before(done => {
		User.destroy({
			where: {},
            truncate: true
		})
		.then(() => {
			// After we empty our database we create one user for our login test
			User.create({
				email: 'test@mail.com',
				password: '123456'
			})
			.then(() => done());
		})
	})

	describe('POST user/signup', () => {
		it('should sign a user', done => {

			chai.request(server)
			.post('/user/signup')
			.send({
				email: 'test10@mail.com',
				password: '123456'
			})
			.end((err, res) => {
				expect(res.status).to.equal(200);
				expect(res.body).to.be.a('object');
				expect(res.body).to.have.property('session');
				done();
			})
		})
	})
	describe('POST user/login', () => {
		it('should login a user', done => {
			chai.request(server)
			.post('/user/login')
			.send({
				email: 'test10@mail.com',
				password: '123456'
			})
			.end((err, res) => {
				expect(res.status).to.equal(200);
				expect(res.body).to.be.a('object');
				done();
			})
		})
    })
})