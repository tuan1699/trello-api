import Joi from "joi";
import { ObjectId } from "mongodb";
import { getDb } from "*/config/mongodb";

const cardCollectionName = "cards";

const cardCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  columnId: Joi.string().required(),
  title: Joi.string().required().min(3).max(50).trim(),
  createAt: Joi.date().timestamp().default(Date.now()),
  updateAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
  return await cardCollectionSchema.validateAsync(data, {
    abortEarly: false,
  });
};

const createNew = async (data) => {
  try {
    const validatedValue = await validateSchema(data);

    const insertValue = {
      ...validatedValue,
      boardId: ObjectId(validatedValue.boardId),
      columnId: ObjectId(validatedValue.columnId),
    };

    const result = await getDb()
      .collection(cardCollectionName)
      .insertOne(insertValue);

    return result.ops[0];
  } catch (error) {
    console.log(error);
  }
};

const update = async (id, data) => {
  try {
    const updateData = { ...data };

    if (data.boardId) updateData.boardId = ObjectId(data.boardId);
    if (data.columnId) updateData.columnId = ObjectId(data.columnId);

    const result = await getDb()
      .collection(cardCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: updateData },
        { returnOriginal: false }
      ); // trả về bản ghi sau khi update

    console.log(result);
    return result.value;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteMany = async (ids) => {
  try {
    const transformIds = ids.map((i) => ObjectId(i));

    const result = await getDb()
      .collection(cardCollectionName)
      .updateMany({ _id: { $in: transformIds } }, { $set: { _destroy: true } });

    return result;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const CardModel = {
  createNew,
  deleteMany,
  update,
};
