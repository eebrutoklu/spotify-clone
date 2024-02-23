// api istekleri burada
const options = {
  headers: {
    "X-RapidAPI-Key": "ff6199f8f4msh081b9c9093717e4p1416f5jsnfd40953a8394",
    "X-RapidAPI-Host": "shazam.p.rapidapi.com",
  },
};
//api işlemlerini yönetecek class
export default class API {
  constructor() {
    this.songs = [];
  }

  async getPopuler() {
    const res = await fetch(
      "https://shazam.p.rapidapi.com/charts/track?listId=ip-country-chart-US&locale=en-US",
      options
    );
    const data = await res.json();
    this.songs = data.tracks;
  }
  //arama şarkıları api
  async getSearch(query) {
    const res = await fetch(
      `https://shazam.p.rapidapi.com/search?term=${query}`,
      options
    );
    const data = await res.json();
    //formatı değiştirme
    const formatted = data.tracks.hits.map((song) => {
      return song.track;
    });
    this.songs = formatted;
  }
}
