import { atom, selector } from "recoil";

interface EditPropertySheetState {
    isOpen:boolean,
    id:string,
    values:{
        name:string
    }
}

interface SheetsState {
    NewPropertySheet: boolean;
    EditPropertySheet : EditPropertySheetState;
}

const sheetAtom = atom<SheetsState>({
    key: 'Sheets',
    default: {
        NewPropertySheet: false,
        EditPropertySheet :{
            isOpen:false,
            id:'',
            values:{
                name:''
            }
        }, 
    },
});

export const newPropertySheet = selector<boolean>({
    key: 'NewPropertySheet',
    get: ({ get }) => {
        const sheets = get(sheetAtom);
        return sheets.NewPropertySheet;
    },
    set: ({ set, get }, newValue) => {
        const sheets = get(sheetAtom);
        set(sheetAtom, {
            ...sheets,
            NewPropertySheet: newValue as boolean,
        });
    },
});

export const editPropertySheet = selector<EditPropertySheetState>({
    key: 'EditPropertySheet',
    get: ({ get }) => {
        const sheets = get(sheetAtom);
        return sheets.EditPropertySheet;
    },
    set: ({ set, get }, newValue) => {
        const sheets = get(sheetAtom);
        set(sheetAtom, {
            ...sheets,
            EditPropertySheet: newValue as EditPropertySheetState,
        });
    },
});
