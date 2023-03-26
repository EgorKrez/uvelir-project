import { PropsWithChildren } from 'react';

export interface IPropsWithClassname {
  className?: string;
}

export interface IPropsWithChildren extends PropsWithChildren {
}

export interface ICallback {
  (): void;
}

export interface IValueCallback<T> {
  (value: T): void;
}

export interface IMapFunction<TIn, TOut> {
  (value: TIn): TOut;
}