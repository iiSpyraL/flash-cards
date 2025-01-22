import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import { State } from "../redux/reducer";
import { setView } from "../redux/actions";

export const DailyItemsList = ({
  itemsInState,
}: {
  itemsInState: "dailyWords" | "dailyVerbs";
}) => {
  const dispatch = useDispatch();
  const dailyItems = useSelector((state: State) => state[itemsInState]);

  return (
    <div
      style={{ height: "100%", display: "grid", gridTemplateRows: "auto 1fr" }}
    >
      <Header>
        <button onClick={() => dispatch(setView("mainPage"))}>Back</button>
      </Header>
      <ItemList>
        {dailyItems.map((item) => (
          <PreviousItem
            key={`${item.frenchTranslation}-${item.englishTranslation}`}
          >
            <span>{item.date}</span>
            <ItemWrapper>
              <Item $tooLong={item.frenchTranslation.length > 16}>
                {item.frenchTranslation}
              </Item>
            </ItemWrapper>
            <ItemWrapper>
              <Item $tooLong={item.englishTranslation.length > 16}>
                {item.englishTranslation}
              </Item>
            </ItemWrapper>
          </PreviousItem>
        ))}
      </ItemList>
    </div>
  );
};

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0.5rem;
  font-weight: 500;
`;

const PreviousItem = styled.div`
  display: inline-grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
`;

const sideScroll = keyframes`
  0% {
    transform: translateX(0);
  }

  30% {
    transform: translateX(0);
  }

  90% {
    transform: translateX(-60%);
  }  
    
  100% {
    transform: translateX(-60%);
  }
`;

const ItemWrapper = styled.div`
  display: inline-flex;
  white-space: nowrap;
  overflow: hidden;
`;

const Item = styled.span<{ $tooLong: boolean }>`
  text-overflow: clip;
  position: relative;
  display: inline-block;

  animation: ${({ $tooLong }) => $tooLong && sideScroll} 4s alternate linear
    infinite;
`;

const Header = styled.div`
  display: inline-flex;
  justify-content: space-between;
  padding: 0.5rem;
`;
