import { createContext } from "react";


//as the actual value you want to access
export const UserContext = createContext({

});


export const UserProvider = ({children}) => {
    return <UserContext.Provider></UserContext.Provider>
};