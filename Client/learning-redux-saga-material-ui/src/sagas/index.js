import {
  call,
  delay,
  fork,
  put,
  select,
  take,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import Cookies from "universal-cookie";
import { hideModal } from "../actions/modal";
import {
  addTaskFail,
  addTaskSuccess,
  deleteTaskFail,
  deleteTaskSuccess,
  fetchListTaskFail,
  fetchListTaskSuccess,
  updateTaskFail,
  updateTaskSuccess,
} from "./../actions/taskAction";
import { hideLoading, showLoading } from "./../actions/ui";
import {
  addTask,
  deleteTask,
  getList,
  getListFilter,
  updateTask,
} from "./../apis/taskApi";
import { STATUSES, STATUS_CODE } from "./../constants";
import * as taskType from "./../constants/taskActionType";
import * as taskTypes from "./../constants/taskActionType";

// B1: Thực thi action fetch task
// B2: Gọi api
// B2.1: Hiển thị thanh tiến trình (Loading)
// B3: Kiểm tra status
//   Nếu thành công...
//   Nếu thát bại...
// B4: tắt Loading
// B5: Thực thi công việc tiếp theo

function* watchFetchListTaskAction() {
  const cookies = new Cookies();

  //nếu không sử dụng vòng lập vô tận thì hàm take chỉ lắng nghe 1 lần 1 thực 1 process và done luôn gây bug
  while (true) {
    yield take(taskType.FETCH_TASK);
    //yield put(showLoading());
    //   Block
    const cookie = cookies.get("payloadClient");
    const resp = yield call(getList, cookie);
    //   Block cho đến khi call xong
    const { status, data } = resp;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(fetchListTaskSuccess(data));
    } else {
      console.log("loi r");
      yield put(fetchListTaskFail(data));
    }
    yield delay(200);
    yield put(hideLoading());
  }
}

function* filterTaskSaga(payload) {
  yield delay(1000);
  const { keyword } = payload.payload;
  /* Cách 1: filter state
  const list = yield select((state) => state.task.listTask);
  const filterTask = list.filter((task) =>
    task.title.trim().toLowerCase().includes(keyword.trim().toLowerCase())
  );
  yield put(filterTaskSuccess(filterTask));*/

  //Cách 2: call api
  yield put(showLoading());
  const cookies = new Cookies();
  const cookie = cookies.get("payloadClient");

  const resp = yield call(getListFilter, keyword, cookie);
  const { status, data } = resp;
  if (status === STATUS_CODE.SUCCESS) {
    yield put(fetchListTaskSuccess(data));
  } else {
    yield put(fetchListTaskFail(data));
  }
  yield delay(200);
  yield put(hideLoading());
}

function* addTaskSaga({ payload }) {
  const { title, description } = payload;
  yield put(showLoading());
  const cookies = new Cookies();
  const cookie = cookies.get("payloadClient");
  const resp = yield call(
    addTask,
    {
      title,
      description,
      status: STATUSES[0].value,
    },
    cookie
  );
  const { data, status } = resp;
  if (status === STATUS_CODE.CREATED) {
    yield put(addTaskSuccess(data));
    yield put(hideModal());
  } else {
    yield put(addTaskFail(data));
  }
  yield delay(200);
  yield put(hideLoading());
}

function* updateTaskSaga({ payload }) {
  const { title, description, status } = payload;
  const taskEditing = yield select((state) => state.task.taskEditing);
  yield put(showLoading());
  const cookies = new Cookies();
  const cookie = cookies.get("payloadClient");
  const resp = yield call(
    updateTask,
    {
      title,
      description,
      status,
    },
    taskEditing._id,
    cookie
  );

  const { data } = resp;
  const statusApi = resp.status;
  if (statusApi === STATUS_CODE.SUCCESS) {
    yield put(updateTaskSuccess(data));
    yield put(hideModal());
  } else {
    yield put(updateTaskFail(data));
  }
  yield delay(200);
  yield put(hideLoading());
}

function* deleteTaskSaga({ payload }) {
  const { id } = payload;
  yield put(showLoading());
  const cookies = new Cookies();
  const cookie = cookies.get("payloadClient");
  const resp = yield call(deleteTask, id, cookie);

  const { data } = resp;
  const statusApi = resp.status;
  if (statusApi === STATUS_CODE.SUCCESS) {
    yield put(deleteTaskSuccess(id));
    yield put(hideModal());
  } else {
    yield put(deleteTaskFail(data));
  }
  yield delay(200);
  yield put(hideLoading());
}

// function* loginSaga({ payload }) {
//   const { username, password } = payload;
//   yield put(showLoading());
//   // try {
//   //   const resp = yield call(checkLogin, {
//   //     username,
//   //     password,
//   //   });
//   //   const { data, status } = resp;
//   //   if (status === STATUS_CODE.SUCCESS) {
//   //     const newResp = yield call(getAccessToken, data.user);
//   //     const newData = newResp.data;
//   //     const newStatus = newResp.status;
//   //     console.log("newResp", newResp);
//   //     if (newStatus === STATUS_CODE.SUCCESS) {
//   //       const { accessToken, refreshToken } = newData;
//   //       const cookies = new Cookies();
//   //       cookies.set("payloadClient", accessToken, { maxAge: 60 });
//   //       cookies.set("refreshToken", refreshToken, { maxAge: 72000 });
//   //       yield put(loginSuccess(data));
//   //     } else {
//   //       console.log("dataError: " + resp.message);
//   //       yield put(loginFail(data));
//   //     }
//   //   }
//   // } catch (error) {
//   //   yield put(loginFail(error.data));
//   // }

//   yield delay(200);
//   yield put(hideLoading());
// }

function* rootSaga() {
  yield fork(watchFetchListTaskAction);
  yield takeLatest(taskTypes.FILTER_TASK, filterTaskSaga);
  yield takeEvery(taskTypes.ADD_TASK, addTaskSaga);
  yield takeLatest(taskTypes.UPDATE_TASK, updateTaskSaga);
  yield takeLatest(taskTypes.DELETE_TASK, deleteTaskSaga);
  // yield takeLatest(authTypes.LOGIN, loginSaga);
}
export default rootSaga;
