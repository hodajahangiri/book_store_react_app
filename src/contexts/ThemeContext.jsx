import { createContext, useContext, useState, useEffect } from "react";

// Create the context
const ThemeContext = createContext();

// Create a custom hook to use(consume) our context -- OPTIONAL
export const useTheme = () => {
    const context = useContext(ThemeContext);
    return context;
};

// Create our context provider
export const ThemeProvider = ({children}) => {
    // initialize our dark and light toggle
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem("theme"); // we will be store our theme in LS
        return saved === 'dark'; // will return true or false depending on whether we got 'dark or light' from ls
    });

    // save our theme whenever it changes
    useEffect(() => {
        localStorage.setItem("theme", isDarkMode ? 'dark' : 'light');
    },[isDarkMode]); //sets our local storage on mount and whenever our DarkMode (theme) changes

    // Function to toggle our theme
    // Prev parameter in the callback function of the setState always refers to the previous state before it got changed
    const toggleTheme = () => {
        setIsDarkMode(prev => !prev)
    };

    // Value object contains the data that we will be making available across our entire application
    const value = {
        isDarkMode,
        toggleTheme
    }

    return(
        <ThemeContext.Provider value={value}>
            {children} 
        </ThemeContext.Provider>
    )
}
