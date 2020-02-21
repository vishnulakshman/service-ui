/*
 * Copyright 2020 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

/* eslint-disable */

import React from 'react';
import { addRoutes } from 'redux-first-router';
import { BigButton } from 'components/buttons/bigButton';
import { PROJECT_SETTINGS_TAB_PAGE, projectIdSelector } from 'controllers/pages';
import {fetch} from 'common/utils/fetch';

window.RP = {
  additionalTabs: {},
};

export const initPluginRegistration = (store) => {
  window.RP._registerPlugin = (options) => {
    const { name, title, component: Component } = options.settingsTab;
    const componentProps = {
      React,
      BigButton,
    };
    const projectId = projectIdSelector(store.getState());
    const CustomTabComponent = () => <Component {...componentProps} />;
    window.RP.additionalTabs[name] = {
      name: title,
      link: {
        type: PROJECT_SETTINGS_TAB_PAGE,
        payload: { projectId, settingsTab: name },
      },
      component: <CustomTabComponent />,
    };
  };
};

export const fetchPlugin = () => {
  fetch('http://localhost:9090/external.js', {
    // headers: {
    //   'Content-Type': 'application/javascript',
    // },
  }).then((r) => {
    console.log('loaded', !!r);
    eval(r);
  });
  // imp1ort(/* webpackIgnore: true */ 'http://localhost:9090/external.js').then((m) => {
  //   console.log(m);
  // })
};

/*
 * add to routesMap
 * add to tab list
 * */
