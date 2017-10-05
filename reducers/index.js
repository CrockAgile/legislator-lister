import { combineReducers } from "redux";
import { REQUEST_CIVICS, RECEIVE_CIVICS, RESIZE_TABLE } from "./actions";

function resizedTable(state = {}, action) {
  switch (action.type) {
    case RESIZE_TABLE:
      const tableSizeDiff = action.newRowCount - state.tableRows.length;
      if (tableSizeDiff > 0) {
        const newRows = Array(tableSizeDiff).fill("");
        return [...state.tableRows, ...newRows];
      } else if (tableSizeDiff < 0) {
        return state.tableRows.slice(0, action.newRowCount);
      }
    default:
      return state;
  }
}

function tableRows(state = {}, action) {
  switch (action.type) {
    case RESIZE_TABLE:
      return resizedTable(state, action);
    case REQUEST_CIVICS:
      console.log("TODO: REQUEST_CIVICS reducer");
      return state;
    case RECEIVE_CIVICS:
      console.log("TODO: RECEIVE_CIVICS reducer");
      return state;
    default:
      return state;
  }
}
