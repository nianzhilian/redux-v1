//新增  删除 更新
import axios from "axios";
import service from "../../utils/request";
export const createUser = (user) => {
  return {
    type: "add",
    payload: user,
  };
};

export const deleteUser = (id) => {
  return {
    type: "delete",
    payload: id,
  };
};

export const updateUser = (id, newdata) => {
  return {
    type: "update",
    payload: {
      ...newdata,
      id,
    },
  };
};

export const setLoading = (b) => {
  return {
    type: "loading",
    payload: b,
  };
};

export const fetchUserList = async () => {
  const res = await service({
    method: "post",
    url: "/api/log/findLogList",
    data: {
      current: 1,
      pageSize: 15,
      type: 4,
    },
  });
  return res.data;
};

//增加action 使其可以处理副作用

export const getList = () => {
  return async function (dispatch,getState) {
    dispatch(setLoading(false))
    let res = await fetchUserList();
    setTimeout(() => {
        dispatch(setLoading(true))
    }, 2000);
  };
};
