//新增  删除 更新
import axios from "axios";
import service from "../../utils/request";
export const actionTypes = {
  ADD:'add',
  DELETE:'delete',
  UPDATE:'update',
  LOADING:'loading',
  TOTAL:'total',
  SEARCH:'search',
  INCREASE:'increase',
  DINCREASE:'dincrease',
  ASYNC_INCREASE:'async_increase',
  ASYNC_DINCREASE:'async_dincrease',
  fetchStudents:'fetchStudents'
} 

export const fetchStudents = ()=>{
  return {
    type:actionTypes.fetchStudents
  }
}

export const increase = ()=>{
  return {
    type:actionTypes.INCREASE
  }
}

export const dincrease = ()=>{
  return {
    type:actionTypes.DINCREASE
  }
}

export const asyncIncrease = ()=>{
  return {
    type:actionTypes.ASYNC_INCREASE
  }
}

export const asyncDincrease = ()=>{
  return {
    type:actionTypes.ASYNC_DINCREASE
  }
}

export const createUser = (user) => {
  return {
    type: actionTypes.ADD,
    payload: user,
  };
};

export const deleteUser = (id) => {
  return {
    type: actionTypes.DELETE,
    payload: id,
  };
};

export const updateUser = (id, newdata) => {
  return {
    type: actionTypes.UPDATE,
    payload: {
      ...newdata,
      id,
    },
  };
};

export const setLoading = (b) => {
  return {
    type: actionTypes.LOADING,
    payload: b,
  };
};

export const setTotal = (t)=>{
  return {
    type:actionTypes.TOTAL,
    payload:t
  }
}

export const fetchUserList = async (data) => {
  const res = await service({
    method: "post",
    url: "/api/log/findLogList",
    data: data || {
      current: 1,
      pageSize: 15,
      type: 4,
    },
  });
  return res.data;
};

export const setSearch = (newcondation)=>{
  return {
    type:actionTypes.SEARCH,
    payload:newcondation
  }
}

//增加action 使其可以处理副作用

export const getList = () => {
  return async function (dispatch,getState) {
    console.log(getState())
    const data = getState().users.search
    dispatch(setLoading(false))
    let res = await fetchUserList(data);
    console.log(res)
    setTimeout(() => {
        dispatch(setTotal(res.dataMain.pagination.total))
        dispatch(setLoading(true))
    }, 2000);
  };
};
