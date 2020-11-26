let chai = require('chai');
let chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);
let server = require('../index');

//Our parent block


describe('Podcast', () => {
    
    describe('/POST movies', () => {
        it('it should POST all the movies', (done) => {
            chai.request(server)
              .post('/movies')
              .send([{"name":"test", "year":"2/21/2020", "director":"er"}, {"name":"srikant", "year":"2/21/2020", "director":"er"}])
              .end(function(err, res) {
                if (err) done(err);
                res.body.should.be.a('object');
                
                 });
              done();
          });
        });
        describe('/POST movie', () => {
            it('it should POST  the movies', (done) => {
                let movie = {
                    name: "test",
                    year: "2/21/2020",
                    director: "er"
                }
              chai.request(server)
                  .post('/movie')
                  .send(movie)
                  .end((err, res) => {
                    res.body.should.be.a('object');
                   
                  });
                  done();
            });
      
        });
  
   describe('/GET movies', () => {
        it('it should search and GET a movie details if present in db', (done) => {
            let query="";
        chai.request(server)
            .get('/movies/:id')
            .send(query)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.a('Something Went wrong Please try again');
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.errors.should.have.property('name');
                res.body.errors.pages.should.have.property('year');
                res.body.errors.pages.should.have.property('director');
           
             });
             done();
            });
        });
   });
