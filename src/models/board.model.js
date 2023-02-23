import Joi from "joi";
import { getDb } from "*/config/mongodb";
import { ObjectId } from "mongodb";

const boardCollectionName = "boards";

const boardCollectionSchema = Joi.object({
  title: Joi.string().required().min(3).max(50).trim(),
  columnOrder: Joi.array().items(Joi.string()).default([]),
  createAt: Joi.date().timestamp().default(Date.now()),
  updateAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
  // Nếu có nhiều hơn 1 field data bị lỗi, mặc định (abortEarly: true) sẽ chỉ trả về field lỗi đầu tiên
  return await boardCollectionSchema.validateAsync(data, { abortEarly: false });
};

const createNew = async (data) => {
  try {
    const value = await validateSchema(data);

    const result = await getDb()
      .collection(boardCollectionName)
      .insertOne(value);

    return result.ops[0];
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (id, data) => {
  try {
    const updateData = {
      ...data,
    };

    const result = await getDb()
      .collection(boardCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: updateData },
        { returnOriginal: false }
      ); // trả về bản ghi sau khi update

    return result.value;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 *
 * @param {string} boardId
 * @param {string} columnId
 */
const pushColumnOrder = async (boardId, columnId) => {
  try {
    const result = await getDb()
      .collection(boardCollectionName)
      .findOneAndUpdate(
        { _id: ObjectId(boardId) },
        { $push: { columnOrder: columnId } },
        { returnOriginal: false }
      ); // trả về bản ghi sau khi update

    return result.value;
  } catch (error) {
    throw new Error(error);
  }
};

const getFullBoard = async (boardId) => {
  try {
    const result = await getDb()
      .collection(boardCollectionName)
      .aggregate([
        {
          $match: {
            _id: ObjectId(boardId),
            _destroy: false,
          },
        },

        {
          $lookup: {
            from: "columns",
            localField: "_id",
            foreignField: "boardId",
            as: "columns",
          },
        },

        {
          $lookup: {
            from: "cards",
            localField: "_id",
            foreignField: "boardId",
            as: "cards",
          },
        },
      ])
      .toArray();

    return result[0] || {};
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const BoardModel = {
  createNew,
  getFullBoard,
  pushColumnOrder,
  update,
};
