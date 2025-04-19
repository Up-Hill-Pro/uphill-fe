export type Week = {
    weekId: number;
    weekNumber: number;
    unit: string;
    team: string;
    applicantCount?: number;
    evaluatorCount: number;
    status: string;
    passed: number;
    cycle: string;
    startDate: string;
};
