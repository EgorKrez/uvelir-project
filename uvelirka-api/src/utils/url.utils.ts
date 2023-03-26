import { parse, URL } from 'url';

export const stringIsAValidUrl = (possibleUrl: string, protocols: string[]): boolean => {
  try {
    new URL(possibleUrl);
    const parsed = parse(possibleUrl);
    return protocols
      ? parsed.protocol
        ? protocols.map(x => `${x.toLowerCase()}:`).includes(parsed.protocol)
        : false
      : true;
  } catch (err) {
    return false;
  }
};