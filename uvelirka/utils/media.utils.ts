import { lookup } from 'mime-types';

export function isFileImageOrVideo(file?: File) {
  return isFileImage(file) || isFileVideo(file);
}

export function isFileImage(file?: File): boolean {
  return file?.['type'].split('/')[0] === 'image';
}

export function isFileVideo(file?: File): boolean {
  return file?.['type'].split('/')[0] === 'video';
}

export function isImageUrl(url: string): boolean {
  const lookupResult = lookup(url) as string;

  return !!lookupResult?.startsWith('image');
}

export function isVideoUrl(url: string): boolean {
  const lookupResult = lookup(url) as string;

  return !!lookupResult?.startsWith('video');
}