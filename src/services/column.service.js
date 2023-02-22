import { ColumnModel } from "*/models/column.model";
import { BoardModel } from "*/models/board.model";

const createNew = async (data) => {
  try {
    const newColumn = await ColumnModel.createNew(data);
    newColumn.cards = [];

    // update column order arr in board collection
    await BoardModel.pushColumnOrder(
      newColumn.boardId.toString(),
      newColumn._id.toString()
    );

    return newColumn;
  } catch (error) {
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
    if (updateData.cards) delete updateData.cards;

    const updatedColumn = await ColumnModel.update(id, updateData);
    return updatedColumn;
  } catch (error) {
    throw new Error(error);
  }
};

export const columnService = { createNew, update };
