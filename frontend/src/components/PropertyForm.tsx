import { Label } from "@radix-ui/react-label";
import { Plus, Save, Trash } from "lucide-react";
import { NewPropertyErrorMessages } from "./NewPropertySheet";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export type PropertyFormInput ={
  name:string
}

type PropertyFormProps = {
  id?:string,
  values:
  {
    name:string
  },
  onSubmit:()=>void,
  onDelete:()=>void,
  disabled?:boolean,
  errors:NewPropertyErrorMessages,
  setValues:(value:Partial<PropertyFormInput>)=>void
}

const PropertyForm = ({
  id,
  values,
  onDelete,
  onSubmit,
  disabled,
  errors,
  setValues
}:PropertyFormProps) => {

  return (
    <div>
      <div className="mt-8 grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input 
            id="name" 
            type="name" 
            placeholder="e.g. Cash , Saving" 
            value={values.name}
            onChange={(e)=>setValues({name:e.target.value})}
            disabled={disabled}
          />
          {errors.name && <div className="ml-2">
            <p className="text-sm text-red-400">
              {errors.name}
            </p>
          </div>}
        </div>
        <div className="grid gap-4 w-full">
          <Button 
            className="w-full"
            onClick={onSubmit}
            disabled={disabled}
          >
            {!id && <Plus className="mr-2"/>}
            {!!id && <Save className="mr-2"/>}
            {!id && 'Create Property'}
            {!!id && 'Save Changes'}
          </Button>
          {!!id && <Button 
            variant={'outline'} 
            className="w-full"
            onClick={onDelete}
            disabled={disabled}
          >
            <Trash size={20} className="mr-2"/>
            Delete Property
          </Button>}  
        </div>
      </div>
    </div>
  )
}

export default PropertyForm