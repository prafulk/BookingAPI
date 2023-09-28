import { getAgentById } from '../models/agentModel.mjs';

test('returns agent data for a valid agent ID', async () => {
    const mockAgentData = { /* ... */ };
    // Mocking the database call
    jest.mock('../db', () => ({
        findAgentById: jest.fn().mockReturnValue(mockAgentData),
    }));

    const result = await getAgentById(123);
    expect(result).toEqual(mockAgentData);
});
