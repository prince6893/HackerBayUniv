let chai = require('chai');
let expect = chai.expect;

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