export const isEqual = (a: any, b: any, keys?: Array<string | number>): any => {
  if (keys) {
    if (!a || !b) {
      return a === b;
    }
    const _a: any = {};
    const _b: any = {};
    keys.forEach(key => {
      _a[key] = a[key];
      _b[key] = b[key];
    });
    return isEqual(_a, _b);
  }
  if (typeof a === 'object' && typeof b === 'object' && a !== null && b !== null) {
    if (Object.keys(a).length !== Object.keys(b).length) {
      return false;
    }

    for (const key in a) {
      if (!b.hasOwnProperty(key)) {
        return false;
      }

      if (!isEqual(a[key], b[key])) {
        return false;
      }
    }

    return true;
  } else {
    return a === b;
  }
};

export const reorder = (list: Array<any>, start: number, end: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(start, 1);
  result.splice(end, 0, removed);

  return result;
};
