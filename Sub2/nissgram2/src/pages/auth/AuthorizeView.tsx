import React, { useState, useEffect, createContext, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface User {
    email: string;
}

interface FetchOptions {
    method: string;
}

const UserContext = createContext<User | undefined>(undefined);

function AuthorizeView({ children }: { children: ReactNode }) {
    const [authorized, setAuthorized] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User>({ email: "" });


    useEffect(() => {
        checkAuthentication();
    }, []); // Tomt avhengighetsarray sikrer at effekten bare kjøres ved montering
    
    const checkAuthentication = async () => {
        
        
        try {
          const response = await fetch('http://localhost:5024/api/auth/isauthenticated', {
            method: 'GET', // Antageligvis en GET request for å sjekke autentisering
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (response.ok) {
            const result = await response.json(); // Anta at serveren returnerer en status eller brukerdata
            if (result.isAuthenticated) {
              console.log('User is authenticated');
              // Oppdater brukerens autentiseringsstatus i applikasjonens tilstand, eller utfør annen nødvendig logikk
            } else {
              console.log('User is not authenticated');
              throw new Error('Not authenticated');
            }
          } else {
            throw new Error('Failed to verify authentication status');
          }
        } catch (error: any) {
          
          console.error('Error checking authentication:', error);
        } finally {
          setLoading(false);
        }
      };

        if (authorized) {
            return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
        } else {
            return <Navigate to="/login" />;
        }
    }

    


export function AuthorizedUser({ value }: { value: string }) {
    const user = React.useContext(UserContext);

    if (user && value === "email") {
        return <>{user.email}</>;
    } else {
        return <></>;
    }
}

export default AuthorizeView;
