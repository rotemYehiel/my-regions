export const regionsStateSelector = (state) => state.regions;

export const regionsSelector = (state) => regionsStateSelector(state).regions;
