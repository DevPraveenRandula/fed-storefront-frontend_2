// "use client"
// import Image from "next/image"
// import { Heart, X } from "lucide-react"

// import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { Button } from "@/components/ui/button"
// import { Separator } from "@/components/ui/separator"

// export function SavedItemsDropdown({ items, onRemove }) {
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <div className="flex items-center gap-2 relative cursor-pointer">
//           <Heart className="text-red-500" size={24} />
//           {items.length > 0 && (
//             <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
//               {items.length}
//             </span>
//           )}
//           <span>Saved</span>
//         </div>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="w-[320px] p-4" align="end">
//         <div className="flex items-center justify-between mb-2">
//           <h2 className="text-lg font-semibold">Saved Items</h2>
//           <span className="text-sm text-muted-foreground">
//             {items.length} {items.length === 1 ? "item" : "items"}
//           </span>
//         </div>
//         <Separator className="my-2" />
//         {items.length === 0 ? (
//           <div className="py-6 text-center text-muted-foreground">No saved items</div>
//         ) : (
//           <div className="space-y-4 max-h-[400px] overflow-auto">
//             {items.map((item) => (
//               <div key={item.id} className="flex gap-3">
//                 <div className="relative h-16 w-16 overflow-hidden rounded-md">
//                   <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
//                 </div>
//                 <div className="flex-1">
//                   <div className="flex justify-between">
//                     <p className="font-medium line-clamp-1">{item.name}</p>
//                     <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onRemove(item.id)}>
//                       <X className="h-4 w-4" />
//                       <span className="sr-only">Remove</span>
//                     </Button>
//                   </div>
//                   <p className="text-sm text-muted-foreground">Rs{item.price.toLocaleString()}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//         {items.length > 0 && (
//           <>
//             <Separator className="my-4" />
//             <Button className="w-full" asChild>
//               <a href="/saved-items">View All Saved Items</a>
//             </Button>
//           </>
//         )}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   )
// }

