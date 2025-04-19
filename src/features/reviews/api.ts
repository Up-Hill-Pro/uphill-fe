import mockReviews from '../../mocks/mockReviews.json';
import type { Review } from './types';

/**
 * Simulates fetching reviews from a backend API.
 * In the real world, replace with fetch/axios call.
 */
export const fetchReviews = async (): Promise<Review[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockReviews);
        }, 300); // Simulated delay
    });
};
