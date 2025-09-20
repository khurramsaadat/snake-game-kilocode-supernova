"You are an expert Next.js developer specializing in creating interactive web experiences. Your task is to create a complete, functional, and responsive Snake game using Next.js, TypeScript, Tailwind CSS, and shadcn/ui.

Please follow these detailed requirements:

## 1. Project Setup
* **Framework**: Next.js (App Router)
* **Language**: TypeScript
* **Styling**: Tailwind CSS
* **UI Components**: shadcn/ui
* **Animation**: Framer Motion for smooth animations

## 2. Game States & UI Flow
Create a single-page application with three distinct states:

* **Start Screen**:
    * Display a centered "Start Game" button using the shadcn/ui `Button` component.
    * Show the title "Snake Game".
    * Display the "High Score", which should be persisted in `localStorage`.
* **Game Active Screen**:
    * Once "Start Game" is clicked, this screen appears.
    * Display a grid-based game board (e.g., 20x20 grid).
    * Show the **current score** in a visible location, like the top corner.
* **Game Over Screen**:
    * When the game ends (snake hits a wall or itself), overlay a "Game Over" dialog using the shadcn/ui `AlertDialog` component.
    * The dialog should display the final score.
    * Include a "Play Again" button that, when clicked, returns the user to the **Start Screen**.

## 3. Gameplay Mechanics
* **Snake**:
    * The snake starts with a length of 3 segments.
    * **Crucially, the snake must have a safe starting position. For example, it should start in the center of the board, moving right, to ensure the player has time to react and is not facing a wall on the first frame.**
* **Controls**:
    * **Desktop**: Use the Arrow Keys (Up, Down, Left, Right) to change the snake's direction.
    * **Mobile**: Implement touch-based swipe controls (swipe up, down, left, right) on the game board area to control the snake.
* **Food**: A single piece of food should appear at a random location on the grid.
* **Scoring**:
    * When the snake eats the food, its length increases by one segment.
    * The player's score increases by 10 points.
    * A new piece of food appears at a new random location.
* **Game End Conditions**: The game ends if the snake collides with any of the four walls or with its own body.

## 4. Audio 🎵
* Integrate two sound effects:
    1.  A short sound for when the snake eats the food.
    2.  A different sound for the "Game Over" event.
* Include a mute/unmute button (e.g., using a speaker icon) to toggle all game sounds.

## 5. Styling, Animations & Responsiveness
* **Aesthetic**: **The game must have a modern, clean, and minimalist design, not a classic 8-bit retro look. Use a contemporary color palette and typography.**
* **Animations**: **Incorporate smooth and fluid animations to enhance the user experience.**
    * **The snake's movement between grid cells should be smoothly animated instead of instantly jumping.**
    * **When food appears, give it a subtle "pop-in" or "fade-in" effect.**
    * **The "Game Over" dialog should animate into view (e.g., a fade-in with a slight scale-up).**
* **Responsiveness**: The entire application, including the game board and UI elements, must be fully responsive and look good on all screen sizes (mobile, tablet, desktop). The game board should scale appropriately to fit smaller screens.

Please provide the complete code organized into logical components (e.g., `Game.tsx`, `StartScreen.tsx`, `GameOverDialog.tsx`). Include comments where the logic is complex, especially for the game loop, collision detection, and animation implementation."