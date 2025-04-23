import { z } from 'zod'
export const addPropertyValidate = (data: any) => {
  const schema = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    developer: z.string().min(1, { message: 'Developer is required' }),
    address: z.string().min(1, { message: 'Address is required' }),
    tags: z.array(z.string()).optional(),
    image: z
      .array(z.string().url({ message: 'Image must be a valid URL' }))
      .optional(),
    videpPresentation: z
      .string()
      .url({ message: 'Video presentation must be a valid URL' })
      .optional(),
    locality: z.string().min(1, { message: 'Locality is required' }),
    projectAt: z.string().min(1, { message: 'Project date is required' }),
    constructionStage: z
      .string()
      .min(1, { message: 'Construction stage is required' }),
    ammenties: z.array(z.string()).optional(),
    // Add these two new fields with appropriate validation
    latitude: z.number().min(-90).max(90).optional().nullable(),
    longitude: z.number().min(-180).max(180).optional().nullable(),
    propertyDetails: z
      .array(
        z.object({
          key: z
            .string()
            .min(1, { message: 'Property detail key is required' }),
          value: z
            .string()
            .min(1, { message: 'Property detail value is required' }),
        })
      )
      .optional(),
  })

  try {
    schema.parse(data)
    return { error: null }
  } catch (e: any) {
    return { error: e.errors }
  }
}
