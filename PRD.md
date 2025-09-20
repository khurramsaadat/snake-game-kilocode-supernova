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
* **Aesthetic**: **The game has a modern, clean, and minimalist design with a beautiful emerald and cyan color palette. Enhanced visual effects include:**
    * **Beautiful gradient backgrounds** with subtle grid patterns
    * **Enhanced shadows and glow effects** for depth
    * **Smooth 3D-like animations** with rotation and scaling
    * **Custom CSS animations** for grid pulsing and floating effects
* **Animations**: **Incorporate smooth and fluid animations to enhance the user experience.**
    * **The snake's movement between grid cells is smoothly animated**
    * **Food appears with a rotating and scaling animation with glow effects**
    * **The "Game Over" dialog animates into view with fade-in and scale-up**
    * **Game board has a subtle 3D rotation animation on load**
    * **Arrow controls have enhanced hover animations with rotation and scaling**
    * **Fullscreen controls have smooth hover effects**
* **Responsiveness**: The entire application is fully responsive with:
    * **Mobile-optimized margins** (mx-6 on mobile, mx-4 on desktop)
    * **Responsive grid sizing** (GRID_SIZE_MOBILE = 18, GRID_SIZE_DESKTOP = 25)
    * **Touch-friendly controls** with improved swipe detection
    * **Larger arrow controls** (20x20 instead of 16x16) for better mobile usability

Please provide the complete code organized into logical components (e.g., `Game.tsx`, `StartScreen.tsx`, `GameOverDialog.tsx`). Include comments where the logic is complex, especially for the game loop, collision detection, and animation implementation."