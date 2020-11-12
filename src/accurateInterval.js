/* accurateInterval function from Peter Weinberg's adaptation of Alex J Wayne's accurateInterval.js

//http://stackoverflow.com/questions/8173580/setinterval-timing-slowly-drifts-away-from-staying-accurate

Alex J Wayne's Github: https://gist.github.com/AlexJWayne/1d99b3cd81d610ac7351
Peter Weinberg's Codepen: https://codepen.io/no_stack_dub_sack/pen/VKJGKd 
*/

const accurateInterval = function (fn, time) {
  var cancel, nextAt, timeout, wrapper;
  nextAt = new Date().getTime() + time;
  timeout = null;
  wrapper = function () {
    nextAt += time;
    timeout = setTimeout(wrapper, nextAt - new Date().getTime());
    return fn();
  };
  cancel = function () {
    return clearTimeout(timeout);
  };
  timeout = setTimeout(wrapper, nextAt - new Date().getTime());
  return {
    cancel: cancel,
  };
};

export default accurateInterval;
