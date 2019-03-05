const chai = require('chai');
const chaiHttp = require('chai-http');
const axios = require('axios')

chai.use(chaiHttp);

describe('Test API', () => {

	const host = 'http://localhost:5000';

	it('should be status 401 without auth header ', function(done) {
		
		chai.request(host)
		  .get('')
		  .end(function(err, res) {
		    chai.expect(res).to.have.status(401); 
		    done();
		  });
   });

	it('should be status 200 with auth header ', function(done) {
		
		chai.request('http://localhost:5000')
		  .get('')
		  .set('Authorization', 'Bearer 123')
		  .end(function(err, res) {
		    chai.expect(res).to.have.status(200);
		    chai.expect(res.body).to.be.an('array');
		    done();
		  });
   });

});