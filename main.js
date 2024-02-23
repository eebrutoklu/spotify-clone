import API from "./scripts/api.js";
import UI from "./scripts/ui.js";
//class'ın örneğini oluşturma!!!
const api = new API();
const ui = new UI();

//sayfanın yüklenme olayı
document.addEventListener("DOMContentLoaded", async () => {
  //ekrana yüklenme gifi
  ui.renderLoader();

  //api istek
  await api.getPopuler();

  //verileri ekrana bas
  ui.renderCards(api.songs);
});

//formun gönderilmesi olayı
ui.form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const query = event.target[0].value;
  //  yada inpute name verip. event.target.namei.value
  if (!query.trim()) return alert("Please enter the word to be searched.");
  // if(query === "") if(query ===null) if(query ===undefined) if(query ===false)
  ui.renderLoader();
  ui.changeTitle(query + " result");
  await api.getSearch(query);
  ui.renderCards(api.songs);
});

ui.list.addEventListener("click", (e) => {
  if (e.target.id === "play-btn") {
    const song = e.target.closest(".card").dataset;
    ui.renderplayingCard(song);
  }
});
