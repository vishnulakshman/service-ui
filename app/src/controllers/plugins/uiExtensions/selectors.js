import { createSelector } from 'reselect';
import { EXTENSION_TYPE_SETTINGS_TAB } from './constants';
import { availablePluginNamesSelector } from '../selectors';
import { uiExtensionMap } from './uiExtensionStorage';

export const createUiExtensionSelectorByType = (type) =>
  createSelector(availablePluginNamesSelector, (pluginNames) =>
    Array.from(uiExtensionMap.entries())
      .filter(([name]) => pluginNames.includes(name))
      .map(([, extensions]) => extensions)
      .reduce((acc, val) => acc.concat(val), [])
      .filter((extension) => extension.type === type),
  );

export const uiExtensionSettingsTabsSelector = createUiExtensionSelectorByType(
  EXTENSION_TYPE_SETTINGS_TAB,
);
