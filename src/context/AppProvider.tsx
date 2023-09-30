import { FC, ReactNode, createContext, useContext, useState } from 'react';

type AppContextType = {
    searchQuery: string;
    setSearchQuery: (searchQuery: string) => void;
}

const contextDefaultValues: AppContextType = {
    searchQuery: '',
    setSearchQuery: () => {}
}

type AppProviderProps = {
    children: ReactNode
}

export const AppContext = createContext<AppContextType>(contextDefaultValues);

const AppProvider: FC<AppProviderProps> = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');

    return (
        <AppContext.Provider
            value={{searchQuery, setSearchQuery}}
        >
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;