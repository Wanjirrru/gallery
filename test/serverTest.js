process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);

describe('Photos', function(){

//small mod to allow tests to run on CI/CD servers
    before(function() {
        if (process.env.JENKINS_HOME || process.env.CI) {
            process.env.PORT = 4000;   // any free port
        }
    });

    it('should list ALL photos on / GET', function(done){
        this.timeout(60000);
        chai.request(server)
        .get('/')
        .end(function(err,res){
            res.should.have.status(200);
            res.should.be.html;
            res.body.should.be.a('object');
            done();
        });
    });
});