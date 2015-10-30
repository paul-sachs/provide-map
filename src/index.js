const SET_MAP = 'SET_MAP';
const UPDATE_MAP = 'UPDATE_MAP';
const FILTER_MAP = 'FILTER_MAP';
const CREATE_ITEM = 'CREATE_ITEM';
const UPDATE_ITEM = 'UPDATE_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';

export const actions = {
  setMap(map) {
    return { type: SET_MAP, map };
  },

  updateMap(update, updateKey = key => key) {
    return { type: UPDATE_MAP, update, updateKey };
  },

  filterMap(filter) {
    return { type: FILTER_MAP, filter };
  },

  createItem(index, item) {
    return { type: CREATE_ITEM, index, item };
  },

  updateItem(index, item) {
    return { type: UPDATE_ITEM, index, item };
  },

  deleteItem(index) {
    return { type: DELETE_ITEM, index };
  }
};

export const reducers = {
  item(state = {}, action) {
    switch(action.type) {
      case CREATE_ITEM:
      case UPDATE_ITEM:
        return { ...state, ...action.item };

      default:
        return state;
    }
  },

  map(state = {}, action) {
    const { item, index } = action;
    let nextState;

    switch (action.type) {
      case SET_MAP:
        return action.map;

      case UPDATE_MAP:
        nextState = {};

        for (let key in state) {
          nextState[action.updateKey(key)] = action.update(state[key], key);
        }

        return nextState;

      case FILTER_MAP:
        nextState = {};

        for (let key in state) {
          if (action.filter(state[key], key)) {
            nextState[key] = state[key];
          }
        }

        return nextState;

      case CREATE_ITEM:
        return state[index]
          ? state
          : { ...state, [index]: reducers.item(undefined, action) };

      case UPDATE_ITEM:
        return { ...state, [index]: reducers.item(state[index], action) };

      case DELETE_ITEM:
        nextState = { ...state };
        delete nextState[index];
        return nextState;

      default:
        return state;
    }
  }
};

export function merge (stateProps, dispatchProps, parentProps) {
  return Object.assign({}, parentProps, {
    item: stateProps.map[parentProps.index] || null
  });
}
