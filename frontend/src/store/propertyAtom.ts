import { Property } from "@/components/PropertyDetails";
import { atom } from "jotai";

// Base atom for Property[]
const propertyAtom = atom<Property[]>([]);

export default propertyAtom;
