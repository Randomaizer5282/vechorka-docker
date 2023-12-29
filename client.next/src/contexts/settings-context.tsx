import React, {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import type { MenuProps } from "@/shared/ui/navigation/types";
import type { TaxonomiesProps } from "@/shared/types";

interface SettingsState {
  siteUrl?: string;
  apiUrl?: string;
  uploadUrl?: string;
  menus?: {
    main: MenuProps[];
  };
  contacts?: any;
  taxonomies: TaxonomiesProps;
  setSettings?: (settings: SettingsState) => void;
}

interface SettingsProviderProps extends PropsWithChildren {
  value: SettingsState;
}

const initialState = {
  taxonomies: { categories: [], geography: [], tags: [], allCategories: [] },
};

const SettingsContext = createContext<SettingsState>(initialState);
SettingsContext.displayName = "SettingsContext";

export const SettingsProvider = ({
  children,
  value,
}: SettingsProviderProps) => {
  const [settings, setSettings] = useState<SettingsState>(initialState);
  const contextProps = value?.taxonomies ? value : settings;
  return (
    <SettingsContext.Provider value={{ ...contextProps, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error(`useSettings must be used within a SettingsProvider`);
  }
  return context;
};
