import { SubmitButton } from "@/components/form/Buttons"
import CheckboxInput from "@/components/form/CheckBoxInput"
import FormContainer from "@/components/form/FormContainer"
import FormInput from "@/components/form/FormInput"
import ImageInputContainer from "@/components/form/ImageInputContainer"
import PriceInput from "@/components/form/PriceInput"
import TextAreaInput from "@/components/form/TextAreaInput"
import EmptyList from "@/global/EmptyList"
import {
  fetchAdminProductDetails,
  updateProductAction,
  updateProductImageAction
} from "@/utils/action"
import { Product } from "@prisma/client"

async function EditProductPage({ params }: { params: { id: string } }) {
  const resolvedParams = await params
  const id = resolvedParams.id

  const product: Product | null = await fetchAdminProductDetails(id)

  if (product === null) {
    return <EmptyList />
  }
  const { name, country, description, trendingTrip, price, image } = product

  return (
    // <div>wait</div>
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">update product</h1>
      {/* <div className="border p-8 rounded-md"></div> */}
      <ImageInputContainer
        action={updateProductImageAction}
        name={name}
        image={image}
        text="Update Image"
      >
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="url" value={image} />
      </ImageInputContainer>
      <FormContainer action={updateProductAction}>
        <div className="grid gap-4 md:grid-cols-2 my-4">
          <input type="hidden" name="id" value={id} />
          <FormInput
            type="text"
            name="name"
            label="product name"
            defaultValue={name}
          />
          <FormInput
            type="text"
            name="country"
            label="country"
            defaultValue={country}
          />

          <PriceInput defaultValue={price} />
        </div>
        <TextAreaInput
          name="description"
          labelText="description"
          defaultValue={description}
        />
        <CheckboxInput
          name="trendingTrip"
          label="trendingTrip"
          className=" mt-5"
          defaultChecked={trendingTrip}
        />
        <SubmitButton text="update product" className="mt-8 bg-chart-3" />
      </FormContainer>
    </section>
  )
}
export default EditProductPage
