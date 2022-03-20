import { unmarshall } from '@aws-sdk/util-dynamodb';

export const unmar = (value: string) => {
  try {
    const obj = JSON.parse(value);
    const result = Array.isArray(obj)
      ? obj.map((v) => unmarshall(v))
      : unmarshall(obj);
    return JSON.stringify(result, null, 2);
  } catch {
    return value;
  }
};
