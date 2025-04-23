// import { readUser } from "@/src/lib/models/users/read";
// import { updateUser } from "@/src/lib/models/users/update";
// import Link from "next/link";

// export default async function EditUser({ params }: { params: { id: string } }) {
//   const userId = params.id;
//   const user = await readUser(userId);

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">ユーザー編集</h1>
//       <form action={updateUser} className="space-y-4">
//         <input type="hidden" name="id" value={user?.id || ""} />
//         <div>
//           <label htmlFor="name" className="block mb-1">
//             名前
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             defaultValue={user?.name || ""}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>
//         <div className="flex gap-4">
//           <button
//             type="submit"
//             className="h-10 px-4 text-white bg-green-500 hover:bg-green-600 active:bg-green-700 rounded"
//           >
//             更新
//           </button>
//           <Link href="/">
//             <button
//               type="button"
//               className="h-10 px-4 text-gray-700 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 rounded"
//             >
//               キャンセル
//             </button>
//           </Link>
//         </div>
//       </form>
//     </div>
//   );
// }

export default function Hoge() {
  return <div>ss</div>;
}
