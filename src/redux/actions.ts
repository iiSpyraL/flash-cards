import { Cards, DailyTerm, Views } from "../types";
import { SET_CARDS, SET_VERBS, SET_VIEW, SET_WORDS } from "./actionTypes";

export const setCards = (cards: Cards[]) => {
  return {
    type: SET_CARDS,
    payload: cards,
  };
};

export const setDailyWords = (dailyWords: DailyTerm[]) => {
  return {
    type: SET_WORDS,
    payload: dailyWords,
  };
};

export const setDailyVerbs = (dailyVerbs: DailyTerm[]) => {
  return {
    type: SET_VERBS,
    payload: dailyVerbs,
  };
};

export const setView = (view: Views) => {
  return {
    type: SET_VIEW,
    payload: view,
  };
};
