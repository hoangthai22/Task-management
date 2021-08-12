import { UserModel } from "../models/user-model.js";
// import { cloneDeep } from "lodash";

// const createNew = async (data) => {
//   try {
//     const result = await TaskModel.createNew(data);
//     return result;
//   } catch (error) {
//     throw new Error(error);
//   }
// };

// const update = async (id, data) => {
//   try {
//     const updateData = {
//       ...data,
//       updatedAt: Date.now(),
//     };
//     // if (updateData._id) delete updateData._id;
//     const result = await TaskModel.update(id, updateData);
//     return result;
//   } catch (error) {
//     console.log("errorService: " + error);
//     throw new Error(error);
//   }
// };

// const remove = async (id) => {
//   try {
//     const result = await TaskModel.remove(id);
//     return result;
//   } catch (error) {
//     console.log("errorService: " + error);
//     throw new Error(error);
//   }
// };

// const filter = async (key) => {
//   try {
//     const result = await TaskModel.filter(key);
//     return result;
//   } catch (error) {
//     console.log("errorService: " + error);
//     throw new Error(error);
//   }
// };

// const getAllTask = async () => {
//   try {
//     const task = await TaskModel.getAllTask();
//     if (!task) {
//       throw new Error("Task not found");
//     }

//     return task;
//   } catch (error) {
//     console.log("errorService: " + error);
//     throw new Error(error);
//   }
// };

const getOneUser = async (token) => {
  try {
    const user = await UserModel.getOneUser(token);
    return user;
  } catch (error) {
    console.log("errorService: " + error);
    throw new Error(error);
  }
};

export const UserService = { /*getAllTask, createNew, remove, update, filter*/ getOneUser };
