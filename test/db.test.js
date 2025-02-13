const { expect } = require('chai');
const dotenv = require('dotenv');

dotenv.config();


describe('Mock test', () => {
    it('should evaluate numbers', async () => {
        const result = 5
        expect(result).to.be.equal(5);
    });
});



