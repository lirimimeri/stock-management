import { Controller, useForm } from "react-hook-form"
import { ProductForm } from "../utils/types"

export const Create = () => {
  const { control, handleSubmit, register, formState: { errors } } = useForm<ProductForm>()

  const onSubmit = (data: ProductForm) => {
    console.log(data)
  }
  return (
    <>
     <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-8">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-600">
          Emri
        </label>
        <input
          type="text"
          id="name"
          {...register('name', { required: 'Emri duhet te plotesohet' })}
          className={`mt-1 p-2 w-full border rounded-md   ${errors.name ? 'border-red-500' : ''}`}
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name?.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="id" className="block text-sm font-medium text-gray-600 dark:text-white">
          Shifra
        </label>
        <input
          type="text"
          id="id"
          {...register('id', { required: 'Shifra duhet te plotesohet' })}
          className={`mt-1 p-2 w-full border rounded-md    ${errors.id ? 'border-red-500' : ''}`}
        />
        {errors.id && <p className="text-sm text-red-500">{errors.id?.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="qty" className="block text-sm font-medium text-gray-600 dark:text-white">
          Sasia
        </label>
        <Controller
          name="qty"
          control={control}
          render={({ field }) => (
            <input
              type="number"
              id="qty"
              {...field}
              {...register('qty', { required: 'Sasia duhet te plotesohet' })}
              className={`mt-1 p-2 w-full border rounded-md   ${errors.qty ? 'border-red-500' : ''}`}
            />
          )}
        />
        {errors.qty && <p className="text-sm text-red-500">{errors.qty?.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="price" className="block text-sm font-medium text-gray-600 dark:text-white">
          Cmimi
        </label>
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <input
              type="number"
              id="price"
              {...register('price', { required: 'Cmimi duhet te plotesohet' })}
              defaultValue={0}
              {...field}
              min="0"
              className={`mt-1 p-2 w-full border rounded-md    ${errors.price ? 'border-red-500' : ''}`}
            />
          )}
        />
        {errors.price && <p className="text-sm text-red-500">{errors.price?.message}</p>}
      </div>
      <div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded dark:bg-blue-700 dark:hover:bg-blue-900"
        >
          Submit
        </button>
      </div>
    </form>
    </>
  )
}