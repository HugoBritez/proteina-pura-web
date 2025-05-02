import React, { createContext, useContext, ReactNode } from 'react';
import { ClientConfig, defaultConfig } from './client.config';

interface ClientConfigContextType {
    config: ClientConfig;
    updateConfig: (newConfig: Partial<ClientConfig>) => void;
}

const ClientConfigContext = createContext<ClientConfigContextType | undefined>(undefined);

export const ClientConfigProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [config, setConfig] = React.useState<ClientConfig>(defaultConfig);

    const updateConfig = (newConfig: Partial<ClientConfig>) => {
        setConfig(prev => ({ ...prev, ...newConfig }));
    };

    return (
        <ClientConfigContext.Provider value={{ config, updateConfig }}>
            {children}
        </ClientConfigContext.Provider>
    );
};

export const useClientConfig = () => {
    const context = useContext(ClientConfigContext);
    if (context === undefined) {
        throw new Error('useClientConfig must be used within a ClientConfigProvider');
    }
    return context;
}; 