export type Week = {
    weekNumber: number;
    unit: string;
    applicantCount: number;
    evaluatorCount: number;
    status: string;
    passed: number;
    cycle: string;
    startDate: string;
};

export const mockWeeks: Week[] = [
    {
        weekNumber: 4,
        unit: "אגוז",
        applicantCount: 29,
        evaluatorCount: 9,
        status: "הסתיים",
        passed: 4,
        cycle: "אוג 2023",
        startDate: "24-01-2024 00:00"
    },
    {
        weekNumber: 47,
        unit: "סיירת צנחנים",
        applicantCount: 31,
        evaluatorCount: 10,
        status: "עתידי להתקיים",
        passed: 0,
        cycle: "מרץ 2023",
        startDate: "21-11-2024 00:00"
    },
    {
        weekNumber: 50,
        unit: "מגלן",
        applicantCount: 17,
        evaluatorCount: 5,
        status: "עתידי להתקיים",
        passed: 0,
        cycle: "נוב 2023",
        startDate: "15-12-2024 00:00"
    },
    {
        weekNumber: 26,
        unit: "דובדבן",
        applicantCount: 32,
        evaluatorCount: 10,
        status: "בוטל",
        passed: 0,
        cycle: "נוב 2023",
        startDate: "26-06-2024 00:00"
    },
    {
        weekNumber: 26,
        unit: "סיירת צנחנים",
        applicantCount: 35,
        evaluatorCount: 11,
        status: "הסתיים",
        passed: 6,
        cycle: "אוג 2023",
        startDate: "27-06-2024 00:00"
    },
    {
        weekNumber: 9,
        unit: "מגלן",
        applicantCount: 20,
        evaluatorCount: 6,
        status: "בוטל",
        passed: 0,
        cycle: "נוב 2023",
        startDate: "28-02-2024 00:00"
    },
    {
        weekNumber: 37,
        unit: "אגוז",
        applicantCount: 19,
        evaluatorCount: 6,
        status: "בתהליך",
        passed: 0,
        cycle: "אוג 2023",
        startDate: "15-09-2024 00:00"
    },
    {
        weekNumber: 11,
        unit: "מגלן",
        applicantCount: 30,
        evaluatorCount: 10,
        status: "בתהליך",
        passed: 0,
        cycle: "נוב 2023",
        startDate: "17-03-2024 00:00"
    },
    {
        weekNumber: 23,
        unit: "סיירת צנחנים",
        applicantCount: 23,
        evaluatorCount: 7,
        status: "עתידי להתקיים",
        passed: 0,
        cycle: "נוב 2023",
        startDate: "08-06-2024 00:00"
    },
    {
        weekNumber: 8,
        unit: "סיירת צנחנים",
        applicantCount: 22,
        evaluatorCount: 7,
        status: "הסתיים",
        passed: 2,
        cycle: "מרץ 2023",
        startDate: "20-02-2024 00:00"
    }
];