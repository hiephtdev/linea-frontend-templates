import { proxy, subscribe as sub } from 'valtio/vanilla';
const state = proxy({
    themeMode: 'dark',
    themeVariables: {}
});
export const ThemeController = {
    state,
    subscribe(callback) {
        return sub(state, () => callback(state));
    },
    setThemeMode(themeMode) {
        state.themeMode = themeMode;
    },
    setThemeVariables(themeVariables) {
        state.themeVariables = { ...state.themeVariables, ...themeVariables };
    }
};
//# sourceMappingURL=ThemeController.js.map