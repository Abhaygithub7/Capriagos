import { useMemo } from 'react';

export function useSplitText(text, options = {}) {
  const {
    wordDelimiter = ' ',
    charDelimiter = '',
  } = options;

  const chars = useMemo(() => {
    if (!text) return [];

    const words = text.split(wordDelimiter);

    return words.map((word, wordIndex) => {
      const charsInWord = word.split(charDelimiter).map((char, charIndex) => ({
        char,
        key: `word-${wordIndex}-char-${charIndex}`,
      }));

      return {
        word,
        chars: charsInWord,
        key: `word-${wordIndex}`,
        hasSpace: wordIndex < words.length - 1,
      };
    });
  }, [text, wordDelimiter, charDelimiter]);

  return { chars, text };
}

export default useSplitText;