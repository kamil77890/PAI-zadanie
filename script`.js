const songs = [];
const section = [];

async function fetchAndDisplaySongs() {
  const response = await fetch(
    "https://gist.githubusercontent.com/techniadrian/c39f844edbacee0439bfeb107227325b/raw/81eec7847b1b3dfa1c7031586405c93e9a9c1a2d/songs.json"
  );
  const data = await response.json();

  data.forEach((song) => {
    songs.push(song);
  });
  const addedone = songs.map((song) => ({ ...song, liked: false }));
  const likedSong = addedone.map((song) => song.liked);
  console.log(likedSong);
  return likedSong;
}


fetchAndDisplaySongs();
// console.log(songs);
