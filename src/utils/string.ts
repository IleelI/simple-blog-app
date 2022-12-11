export function capitalizeFirstLetter(input: string) {
  const capitalizedFirstLetter = input.slice(0, 1).toUpperCase();
  const rest = input.slice(1);
  return `${capitalizedFirstLetter}${rest}`;
}

export function getParagraphedBody(
  bodyText: string,
  sentencesPerParagraph = 2
) {
  // Splitting our body text by '.' delimiter,
  // removing empty sentences and appending '.' to the end of each sentence.
  const sentences =
    bodyText
      .split('.')
      .filter((sentence) => sentence.length)
      .map((sentence) => `${sentence.trim()}.`) ?? [];

  // Creating an empty array of strings that will be populated with
  // concatted sentences in count equal to sentencesPerParagraph parameter
  const emptyParagraphs = new Array<string>(
    Math.ceil(sentences.length / Math.abs(sentencesPerParagraph))
  ).fill('');

  const paragraphs = emptyParagraphs.map((item, index) => {
    const paragraphSentences = sentences.filter((sentence, sentenceIndex) => {
      const start = index * sentencesPerParagraph;
      const end = (index + 1) * sentencesPerParagraph;
      return sentenceIndex >= start && sentenceIndex < end;
    });
    const paragraph = paragraphSentences
      .reduce((prev, curr) => `${prev}${curr} `, '')
      .trim();
    return paragraph;
  });

  return paragraphs;
}
