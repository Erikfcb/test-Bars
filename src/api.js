// export const baseUrl = "https://10.0.0.1:3001/";
export const baseUrl = "http://172.20.10.8:8080/";

export const trackUrl = "https://deezerdevs-deezer.p.rapidapi.com/track/";
export const playlistUrl = "https://api.deezer.com/playlist/";
export const searchUrl = "https://deezerdevs-deezer.p.rapidapi.com/search&q=";
export const headers = {
  "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
  "x-rapidapi-key": "DvlLOJj7ijmsheQWnO4fJjcpGQuwp1zCCuCjsnlQWe029KrNC2"
};

export const playlistHeaders = {
  "content-type": "application/json; charset=utf-8",
  date: "Wed, 01 Jan 2020 19:22:59 GMT",
  p3p:
    'policyref="/w3c/p3p.xml" CP="IDC DSP COR CURa ADMa OUR IND PHY ONL COM STA"',
  server: "RapidAPI-1.0.32",
  "set-cookie":
    "dzr_uniq_id=dzr_uniq_id_fr58cdb0ae19240e9d4a783c1620a346cb6c4a4f; expires=Mon, 29-Jun-2020 19:22:59 GMT; Max-Age=15552000; path=/; domain=.deezer.com; secure",
  vary: "Accept-Encoding",
  "x-host": "blm-web-156",
  "x-rapidapi-region": "AWS - eu-central-1",
  "x-rapidapi-version": "1.0.32",
  "transfer-encoding": "chunked",
  connection: "Close"
};
