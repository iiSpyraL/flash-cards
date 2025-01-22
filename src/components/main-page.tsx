import styled, { css } from "styled-components";
import { Cards } from "../types";
import { useState } from "react";
import { AddIcon, BinIcon, StudyIcon } from "../icons";
import { DailyItemDisplay } from "./daily-item";
import { useDispatch } from "react-redux";
import { setView } from "../redux/actions";
import { useApi } from "../hooks/use-api";

export const MainPage = ({ cards }: { cards: Cards }) => {
  const dispatch = useDispatch();
  const { addWordOfTheDay, addVerbOfTheDay, deleteCard } = useApi();
  const [confirmDeleteCard, setConfirmDeleteCard] = useState<string>("");

  const onDelete = (id: string) => {
    deleteCard({ id });
    setConfirmDeleteCard("");
  };

  return (
    <MainPageWrapper>
      <DailyItemDisplay
        itemsInState="dailyWords"
        addItem={addWordOfTheDay}
        heading="Mot du jour"
        placeholders={["Mot", "Word"]}
      />
      <DailyItemDisplay
        itemsInState="dailyVerbs"
        addItem={addVerbOfTheDay}
        heading="Verb du jour"
        placeholders={["Verbe", "Verb"]}
      />
      <Heading>
        <StudyButton
          disabled={!cards.length}
          onClick={() => dispatch(setView("studyCards"))}
        >
          <StudyIcon />
        </StudyButton>
        <span>Flash cards</span>
        <AddButton onClick={() => dispatch(setView("addCards"))}>
          <AddIcon />
        </AddButton>
      </Heading>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {cards.map((card) => {
          const deleteClickedCard = confirmDeleteCard === card._id;

          return (
            <CardWrapper key={card._id}>
              <CardFront>{card.front.content}</CardFront>
              <CardBack>{card.back.content}</CardBack>
              <ButtonWrapper>
                {deleteClickedCard && (
                  <CancelButton onClick={() => setConfirmDeleteCard("")}>
                    Cancel
                  </CancelButton>
                )}
                <DeleteButton
                  selected={deleteClickedCard}
                  onClick={() =>
                    deleteClickedCard
                      ? onDelete(card._id)
                      : setConfirmDeleteCard(card._id)
                  }
                >
                  {deleteClickedCard ? "Delete" : <BinIcon />}
                </DeleteButton>
              </ButtonWrapper>
            </CardWrapper>
          );
        })}
      </div>
    </MainPageWrapper>
  );
};

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: 1fr 1fr;
  padding: 0 1.5rem;
`;
const CardFront = styled.span`
  grid-column: 1;
  grid-row: 1;
  overflow: hidden;
  white-space: nowrap;
  text-align: left;
  text-overflow: ellipsis;
  padding-right: 0.5rem;
`;
const CardBack = styled(CardFront)`
  grid-column: 1;
  grid-row: 2;
  color: grey;
`;

const DeleteButton = styled.button<{ selected: boolean }>`
  display: flex;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  ${({ selected }) =>
    selected &&
    css`
      background: red;
    `}
`;

const CancelButton = styled.button`
  background: white;
  color: black;
  padding: 0.5rem 1rem;
`;

const ButtonWrapper = styled.div`
  grid-row: 1 / span 2;
  display: flex;
  align-items: center;
`;

const MainPageWrapper = styled.div`
  gap: 1rem;
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
`;

const StudyButton = styled.button`
  padding: 0;
  height: 3rem;
  width: 5rem;
  border-radius: 10rem;
  background: white;
`;

const Heading = styled.h2`
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
`;

const AddButton = styled.button`
  padding: 0;
  height: 3rem;
  width: 5rem;
  border-radius: 10rem;
  background: none;
`;
