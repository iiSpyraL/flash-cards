import { PayloadAction } from "@reduxjs/toolkit";
import { Cards, DailyTerm, Views } from "../types";
import { SET_CARDS, SET_VERBS, SET_VIEW, SET_WORDS } from "./actionTypes";

export type State = {
  cards: Cards;
  dailyWords: DailyTerm[];
  dailyVerbs: DailyTerm[];
  view: Views;
};

const initialState: State = {
  cards: [],
  dailyWords: [],
  dailyVerbs: [],
  view: "mainPage",
};

const reducer = (
  state: State = initialState,
  action: {
    type: "SET_CARDS" | "SET_WORDS" | "SET_VERBS" | "SET_VIEW";
    payload: PayloadAction;
  }
) => {
  switch (action.type) {
    case SET_CARDS:
      return {
        ...state,
        cards: action.payload,
      };
    case SET_WORDS:
      return {
        ...state,
        dailyWords: action.payload,
      };
    case SET_VERBS:
      return {
        ...state,
        dailyVerbs: action.payload,
      };
    case SET_VIEW:
      return {
        ...state,
        view: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
