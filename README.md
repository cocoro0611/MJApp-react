```
npx prisma db seed
```

## MEMO

- `container` と `absolute` の関係
  - 親要素で `container mx-auto relative`を設定することにより、その子要素では `absolute bottom-0` でcontainer内の相対座標で要素を指定することができる
  - しかしこの方法だと、完全に固定することはできないのでその場合は `fixed` を使う必要あり
