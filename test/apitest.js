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
                    setTimeout(done, 7500);
                    res.body.should.be.a('object');
                   
                  });
                  done();
            });
      
        });
  
   describe('/GET movies', () => {
        it('it should search and GET a movie details if present in db', (done) => {
            let query="query?name=srikanth";
        chai.request(server)
            .get('/movies/:id')
            .send({query:"query", name:"srikanth"})
            .end((err, res) => {
                res.should.have.status(200);
                res.should.have.a('object');
                res.should.be.a('Array');
                err.shound.have.a('object');
               
             });
             done();
            
            });
        });
   });
