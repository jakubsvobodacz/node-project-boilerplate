import { expect } from 'chai';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();


describe('Mock test', () => {
    it('should evaluate numbers', async () => {
        const result = 5
        expect(result).to.be.equal(5);
    });
});



