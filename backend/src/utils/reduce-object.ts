/**
 * @description reduces an object to prevent overwriting data where key values are undefined
 * @param object the object to remove undefined keys from
 */
export function reduceObject<T>(object: Partial<T>): void {
  Object.keys(object).forEach(key => {
    if (object[key as keyof T] === undefined) {
      delete object[key as keyof T]
    }
  })
}