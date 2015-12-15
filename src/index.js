export default function provideMap (
  mapName = 'map', itemName = 'item', indexName = 'index'
) {
  const properMapName = mapName[0].toUpperCase()+mapName.substring(1);
  const properItemName = itemName[0].toUpperCase()+itemName.substring(1);
  const properIndexName = indexName[0].toUpperCase()+indexName.substring(1);
  const newIndexName = `new${properIndexName}`;
  const capitalMapName = mapName.toUpperCase();
  const capitalItemName = itemName.toUpperCase();
  
  const SET_MAP = `SET_${capitalMapName}`;
  const UPDATE_MAP = `UPDATE_${capitalMapName}`;
  const FILTER_MAP = `FILTER_${capitalMapName}`;
  const CLEAR_MAP = `CLEAR_${capitalMapName}`;
  const SET_ITEM = `SET_${capitalItemName}`;
  const RENAME_ITEM = `RENAME_${capitalItemName}`;
  const UPDATE_ITEM = `UPDATE_${capitalItemName}`;
  const DELETE_ITEM = `DELETE_${capitalItemName}`;

  const constants = {
    [SET_MAP]: SET_MAP,
    [UPDATE_MAP]: UPDATE_MAP,
    [FILTER_MAP]: FILTER_MAP,
    [CLEAR_MAP]: CLEAR_MAP,
    [SET_ITEM]: SET_ITEM,
    [RENAME_ITEM]: RENAME_ITEM,
    [UPDATE_ITEM]: UPDATE_ITEM,
    [DELETE_ITEM]: DELETE_ITEM
  };

  const actions = {
    [`set${properMapName}`]: (map) => (
      { type: SET_MAP, [mapName]: map }
    ),

    [`update${properMapName}`]: (update) => (
      { type: UPDATE_MAP, update }
    ),

    [`filter${properMapName}`]: (filter) => (
      { type: FILTER_MAP, filter }
    ),

    [`clear${properMapName}`]: () => (
      { type: CLEAR_MAP }
    ),

    [`set${properItemName}`]: (index, item) => (
      { type: SET_ITEM, [indexName]: index, [itemName]: item }
    ),

    [`rename${properItemName}`]: (index, newIndex) => (
      { type: RENAME_ITEM, [indexName]: index, [newIndexName]: newIndex }
    ),

    [`update${properItemName}`]: (index, item) => (
      { type: UPDATE_ITEM, [indexName]: index, [itemName]: item }
    ),

    [`delete${properItemName}`]: (index) => (
      { type: DELETE_ITEM, [indexName]: index }
    )
  };

  const reducers = {
    [mapName]: (state = new Map(), action) => {
      switch (action.type) {
        case SET_MAP:
          return new Map(action[mapName]);

        case UPDATE_MAP:
          const updatedPairs = [];
          for (let pair of state.entries()) {
            updatedPairs.push(action.update(pair));
          }
          return new Map(updatedPairs);

        case FILTER_MAP:
          const filteredPairs = [];
          for (let pair of state.entries()) {
            if (action.filter(pair)) {
              filteredPairs.push(pair);
            }
          }
          return new Map(filteredPairs);

        case CLEAR_MAP:
          return new Map();

        case SET_ITEM:
          return new Map(state).set(action[indexName], action[itemName]);

        case RENAME_ITEM:
          const renamedPairs = [];
          for (let pair of state.entries()) {
            if (pair[0] === action[indexName]) {
              renamedPairs.push([action[newIndexName], pair[1]]);
            } else {
              renamedPairs.push(pair);
            }
          }
          return new Map(renamedPairs);

        case UPDATE_ITEM:
          let updatedItem = state.get(action[indexName]);
          if (Array.isArray(updatedItem)) {
            updatedItem = [ ...updatedItem, ...action[itemName] ];
          } else if (typeof updatedItem === 'object') {
            updatedItem = { ...updatedItem, ...action[itemName] };
          } else {
            updatedItem = action[itemName];
          }
          return new Map(state).set(action[indexName], updatedItem);

        case DELETE_ITEM:
          const deletedItemMap = new Map(state);
          deletedItemMap.delete(action[indexName]);
          return deletedItemMap;

        default:
          return state;
      }
    }
  };

  function merge (stateProps, dispatchProps, parentProps) {
    const map = stateProps[mapName];
    const index = parentProps[indexName];

    return {
      ...parentProps,
      [`${mapName}Size`]: map.size,
      [`has${properItemName}`]: map.has(index),
      [itemName]: map.get(index)
    };
  }

  return { ...constants, actions, reducers, merge };
}
