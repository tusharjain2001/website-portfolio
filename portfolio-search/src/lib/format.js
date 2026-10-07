// "brand mark design" -> "Brand Mark Design"; words with capitals already ("eBook", "B2B") are kept.
export const titleCase = (text) =>
  text.replace(/\S+/g, (word) => (word === word.toLowerCase() ? word[0].toUpperCase() + word.slice(1) : word))
