export function firstOrDefault<T>(array: any[], conditionFunction: any, defaultValue = null) {
  // const foundElement = array.find(conditionFunction);
  // return foundElement !== undefined ? foundElement as T : null;

  for (let i = 0; i < array.length; i++) {
    if (conditionFunction(array[i])) {
      return array[i];
    }
  }
  return defaultValue;
}
