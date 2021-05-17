const branch = null;
export default function selectBranch(state = branch, action) {
  switch (action.type) {
    case "SELECT_BRANCH":
      return action.branch;
    default:
      return state;
  }
}
