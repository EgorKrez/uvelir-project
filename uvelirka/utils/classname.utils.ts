import classNames from 'classnames';

export type PossibleClassnameValues = string | null | undefined | boolean | {};

export const c = (...names: PossibleClassnameValues[]) => classNames(names);