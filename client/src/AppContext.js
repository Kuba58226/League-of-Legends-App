import { createContext } from 'react';

export const contextObject = {
    isUserLogged: false,
    toggleLoggedState: () => console.log('toggleLoggedState'),
    jwtToken: false,
    toggleTokenState: () => console.log('toggleTokenState'),
    userRole: false,
    toggleRoleState: () => console.log('toggleRoleState'),
}
  
  export const AppContext = createContext(contextObject);