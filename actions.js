const LOGIN = 'LOGIN';
const GET_COURSES = 'GET_COURSES';

export const login = (data) => async (dispatch) => {
  try {
    //console.log('data in actions: ', data);
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
      const resError = await res.json();
      let message = 'Server error on login';
      if (resError && resError.error.length > 0) {
        return message;
      }
    }
    let json = await res.json();
    //console.log('json in actions login: ', json);
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
      const resError = await res.json();
      let message = 'Server error on get courses';
      if (resError && resError.error.length > 0) {
        return message;
      }
    }
    let serverResponse = await res.json();
    //console.log('json in actions get courses: ', serverResponse);
    dispatch({
      type: GET_COURSES,
      payload: { courses: serverResponse },
    });
  } catch (err) {
    console.log(err);
  }
};
