const createStore = (state, reducer, context) => {
  const listeners = [];
  const getState = () => {
    return state;
  }
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(callback => {
      callback.call(this, state, context)
    })
  }
  const subscribe = (callback) => {
    callback && callback.constructor === Function && listeners.push(callback);
  }
  return {
    getState,
    dispatch,
    subscribe
  }
}

export default createStore;