import { Label } from "@radix-ui/react-label";
import { Plus, Save, Trash, X } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import MapPicker from "./MapPicker";
import { Property } from "./PropertyDetails";
import { NewPropertyErrorMessages } from "./NewPropertySheet";

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
  onSubmit,
  onDelete,
  disabled,
  errors,
  setValues,
}: PropertyFormProps) => {
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

  const handleNumberChange = (field: keyof PropertyFormInput, value: string) => {
    const num = value === "" ? undefined : parseFloat(value);
    setValues({ [field]: num });
  };

  return (
    <div className="grid gap-4 mx-4 overflow-y-auto">
      {/* Basic Fields */}
      {[
        { label: "Title", field: "title" },
        { label: "Developer", field: "developer" },
        { label: "Address", field: "address" },
        { label: "Locality", field: "locality" },
        { label: "Project At", field: "projectAt" },
        { label: "Construction Stage", field: "constructionStage" },
        { label: "Video Presentation", field: "videoPresentation" },
      ].map(({ label, field }) => (
        <div className="grid gap-2" key={field}>
          <Label>{label}</Label>
          <Input
            value={values[field as keyof PropertyFormInput] as string}
            onChange={(e) => setValues({ [field]: e.target.value })}
            disabled={disabled}
          />
          {errors[field as keyof PropertyFormInput] && (
            <p className="text-sm text-red-400">{errors[field as keyof PropertyFormInput]}</p>
          )}
        </div>
      ))}

      {/* Amount Per Flat */}
      <div className="grid gap-2">
        <Label>Amount Per Flat</Label>
        <Input
          type="number"
          value={values.amountPerFlat || ""}
          onChange={(e) => handleNumberChange("amountPerFlat", e.target.value)}
          disabled={disabled}
        />
        {errors.amountPerFlat && (
          <p className="text-sm text-red-400">{errors.amountPerFlat}</p>
        )}
      </div>

      {/* Latitude / Longitude */}
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label>Latitude</Label>
          <Input
            type="number"
            step="0.000001"
            value={values.latitude ?? ""}
            onChange={(e) => handleNumberChange("latitude", e.target.value)}
            disabled={disabled}
            placeholder="e.g. 19.0760"
          />
          {errors.latitude && <p className="text-sm text-red-400">{errors.latitude}</p>}
        </div>
        <div className="grid gap-2">
          <Label>Longitude</Label>
          <Input
            type="number"
            step="0.000001"
            value={values.longitude ?? ""}
            onChange={(e) => handleNumberChange("longitude", e.target.value)}
            disabled={disabled}
            placeholder="e.g. 72.8777"
          />
          {errors.longitude && <p className="text-sm text-red-400">{errors.longitude}</p>}
        </div>
      </div>

      <div className="grid gap-2">
        <Label>Pick from Map</Label>
        <MapPicker
          latitude={values.latitude}
          longitude={values.longitude}
          setCoordinates={(lat, lng) => setValues({ latitude: lat, longitude: lng })}
        />
      </div>

      {/* Repeating List Inputs */}
      {[
        { label: "Tags", field: "tags" },
        { label: "Image URLs", field: "image" },
        { label: "Amenities", field: "amenities" },
      ].map(({ label, field }) => (
        <div className="grid gap-2" key={field}>
          <Label>{label}</Label>
          {(values[field as keyof PropertyFormInput] as string[]).map((item, i) => (
            <div className="flex gap-2 items-center" key={i}>
              <Input
                value={item}
                onChange={(e) => handleArrayChange(field as keyof PropertyFormInput, i, e.target.value)}
                disabled={disabled}
              />
              <Button
                variant="ghost"
                onClick={() => removeFromArrayField(field as keyof PropertyFormInput, i)}
                disabled={disabled}
              >
                <X size={16} />
              </Button>
            </div>
          ))}
          <Button
            onClick={() => addToArrayField(field as keyof PropertyFormInput)}
            disabled={disabled}
            variant="outline"
            size="sm"
          >
            Add {label.slice(0, -1)}
          </Button>
        </div>
      ))}

      {/* Submit / Delete */}
      <div className="grid gap-4 w-full pt-4">
        <Button className="w-full" onClick={onSubmit} disabled={disabled}>
          {!id ? <Plus className="mr-2" /> : <Save className="mr-2" />}
          {!id ? "Create Property" : "Save Changes"}
        </Button>
        {!!id && (
          <Button
            variant="outline"
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
