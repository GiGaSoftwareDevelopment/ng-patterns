export type AssignMethod<T> = (source: T) => T;

export function assignMethod<T>(method: (target: T, update: Partial<T>) => T, update: Partial<T>): AssignMethod<T>;
export function assignMethod<T, U>(method: (target: T, update: Partial<U>) => T, update: Partial<U>): AssignMethod<T>;
export function assignMethod(
  method: (target: any, update: Partial<any>) => any,
  update: Partial<any>
): AssignMethod<any> {
  return function (source: any) {
    return method(source, update);
  };
}

export interface ObjectMethodAssign<T> {
  pipe: (...args: AssignMethod<T>[]) => T;
}

export function objectMethodAssign<T>(target: T): ObjectMethodAssign<T> {
  return {
    pipe: function (...methods: AssignMethod<T>[]): T {
      return methods.reduce((a, method) => {
        return method(a);
      }, target);
    },
  };
}
