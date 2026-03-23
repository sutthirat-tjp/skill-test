export interface Question {
    id?: number;
    runningNo: number;
    title: string;
    choices: Choice[];
}
export interface Choice {
    id?: number;
    answerText: string;
    isKey: boolean;
    questionId?: number;
}