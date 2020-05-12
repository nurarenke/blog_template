export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_USER":
      // adding the new element to the array
      return [...state, action.payload];
    default:
      return state;
  }
};
