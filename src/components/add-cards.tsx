import { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setView } from "../redux/actions";
import { useApi } from "../hooks/use-api";

export const AddCards = () => {
  const dispatch = useDispatch();
  const { addCard } = useApi();
  const [frontContent, setFrontContent] = useState<string>("");
  const [backContent, setBackContent] = useState<string>("");

  return (
    <div
      style={{ height: "100%", display: "grid", gridTemplateRows: "auto 1fr" }}
    >
      <Header>
        <button onClick={() => dispatch(setView("mainPage"))}>Back</button>
      </Header>
      <Wrapper>
        <InputTitle>French</InputTitle>
        <Input
          placeholder="mot ou expression"
          id="front"
          value={frontContent}
          onChange={(e) => setFrontContent(e.target.value)}
        />
        <InputTitle>English</InputTitle>
        <Input
          placeholder="word or phrase"
          id="back"
          value={backContent}
          onChange={(e) => setBackContent(e.target.value)}
        />
        <Button
          disabled={!frontContent || !backContent}
          onClick={() => {
            addCard({
              card: {
                front: { language: "french", content: frontContent },
                back: { language: "english", content: backContent },
              },
            });
            setFrontContent("");
            setBackContent("");
          }}
        >
          Add card
        </Button>
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 5rem;
`;

const Input = styled.input`
  width: 15rem;
  height: 3rem;
  margin-bottom: 2rem;
  font-size: 1.2rem;
`;

const Button = styled.button`
  width: 10rem;
  height: 4rem;
`;

const InputTitle = styled.span`
  display: inline-flex;
  width: 15rem;
  font-size: 1rem;
  font-weight: 600;
`;

const Header = styled.div`
  display: inline-flex;
  justify-content: space-between;
  padding: 0.5rem;
`;
