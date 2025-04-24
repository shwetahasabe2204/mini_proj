import { useAtom } from 'jotai';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { newPropertySheetAtom } from '../store/sheetAtom';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from './ui/sheet';
import PropertyForm, { PropertyFormInput } from './PropertyForm';
import propertyAtom from '@/store/propertyAtom';

export type NewPropertyErrorMessages = {
  title?: string;
  developer?: string;
  address?: string;
  latitude?: string;
  longitude?: string;
  amountPerFlat?: string;
  [key: string]: string | undefined;
};

const defaultValues: PropertyFormInput = {
  id: 0,
  title: '',
  developer: '',
  address: '',
  tags: [],
  image: [],
  videoPresentation: '', // ✅ fixed typo
  locality: '',
  projectAt: '',
  constructionStage: '',
  propertyDetails: [],
  amenties: [],
  latitude: undefined,
  longitude: undefined,
  amountPerFlat: 0,
};

const NewPropertySheet = () => {
  const [isOpen, setIsOpen] = useAtom(newPropertySheetAtom);
  const onClose = () => setIsOpen(false);

  const [values, setValues] = useState<PropertyFormInput>(defaultValues);
  const setValue = (newValues: Partial<PropertyFormInput>) => {
    setValues((prev) => ({ ...prev, ...newValues }));
  };

  const [errors, setErrors] = useState<NewPropertyErrorMessages>({});
  const [isLoading, setIsLoading] = useState(false);

  const addProperty = async () => {
    try {
      setIsLoading(true);
      setErrors({});

      const token = localStorage.getItem('authToken');
      if (!token) {
        toast.error('No token found');
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/property/add`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data.success) {
        // You can uncomment and integrate this with propertyAtom if needed:
        // setPropertys((prev) => [...prev, response.data.data])
        onClose();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message || 'Failed to add property');
      }
    } catch (err: any) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error('Something went wrong!');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4 bg-white" side="right">
        <SheetHeader>
          <SheetTitle>New Property</SheetTitle>
          <SheetDescription>
            Create a new property to track your transactions.
          </SheetDescription>
        </SheetHeader>
        <PropertyForm
          values={values}
          setValues={setValue}
          disabled={isLoading}
          onDelete={() => {}}
          onSubmit={addProperty}
          errors={errors}
        />
      </SheetContent>
    </Sheet>
  );
};

export default NewPropertySheet;
