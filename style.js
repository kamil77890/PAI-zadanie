const link =
  "https://gist.githubusercontent.com/techniadrian/c39f844edbacee0439bfeb107227325b/raw/81eec7847b1b3dfa1c7031586405c93e9a9c1a2d/songs.json";

async function fetchAndDisplaySongs() {
  const response = await fetch(link);
  const data = await response.json();

  const slowSongs = [];
  const mediumSongs = [];
  const fastSongs = [];

  data.forEach((song) => {
    const bpm = song.bpm; // Assuming each song has a "bpm" property

    if (bpm < 110) {
      slowSongs.push(song);
    } else if (bpm >= 110 && bpm <= 130) {
      mediumSongs.push(song);
    } else if (bpm > 130) {
      fastSongs.push(song);
    }
  });

  console.log("Slow Songs:", slowSongs);
  console.log("Medium Songs:", mediumSongs);
  console.log("Fast Songs:", fastSongs);
}

fetchAndDisplaySongs();
