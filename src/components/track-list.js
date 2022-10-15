import './track-item.js'
import NotFoundPink from './../../assets/images/search-engine-pink.png';

class TrackList extends HTMLElement{
    set songs(songs){
        this._songs = songs;
        this.render();
    }

    render(){
        this.innerHTML = "";
        const sectionElement = document.createElement("section");
        sectionElement.classList.add("row", "mt-4", "text-center");
        this._songs.forEach(song => {
            const trackItemElement = document.createElement("track-item");
            trackItemElement.classList.add("col-xl-3", "col-lg-3", "col-sm-6", "col-6", "my-4")
            trackItemElement.song = song;
            sectionElement.appendChild(trackItemElement);
        });
        this.appendChild(sectionElement);

    }

    renderError(){
        this.innerHTML = `
        <div class="col-12 text-center my-4">
            <h2>Oooops Not Found!</h2>
            <img src="${NotFoundPink}" id="not-found-img">
        </div>
        `
    }
}

customElements.define("track-list", TrackList);