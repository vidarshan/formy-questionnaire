export interface Questionnaire {
  title: string;
  description: string;
  isPublic: boolean;
  isOneTime: boolean;
  questions: any[];
}

export interface Question {
  answers: string;
  createdAt: string;
  options: any[];
  required: boolean;
  title: string;
  type: string;
  updatedAt: string;
  values: null | any;
  _id: string;
}

export interface Response {
  createdAt: string;
  description: string;
  email: string;
  name: string;
  questionnaireId: string;
  questions: Question[];
  title: string;
  updatedAt: string;
  _id: string;
}

export interface QuestionnaireResponse {
  createdAt: string;
  description: string;
  isLinkValid: boolean;
  isOneTime: boolean;
  isPublic: boolean;
  isPublished: true;
  questions: Question[] | [];
  responses: Response[] | [];
  title: string;
  updatedAt: string;
  user: string;
  _id: string;
  name: string;
  email: string;
}
