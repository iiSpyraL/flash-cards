import axios from "axios";
import { Card, DailyTerm } from "../types";
import { useDispatch } from "react-redux";
import { setCards, setDailyVerbs, setDailyWords } from "../redux/actions";

const baseUrl = import.meta.env.VITE_SERVER_API;

export const useApi = () => {
  const dispatch = useDispatch();

  const getCards = () =>
    axios
      .get(`${baseUrl}/cards`)
      .then(async (res) => dispatch(setCards(res.data)))
      .catch((e) => console.error(e));

  const addCard = ({ card }: { card: Card }) =>
    axios.post(`${baseUrl}/addCard`, card).then((res) => console.log(res));

  const getDailyWords = () => {
    axios
      .get(`${baseUrl}/dailyWords`)
      .then((res) => dispatch(setDailyWords(res.data)))
      .catch((e) => console.error(e));
  };

  const getDailyVerbs = () => {
    axios
      .get(`${baseUrl}/dailyVerbs`)
      .then((res) => dispatch(setDailyVerbs(res.data)))
      .catch((e) => console.error(e));
  };

  const addWordOfTheDay = ({ dailyTerm }: { dailyTerm: DailyTerm }) =>
    axios.post(`${baseUrl}/addWord`, dailyTerm).then((res) => {
      console.log(res);
      getDailyWords();
    });

  const addVerbOfTheDay = ({ dailyTerm }: { dailyTerm: DailyTerm }) =>
    axios.post(`${baseUrl}/addVerb`, dailyTerm).then((res) => {
      console.log(res);
      getDailyVerbs();
    });

  const deleteCard = ({ id }: { id: string }) =>
    axios
      .post(`${baseUrl}/deleteCard`, {
        id,
      })
      .then((res) => {
        console.log(res);
        getCards();
      });

  return {
    getCards,
    addCard,
    deleteCard,
    getDailyWords,
    addWordOfTheDay,
    getDailyVerbs,
    addVerbOfTheDay,
  };
};
