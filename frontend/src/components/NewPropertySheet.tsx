import { useRecoilState, useSetRecoilState } from "recoil"
import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { newPropertySheet } from "@/store/SheetAtom"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "./ui/sheet"
import PropertyForm, { PropertyFormInput } from "./PropertyForm"
import propertyAtom from "@/store/propertyAtom"

export type NewPropertyErrorMessages ={
    name?:string,
    [key: string]: string | undefined;
}

const NewPropertySheet = () => {
    //const setPropertys = useSetRecoilState(propertyAtom)
    //const [isOpen,setIsOpen] = useRecoilState(newPropertySheet)
    // const onClose = () => setIsOpen(false)
    // const [values,setValues] = useState({
    //     name:'',
    // })
    // const setValue = (newValues:Partial<PropertyFormInput>) =>{
    //     setValues((values)=>({
    //         ...values,
    //         ...newValues
    //     }))
    // }
    // const [errors,setErrors] = useState<NewPropertyErrorMessages>({})
    // const [isLoading,setIsLoading] = useState(false)
    // const addProperty = async () => {
    //     try {
    //         setIsLoading(true); // Set loading to true
    //         setErrors({}); // Clear previous errors
            
    //         const token = localStorage.getItem("authToken");
    //         if (!token) {
    //             toast.error("No token found");
    //             return;
    //         }

    //         const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/property/`, values, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         });

    //         if (response?.data.success) {
    //             //setPropertys((prev)=>([...prev,response.data.data]))
    //             onClose()
    //             toast.success(response?.data.message);
    //         } else {
    //           toast.error(response?.data.message);
    //         }
    //     } catch (err: any) {
    //         if (err.response?.data?.errors) {
    //             setErrors(err.response.data.errors);
    //         } 
    //         else if (err.response?.data?.message) {
    //             toast.error(err.response.data.message);
    //         }
    //         else {
    //             toast.error("Something went wrong!");
    //         }
    //     } finally {
    //         setIsLoading(false); // Set loading to false
    //     }
    // };
    
    return (
        <Sheet open={true} onOpenChange={()=>{}}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>
                        New Property
                    </SheetTitle>
                    <SheetDescription>
                        Create a new property to track your transactions.
                    </SheetDescription>
                </SheetHeader>
                {/* <PropertyForm
                    values={values}
                    setValues={setValue}
                    disabled={isLoading}
                    onDelete={()=>{}}
                    onSubmit={addProperty}
                    errors={errors}
                /> */}
            </SheetContent>
        </Sheet>
  )
}

export default NewPropertySheet