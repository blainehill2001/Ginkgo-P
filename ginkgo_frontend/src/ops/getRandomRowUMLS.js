import text from "../assets/train_triples.js";

export const getRandomRowUMLS = () => {
  const rows = text.split("\n").map((row) => row.split("\t"));
  let randomIndex = Math.floor(Math.random() * rows.length);
  let selectedRow = rows[randomIndex];

  while (selectedRow.some((entry) => entry.includes(","))) {
    randomIndex = Math.floor(Math.random() * rows.length);
    selectedRow = rows[randomIndex];
  }

  return selectedRow;
};
