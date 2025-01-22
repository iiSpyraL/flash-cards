import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../redux/reducer";
import { setView } from "../redux/actions";
import { EnglishFlag, FrenchFlag } from "../icons";
import { DailyTerm } from "../types";

export const DailyItemDisplay = ({
  itemsInState,
  heading,
  placeholders,
  addItem,
}: {
  itemsInState: "dailyWords" | "dailyVerbs";
  heading: string;
  placeholders: [string, string];
  addItem: ({ dailyTerm }: { dailyTerm: DailyTerm }) => Promise<void>;
}) => {
  const dispatch = useDispatch();

  const [frenchItem, setFrenchItem] = useState<string>("");
  const [englishItem, setEnglishItem] = useState<string>("");
  const dailyItems = useSelector((state: State) => state[itemsInState]);
  const today = new Date().toLocaleDateString();
  const dailyItemToday = dailyItems.filter((item) => item.date === today)[0];
  return (
    <Wrapper>
      <HeaderWrapper>
        <Header>{heading}</Header>
        <SeeAllButton onClick={() => dispatch(setView(itemsInState))}>
          {"See all >"}
        </SeeAllButton>
      </HeaderWrapper>
      {dailyItemToday ? (
        <TodayItem>
          <FrenchFlag width="2rem" />
          <Item
            $longWord={Boolean(dailyItemToday.frenchTranslation.length > 28)}
          >
            {dailyItemToday.frenchTranslation}
          </Item>
          <EnglishFlag width="2rem" />
          <Item
            $longWord={Boolean(dailyItemToday.englishTranslation.length > 28)}
          >
            {dailyItemToday.englishTranslation}
          </Item>
        </TodayItem>
      ) : (
        <AddItemWrapper>
          <InputsWrapper>
            <InputTitle>French</InputTitle>
            <Input
              placeholder={placeholders[0]}
              value={frenchItem}
              onChange={(e) => setFrenchItem(e.target.value)}
            />
            <InputTitle>English</InputTitle>
            <Input
              placeholder={placeholders[1]}
              value={frenchItem}
              onChange={(e) => setEnglishItem(e.target.value)}
            />
          </InputsWrapper>
          <AddItemButton
            disabled={!frenchItem || !englishItem}
            onClick={() => {
              addItem({
                dailyTerm: {
                  frenchTranslation: frenchItem,
                  englishTranslation: englishItem,
                  date: today,
                },
              });
            }}
          >
            Add word of the day
          </AddItemButton>
        </AddItemWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-radius: 1rem;
  margin: 0 1rem;
  background: grey;
  position: relative;
  height: 14rem;
  overflow: hidden;
`;

const HeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  padding: 0 1rem;
`;

const SeeAllButton = styled.button`
  background: none;
  padding: 0;
`;

const Header = styled.h3`
  text-align: left;
`;

const TodayItem = styled.div`
  font-weight: 600;
  padding: 1rem 1rem 0 1rem;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr 1fr;
  align-items: center;
  gap: 1rem;
`;

const Item = styled.span<{ $longWord: boolean }>`
  padding: 0 1rem;
  font-size: ${({ $longWord }) => ($longWord ? "1rem" : "1.6rem")};
`;

const InputTitle = styled.span`
  font-weight: 600;
`;

const Input = styled.input`
  height: 2rem;
`;

const AddItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  padding-bottom: 1rem;
  justify-items: start;
  row-gap: 0.5rem;
  align-items: center;
`;

const AddItemButton = styled.button``;
