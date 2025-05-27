import React, { useState, useEffect } from "react";
import "./typing.css";

const words = [
  "apple", "banana", "cherry", "orange", "grape", "melon", "peach", 
  "strawberry", "pineapple", "blueberry", "kiwi", "mango", "pear", 
  "watermelon", "lemon", "coconut", "plum", "fig", "pomegranate",
  "raspberry", "blackberry", "apricot", "papaya", "guava", "dragonfruit",
  "lychee", "date", "cranberry", "passionfruit", "nectarine", "avocado", 
  "cantaloupe", "persimmon", "tangerine", "boysenberry", "carambola", 
  "currant", "damson", "elderberry", "gooseberry", "huckleberry",
  "mulberry", "quince", "soursop", "salak", "ugli", "yumberry", "zucchini",
  "jackfruit", "longan", "rambutan", "dog", "cat", "lion", "tiger", 
  "elephant", "giraffe", "zebra", "monkey", "horse", "donkey", "rabbit",
  "panda", "koala", "kangaroo", "squirrel", "raccoon", "hamster", "otter",
  "dolphin", "whale", "shark", "octopus", "penguin", "eagle", "parrot",
  "falcon", "owl", "butterfly", "dragonfly", "spider", "ant", "bee", 
  "wasp", "mosquito", "termite", "grasshopper", "cricket", "beetle",
  "scorpion", "snail", "slug", "turtle", "lizard", "crocodile", "alligator",
  "chameleon", "boa", "python", "rattlesnake", "anaconda", "tortoise",
  "cloud", "rain", "snow", "hail", "storm", "thunder", "lightning", "wind",
  "fog", "mist", "hurricane", "tornado", "typhoon", "tsunami", "earthquake",
  "volcano", "lava", "meteor", "asteroid", "galaxy", "universe", "planet",
  "star", "moon", "sun", "comet", "nebula", "cosmos", "satellite", "blackhole",
  "mountain", "hill", "valley", "canyon", "river", "stream", "brook", 
  "waterfall", "lake", "pond", "ocean", "sea", "bay", "lagoon", "reef",
  "island", "continent", "desert", "forest", "jungle", "rainforest", 
  "savannah", "prairie", "grassland", "meadow", "glacier", "tundra", 
  "cave", "cliff", "plateau", "canyon", "flood", "drought", "eruption",
  "city", "town", "village", "capital", "suburb", "neighborhood", 
  "road", "street", "avenue", "highway", "bridge", "tunnel", "crosswalk",
  "skyscraper", "building", "house", "apartment", "cottage", "mansion",
  "castle", "fortress", "tower", "temple", "church", "mosque", "synagogue",
  "library", "museum", "theater", "cinema", "stadium", "arena", "park",
  "zoo", "garden", "playground", "market", "mall", "store", "shop",
  "restaurant", "cafe", "bakery", "butcher", "pharmacy", "hospital",
  "clinic", "dentist", "barber", "salon", "school", "college", "university",
  "classroom", "gym", "court", "track", "field", "pool", "beach",
  "airport", "station", "harbor", "port", "dock", "lighthouse", "warehouse",
  "factory", "office", "lab", "studio", "workshop", "farm", "barn", "stable",
  "car", "bus", "train", "subway", "tram", "bicycle", "motorcycle", 
  "scooter", "airplane", "helicopter", "boat", "ship", "submarine",
  "rocket", "satellite", "truck", "van", "ambulance", "firetruck", 
  "policecar", "taxi", "limousine", "bulldozer", "tractor", "crane",
  "computer", "laptop", "tablet", "smartphone", "television", "radio",
  "speaker", "microphone", "headphones", "camera", "printer", "scanner",
  "keyboard", "mouse", "monitor", "projector", "drone", "robot", "charger",
  "battery", "flashlight", "candle", "lamp", "lightbulb", "fan", "heater",
  "airconditioner", "refrigerator", "microwave", "oven", "stove", 
  "toaster", "blender", "coffee", "tea", "juice", "milk", "water", 
  "soda", "cola", "lemonade", "wine", "beer", "whiskey", "vodka",
  "cocktail", "smoothie", "chocolate", "candy", "cookie", "cake", "pie",
  "bread", "butter", "cheese", "egg", "chicken", "beef", "pork", "fish",
  "shrimp", "crab", "lobster", "salmon", "tuna", "sushi", "noodle",
  "pasta", "rice", "soup", "salad", "sandwich", "hamburger", "pizza",
  "hotdog", "sausage", "steak", "bacon", "fries", "chips", "popcorn",
  "cereal", "honey", "jam", "peanutbutter", "yogurt", "icecream",
  "syrup", "mustard", "ketchup", "mayonnaise", "vinegar", "soy", "garlic",
  "onion", "tomato", "cucumber", "pepper", "carrot", "lettuce",
  "spinach", "broccoli", "cauliflower", "potato", "sweetpotato",
  "corn", "peas", "mushroom", "eggplant", "zucchini", "pumpkin",
  "beet", "radish", "asparagus", "celery", "parsley", "dill",
  "basil", "rosemary", "thyme", "oregano", "sage", "ginger",
  "cinnamon", "nutmeg", "cumin", "paprika", "turmeric", "peppermint",
  "vanilla", "chili", "saffron", "wasabi"
];



const TypingGame = ({ setGame }) => {
  const [currentWord, setCurrentWord] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // 30 秒倒數
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false); // 遊戲是否結束

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
    if (timeLeft === 0) {
      setIsPlaying(false);
      setGameOver(true); // 遊戲結束
    }
  }, [isPlaying, timeLeft]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsPlaying(true);
    setGameOver(false); // 重新開始
    setCurrentWord(generateRandomWord());
    setInputValue("");
  };

  const generateRandomWord = () => words[Math.floor(Math.random() * words.length)];

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value === currentWord) {
      setScore((prev) => prev + 1);
      setCurrentWord(generateRandomWord());
      setInputValue("");
    }
  };

  return (
    <div className="typing">
      <div className="game">
        <h1>⌨️ 打字遊戲</h1>

        {isPlaying ? (
          <>
            <p className="word-display">{currentWord}</p>
            <input
              type="text"
              className="word-input"
              value={inputValue}
              onChange={handleInputChange}
              autoFocus
            />
            <p className="score">分數：{score}</p>
            <p className="timer">剩餘時間：{timeLeft} 秒</p>
          </>
        ) : gameOver ? (
          <>
            <h2>🎉 遊戲結束！</h2>
            <p>你總共打出了 <strong>{score}</strong> 個單字！</p>
            <button className="start-btn" onClick={startGame}>再玩一次</button>
          </>
        ) : (
          <button className="start-btn" onClick={startGame}>開始遊戲</button>
        )}

        <button className="back-btn" onClick={() => setGame(null)}>返回主頁</button>
      </div>
    </div>
  );
};

export default TypingGame;