export type Card = {
  front: {
    language: string;
    content: string;
  };
  back: {
    language: string;
    content: string;
  };
};

export type Cards = (Card & { _id: string })[];

export type DailyTerm = {
  frenchTranslation: string;
  englishTranslation: string;
  date: string;
};

export type Views =
  | "mainPage"
  | "studyCards"
  | "addCards"
  | "dailyWords"
  | "dailyVerbs";
