import React from "react"

function page() {
  return (
    <div className="grid grid-cols-3 gap-4 h-96">
      <div className="border w-full bg-red-200 min-h-24">01</div>
      <div className="border w-full bg-red-200 min-h-24">02</div>
      <div className="border w-full bg-red-200 min-h-24">03</div>
      <div className="col-span-2 border w-full bg-red-200 min-h-24">04</div>
      <div className="border w-full bg-red-200 min-h-24">05</div>
      <div className="border w-full bg-red-200 min-h-24">06</div>
      <div className="col-span-2 border w-full bg-red-200 min-h-24">07</div>
    </div>
  )
}

export default page

// import { IconButton } from "@/components/form/Buttons"
// import FormContainer from "@/components/form/FormContainer"
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow
// } from "@/components/ui/table"
// import EmptyList from "@/global/EmptyList"
// import { deleteProductAction, fetchAdminProducts } from "@/utils/action"
// import Link from "next/link"

// async function ItemsPage() {
//   const items = await fetchAdminProducts()
//   if (items.length === 0) return <EmptyList />
//   return (
//     <section className="">
//       <Table>
//         <TableCaption className="capitalize">
//           total products : {items.length}
//         </TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Product Name</TableHead>
//             <TableHead>Country</TableHead>
//             <TableHead>Price</TableHead>
//             <TableHead>Actions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {items.map((item) => {
//             const { name, country, price } = item
//             const productId = item.id
//             return (
//               <TableRow key={productId}>
//                 <TableCell>
//                   <Link
//                     href={`/products/${productId}`}
//                     className="underline text-muted-foreground tracking-wide capitalize"
//                   >
//                     {name}
//                   </Link>
//                 </TableCell>
//                 <TableCell>{country}</TableCell>
//                 <TableCell>{price}</TableCell>

//                 <TableCell className="flex items-center gap-x-2">
//                   <Link href={`/admin/products/${productId}/edit`}>
//                     <IconButton actionType="edit"></IconButton>
//                   </Link>
//                   <DeleteProduct productId={productId} />
//                 </TableCell>
//               </TableRow>
//             )
//           })}
//         </TableBody>
//       </Table>
//     </section>
//   )
// }

// function DeleteProduct({ productId }: { productId: string }) {
//   const deleteProduct = deleteProductAction.bind(null, { productId })
//   return (
//     <FormContainer action={deleteProduct}>
//       <IconButton actionType="delete" />
//     </FormContainer>
//   )
// }

// export default ItemsPage
