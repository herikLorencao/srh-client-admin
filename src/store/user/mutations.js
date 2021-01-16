export function saveUserId(state, data) {
  state.id = data;
}

export function removeUserId(state) {
  state.id = null;
}
