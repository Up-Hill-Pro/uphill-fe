import mockInstructors from '../../mocks/mockInstructors.json';
import type { Instructor } from './types';

/**
 * Simulates fetching Instructors from a backend API.
 * In the real world, replace with fetch/axios call.
 */
export const fetchInstructors = async (): Promise<Instructor[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockInstructors);
        }, 300); // Simulated delay
    });
};
