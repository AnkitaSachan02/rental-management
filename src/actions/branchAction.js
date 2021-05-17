//Import inside modules
import locations from "../Data";

export default function selectBranch(dealers_id, branch_id) {
  return (dispatch) => {
    dispatch({
      type: "SELECT_BRANCH",
      branch: locations
        .filter((location) => location.dealers_id === dealers_id)[0]
        .branches.filter((branch) => branch.branch_id === branch_id)[0],
    });
  };
}
