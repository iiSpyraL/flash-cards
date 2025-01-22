import { useEffect } from "react";
import "./App.css";
import { AddCards } from "./components/add-cards";
import { MainPage } from "./components/main-page";
import styled from "styled-components";
import { useApi } from "./hooks/use-api";
import { StudyCards } from "./components/study-cards";
import { shuffleCards } from "./utils";
import { useSelector } from "react-redux";
import { State } from "./redux/reducer";
import { DailyItemsList } from "./components/daily-items-list";

function App() {
  const cards = useSelector((state: State) => state.cards);
  const view = useSelector((state: State) => state.view);
  const { getCards, getDailyWords, getDailyVerbs } = useApi();

  useEffect(() => {
    if (view === "mainPage") {
      getCards();
      getDailyWords();
      getDailyVerbs();
    }
  }, [view]);

  return (
    <AppWrapper>
      {view === "addCards" && <AddCards />}
      {view === "mainPage" && <MainPage cards={cards} />}
      {view === "studyCards" && (
        <StudyCards shuffledCards={shuffleCards(cards)} />
      )}
      {view === "dailyVerbs" && <DailyItemsList itemsInState="dailyVerbs" />}
      {view === "dailyWords" && <DailyItemsList itemsInState="dailyWords" />}
    </AppWrapper>
  );
}

export default App;

const AppWrapper = styled.div`
  height: 100%;
`;
