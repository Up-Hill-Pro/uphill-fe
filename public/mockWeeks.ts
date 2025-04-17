export type Week = {
    weekId: number;
    weekNumber: number;
    unit: string;
    team: string;
    applicantCount: number;
    evaluatorCount: number;
    status: string;
    passed: number;
    cycle: string;
    startDate: string;
};

export const mockWeeks: Week[] = [
    {
        weekId: 1,
        weekNumber: 4,
        unit: "סיירת צנחנים",
        team: "גסטלדו",
        applicantCount: 12,
        evaluatorCount: 5,
        status: "הסתיים",
        passed: 4,
        cycle: "אוג 2023",
        startDate: "24-01-2024 00:00"
    },
    {
        weekId: 2,
        weekNumber: 8,
        unit: "סיירת צנחנים",
        team: "רון",
        applicantCount: 10,
        evaluatorCount: 4,
        status: "בתהליך",
        passed: 0,
        cycle: "מרץ 2023",
        startDate: "20-02-2024 00:00"
    },
    {
        weekId: 3,
        weekNumber: 47,
        unit: "סיירת צנחנים",
        team: "רובינזון",
        applicantCount: 31,
        evaluatorCount: 10,
        status: "עתידי להתקיים",
        passed: 0,
        cycle: "מרץ 2023",
        startDate: "21-11-2024 00:00"
    },
    {
        weekId: 4,
        weekNumber: 50,
        unit: "מגלן",
        team: "מתתיהו",
        applicantCount: 17,
        evaluatorCount: 5,
        status: "עתידי להתקיים",
        passed: 0,
        cycle: "נוב 2023",
        startDate: "15-12-2024 00:00"
    },
    {
        weekId: 5,
        weekNumber: 26,
        unit: "מגלן",
        team: "חיימי",
        applicantCount: 32,
        evaluatorCount: 10,
        status: "בוטל",
        passed: 0,
        cycle: "נוב 2023",
        startDate: "26-06-2024 00:00"
    },
    {
        weekId: 6,
        weekNumber: 26,
        unit: "דובדבן",
        team: "שפירא",
        applicantCount: 35,
        evaluatorCount: 11,
        status: "הסתיים",
        passed: 6,
        cycle: "אוג 2023",
        startDate: "27-06-2024 00:00"
    },
    {
        weekId: 7,
        weekNumber: 9,
        unit: "דובדבן",
        team: "רוזנפלד",
        applicantCount: 20,
        evaluatorCount: 6,
        status: "בוטל",
        passed: 0,
        cycle: "נוב 2023",
        startDate: "28-02-2024 00:00"
    },
    {
        weekId: 8,
        weekNumber: 37,
        unit: "אגוז",
        team: "בן זקן",
        applicantCount: 19,
        evaluatorCount: 6,
        status: "בתהליך",
        passed: 0,
        cycle: "אוג 2023",
        startDate: "15-09-2024 00:00"
    },
    {
        weekId: 9,
        weekNumber: 11,
        unit: "אגוז",
        team: "דגן",
        applicantCount: 30,
        evaluatorCount: 10,
        status: "בתהליך",
        passed: 0,
        cycle: "נוב 2023",
        startDate: "17-03-2024 00:00"
    },
    {
        weekId: 10,
        weekNumber: 23,
        unit: "אגוז",
        team: "שאשא",
        applicantCount: 23,
        evaluatorCount: 7,
        status: "עתידי להתקיים",
        passed: 0,
        cycle: "נוב 2023",
        startDate: "08-06-2024 00:00"
    },
];