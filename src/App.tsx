import {  HashRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import AppContextProvider from "@crema/context/AppContextProvider";
import AppThemeProvider from "@crema/context/AppThemeProvider";
import AppStyleProvider from "@crema/context/AppStyleProvider";
import AppLocaleProvider from "@crema/context/AppLocaleProvider";
import InfoViewContextProvider from "@crema/context/AppContextProvider/InfoViewContextProvider";
import AuthRoutes from "@crema/components/AuthRoutes";
import AppLayout from "@crema/core/AppLayout";
import AppAuthProvider from "@crema/core/AppAuthProvider";
import "@crema/mockapi";
import "./styles/index.css";

function App() {

  const generateRandomString = (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  };
  localStorage.setItem("HomePageSessionId",generateRandomString(5))
  localStorage.setItem("SummaryPageSessionId",generateRandomString(5))

  return (
    <>
      <AppContextProvider>
        <AppThemeProvider>
          <AppStyleProvider>
            <AppLocaleProvider>
              <HashRouter>
                <InfoViewContextProvider>
                  <AppAuthProvider>
                    <AuthRoutes>
                      <CssBaseline />
                      <AppLayout />
                    </AuthRoutes>
                  </AppAuthProvider>
                </InfoViewContextProvider>
              </HashRouter>
            </AppLocaleProvider>
          </AppStyleProvider>
        </AppThemeProvider>
      </AppContextProvider>
    </>
  );
}

export default App;
