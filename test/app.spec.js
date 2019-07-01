const expect = require('chai').expect;
const request = require('supertest');
const app = require('../src/app')

describe('App', () => {
  it('GET / should return a message', () => {
    return request(app)
      .get('/')
      .expect(200, 'Welcome to the Whatll It Be API!');
  });
  it('should return an array of drinks', () => {
    return request(app)
      .get('/drinks')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
       expect(res.body).to.have.lengthOf.at.least(1);
       const drink = res.body[0];
       expect(drink).to.include.all.keys('name', 'type', 'ingredients', 'recipe');
      });
  });
})
