import { BoardModel } from "*/models/board.model";
import { cloneDeep } from "lodash";

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

    const transformBoard = cloneDeep(board);
    // Filter deleted column
    transformBoard.columns = transformBoard.columns.filter(
      (column) => !column._destroy
    );

    // Add card to each column
    transformBoard.columns.forEach((column) => {
      column.cards = transformBoard.cards.filter(
        (card) => card.columnId.toString() === column._id.toString()
      );
    });

    // Remove cards data from board
    delete transformBoard.cards;

    return transformBoard;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const update = async (id, data) => {
  try {
    const updateData = {
      ...data,
      updateAt: Date.now(),
    };

    if (updateData._id) delete updateData._id;
    if (updateData.columns) delete updateData.columns;

    const updatedBoard = await BoardModel.update(id, updateData);

    return updatedBoard;
  } catch (error) {
    throw new Error(error);
  }
};

export const boardService = { createNew, getFullBoard, update };
