class TrackItem extends HTMLElement {
  set song(song) {
    this._song = song;
    this.render();
  }

  render() {
    this.innerHTML = `
        <style>
            .btn-darkgreen-custom{
                background-color: #6D8B74;
                color: white;
            }

            .btn-darkgreen-custom:hover{
                background-color: #92BA92;
                color: white;
                cursor: pointer
            }

            .btn-darkgreen-custom:active{
                background-color: #9F8772;
                color: white;
            }
        </style>

        <div>
            <img src="${this._song.album.images[0].url}" alt="Album" class="rounded shadow">
            <h4 class="my-2">${this._song.name}</h4>
            <p>${this._song.artists[0].name}</p>
            <button class="btn btn-darkgreen-custom px-3" id="info-btn">Info</button>
        </div>
        `;

    this.querySelector("#info-btn").addEventListener("click", () => {
      window.open(`${this._song.external_urls.spotify}`, "_blank");
    });
  }
}

customElements.define("track-item", TrackItem);
