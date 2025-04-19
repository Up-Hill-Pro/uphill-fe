import mockWeeks from '../../mocks/mockWeeks.json';
import type { Week } from './types';

/**
 * Simulates fetching Weeks from a backend API.
 * In the real world, replace with fetch/axios call.
 */
export const fetchWeeks = async (): Promise<Week[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockWeeks);
        }, 300); // Simulated delay
    });
};
