/**
 * 函数式编程
 */

/**
 * 排除对象的属性
 * @param obj 对象
 * @param keys 属性名
 * @returns 排除后的对象
 */
export const omits = (obj: any, ...keys: string[]) => {
  return Object.keys(obj).reduce<Record<string, any>>((acc, key) => {
    if (!keys.includes(key)) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
};

/**
 * 选择对象的属性
 * @param obj 对象
 * @param keys 属性名
 * @returns 选择后的对象
 */
export const picks = (obj: any, ...keys: string[]) => {
  return keys.reduce<Record<string, any>>((acc, key) => {
    if (obj[key]) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
};
