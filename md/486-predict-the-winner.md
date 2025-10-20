### Leetcode 486 (Medium): Predict the Winner [Practice](https://leetcode.com/problems/predict-the-winner)

### Description  
You are given an array `nums` of non-negative integers representing a row of scores. Two players take turns picking a score from either the left or right end of the row, removing it from the array. Player 1 always goes first. Each player plays optimally to maximize their own total score. Your task is to determine if **Player 1 can win or at least tie** (i.e., have a score ≥ Player 2’s) when both play perfectly optimally.

### Examples  

**Example 1:**  
Input: `nums = [1, 5, 2]`  
Output: `False`  
*Explanation: Player 1 picks 1 (left), Player 2 picks 5 (left), Player 1 picks last 2. Player 1 total: 1 + 2 = 3, Player 2: 5. Player 1 loses.*

**Example 2:**  
Input: `nums = [1, 5, 233, 7]`  
Output: `True`  
*Explanation: Player 1 can start with 1 (left). Whatever Player 2 picks, Player 1 will get 233 in the next round, and wins by far: 233 + 1 vs 7 + 5.*

**Example 3:**  
Input: `nums = [1]`  
Output: `True`  
*Explanation: Only one element. Player 1 picks 1, wins (no moves for Player 2).*

### Thought Process (as if you’re the interviewee)  
Start with a **brute-force recursive approach:**  
- At each turn, the player chooses either the left or right end, and the problem reduces to a smaller subarray for the opponent.
- We can use a **Minimax** strategy: Player 1 aims to maximize their lead; Player 2, to minimize it.
- Let's define a function for the "relative score": the difference between what the first player can get and what the second gets, assuming both play optimally from the current (subarray) state.
- At every step, it's Player 1's turn; after the move, roles swap.
- This leads to an overlapping subproblems structure.

**Optimize with DP:**  
- Memoization is essential to cache decisions for subarrays (start, end indices).
- For a subarray (i, j): The current player's optimal difference = max(
  nums[i] - solve(i+1, j),
  nums[j] - solve(i, j-1)
)
- Player 1 can win if the final relative score ≥ 0.

**Why this approach:**  
- Constraints (n ≤ 20) allow O(n²) time and O(n²) space.
- Elegant recursive/Dynamic programming solution.  
- Can be optimized bottom-up, but top-down with memoization is intuitive for interviews.

### Corner cases to consider  
- Empty input (though per constraints, array always has ≥1 element)  
- Array with one element (Player 1 always wins)  
- All equal elements  
- Large differences at the ends vs middle  
- Odd and even length arrays

### Solution

```python
def PredictTheWinner(nums):
    # DP memoization hashmap: (start, end) -> best relative score
    from functools import lru_cache
    
    n = len(nums)
    
    @lru_cache(maxsize=None)
    def dp(left, right):
        # Base case: one element left
        if left == right:
            return nums[left]
        
        # Choose left or right, subtracting other player's result
        pick_left = nums[left] - dp(left + 1, right)
        pick_right = nums[right] - dp(left, right - 1)
        return max(pick_left, pick_right)
    
    # Player 1 can win if relative score is ≥ 0
    return dp(0, n - 1) >= 0
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²), since there are O(n²) unique (left, right) subproblems for a length-n array, and each subproblem is solved once due to memoization.
- **Space Complexity:** O(n²) for the memoization cache (at most n² entries) and O(n) for the recursion stack (worst case n depth).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array had very large length (n ≫ 20)?
  *Hint: Could you optimize further, or use iterative DP/table?*

- Can you reconstruct the actual moves to produce one optimal solution path?
  *Hint: Track choices made at each state.*

- What changes if the tie case is not counted as a win for Player 1?
  *Hint: Adjust final comparison to strictly '>' instead of '>='.*
  
### Summary
This problem uses the classical **Minimax/DP pattern**, leveraging recursive game state evaluation with memoization. The pattern is common in turn-based two-player games (coin pick, stone game, etc.) involving optimal strategy and can be applied anytime you have a "pick from ends" scenario with optimal adversarial play. The DP approach makes it tractable for reasonably small input sizes while ensuring correct and optimal play.


### Flashcard
Use DP with minimax: dp(i, j) = max(nums[i] − dp(i+1, j), nums[j] − dp(i, j−1)); player wins if dp(0, n−1) ≥ 0.

### Tags
Array(#array), Math(#math), Dynamic Programming(#dynamic-programming), Recursion(#recursion), Game Theory(#game-theory)

### Similar Problems
- Can I Win(can-i-win) (Medium)
- Find the Winning Player in Coin Game(find-the-winning-player-in-coin-game) (Easy)
- Find the Number of Winning Players(find-the-number-of-winning-players) (Easy)
- Count The Number of Winning Sequences(count-the-number-of-winning-sequences) (Hard)