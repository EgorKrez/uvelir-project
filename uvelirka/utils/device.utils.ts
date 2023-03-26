import { GetServerSidePropsContext } from 'next';
import DeviceDetector from 'node-device-detector';
import DeviceDetectorHelper from 'node-device-detector/helper';

export interface IIsMobile {
  readonly isMobile: boolean;
}

export const isMobile = (c: GetServerSidePropsContext): IIsMobile => {
  const detector = new DeviceDetector();
  const result = detector.detect(c.req.headers['user-agent']!);

  return {
    isMobile: DeviceDetectorHelper.isMobile(result)
  };
};