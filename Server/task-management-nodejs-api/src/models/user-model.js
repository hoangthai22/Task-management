import Joi from "joi";
import { getDB } from "./../config/mongodb.js";
import { ObjectId } from "mongodb";

//Defint Board collection
const userCollectionName = "users";
const userCollectionSchema = Joi.object({
  username: Joi.string().required().min(3).max(20).trim(),
  password: Joi.string().required().min(3).max(20).trim(),
  refreshTokens: Joi.array(),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false),
});

// khi có abortEarly thì khi nó validate bth nó sẽ là true thì khi gặp lỗi nó sẽ dừng 1
//lỗi đầu tiên và quăng lỗi đó ra mà k quăng các lỗi phía dưới, còn khi set nó false thì
//nó sẽ qunawg tất cả lỗi ra
const validateSchema = async (data) => {
  return await taskCollectionSchema.validateAsync(data, { abortEarly: false });
};

// const createNew = async (data) => {
//   try {
//     const value = await validateSchema(data);
//     const result = await getDB()
//       .collection(taskCollectionName)
//       .insertOne(value);
//     const findModel = await getDB()
//       .collection(taskCollectionName)
//       .findOne({
//         _id: new ObjectId(result.insertedId.toString()),
//       });
//     return findModel;
//   } catch (error) {
//     throw new Error(error);
//   }
// };

// const update = async (id, data) => {
//   try {
//     const result = await getDB()
//       .collection(taskCollectionName)
//       .findOneAndUpdate(
//         { _id: ObjectId(id) },
//         { $set: data },
//         { returnDocument: "after" }
//       );
//     return result.value;
//   } catch (error) {
//     throw new Error(error);
//   }
// };

// const remove = async (id) => {
//   try {
//     const result = await getDB()
//       .collection(taskCollectionName)
//       .remove({ _id: ObjectId(id) });
//     console.log(result);
//     return result;
//   } catch (error) {
//     throw new Error(error);
//   }
// };

// const filter = async (key) => {
//   try {
//     const result = await getDB()
//       .collection(taskCollectionName)
//       .find({
//         $or: [
//           { title: { $regex: key, $options: "i" } },
//           { description: { $regex: key, $options: "i" } },
//         ],
//         _destroy: false,
//       })
//       .toArray();
//     console.log(result);
//     return result;
//   } catch (error) {
//     throw new Error(error);
//   }
// };

// const getAllTask = async () => {
//   try {
//     const result = await getDB()
//       .collection(taskCollectionName)
//       .find({ _destroy: false })
//       .toArray();
//     return result;
//   } catch (error) {
//     throw new Error(error);
//   }
// };
const getOneUser = async (token) => {
  try {
    const user = await getDB()
      .collection(userCollectionName)
      .findOne({ refreshTokens: token });
    if (!user) throw "Forbident";
    // if (!user.refreshTokens.includes(refreshToken))
    //   throw new Error("Forbident"); //Forbident
    const newUser = {
      username: user.username,
      role: user.role,
    };
    return newUser;
  } catch (error) {
    throw error;
  }
};
export const UserModel = {
  /*getAllTask, createNew, update, remove, filter*/ getOneUser,
};
