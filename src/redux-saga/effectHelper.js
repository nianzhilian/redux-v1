const specialEffectName = "@@redux-saga/IO";

export const effectTypes = {
  AKE: "TAKE",
  PUT: "PUT",
  ALL: "ALL",
  DELAY: "DELAY",
  CALL: "CALL",
  SELECT: "SELECT",
};

export function createEffect(type, payload) {
  return {
    [specialEffectName]: true,
    type,
    payload,
  };
}

export function isEffect(obj) {
  if (typeof obj != "object") {
    return false;
  }
  if (obj[specialEffectName]) {
    return true;
  }
  return false;
}
