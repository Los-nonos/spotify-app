import Artist from "../../entities/Artist";

class ArtistPresenter {
  transform = data => {
    const artists = data.artists.items;
    return artists.map(artist => {
      return new Artist(
        artist.popularity,
        artist.name,
        artist.followers.total,
        artist.genres,
        artist.images[0],
        artist.uri
      );
    });
  };
}

export default new ArtistPresenter();
