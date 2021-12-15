const baseUrl = "http://localhost:4000";

export async function getIdenticon(string) {
  const url = `${baseUrl}/${string}`;
  const res = await fetch(url);
  return res.text();
}
