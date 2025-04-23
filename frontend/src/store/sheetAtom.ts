import { Property } from '@/components/PropertyDetails';
import { atom } from 'jotai';

// Interfaces
interface EditPropertySheetState {
  isOpen: boolean;
  id: string;
  values: Property;
}

interface FilterSheetState {
  isOpen: boolean;
  budget: number;
  city: 'sangali' | 'kolhapur' | 'satara' | 'pune' | 'mumbai' | 'karad' | '';
}

interface SheetsState {
  NewPropertySheet: boolean;
  EditPropertySheet: EditPropertySheetState;
  FilterSheet: FilterSheetState;
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
  amountPerFlat: 0
};

// Default filter sheet state
const defaultFilterSheet: FilterSheetState = {
  isOpen: false,
  budget: 0,
  city: '',
};

// Base atom for the entire sheet state
const sheetAtom = atom<SheetsState>({
  NewPropertySheet: false,
  EditPropertySheet: {
    isOpen: false,
    id: '',
    values: defaultProperty,
  },
  FilterSheet: defaultFilterSheet,
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

// Derived atom for FilterSheet
export const filterSheetAtom = atom(
  (get) => get(sheetAtom).FilterSheet,
  (get, set, newValue: FilterSheetState) => {
    const sheets = get(sheetAtom);
    set(sheetAtom, {
      ...sheets,
      FilterSheet: newValue,
    });
  }
);
