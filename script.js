const games = [
  {
    name: "Wordle",
    category: "Word",
    description: "Guess the hidden five-letter word in six tries.",
    url: "https://www.nytimes.com/games/wordle/index.html",
    source: "The New York Times",
    icon: "W",
    tone: "tone-lime"
  },
  {
    name: "Connections",
    category: "Word",
    description: "Group words that share a surprising connection.",
    url: "https://www.nytimes.com/games/connections",
    source: "The New York Times",
    icon: "≋",
    tone: "tone-lavender"
  },
  {
    name: "Crossword",
    category: "Word",
    description: "A classic daily crossword, from quick to tricky.",
    url: "https://www.nytimes.com/crosswords",
    source: "The New York Times",
    icon: "▦",
    tone: "tone-peach"
  },
  {
    name: "Puzzmo",
    category: "Logic",
    description: "A playful collection of daily puzzles and games.",
    url: "https://www.puzzmo.com/",
    source: "Puzzmo",
    icon: "✳",
    tone: "tone-blue"
  },
  {
    name: "Portable Puzzle Collection",
    category: "Logic",
    description: "A big collection of classic logic and paper puzzles.",
    url: "https://www.chiark.greenend.org.uk/~sgtatham/puzzles/",
    source: "Simon Tatham",
    icon: "◇",
    tone: "tone-mint"
  },
  {
    name: "Sudoku",
    category: "Number",
    description: "Fill the grid so every row, column, and box is unique.",
    url: "https://www.nytimes.com/puzzles/sudoku",
    source: "The New York Times",
    icon: "9",
    tone: "tone-yellow"
  },
  {
    name: "Minesweeper Online",
    category: "Logic",
    description: "Read the clues, mark the mines, clear the board.",
    url: "https://minesweeper.online/",
    source: "Minesweeper Online",
    icon: "✹",
    tone: "tone-peach"
  },
  {
    name: "Jigsaw Planet",
    category: "Visual",
    description: "Piece together an enormous library of jigsaws.",
    url: "https://www.jigsawplanet.com/",
    source: "Jigsaw Planet",
    icon: "▧",
    tone: "tone-lavender"
  },
  {
    name: "Lichess Puzzles",
    category: "Strategy",
    description: "Solve chess positions and sharpen your tactics.",
    url: "https://lichess.org/training",
    source: "Lichess",
    icon: "♞",
    tone: "tone-blue"
  },
  {
    name: "Set",
    category: "Visual",
    description: "Spot sets of three cards that match—or differ—by feature.",
    url: "https://www.setgame.com/set/puzzle",
    source: "Set Game",
    icon: "△",
    tone: "tone-pink"
  },
  {
    name: "Daily Chess Puzzle",
    category: "Strategy",
    description: "Find the best move in a fresh chess position.",
    url: "https://www.chess.com/puzzles",
    source: "Chess.com",
    icon: "♟",
    tone: "tone-mint"
  },
  {
    name: "The New York Times Games",
    category: "Number",
    description: "Explore a changing mix of daily word and number games.",
    url: "https://www.nytimes.com/games",
    source: "The New York Times",
    icon: "＋",
    tone: "tone-yellow"
  }
];

const grid = document.querySelector("#game-grid");
const searchInput = document.querySelector("#game-search");
const count = document.querySelector("#game-count");
const emptyState = document.querySelector("#empty-state");
const chips = [...document.querySelectorAll(".filter-chip")];
let activeCategory = "All";

function renderGames() {
  const query = searchInput.value.trim().toLowerCase();
  const visibleGames = games.filter((game) => {
    const matchesCategory = activeCategory === "All" || game.category === activeCategory;
    const matchesQuery = `${game.name} ${game.description} ${game.category} ${game.source}`
      .toLowerCase()
      .includes(query);
    return matchesCategory && matchesQuery;
  });

  grid.innerHTML = visibleGames.map((game) => `
    <a class="game-card" href="${game.url}" target="_blank" rel="noopener noreferrer" aria-label="Open ${game.name} in a new tab">
      <div class="card-top">
        <span class="game-icon ${game.tone}" aria-hidden="true">
          ${game.icon}
          <img class="game-logo" src="https://www.google.com/s2/favicons?domain=${new URL(game.url).hostname}&amp;sz=128" alt="" loading="lazy">
        </span>
        <span class="external-arrow" aria-hidden="true">↗</span>
      </div>
      <h3>${game.name}</h3>
      <p>${game.description}</p>
      <div class="card-meta">
        <span class="category-label">${game.category}</span>
        <span class="game-source">${game.source}</span>
      </div>
    </a>
  `).join("");

  count.textContent = `${visibleGames.length} ${visibleGames.length === 1 ? "game" : "games"}`;
  emptyState.hidden = visibleGames.length > 0;
  grid.hidden = visibleGames.length === 0;
}

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    activeCategory = chip.dataset.category;
    chips.forEach((item) => {
      const isActive = item === chip;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });
    renderGames();
  });
});

searchInput.addEventListener("input", renderGames);

document.querySelector("#clear-filters").addEventListener("click", () => {
  activeCategory = "All";
  searchInput.value = "";
  chips.forEach((chip) => {
    const isActive = chip.dataset.category === "All";
    chip.classList.toggle("is-active", isActive);
    chip.setAttribute("aria-pressed", String(isActive));
  });
  renderGames();
  searchInput.focus();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
    event.preventDefault();
    searchInput.focus();
  }
});

renderGames();
