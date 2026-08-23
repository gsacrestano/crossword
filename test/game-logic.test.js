import { describe, it, expect, vi } from 'vitest';
import {
  decreasePoint,
  getPoints,
  increasePoint,
  nextWord,
  getCurrentWord,
} from '../scripts/game-logic';
import { WORDS } from '../scripts/data';

vi.mock('../scripts/data', () => ({
  TEAM_NUM: 2,
  WORDS: [
    {
      text: 'Word-1',
      direction: 'across',
      startPosition: { row: 0, col: 0 },
      clue: 'Clue-1',
    },
    {
      text: 'Word-2',
      direction: 'down',
      startPosition: { row: 0, col: 0 },
      clue: 'Clue-2',
    },
  ],
}));

describe('Score management', () => {
  it('Assing point to first squad', () => {
    decreasePoint(1);
    expect(getPoints(1)).toBe(0);

    increasePoint(1);
    expect(getPoints(1)).toBe(2);

    decreasePoint(1);
    expect(getPoints(1)).toBe(1);
  });

  it('Trying words flow', () => {
    expect(getCurrentWord()).toBe(WORDS[0]);
    nextWord();
    expect(getCurrentWord()).toBe(WORDS[1]);
    nextWord();
    expect(getCurrentWord()).toBe(WORDS[1]);
  });
});
