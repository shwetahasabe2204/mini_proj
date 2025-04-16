import { Property } from "@/components/PropertyDetails";
import { atom } from "recoil"

const propertyAtom = atom<Property[]>({
    key:'Property',
    default:[]
})

export default propertyAtom;