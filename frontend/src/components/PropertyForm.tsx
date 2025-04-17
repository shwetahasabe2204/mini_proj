import { Label } from "@radix-ui/react-label";
import { Plus, Save, Trash, X } from "lucide-react";
import { NewPropertyErrorMessages } from "./NewPropertySheet";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Property } from "@/store/sheetAtom";

export type PropertyFormInput = Property;

type PropertyFormProps = {
  id?: string;
  values: PropertyFormInput;
  onSubmit: () => void;
  onDelete: () => void;
  disabled?: boolean;
  errors: NewPropertyErrorMessages;
  setValues: (value: Partial<PropertyFormInput>) => void;
};

const PropertyForm = ({
  id,
  values,
  onDelete,
  onSubmit,
  disabled,
  errors,
  setValues,
}: PropertyFormProps) => {
  // Handle list inputs
  const handleArrayChange = (field: keyof PropertyFormInput, index: number, newValue: string) => {
    const arr = [...(values[field] as string[])];
    arr[index] = newValue;
    setValues({ [field]: arr });
  };

  const addToArrayField = (field: keyof PropertyFormInput) => {
    setValues({ [field]: [...(values[field] as string[]), ""] });
  };

  const removeFromArrayField = (field: keyof PropertyFormInput, index: number) => {
    const arr = [...(values[field] as string[])];
    arr.splice(index, 1);
    setValues({ [field]: arr });
  };

  return (
    <div className="grid gap-4 mx-4 overflow-y-auto">
      {/* Title */}
      <div className="grid gap-2">
        <Label>Title</Label>
        <Input
          value={values.title}
          onChange={(e) => setValues({ title: e.target.value })}
          disabled={disabled}
        />
        {errors.title && <p className="text-sm text-red-400">{errors.title}</p>}
      </div>

      {/* Developer */}
      <div className="grid gap-2">
        <Label>Developer</Label>
        <Input
          value={values.developer}
          onChange={(e) => setValues({ developer: e.target.value })}
          disabled={disabled}
        />
      </div>

      {/* Address */}
      <div className="grid gap-2">
        <Label>Address</Label>
        <Input
          value={values.address}
          onChange={(e) => setValues({ address: e.target.value })}
          disabled={disabled}
        />
      </div>

      {/* Video Presentation */}
      <div className="grid gap-2">
        <Label>Video Presentation</Label>
        <Input
          value={values.videpPresentation}
          onChange={(e) => setValues({ videpPresentation: e.target.value })}
          disabled={disabled}
        />
      </div>

      {/* Locality */}
      <div className="grid gap-2">
        <Label>Locality</Label>
        <Input
          value={values.locality}
          onChange={(e) => setValues({ locality: e.target.value })}
          disabled={disabled}
        />
      </div>

      {/* Project At */}
      <div className="grid gap-2">
        <Label>Project At</Label>
        <Input
          value={values.projectAt}
          onChange={(e) => setValues({ projectAt: e.target.value })}
          disabled={disabled}
        />
      </div>

      {/* Construction Stage */}
      <div className="grid gap-2">
        <Label>Construction Stage</Label>
        <Input
          value={values.constructionStage}
          onChange={(e) => setValues({ constructionStage: e.target.value })}
          disabled={disabled}
        />
      </div>

      {/* Tags */}
      <div className="grid gap-2">
        <Label>Tags</Label>
        {values.tags.map((tag, i) => (
          <div className="flex gap-2 items-center" key={i}>
            <Input
              value={tag}
              onChange={(e) => handleArrayChange("tags", i, e.target.value)}
              disabled={disabled}
            />
            <Button variant="ghost" onClick={() => removeFromArrayField("tags", i)} disabled={disabled}>
              <X size={16} />
            </Button>
          </div>
        ))}
        <Button onClick={() => addToArrayField("tags")} disabled={disabled} variant="outline" size="sm">
          Add Tag
        </Button>
      </div>

      {/* Images */}
      <div className="grid gap-2">
        <Label>Image URLs</Label>
       
        { 
          values.image.map((img, i) => (
          <div className="flex gap-2 items-center" key={i}>
            <Input
              value={img}
              onChange={(e) => handleArrayChange("image", i, e.target.value)}
              disabled={disabled}
            />
            <Button variant="ghost" onClick={() => removeFromArrayField("image", i)} disabled={disabled}>
              <X size={16} />
            </Button>
          </div>
        ))}
        <Button onClick={() => addToArrayField("image")} disabled={disabled} variant="outline" size="sm">
          Add Image
        </Button>
      </div>

      {/* Amenities */}
      <div className="grid gap-2">
        <Label>Amenities</Label>
        {values.ammenties.map((item, i) => (
          <div className="flex gap-2 items-center" key={i}>
            <Input
              value={item}
              onChange={(e) => handleArrayChange("ammenties", i, e.target.value)}
              disabled={disabled}
            />
            <Button variant="ghost" onClick={() => removeFromArrayField("ammenties", i)} disabled={disabled}>
              <X size={16} />
            </Button>
          </div>
        ))}
        <Button onClick={() => addToArrayField("ammenties")} disabled={disabled} variant="outline" size="sm">
          Add Amenity
        </Button>
      </div>

      {/* Submit / Delete */}
      <div className="grid gap-4 w-full pt-4">
        <Button className="w-full" onClick={onSubmit} disabled={disabled}>
          {!id && <Plus className="mr-2" />}
          {!!id && <Save className="mr-2" />}
          {!id && "Create Property"}
          {!!id && "Save Changes"}
        </Button>
        {!!id && (
          <Button
            variant={"outline"}
            className="w-full"
            onClick={onDelete}
            disabled={disabled}
          >
            <Trash size={20} className="mr-2" />
            Delete Property
          </Button>
        )}
      </div>
    </div>
  );
};

export default PropertyForm;
