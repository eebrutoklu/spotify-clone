// arayüz DOM işlemleri
export default class UI {
  constructor() {
    this.list = document.querySelector("#list");
    this.form = document.querySelector("#search-form");
    this.title = document.querySelector("#title");
    this.playArea = document.querySelector("#play-area");
  }

  // liste alanına yükleniyor gifi basar
  renderLoader() {
    this.list.innerHTML = `<div class="container"> <div class="custom-loader"></div> </div>`;
  }

  //liste deki kartları basma
  renderCards(songs) {
    // gif ekranını kaldır.
    this.list.innerHTML = "";

    songs.forEach((song) => {
      const div = document.createElement("div");
      div.className = "card";
      // Şarkıcı ve şarkı isimlerinin uzunluğunu kontrol ediyoruz
      const artistName =
        song.subtitle.length > 10
          ? song.subtitle.substring(0, 15) + "..."
          : song.subtitle;
      const songTitle =
        song.title.length > 30
          ? song.title.substring(0, 30) + "..."
          : song.title;
      div.innerHTML = `<figure>
              <img
                src="${song.images.coverarthq}"
                alt=""
              />
              <div id="play"><i id="play-btn" class="bi bi-play-fill"></i></div>
            </figure>
            <h4>${artistName}</h4>
            <p>${songTitle}</p>
            `;
      //oynatma listesi verileri getirme
      div.dataset.title = song.title;
      div.dataset.subtitle = song.subtitle;
      div.dataset.photo = song.images.coverarthq;
      div.dataset.url = song.hub?.actions[1].uri;

      this.list.appendChild(div);
    });
  }

  changeTitle(text) {
    this.title.innerText = text;
  }

  renderplayingCard(song) {
    this.playArea.innerHTML = `  <div>
        <img
          src="${song.photo}"
          alt=""
          srcset=""
          class="animate"
        />
      </div>
      <div>
      <p> ${song.subtitle}  </p>
        <h4>${song.title}</h4>
      </div>
      <audio id="audio-player" controls src="${song.url}" autoplay ></audio>`;

    // Oynatma resminin dönmesi ve durması için
    const audioPlayer = document.getElementById("audio-player");
    const image = document.querySelector(".play-area img.animate");
    audioPlayer.addEventListener("pause", () => {
      image.classList.add("animate", "paused");
    });
    audioPlayer.addEventListener("play", () => {
      image.classList.remove("paused");
    });
  }
}
