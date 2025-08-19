### Leetcode 3238 (Easy): Find the Number of Winning Players [Practice](https://leetcode.com/problems/find-the-number-of-winning-players)

### Description  
Given `n` players, and a list of "picks" where each `pick[i] = [xᵢ, yᵢ]` means player xᵢ picked a ball of color yᵢ, count how many players "win".  
A player `i` wins if they pick strictly more than `i` balls **of the same color** (i.e., at least `i + 1` balls of any one color).  
Return the number of players who win under these rules. Multiple players may win.

### Examples  

**Example 1:**  
Input: `n = 3, pick = [[0,1], [0,2], [1,2], [2,2], [2,2], [2,2]]`  
Output: `2`  
*Explanation:*
- Player 0: picks colors 1, 2 (count: {1:1, 2:1}). To win, needs ≥1 of any color ⇒ wins (has 1).
- Player 1: picks color 2 (count: {2:1}). To win, needs ≥2 of any color ⇒ does NOT win.
- Player 2: picks color 2 ×3 (count: {2:3}). To win, needs ≥3 of any color ⇒ wins (has 3 of color 2).

**Example 2:**  
Input: `n = 2, pick = [[1,3], [1,3]]`  
Output: `1`  
*Explanation:*
- Player 0: picks nothing ⇒ does NOT win.
- Player 1: picks color 3 ×2 (count: {3:2}). Needs ≥2 of any color ⇒ wins.

**Example 3:**  
Input: `n = 1, pick = [[0,9]]`  
Output: `1`  
*Explanation:*
- Player 0: picks color 9 (count: {9:1}). Needs ≥1 of any color ⇒ wins.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  For each player, count how many balls they picked for each color, and check if any color count ≥ i+1.  
  For *every* player and *every* color, we keep a count (could be a 2D array or map).  
  After processing picks, for each player, check if any color count meets the win condition.

- **Optimized:**  
  The brute-force is already efficient since the number of colors is small (≤10), so using a 2D array of size n × 10 (colors) is fast. For each pick, increment counts, and stop checking a player as soon as the win condition is met.

- **Trade-off:**  
  Dictionary solutions are flexible but slightly slower than arrays if color range is small and known.  
  The main performance factor is the total number of picks, which is processed once.

### Corner cases to consider  
- Empty pick list: no one picked any ball, so only player 0 could win if pick is non-empty.
- Player with zero picks: can't win.
- All picks same color, all by one player: only that player considered.
- Multiple players win with different colors.
- Maximum number of players, few colors (stress test input).
- Picks referencing invalid player IDs or color values (not expected in valid inputs).

### Solution

```python
def winningPlayerCount(n, pick):
    # There are at most 10 colors, so we use a n x 10 array to count picks per player/color
    counts = [[0] * 10 for _ in range(n)]
    winners = set()  # Store indices of players who win
    
    for player, color in pick:
        counts[player][color] += 1
        # If this player's count for this color just became >= player+1 (i.e., just won), mark as winner
        if counts[player][color] == player + 1:
            winners.add(player)

    return len(winners)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m), where m = number of picks.  
  We process each pick once, and for up to n players and 10 colors, checking counts is O(1) per pick.
- **Space Complexity:** O(n), since we only store n × 10 = O(n) integers for player-color counts, and a set for winners.

### Potential follow-up questions (as if you’re the interviewer)  

- What if colors are not constrained to [0,9], but can be very large numbers?
  *Hint: Use a dict for each player instead of a fixed array for colors.*

- Can you do it in a single pass with less space if the number of colors is tiny?
  *Hint: Use early exiting and discard counts for players as soon as they win.*

- How would you handle streaming inputs—picks arriving in real time?
  *Hint: Maintain running counts, update winners set as each pick comes in.*

### Summary
This problem is a classic example of frequency counting using a 2D array/map:  
Count occurrences for each (player, color), then check if any player meets their personal threshold to win.  
The coding pattern is "grouping by keys and counting," common in card games or competitive scoring problems.  
The solution is straightforward when constraints are tight; for larger or variable key spaces (like unbounded colors), a map/dictionary per group should be used.

### Tags
Array(#array), Hash Table(#hash-table), Counting(#counting)

### Similar Problems
- Can I Win(can-i-win) (Medium)
- Predict the Winner(predict-the-winner) (Medium)