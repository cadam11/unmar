import { unmarshall } from '@aws-sdk/util-dynamodb';

export const unmar = (value: string) => {
  try {
    const newStr = JSON.stringify(unmarshall(JSON.parse(value)), null, 2);
    return newStr;
  } catch {
    return value;
  }
};
