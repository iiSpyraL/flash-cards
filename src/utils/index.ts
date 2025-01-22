import { Cards } from "../types";

export function shuffleCards(cards: Cards) {
  const shuffledCards: Cards = cards.slice();
  let currentIndex = cards.length;

  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [shuffledCards[currentIndex], shuffledCards[randomIndex]] = [
      shuffledCards[randomIndex],
      shuffledCards[currentIndex],
    ];
  }

  return shuffledCards;
}
