import * as random from 'random-number';
import * as randomWordsUtil from 'random-words';

export function randomNumber(from: number, to: number): number {
  return random({
    min: from,
    max: to,
    integer: true,
  });
}

export function randomItem<T>(items: T[]): T {
  return items[randomNumber(0, items.length - 1)];
}

type WordsOptions = {
  min?: number;
  max?: number;
  exactly?: number;
  maxLength?: number;
  wordsPerString?: number;
  seperator?: string;
  formatter?: (word: string, index: number) => string;
  join?: string;
};

export function randomWords(options: WordsOptions): string[] {
  const w = randomWordsUtil as any;

  return w(options);
}