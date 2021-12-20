// const compose = (...fns) => (str) => {
//   let res = str;
//   for (let i = fns.length - 1; i >= 0; i--) {
//     res = fns[i](res);
//   }
//   return res;
// };

function compose(...fns) {
  return function(...args) {
    let res = args;
    for (let i = 0; i < fns.length; i += 1) {
      res = fns[i].apply(this, res);
    }
    return res;
  };
}

export default compose;
