import { QuestionModel } from "@/types";

export const getQuizQuestions = () => {
  const questions: QuestionModel[] = [{
    q: "How many ghosts chase Pac-Man at the start of each game?",
    as: [
      {
        a: "Super cool wrong answer",
        c: false,
      },
      {
        a: "Super cool wrong answer",
        c: false,
      },
      {
        a: "Super cool wrong answer",
        c: false,
      },
      {
        a: "Super cool right answer",
        c: true,
      },
      {
        a: "Super cool wrong answer",
        c: false,
      },
    ]
  }, {
    q: "Super cool question 2",
    as: [
      {
        a: "Super cool wrong answer",
        c: false,
      },
      {
        a: "Super cool wrong answer",
        c: false,
      },
      {
        a: "Super cool wrong answer",
        c: false,
      },
      {
        a: "Super cool wrong answer",
        c: false,
      },
      {
        a: "Super cool right answer",
        c: true,
      },
    ]
  },
  {
    q: "Super cool question 3",
    as: [
      {
        a: "Super cool wrong answer",
        c: false,
      },
      {
        a: "Super cool answer",
        c: true,
      },
      {
        a: "Super cool wrong answer",
        c: false,
      },
      {
        a: "Super cool wrong answer",
        c: false,
      },
      {
        a: "Super cool wrong answer",
        c: false,
      },
    ]
  },
  {
    q: "Another Cool Question?",
    as: [
      {
        a: "Super cool right answer",
        c: true,
      },
      {
        a: "Super cool wrong answer",
        c: false,
      },
      {
        a: "Super cool wrong answer",
        c: false,
      },
      {
        a: "Super cool wrong answer",
        c: false,
      },
      {
        a: "Super cool wrong answer",
        c: false,
      },
    ]
  }];

  return questions;
}
