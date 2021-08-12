import Joi from "joi";
import { getDB } from "./../config/mongodb.js";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import doenv from "dotenv";
doenv.config();

//Defint Board collection
const authCollectionName = "users";
const authCollectionSchema = Joi.object({
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
  return await authCollectionSchema.validateAsync(data, { abortEarly: false });
};

const checkLogin = async (data) => {
  try {
    const value = await validateSchema(data);
    const getUser = await getDB().collection(authCollectionName).findOne({
      username: value.username,
      password: value.password,
    });
    if (!getUser) throw "Username or Password is not correct";

    const user = {
      username: getUser.username,
      role: getUser.role,
    };
    return { user };
  } catch (error) {
    throw error;
  }
};

const refreshToken = async (data) => {
  try {
    const refreshToken = data.refreshToken;
    console.log(data);
    const user = await getDB()
      .collection(authCollectionName)
      .findOne({ refreshTokens: refreshToken });
    if (!user) throw "Forbident";
    // if (!user.refreshTokens.includes(refreshToken))
    //   throw new Error("Forbident"); //Forbident
    const newAccessToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, user) => {
        if (err) throw err;
        const accessToken = jwt.sign(
          { username: user.username, password: user.password },
          process.env.ACCESSS_TOKEN_SECRET,
          {
            expiresIn: "60s",
          }
        );
        return { accessToken };
      }
    );
    return newAccessToken;
  } catch (error) {
    throw error;
  }
};

const accessToken = async (data) => {
  try {
    const accessToken = jwt.sign(data, process.env.ACCESSS_TOKEN_SECRET, {
      expiresIn: "60s",
    });
    const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1h",
    });
    const value = {
      ...data,
      refreshTokens: [refreshToken],
    };

    const updateUser = await getDB()
      .collection(authCollectionName)
      .findOneAndUpdate(
        { username: value.username },
        { $push: { refreshTokens: refreshToken } },
        { returnDocument: "after" }
      );
    const user = {
      username: updateUser.username,
      role: updateUser.role,
    };
    return { user, accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
};

const logout = async (data) => {
  try {
    console.log(data);
    await getDB()
      .collection(authCollectionName)
      .update({ refreshTokens: data }, { $pull: { refreshTokens: data } });
    const logout = {
      message: "Logout successfull",
    };
    return logout;
  } catch (error) {
    throw error;
  }
};

const signup = async (data) => {
  try {
    const value = await validateSchema(data);
    const validateUsername = await getDB()
      .collection(authCollectionName)
      .findOne({
        username: value.username,
      });
    if (validateUsername) throw "Username already exists!";
    const user = { ...value, refreshTokens: [], role: "customer" };
    const result = await getDB()
      .collection(authCollectionName)
      .insertOne(user);
    const findModel = await getDB()
      .collection(authCollectionName)
      .findOne({
        _id: new ObjectId(result.insertedId.toString()),
      });
    return findModel;
  } catch (error) {
    throw error;
  }
};

export const AuthModel = {
  checkLogin,
  refreshToken,
  accessToken,
  logout,
  signup,
};
