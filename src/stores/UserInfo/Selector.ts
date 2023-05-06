/**
 * Selectors let us factorize logic that queries the state.
 *
 * Selectors can be used in sagas or components to avoid duplicating that logic.
 *
 * Writing selectors is optional as it is not always necessary, we provide a simple example below.
 */

import {RootState} from '../';

export const userInfo = (state: RootState) => {
  // console.log("state.userInfo = ", state, state.userInfo)
  return state.userInfo;
};
