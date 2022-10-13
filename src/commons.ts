type Header = {
  [key: string]: string;
};

// matchとproblemのみに対するリクエスト
export const fetcher = async (url: string, header: Header) => {
  const res = await fetch(url, header);
  if (!res.ok) {
    let error = new Error("");
    console.log(res);
    switch (res.status) {
      case 400:
        error.message = "問題の回答時間外の可能性があります";
        throw error;
      default:
        error.message = "不明なエラー";
        throw error;
    }
  }
  return res.json();
};
