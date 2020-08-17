class Artist {
  private popularity: string;
  private name: string;
  private followers: string;
  private gender: string;
  private image: string;
  private url: string;

  constructor(
    popularity: string,
    name: string,
    followers: string,
    gender: string,
    image: string,
    url: string
  ) {
    this.popularity = popularity;
    this.name = name;
    this.followers = followers;
    this.gender = gender;
    this.image = image;
    this.url = url;
  }

  public getPopularity(): string {
    return this.popularity;
  }
}

export default Artist;
