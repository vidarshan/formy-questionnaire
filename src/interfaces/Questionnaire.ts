export interface Questionnaire {
    title: string;
    description: string;
    isPublic: boolean;
    isOneTime: boolean;
    questions: any[];
  }