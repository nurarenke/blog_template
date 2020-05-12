import _ from "lodash"; // this is for memoization of the api calls
import jsonPlaceholder from "../apis/jsonPlaceholder"; // this is for fake filler info

export const fetchPostsandUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts()); // wait for the api request to be completed and we dispatch the response to reducers
  //lodash has its own version of the map function and for finding uniques (we're mapping over the posts
  // and grabbing all of the user ids that got return and then getting rid of the duplicates)
  const userIds = _.uniq(_.map(getState().posts, "userId"));
  userIds.forEach((id) => dispatch(fetchUser(id))); // this way we don't make multiple request for the same userid

  // fancy way of using lodash to chain the methods for line 8 and 9
  // _.chain(getState().posts)
  //   .map("userId")
  //   .uniq()
  //   .forEach((id) => dispatch(fetchUser(id)))
  //   .value();
};

// this is using redux thunk
// redux-thunk: it is a middleware that looks at every action that passes through the system, and if it’s a function, it calls that function.
// great website explaining it more: https://daveceddia.com/what-is-a-thunk/
export const fetchPosts = () => async (dispatch) => {
  const response = await jsonPlaceholder.get("/posts");

  dispatch({ type: "FETCH_POSTS", payload: response.data });
};

export const fetchUser = (id) => async (dispatch) => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({ type: "FETCH_USER", payload: response.data });
};

//This is the memoized version which we didn't use because it only fetches the user once
// export const fetchUser = (id) => (dispatch) => {
//   _fetchUser(id, dispatch);
// };
// the underscore indicates it's a private function
// memoize come from lodash library
// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);

//   dispatch({ type: "FETCH_USER", payload: response.data });
// });
