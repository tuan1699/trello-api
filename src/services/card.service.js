import { CardModel } from "*/models/card.model";
import { ColumnModel } from "*/models/column.model";

const createNew = async (data) => {
  try {
    const newCard = await CardModel.createNew(data);

    // update card order arr in column collection
    await ColumnModel.pushCardOrder(
      newCard.columnId.toString(),
      newCard._id.toString()
    );

    return newCard;
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
    // if (updateData.cards) delete updateData.cards;

    const updatedCard = await CardModel.update(id, updateData);

    return updatedCard;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const cardService = { createNew, update };
