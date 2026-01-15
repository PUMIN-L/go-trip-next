import { SubmitButton } from "@/components/form/Buttons"
import CheckboxInput from "@/components/form/CheckBoxInput"
import FormContainer from "@/components/form/FormContainer"
import FormInput from "@/components/form/FormInput"
import ImageInput from "@/components/form/ImageInput"
import PriceInput from "@/components/form/PriceInput"
import TextAreaInput from "@/components/form/TextAreaInput"
import { createProductAction } from "@/utils/action"
import { faker } from "@faker-js/faker"

function page() {
  const name = faker.commerce.productName()
  const country = faker.location.country()
  const description = faker.lorem.paragraph({ min: 10, max: 12 })

  return (
    <>
      <section>
        <h1 className="text-2xl font-semibold mb-8 capitalize">
          create product
        </h1>
        <div className="border p-8 rounded-md">
          <FormContainer action={createProductAction}>
            <div className="grid gap-4 md:grid-cols-2 my-4 ">
              <FormInput
                type="text"
                name="name"
                label="Trip name"
                defaultValue={name}
              />

              <FormInput
                type="text"
                name="country"
                label="country"
                defaultValue={country}
              />
              <PriceInput />
              <ImageInput />
            </div>

            <TextAreaInput
              name="description"
              labelText="product description"
              defaultValue={description}
            />
            <div className="my-5">
              <CheckboxInput name="trendingTrip" label="Trending Trip" />
            </div>

            <SubmitButton text="Create new trip" className="bg-chart-3 " />
          </FormContainer>
        </div>
      </section>
    </>
  )
}

export default page
