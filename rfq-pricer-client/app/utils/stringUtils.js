
//why do we need this?
//see chrome bug: https://bugs.chromium.org/p/v8/issues/detail?id=2869
export const copy = str => {
  if(str === null)
    return str;

  return (' ' + str).slice(1);
};
