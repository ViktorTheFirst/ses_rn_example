import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Login from './Login';
import Courses from './Courses';

const mainNav = createSwitchNavigator(
  {
    login: Login,
    courses: Courses,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);
export default createAppContainer(mainNav);
