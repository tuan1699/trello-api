import { BoardModel } from "*/models/board.model";

const createNew = async (data) => {
  try {
    const result = await BoardModel.createNew(data);

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getFullBoard = async (id) => {
  try {
    const board = await BoardModel.getFullBoard(id);

    if (!board || !board.columns) {
      throw new Error("Board not found");
    }

    // Add card to each column
    board.columns.forEach((column) => {
      column.cards = board.cards.filter(
        (card) => card.columnId.toString() === column._id.toString()
      );
    });

    // Remove cards data from board
    delete board.cards;

    return board;

    return result;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const boardService = { createNew, getFullBoard };
