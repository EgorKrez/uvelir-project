import { ITag } from '../models/tag.model';

export const reduceTags = (tags: ITag[]): Record<string, string[]> => {
  const initial: Record<string, string[]> = {};

  return tags.reduce((acc, current) => ({
    ...acc,
    [current.name]: [...(acc[current.name] || []), current.value],
  }), initial);
};