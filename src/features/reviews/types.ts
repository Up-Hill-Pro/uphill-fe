export type Review = {
    name: string; // applicant name
    id: string; // applicant id
    image: string;
    terrain: number;
    technical: number;
    learning: number;
    personal: number;
    finalAssessment: string;
    notes: string;
    finalScore: number;
    evaluatorName: string;
    evaluatorId: string;
    date: string;
    path: string;
    weekId: number;
};