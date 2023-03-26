import util from 'util';

function prettyLog(item: unknown) {
  util.inspect(item, false, null, true);
}