### Leetcode 1244 (Medium): Design A Leaderboard [Practice](https://leetcode.com/problems/design-a-leaderboard)

### Description  
Design a `Leaderboard` class to efficiently manage scores for players in a game. Your class must implement these methods:
- `addScore(playerId, score)`: Add the given `score` to the player's total. If the player doesn't exist, create a new entry for them.
- `top(K)`: Return the sum of the top `K` player scores.
- `reset(playerId)`: Set the given player's score to 0 (effectively removing them from the leaderboard for now). You are guaranteed that this player has been added before calling `reset`.

### Examples  
**Example 1:**  
Input: `["Leaderboard", "addScore", "addScore", "addScore", "addScore", "addScore", "top", "reset", "reset", "addScore", "top"]`, `[[], [1,73], [2,56], [3,39], [4,51], [5,4], [1], [1], [2], [2,51], [3]]`  
Output: `[null, null, null, null, null, null, 73+56+51=180, null, null, null, 51+39+4=94]`  
*Explanation: Players 1-5 are added with scores; the `top(1)` returns 73, but with more players, `top(3)` would sum the top three scores. After `reset`, player 1's score becomes 0.*

**Example 2:**  
Input: `addScore(1,50)`, `addScore(2,20)`, `addScore(2,80)`, `top(2)`  
Output: `50+100=150`  
*Explanation: Player 2's final score is 20+80=100, so the top 2 are player 2 (100) and player 1 (50).* 

**Example 3:**  
Input: `addScore(4,10)`, `top(1)`, `reset(4)`, `top(1)`  
Output: `10, 0`  
*Explanation: Only player 4 is present; after reset, top score becomes 0.* 

### Thought Process (as if you’re the interviewee)  
First, I need a way to quickly update, retrieve, and reset player scores. The brute-force approach is to maintain a dictionary mapping playerId to score and sort the values whenever `top()` is called, but that’s inefficient for large N and frequent queries.

Instead, a hash map (`dict`) for `playerId: score` handles O(1) adds and resets. For the `top(K)`, I can use the heapq library to efficiently get the K largest values in O(n log k) time, which is acceptable since K is usually small compared to N. Alternate approach (more advanced) would be a balanced BST or SortedList structure for all scores, but unless super fast repeated top(K) are needed, a heap is better for typical use.

### Corner cases to consider  
- Resetting a player not on the board: (guaranteed by problem will not happen)
- Adding negative scores or zero scores
- Multiple players with the same total score
- Calling top(K) where K > number of players (should sum all players)
- All players have 0 score; leaderboard is empty; addScore after reset.

### Solution

```python
class Leaderboard:
    def __init__(self):
        # Dict to store total scores for each player
        self.scores = {}

    def addScore(self, playerId: int, score: int) -> None:
        # Add (or create) the score for playerId
        if playerId in self.scores:
            self.scores[playerId] += score
        else:
            self.scores[playerId] = score

    def top(self, K: int) -> int:
        # Get the K largest scores
        return sum(sorted(self.scores.values(), reverse=True)[:K])

    def reset(self, playerId: int) -> None:
        # Set player's score to 0 (or remove from dict)
        self.scores[playerId] = 0
```

### Time and Space complexity Analysis  
- **Time Complexity:**
  - `addScore`: O(1) per operation.
  - `reset`: O(1) per operation.
  - `top(K)`: O(n log n) if sorting whole list; with heap, O(n log K). For this code, it's O(n log n) (sorting n scores).
- **Space Complexity:** O(n), with n being the number of unique player IDs, storing scores in the dictionary.

### Potential follow-up questions (as if you’re the interviewer)  
- How would you support millions of `top()` queries very frequently?
  *Hint: Use a sorted data structure (like BST or treap) to always keep scores sorted for fast top-K.*

- What if you were required to remove a player completely instead of resetting to zero?
  *Hint: Delete the key from the dictionary, and ensure they’re removed from your sorted/heap structure as well.*

- How would you efficiently update scores if they can also decrease (besides reset to zero)?
  *Hint: Make sure your update and data structure support negative increments and possible repeated values.*

### Summary
This is a standard data structure design problem using a dictionary for O(1) updates and resets, plus a heap or sort for top-K queries. The pattern—hashtable + heap for K-largest—is common for leaderboard-type and running statistics problems. If queries for `top(K)` were very frequent, a balanced BST or self-balancing structure would be preferred.