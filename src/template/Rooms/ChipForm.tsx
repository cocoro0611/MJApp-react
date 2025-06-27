// // FIXME
// import Card from "@/src/components/ui/Card";
// import DeleteChipDialog from "../../nav/DeleteChipDialog";
// import { Fragment } from "react";
// import type { ReadChip } from "@/src/lib/models/rooms/type";
// import type { SelectState, SelectType } from "@/src/hooks/rooms/useSelection";

// interface ChipFormProps {
//   chips: ReadChip[];
//   chipRate: number;
//   roomId: string;
//   // 状態管理
//   selected?: SelectState | null;
//   onOpen: (gameCount: number, index: number, type?: SelectType) => void;
//   getChip: (gameCount: number, index: number) => number;
//   getRemaining: (gameCount: number) => number;
//   isComplete: (gameCount: number) => boolean;
// }

// const ChipForm = ({
//   chips,
//   chipRate,
//   roomId,
//   selected,
//   onOpen,
//   getChip,
//   getRemaining,
//   isComplete,
// }: ChipFormProps) => {
//   const INITIAL_CHIP = 20;

//   if (!chips || chips.length === 0) {
//     return null;
//   }

//   return (
//     <>
//       <div className="bg-gray-300 text-gray-600 grid-5">
//         <div className="center font-bold">各チップ</div>
//       </div>
//       <div className="grid-5">
//         {chips.map((gameChip) => (
//           <Fragment key={gameChip.gameCount}>
//             <div className="grid-5-inner">
//               <div className="center flex-col p-1 h-18">
//                 <DeleteChipDialog
//                   complete={isComplete(gameChip.gameCount)}
//                   roomId={roomId}
//                   gameCount={gameChip.gameCount}
//                   remaining={getRemaining(gameChip.gameCount)}
//                 />
//               </div>
//             </div>

//             {/* 各プレイヤーのチップ */}
//             {gameChip.chips.map((chipItem, index) => {
//               // カードの選択チェック
//               const isSelected =
//                 selected?.gameCount === gameChip.gameCount &&
//                 selected?.index === index &&
//                 selected?.type === "chip";

//               // チップを取得
//               const chip = getChip(gameChip.gameCount, index);

//               // チップポイントの計算
//               const chipPoint = (chipItem.chip - INITIAL_CHIP) * chipRate;
//               const isChipNegative = chipPoint < 0;

//               return (
//                 <div className="grid-5-inner" key={index}>
//                   <div className="center flex-col p-0.5 h-18">
//                     <Card
//                       isColor={!isSelected}
//                       className={`w-full p-1
//                         ${isSelected ? "bg-accent-100 border-accent-400 text-accent-800 effect-pulse" : ""}`}
//                       onClick={() => onOpen(gameChip.gameCount, index, "chip")}
//                     >
//                       <p className="flex justify-start text-[0.6rem]">枚数</p>
//                       <p>
//                         <span
//                           className={`px-1 border-b-2 ${
//                             isSelected
//                               ? "border-accent-500"
//                               : "border-primary-300"
//                           }`}
//                         >
//                           {chip}
//                         </span>
//                         <span>枚</span>
//                       </p>
//                     </Card>
//                     <div
//                       className={`font-bold center w-full relative mt-0.5 ${
//                         isChipNegative ? "text-negative" : "text-positive"
//                       }`}
//                     >
//                       {chipPoint}
//                       <span className="absolute right-0.5">P</span>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </Fragment>
//         ))}
//       </div>
//     </>
//   );
// };

// export default ChipForm;
