import { Property } from '@/components/PropertyDetails';
import { atom } from 'jotai';

// Interfaces
interface EditPropertySheetState {
  isOpen: boolean;
  id: string;
  values: Property;
}

interface SheetsState {
  NewPropertySheet: boolean;
  EditPropertySheet: EditPropertySheetState;
}

// Default property object
const defaultProperty: Property = {
  id: 0,
  title: '',
  developer: '',
  address: '',
  tags: [],
  image: [],
  videpPresentation: '',
  locality: '',
  projectAt: '',
  constructionStage: '',
  propertyDetails: [],
  ammenties: [],
};

// Base atom for the entire sheet state
const sheetAtom = atom<SheetsState>({
  NewPropertySheet: false,
  EditPropertySheet: {
    isOpen: false,
    id: '',
    values: defaultProperty,
  },
});

// Derived atom for NewPropertySheet
export const newPropertySheetAtom = atom(
  (get) => get(sheetAtom).NewPropertySheet,
  (get, set, newValue: boolean) => {
    const sheets = get(sheetAtom);
    set(sheetAtom, {
      ...sheets,
      NewPropertySheet: newValue,
    });
  }
);

// Derived atom for EditPropertySheet
export const editPropertySheetAtom = atom(
  (get) => get(sheetAtom).EditPropertySheet,
  (get, set, newValue: EditPropertySheetState) => {
    const sheets = get(sheetAtom);
    set(sheetAtom, {
      ...sheets,
      EditPropertySheet: newValue,
    });
  }
);
