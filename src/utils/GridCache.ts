export interface GridCache<T> {
  getRows: (skip: number, take: number) => T[];
  setRows: (skip: number, take: number, data: T[]) => void;
  getLength: (skip: number, take: number) => number;
  clear: () => void;
}

export const createGridCache = <T>(): GridCache<T> => {
  return new GridCacheService<T>();
};

interface CacheCollection<T> {
  [key: number]: T;
}

class GridCacheService<T> implements GridCache<T> {
  data: CacheCollection<T>;
  constructor() {
    this.data = {};
  }
  getRows(skip: number, take: number): T[] {
    const arr = [];
    for (let i = skip; i < skip + take; i++) {
      if (this.data[i]) {
        arr.push(this.data[i]);
        continue;
      } else {
        break;
      }
    }
    return arr;
  }
  setRows(skip: number, take: number, data: T[]): void {
    for (let i = skip, j = 0; i < skip + take && j < data.length; i++, j++) {
      this.data[i] = data[j];
    }
  }
  getLength(skip: number, take: number): number {
    for (let i = skip, j = 0; i < skip + take; i++, j++) {
      if (this.data[i]) {
        continue;
      } else {
        return j;
      }
    }
    return take;
  }
  clear(): void {
    this.data = {};
  }
}
