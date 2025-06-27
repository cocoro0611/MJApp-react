"use server";

import { revalidatePath } from "next/cache";

// startではパフォーマンスのため積極的にキャッシュするため、明示的に無効化
export const revalidateAll = async () => {
  revalidatePath("/", "layout");
};
