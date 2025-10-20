### Leetcode 353 (Medium): Design Snake Game [Practice](https://leetcode.com/problems/design-snake-game)

### Description  
You are to design the core mechanics for a Snake game, as played on a 2D grid of size height × width. The snake starts at the top-left corner (position (0,0)). The snake can be moved in 4 directions: up (U), down (D), left (L), right (R). Each piece of food is given in advance as coordinates in a list; food appears one at a time and the next appears when the previous one is eaten. The snake grows by one when it eats a food. The game ends if the snake either runs into the wall or itself. Your task:  
- Implement SnakeGame(width, height, food), initializing the game.
- Implement move(direction): Moves the snake, returns current score or -1 if game is over.

### Examples  

**Example 1:**  
Input:  
```python
game = SnakeGame(3, 2, [[1,2],[0,1]])
print(game.move("R")) # 0
print(game.move("D")) # 0
print(game.move("R")) # 1
print(game.move("U")) # 1
print(game.move("L")) # 2
print(game.move("U")) # -1
```
Output:
```
0
0
1
1
2
-1
```
Explanation:  
- Start: Snake at (0,0), food at (1,2)  
- Move R: (0,1) (no food)  
- Move D: (1,1) (no food)  
- Move R: (1,2), eats food, grows, score 1; new food at (0,1)  
- Move U: (0,2) (no food)  
- Move L: (0,1), eats food, grows, score 2; all food eaten  
- Move U: (-1,1) (off grid), game over

**Example 2:**  
Input:  
```python
game = SnakeGame(2, 2, [[0,1]])
print(game.move("R")) # 1
print(game.move("D")) # -1
```
Output:
```
1
-1
```
Explanation:  
- Move R: eats food at (0,1), grows, score 1  
- Move D: tries (1,1): ok  
- Next move to any border or self will game over

**Example 3:**  
Input:  
```python
game = SnakeGame(3, 3, [[2,0],[0,2],[0,1],[2,2]])
print(game.move("D")) # 0
print(game.move("D")) # 1
print(game.move("R")) # 1
print(game.move("R")) # 2
print(game.move("U")) # 2
print(game.move("L")) # 3
print(game.move("L")) # -1
```
Output:
```
0
1
1
2
2
3
-1
```
Explanation:  
Step-by-step, snake moves to each coordinate, eats when on a food, game ends on collision.

### Thought Process (as if you’re the interviewee)  

Start with the basic brute-force idea:  
- Keep a list (or queue) of all the coordinates occupied by the snake. Each time you move, calculate the new head position, check if it's out of bounds or hits itself. When eating food, add to the snake and move the food pointer. Otherwise, pop the tail to simulate moving forward.

To make collision checks efficient, maintain a set of positions the snake occupies, for O(1) collision checking. Special care must be taken that moving into the tail's current position is allowed, since the tail will move away unless eating food.

Optimized approach:  
- Use a deque for the snake's body for fast head/tail updates.
- Use a set for positions occupied to detect self-collision efficiently.
- Keep a food index pointer.

The main trade-off is between time and space:
- Set and deque give O(1) moves and collision checks, but require extra storage.
- Brute-force with a list for collision checks is O(N) per move, which can be slow if the snake grows.

### Corner cases to consider  
- Snake eats food at the border.
- Snake moves into its own tail (should not die unless length > 1).
- Food appears at the snake's current head position (should be handled smoothly).
- Multiple moves with no food remain (should just shorten and grow as per usual).
- Snake length 1 at start (should not fail on moving).
- All food eaten, moves after that should still maintain game over rules.

### Solution

```python
from collections import deque

class SnakeGame:
    def __init__(self, width: int, height: int, food: list[list[int]]):
        self.width = width
        self.height = height
        self.food = food      # List of [row, col] pairs
        self.score = 0
        self.food_index = 0

        # Snake body as deque: tail at right, head at left
        self.snake = deque([(0,0)])
        # Occupied positions for fast lookup
        self.occupied = set([(0,0)])

        # Map direction to row, col deltas
        self.dir_map = {
            "U": (-1, 0),
            "D": (1, 0),
            "L": (0, -1),
            "R": (0, 1)
        }

    def move(self, direction: str) -> int:
        # Current head
        head_r, head_c = self.snake[0]
        dr, dc = self.dir_map[direction]
        new_r, new_c = head_r + dr, head_c + dc

        # Remove tail from set first (since the head could move into the old tail)
        tail_r, tail_c = self.snake[-1]
        self.occupied.remove((tail_r, tail_c))

        out_of_bounds = (new_r < 0 or new_r >= self.height or
                         new_c < 0 or new_c >= self.width)
        collision = (new_r, new_c) in self.occupied

        if out_of_bounds or collision:
            return -1

        # Move head
        self.snake.appendleft((new_r, new_c))
        self.occupied.add((new_r, new_c))

        # Food case
        if (self.food_index < len(self.food) and
            [new_r, new_c] == self.food[self.food_index]):
            self.food_index += 1
            self.score += 1
            # Don't remove tail (snake grows), so add back
            self.occupied.add((tail_r, tail_c))
            self.snake.append((tail_r, tail_c))
        else:
            # Remove tail (normal move)
            self.snake.pop()

        return self.score
```

### Time and Space complexity Analysis  

- **Time Complexity:** Each `move` is O(1). All set, deque operations for head/tail and collision are constant time.
- **Space Complexity:** O(N) where N is the snake’s max length (could become O(height × width) at most). Each position is stored in deque and set.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you implement Snake if food could appear anywhere and NOT in a fixed order?  
  *Hint: Efficiently handle random food placement, avoid putting food in a cell occupied by the snake.*

- Could you implement this without extra space for a set?  
  *Hint: Use O(N) time for each move (check the list or deque for collisions).*

- How would you animate the snake or handle multiple snakes for a multiplayer game?  
  *Hint: Synchronize updates, ensure each snake's movement and collisions are handled atomically.*

### Summary
This approach combines two key data structures: a deque for the snake's body (to efficiently manage head/tail updates), and a set for O(1) collision checking. This is a classic simulation/design and queue+hashset pattern, frequently used in game design and similar search/grid traversal problems. The design is flexible and can extend to handle more complex rules, random food placement, or multiplayer games.


### Flashcard
Use a deque to track snake body positions and a set for O(1) collision checks; update head/tail on each move, and only grow when eating food.

### Tags
Array(#array), Hash Table(#hash-table), Design(#design), Queue(#queue), Simulation(#simulation)

### Similar Problems
