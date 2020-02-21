import {ExternalComponent} from './externalComponent';

console.log(123);
//
// export default () => {
//   console.log(456);
//   window.RP._registerPlugin({
//     settingsTab: {
//       name: 'external',
//       title: 'External',
//       component: ExternalComponent,
//     },
//   });
// };

window.RP._registerPlugin({
  settingsTab: {
    name: 'external',
    title: 'External',
    component: ExternalComponent,
  },
});
