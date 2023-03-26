import { IProductTagVariant } from '../models/product-tag-variant.model';
import { ITag } from '../models/tag.model';

export const reduceTags = (tags: ITag[]): IProductTagVariant[] => {
  const tagItems: IProductTagVariant[] = [];

  for (let tag of tags) {
    let tagItem: IProductTagVariant = tagItems.find(t => t.name === tag.name);

    if (!tagItem) {
      tagItem = {
        name: tag.name,
        values: [],
      };
      tagItems.push(tagItem);
    }

    tagItem.values.push(tag.value);
  }

  for (let tagItem of tagItems) {
    tagItem.values.sort((a, b) => a.localeCompare(b));
  }

  return tagItems.sort((a, b) => a.name.localeCompare(b.name));
};