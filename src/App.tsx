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
import { v4 as uuidv4 } from 'uuid';
import "@crema/mockapi";
import "./styles/index.css";

function App() {

  const generateUUID = () => {
    return uuidv4();
  }
   localStorage.setItem("HomePageSessionId",generateUUID());
   localStorage.setItem("SummaryPageSessionId",generateUUID());

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
