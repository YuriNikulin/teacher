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

export const replaceImgWithLink = (layout: string) => {
  if (!layout) {
    return;
  }
  const regexp = /<img.*src="(.+\/(.+)\..*?)".*\/>/;

  const replaced = layout.replace(
    regexp,
    '<a target="_blank" class="MuiTypography-body2" href="$1">Изображение $2</a>',
  );
  return replaced;
};

export const localStorageUtils = {
  read: (key: string) => {
    return localStorage.getItem(key);
  },

  write: (key: string, value: any) => {
    localStorage.setItem(key, value);
  },
};

export const debounce = (fn: Function, delay: number) => {
  let timer: any = null;
  const innerFunc = (...args: any[]) => {
    const setTimer = () => {
      timer = setTimeout(() => {
        timer = null;
        fn(...args);
      }, delay);
    };
    if (!timer) {
      setTimer();
    } else {
      clearTimeout(timer);
      setTimer();
    }
  };

  innerFunc.cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  return innerFunc;
};
