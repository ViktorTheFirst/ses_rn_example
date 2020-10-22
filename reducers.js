const LOGIN = 'LOGIN';
const GET_COURSES = 'GET_COURSES';

const initialState = {
  token: null,
  user: null,
  courses: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { token: action.payload.token, user: action.payload.user };

    case GET_COURSES:
      return { ...state, courses: action.payload.courses };
  }
  return state;
};

export default reducer;
