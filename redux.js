export const createStore = (reducer) => {
    // 某个时刻Store的快照
    let state;
    // 所挂在的所有监听函数
    let listeners = [];
    // ------------------------对某个时刻Store生成快照-----------------------------------
    const getState = () => state;
    // ----------------------发送dispatch请求改变Store----------------------------------
    const dispatch = (action) => {
        // 自动执行reducer函数，返回某个时刻全新的Store生成快照-
        state = reducer(state, action);
        // 对所有订阅的函数进行更新操作（可在这里进行react的render渲染）
        listeners.forEach(listener => listener());
    };
    // ------------------对传入函数进行监听，并进行监听进行卸载----------------------------
    const subscribe = (listener) => {
        // 对传入函数进行监听
        listeners.push(listener);
        // 监听函数进行解除
        return () => {
          listeners = listeners.filter(l => l !== listener);
        }
    };
    // 第一次自动执行，初始化Store的快照
    dispatch({});
    return { getState, dispatch, subscribe };
}