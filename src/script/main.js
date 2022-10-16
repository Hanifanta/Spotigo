import $ from "jquery";
import "./../components/search-bar.js";
import "./../components/track-list.js";
import componentLoader from "./load-component.js";

import NotFoundPurple from "./../../assets/images/search-engine.png";
import ErrorPic from "./../../assets/images/error-internal.png";
import Credentials from "./credentials.js";

const main = () => {
  componentLoader();

  const [searchBarArtist, searchBarTrack] = $("search-bar");
  const [trackList] = $("track-list");

  const getAccessToken = async () => {
    return $.ajax({
      url: "https://accounts.spotify.com/api/token",
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(
          Credentials.client_id + ":" + Credentials.client_secret
        ).toString("base64")}`,
      },
      data: {
        grant_type: "client_credentials",
      },
    }).then((response) => {
      return response.access_token;
    });
  };

  const artistSearch = async () => {
    const artistPlaceholder = $("#searchArtistResult");
    artistPlaceholder.html("");
    const val = searchBarArtist.value;

    const options = {
      async: true,
      crossDomain: true,
      url: `https://api.spotify.com/v1/search?q=artist:${val}&type=artist`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
      },
    };

    $.ajax(options)
      .done((data) => {
        if (data.artists.items.length) {
          renderResultArtist(data.artists.items);
        } else {
          fallbackResultArtist();
        }
      })
      .fail(async () => {
        const artistPlaceholder = $("#searchArtistResult");
        errorInternal(artistPlaceholder);
      });
  };

  const renderResultArtist = (result) => {
    const artistPlaceholder = $("#searchArtistResult");
    artistPlaceholder.html("");
    result.forEach((article) => {
      const image = article.images.length
        ? article.images[0].url
        : NotFoundPurple;
      const textHTML = `
            <div class="col-md-4">
                <div class="card mh-100">
                    <div class="card-body text-dark">
                        <img src="${image}" class="card-img-top" alt="...">
                        <h5>${article.name}</h5>
                        <form method="get" target="_blank" action="${article.external_urls.spotify}">
                            <button class="btn btn-cream-custom float-right">Visit</button>
                        </form>
                    </div>
                </div>
            </div>
            `;
      artistPlaceholder.append(textHTML);
    });
  };

  const fallbackResultArtist = () => {
    const artistPlaceholder = $("#searchArtistResult");
    artistPlaceholder.html("");
    const textHTML = `
            <div class="col-12 text-center my-4">
                <h2>Oooops Not Found!</h2>
                <img src="${NotFoundPurple}" id="not-found-img">
            </div>
        `;
    artistPlaceholder.append(textHTML);
  };

  searchBarArtist.clickEvent = artistSearch;

  const trackSearch = async () => {
    const trackPlaceholder = $("track-list");
    trackPlaceholder.html("");
    let val = searchBarTrack.value;
    while (val.indexOf(" ") != -1) {
      val = val.replace(" ", "%20");
    }

    const options = {
      async: true,
      crossDomain: true,
      url: `https://api.spotify.com/v1/search?q=artist:${val}&type=artist`,
      method: "GET",
      dataType: "json",
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
      },
    };

    $.ajax(options)
      .done(async (data) => {
        if (data.artists.items.length) {
          const id = data.artists.items[0].id;
          $.ajax({
            async: true,
            crossDomain: true,
            url: `https://api.spotify.com/v1/artists/${id}/top-tracks?country=US`,
            method: "GET",
            dataType: "json",
            headers: {
              Authorization: `Bearer ${await getAccessToken()}`,
            },
            success: (data) => {
              renderResultTrack(data.tracks);
            },
            error: () => {
              fallbackResultTrack();
            },
          });
        } else {
          fallbackResultTrack();
        }
      })
      .fail(() => {
        const trackPlaceholder = $("track-list");
        errorInternal(trackPlaceholder);
      });
  };

  const renderResultTrack = (songs) => {
    trackList.songs = songs;
  };

  const fallbackResultTrack = () => {
    trackList.renderError();
  };

  const errorInternal = (placeholder) => {
    const textHTML = `
        <div class="col-12 text-center my-4">
            <h2>Oooops There is an Error</h2>
            <img src="${ErrorPic}" id="not-found-img">
        </div>
        `;

    placeholder.html(textHTML);
  };

  searchBarTrack.clickEvent = trackSearch;

};

export default main;
