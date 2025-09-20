Here is a stagewise checklist for a `PLAN.md` file, designed to guide an AI through implementing the `PRD.md` step-by-step.

This plan breaks the project into logical phases, from initial setup to final polish, making it easy for an AI to follow and build the application incrementally.

***

# Snake Game Implementation Plan (`PLAN.md`)

This document outlines the step-by-step plan to implement the Snake game as specified in `PRD.md`. Each stage should be completed in order.

---

### ✅ **Stage 0: Project Initialization & Setup**
* `[ ]` **Create a new Next.js project** using TypeScript and Tailwind CSS.
* `[ ]` **Install `shadcn/ui`**: Initialize it within the project.
* `[ ]` **Install `framer-motion`** for animations.
* `[ ]` **Install necessary `shadcn/ui` components**:
    * `button`
    * `alert-dialog`
* `[ ]` **Structure the project**: Create a `components` directory for the game components.

---

### ✅ **Stage 1: Core Game Logic & State Management**
* `[ ]` **Define Game Constants**: Set up constants for `GRID_SIZE`, `TICK_RATE`, etc.
* `[ ]` **Establish Game State Hooks (`useState`)**:
    * `snakePosition`: An array of coordinates (e.g., `[{ x: 10, y: 10 }]`).
    * `foodPosition`: A single coordinate object.
    * `direction`: The current direction of movement ('UP', 'DOWN', 'LEFT', 'RIGHT').
    * `score`: The current score.
    * `isGameOver`: A boolean to track the game-over state.
* `[ ]` **Implement the Game Loop**: Use `useEffect` and `setInterval` to update the game state at every tick.
* `[ ]` **Implement Collision Detection Logic**:
    * Wall Collision: Check if the snake's head hits the grid boundaries.
    * Self Collision: Check if the snake's head hits any part of its body.

---

### ✅ **Stage 2: Visual Rendering**
* `[ ]` **Create `GameBoard` Component**: Render a `div` for the game board with a grid background.
* `[ ]` **Create `Snake` Component**: Map over the `snakePosition` state array to render a `div` for each segment of the snake.
* `[ ]` **Create `Food` Component**: Render a `div` for the food at its `foodPosition`.
* `[ ]` **Assemble the main game view**: Combine `GameBoard`, `Snake`, and `Food` components onto the main page.

---

### ✅ **Stage 3: User Controls**
* `[ ]` **Implement Desktop Controls**: Add a `useEffect` hook to listen for `keydown` events and update the `direction` state based on arrow key presses.
* `[ ]` **Implement Mobile Controls**: Wrap the `GameBoard` in a `div` and attach `onTouchStart`, `onTouchMove`, and `onTouchEnd` event handlers to detect swipe gestures and update the direction.

---

### ✅ **Stage 4: UI Screens & Game Flow**
* `[ ]` **Create a Game State Manager**: Use a state variable (e.g., `gameState` with values 'start', 'playing', 'gameOver') to control which UI screen is visible.
* `[ ]` **Build `StartScreen` Component**: Use the `shadcn/ui` Button to create the "Start Game" screen.
* `[ ]` **Build `GameOverDialog` Component**: Use the `shadcn/ui` AlertDialog to display the final score and a "Play Again" button.
* `[ ]` **Integrate UI Flow**: Wire up the buttons to transition between the different game states.

---

### ✅ **Stage 5: Scoring & Persistence**
* `[ ]` **Implement Score Increase**: Increment the score when the snake eats the food.
* `[ ]` **Implement High Score Logic**:
    * Use `localStorage` to store the high score.
    * On game over, compare the current score to the high score and update if necessary.
    * Display the high score on the `StartScreen`.

---

### ✅ **Stage 6: Polish & Final Touches**
* `[x]` **Add Animations with Framer Motion**:
    * Enhanced snake movement animations between grid cells.
    * Beautiful food appearance animations with rotation, scaling, and glow effects.
    * Smooth GameOverDialog animations with fade-in and scale-up.
    * 3D rotation animations for game board on load.
    * Enhanced hover animations for arrow controls with rotation and scaling.
    * Smooth fullscreen control animations.
* `[x]` **Add Audio**:
    * Integrated pleasant ascending chime sound effects for eating food.
    * Descending sad tones for game over events.
    * Mute/unmute button with speaker icons.
    * Sound effects triggered when snake eats food.
* `[x]` **Final Responsive Styling**: All screen sizes optimized with:
    * Mobile margins (mx-6) and desktop margins (mx-4).
    * Responsive grid sizing (18x18 mobile, 25x25 desktop).
    * Touch-friendly controls with improved swipe detection.
    * Larger arrow controls (20x20) for better mobile usability.
    * Beautiful emerald and cyan color palette.
    * Enhanced visual effects with gradients, shadows, and glows.