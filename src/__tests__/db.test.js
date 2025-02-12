const { connectDb } = require('../db');
const { MongoClient } = require('mongodb');

// Mock the MongoDB client
jest.mock('mongodb');

describe('Database Connection', () => {
    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
    });

    test('should connect to database successfully', async () => {
        // Mock the collection object
        const mockCollection = {
            find: jest.fn()
        };
        
        // Mock the db object
        const mockDb = {
            collection: jest.fn().mockReturnValue(mockCollection)
        };
        
        // Mock the client
        MongoClient.prototype.connect = jest.fn();
        MongoClient.prototype.db = jest.fn().mockReturnValue(mockDb);

        const result = await connectDb('testCollection');
        
        expect(result).toHaveProperty('collection');
        expect(MongoClient.prototype.connect).toHaveBeenCalled();
    });

    test('should handle connection errors', async () => {
        // Mock a failed connection
        const mockError = new Error('Connection failed');
        MongoClient.prototype.connect = jest.fn().mockRejectedValue(mockError);

        const consoleSpy = jest.spyOn(console, 'error');
        
        await connectDb('testCollection');
        
        expect(consoleSpy).toHaveBeenCalledWith('Could not connect to MongoDB:', mockError);
    });
}); 