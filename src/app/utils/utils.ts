export const clipWord = (word: string, length: number = 25) => {
  const clipped =
    word.length <= length ? word : word.substring(0, length).concat('...');

    return clipped
};
