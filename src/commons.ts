type Header = {
  [key: string]: string;
};
export const fetcher = (url: string, header: Header) =>
  fetch(url, header).then((res) => res.json());
