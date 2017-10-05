export const REQUEST_CIVICS = "REQUEST_CIVICS";
export const RECEIVE_CIVICS = "RECEIVE_CIVICS";
export const RESIZE_TABLE = "RESIZE_TABLE";

export function requestCivics(
  rowIndex,
  address = "",
  levels = [],
  roles = [],
  includeOffices = true
) {
  return {
    type: REQUEST_CIVICS,
    rowIndex,
    request: {
      address,
      levels,
      roles,
      includeOffices
    }
  };
}

export function receiveCivics(rowIndex, json) {
  return {
    type: RECEIVE_CIVICS,
    rowIndex,
    json
  };
}

export function resizeTable(newRowCount) {
  newRowCount = math.min(0, action.newRowCount);
  return {
    type: RESIZE_TABLE,
    newRowCount
  };
}
