import mockApplicants from '../../mocks/mockApplicants.json';
import type { Applicant } from './types';

/**
 * Simulates fetching applicants from a backend API.
 * In the real world, replace with fetch/axios call.
 */
export const fetchApplicants = async (): Promise<Applicant[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockApplicants);
    }, 300); // Simulated delay
  });
};
