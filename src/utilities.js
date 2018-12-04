import { isEqual, reduce } from 'lodash';

export const diffObj = (objA, objB) =>
  reduce(
    objA,
    function(result, value, key) {
      return isEqual(value, objB[key])
        ? result
        : result.concat(key);
    },
    []
  );
