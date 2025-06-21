```
npx prisma db seed
```

## MEMO

- `container` と `absolute` の関係
  - 親要素で `container mx-auto relative`を設定することにより、その子要素では `absolute bottom-0` でcontainer内の相対座標で要素を指定することができる
  - しかしこの方法だと、完全に固定することはできないのでその場合は `fixed` を使う必要あり

```
.groupBy("gameCount") がある場合
sqlSELECT gameCount
FROM Score
WHERE roomId = ?
GROUP BY gameCount
ORDER BY gameCount ASC

結果: gameCount の重複値が除去され、ユニークな値のみが返される
例: gameCountが [1, 1, 2, 2, 2, 3] の場合 → [1, 2, 3] が返される
用途: その部屋で行われたゲーム回数の種類を知りたい場合

.groupBy("gameCount") がない場合
sqlSELECT gameCount
FROM Score
WHERE roomId = ?
ORDER BY gameCount ASC

結果: 条件に一致するすべての行の gameCount が返される（重複あり）
例: gameCountが [1, 1, 2, 2, 2, 3] の場合 → [1, 1, 2, 2, 2, 3] がそのまま返される
用途: その部屋のすべてのスコア記録のゲーム回数を時系列で見たい場合
```
