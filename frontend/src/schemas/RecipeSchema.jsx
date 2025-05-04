import * as yup from "yup"

export const RecipeSchema = yup.object({
    name: yup.string().required('Title is required'),
    chef: yup.string().required('Chef name is required'),
    origin: yup.string().required('Please select a country of origin'),
    time: yup.string().required('Please select cooking time'),
    type: yup.string().required('Please select a recipe type'),
    image: yup.string().required('Recipe image is required'),
    ingredients: yup
      .array()
      .of(yup.string().trim().required('At least one ingredient is required'))
      .min(1, 'At least one ingredient is required')
      .required('Ingredients are required'),
    steps: yup
      .array()
      .of(yup.string().trim().required('Step cannot be empty'))
      .min(1, 'At least one step is required'),
  })