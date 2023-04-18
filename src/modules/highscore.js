let ol;

export async function getHighscore() {
    const url =
    "https://highscore-9b9df-default-rtdb.europe-west1.firebasedatabase.app/highscores.json";
    const response = await fetch(url);
    const data = await response.json();
    const highScore = Object.entries(data);

    highScore.sort((a,b) => b[1].score - a[1].score);

    const scoreListDiv = document.getElementById("score-list");

    if (!ol) {
        ol = document.createElement("ol");
        scoreListDiv.append(ol);
    } else {
        ol.innerHTML = '';
    }

    for (const [key, userObj] of highScore) {
        const name = userObj.name;
        const score = userObj.score;

        const playerItem = document.createElement("li");

        playerItem.innerText = `${name} - Score: ${score}`;
        ol.append(playerItem);
    }
}
  
  export async function addHighscore(playerScore, playerName) {
      const url = "https://highscore-9b9df-default-rtdb.europe-west1.firebasedatabase.app/highscores.json";
      const response = await fetch(url);
      const data = await response.json();
      const highScore = Object.entries(data);
    
      // Find the lowest score and its key
      let lowestScore = Infinity;
      let lowestScoreKey = null;
    
      for (const [key, userObj] of highScore) {
        if (userObj.score < lowestScore) {
          lowestScore = userObj.score;
          lowestScoreKey = key;
        }
      }
    
      // Replace the lowest score if the new score is higher
      if (playerScore > lowestScore) {
        console.log("The new score is higher than the lowest score");
        await patchFunction(playerName, playerScore, lowestScoreKey);
        await getHighscore();
      } else {
        console.log("The new score is not high enough to enter the leaderboard");
      }
    }
  
  
  async function patchFunction(playerName, playerScore, key) {
    const newURL = `https://highscore-9b9df-default-rtdb.europe-west1.firebasedatabase.app/highscores/${key}.json`;
  
    const newHighscore = {
      name: playerName,
      score: playerScore,
    };
  
    const options = {
      method: "PATCH",
      body: JSON.stringify(newHighscore),
      headers: {
        "Content-type": "application/json",
      },
    };
  
    const newResponse = await fetch(newURL, options);
    await newResponse.json();
  }