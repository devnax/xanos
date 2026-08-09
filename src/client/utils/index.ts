type PlainObject = Record<string, unknown>;

function isPlainObject(value: unknown): value is PlainObject {
   return (
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value)
   );
}

export function deepMerge<T, U>(target: T, source: U): T & U {
   if (!isPlainObject(target) || !isPlainObject(source)) {
      return source as T & U;
   }

   const result: PlainObject = { ...target };

   for (const key in source) {
      if (!Object.prototype.hasOwnProperty.call(source, key)) continue;

      const targetValue = (target as PlainObject)[key];
      const sourceValue = (source as PlainObject)[key];

      if (isPlainObject(targetValue) && isPlainObject(sourceValue)) {
         result[key] = deepMerge(targetValue, sourceValue);
      } else {
         result[key] = sourceValue;
      }
   }

   return result as T & U;
}
