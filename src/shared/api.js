const baseUrl = "https://api.identicon.app";

export async function getIdenticon(string) {
  const url = `${baseUrl}/${string}`;
  const res = await fetch(url);
  return res.text();
}
