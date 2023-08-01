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
  description: "All Questions";
  email: "john@gmail.com";
  name: "John";
  questionnaireId: "64c67c91f1c8b48100d66f54";
  questions: Question[];
  title: "All";
  updatedAt: "2023-07-30T15:08:20.493Z";
  _id: "6c70f643-5ab6-4fba-8cb1-b2a499c62df7";
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
}
