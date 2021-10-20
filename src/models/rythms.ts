export const RYTHMS = {
  quarter: [],
  eighth: [1 / 2],
  sixteenth: [1 / 4, 2 / 4, 3 / 4],
  triplet: [1 / 3, 2 / 3],
  "triplet-rest": [2 / 3]
};

export type Rythm = keyof typeof RYTHMS;
