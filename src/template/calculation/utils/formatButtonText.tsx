// 文字数に応じてテキストを整形する関数
const FormatButtonText = (text: string) => {
  if (text.length === 4) {
    const firstHalf = text.substring(0, 2);
    const secondHalf = text.substring(2, 4);
    return (
      <div className="center flex-col leading-tight">
        <div>{firstHalf}</div>
        <div>{secondHalf}</div>
      </div>
    );
  } else if (text.length === 9) {
    const firstHalf = text.substring(0, 3);
    const secondHalf = text.substring(3, 6);
    const thirdHalf = text.substring(6, 9);
    return (
      <div className="center flex-col text-[0.7rem] leading-tight">
        <div>{firstHalf}</div>
        <div>{secondHalf}</div>
        <div>{thirdHalf}</div>
      </div>
    );
  }
  return text;
};

export default FormatButtonText;
