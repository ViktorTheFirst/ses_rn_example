const LOGIN = 'LOGIN';
const GET_COURSES = 'GET_COURSES';

export const login = (data) => async (dispatch) => {
  try {
    const { email, password } = data;
    const res = await fetch(
      'https://courses.ses-education.com:5600/auth/student/login',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login: email, password: password }),
      }
    );
    if (!res.ok) {
      let message = '401 Unauthorized request, enter existing user email';

      return message;
    }
    let json = await res.json();
    dispatch({
      type: LOGIN,
      payload: { token: json.token, user: json.user },
    });
    return json;
  } catch (err) {
    console.log(err);
  }
};

export const get_courses = (token) => async (dispatch) => {
  try {
    const res = await fetch(
      'https://courses.ses-education.com:5600/courses/student-courses',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      }
    );
    if (!res.ok) {
      let message = 'Server error on get courses';
      return message;
    }
    let serverResponse = await res.json();
    dispatch({
      type: GET_COURSES,
      payload: { courses: serverResponse },
    });
  } catch (err) {
    console.log(err);
  }
};
