/**
 *
 * @param array
 * @param predicate
 *
 * @example
 * const groupBy = (x,f)=>x.reduce((a,b,i)=>((a[f(b,i,x)]||=[]).push(b),a),{});
 * // f -> should must return string/number because it will be use as key in object
 *
 * // for demo
 *
 * groupBy([1, 2, 3, 4, 5, 6, 7, 8, 9], v => (v % 2 ? "odd" : "even"));
 * // { odd: [1, 3, 5, 7, 9], even: [2, 4, 6, 8] };
 * const colors = [
 *   "Apricot",
 *   "Brown",
 *   "Burgundy",
 *   "Cerulean",
 *   "Peach",
 *   "Pear",
 *   "Red",
 * ];
 *
 * groupBy(colors, v => v[0]); // group by colors name first letter
 * // {
 * //   A: ["Apricot"],
 * //   B: ["Brown", "Burgundy"],
 * //   C: ["Cerulean"],
 * //   P: ["Peach", "Pear"],
 * //   R: ["Red"],
 * // };
 * groupBy(colors, v => v.length); // group by length of color names
 * // {
 * //   3: ["Red"],
 * //   4: ["Pear"],
 * //   5: ["Brown", "Peach"],
 * //   7: ["Apricot"],
 * //   8: ["Burgundy", "Cerulean"],
 * // }
 *
 * const data = [
 *   { comment: "abc", forItem: 1, inModule: 1 },
 *   { comment: "pqr", forItem: 1, inModule: 1 },
 *   { comment: "klm", forItem: 1, inModule: 2 },
 *   { comment: "xyz", forItem: 1, inModule: 2 },
 * ];
 *
 * groupBy(data, v => v.inModule); // group by module
 * // {
 * //   1: [
 * //     { comment: "abc", forItem: 1, inModule: 1 },
 * //     { comment: "pqr", forItem: 1, inModule: 1 },
 * //   ],
 * //   2: [
 * //     { comment: "klm", forItem: 1, inModule: 2 },
 * //     { comment: "xyz", forItem: 1, inModule: 2 },
 * //   ],
 * // }
 *
 * groupBy(data, x => x.forItem + "-" + x.inModule); // group by module with item
 * // {
 * //   "1-1": [
 * //     { comment: "abc", forItem: 1, inModule: 1 },
 * //     { comment: "pqr", forItem: 1, inModule: 1 },
 * //   ],
 * //   "1-2": [
 * //     { comment: "klm", forItem: 1, inModule: 2 },
 * //     { comment: "xyz", forItem: 1, inModule: 2 },
 * //   ],
 * // }
 */
export function uiuxGroupBy<T>(array: T[], predicate: (value: T, index: number, array: T[]) => string) {
  return array.reduce((acc, value, index, array) => {
    (acc[predicate(value, index, array)] ||= []).push(value);
    return acc;
  }, {} as { [key: string]: T[] });
}
