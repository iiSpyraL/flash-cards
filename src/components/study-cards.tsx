import { useState } from "react";
import { Cards } from "../types";
import styled from "styled-components";
import { EnglishFlag, FrenchFlag } from "../icons";
import { useDispatch } from "react-redux";
import { setView } from "../redux/actions";

export const StudyCards = ({ shuffledCards }: { shuffledCards: Cards }) => {
  const dispatch = useDispatch();
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [showBack, setShowBack] = useState<boolean>(false);

  const nextCard = () => {
    setCardIndex(cardIndex + 1);
    setShowBack(false);
  };

  const endOfDeck = cardIndex >= shuffledCards.length - 1 && showBack;

  return (
    <div
      style={{ height: "100%", display: "grid", gridTemplateRows: "auto 1fr" }}
    >
      <Header>
        <button onClick={() => dispatch(setView("mainPage"))}>Exit</button>
      </Header>
      <StudyCardWrapper>
        <FrontSide>
          <FlagWrapper>
            <FrenchFlag />
          </FlagWrapper>
          <span>{shuffledCards[cardIndex].front.content}</span>
        </FrontSide>
        <BackSide>
          <FlagWrapper>
            <EnglishFlag />
          </FlagWrapper>
          {showBack && <span>{shuffledCards[cardIndex].back.content}</span>}
        </BackSide>
        {!endOfDeck && (
          <Button onClick={showBack ? nextCard : () => setShowBack(true)}>
            {showBack ? "Next" : "Reveal"}
          </Button>
        )}
      </StudyCardWrapper>
    </div>
  );
};

const StudyCardWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
`;

const FrontSide = styled.div`
  grid-row: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-size: 2rem;
`;

const FlagWrapper = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const BackSide = styled.div`
  grid-row: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-size: 2rem;
`;

const Button = styled.button`
  grid-row: 3;
`;

const Header = styled.div`
  display: inline-flex;
  justify-content: space-between;
  padding: 0.5rem;
`;
