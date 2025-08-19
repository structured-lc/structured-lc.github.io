### Leetcode 2225 (Medium): Find Players With Zero or One Losses [Practice](https://leetcode.com/problems/find-players-with-zero-or-one-losses)

### Description  
Given a list of matches, where each match is represented as `[winner, loser]`, find all players who have never lost (zero losses) or lost exactly one match. Players can both win and lose in different matches, and you might encounter players only as losers. Your result should include two sorted lists: one containing players with zero losses and one with exactly one loss.

### Examples  

**Example 1:**  
Input: `matches = [[1,3],[2,3],[3,6],[5,6],[5,7],[4,5],[4,8],[4,9],[10,4],[10,9]]`  
Output: `[[1,2,10],[4,5,7,8]]`  
*Explanation:*
- Players with **0 losses**: 1, 2, 10  
- Players with **1 loss**: 4 (lost to 10), 5 (lost to 4), 7 (lost to 5), 8 (lost to 4)  
- All results are sorted.

**Example 2:**  
Input: `matches = [[2,3],[1,3],[5,2],[6,5]]`  
Output: `[[1,6],[2,5]]`  
*Explanation:*
- Players with **0 losses**: 1 (wins, never lost), 6 (win, never lost)  
- Players with **1 loss**: 2 (lost to 5), 5 (lost to 6)

**Example 3:**  
Input: `matches = [[3,1],[3,2],[4,3],[5,2],[1,2],[2,3],[7,6],[8,4],[9,3]]`  
Output: `[[5,7,8,9],[1,4,6]]`  
*Explanation:*
- Players with **0 losses**: 5,7,8,9  
- Players with **1 loss**: 1 (lost to 3), 4 (lost to 8), 6 (lost to 7)

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** For each player, count the number of losses by iterating all matches and tallying losses per player.
- But we need to be careful: some players only appear as winners and never as losers, so we track all unique players.
- **Optimized solution:**  
  - Use a dictionary to record the number of losses for each player.
  - When processing each match, make sure to record both the winner (if not already present, ensure their loss count is 0) and increment the loser's count.
  - After processing, create two lists for players with 0 and 1 loss by analyzing the dictionary.
  - Finally, sort both lists before returning.
- **Trade-offs:**  
  - This approach ensures O(n) for building the counts, and O(n log n) for sorting, where n is the number of unique players.

### Corner cases to consider  
- No matches (empty input): Both output lists should be empty.
- Players who only win, never lose.
- Players who only lose, never win (unlikely from constraints).
- Duplicate matches: Shouldn’t impact as each match is counted individually.
- Large player numbers; ensure efficient dictionary access.

### Solution

```python
def findWinners(matches):
    # Dictionary to record each player's number of losses
    losses = {}
    for winner, loser in matches:
        # Ensure both winner and loser exist in the dictionary
        if winner not in losses:
            losses[winner] = 0  # Winner: hasn't lost in this match
        if loser not in losses:
            losses[loser] = 0
        # Increment loss count for the loser
        losses[loser] += 1

    zero_losses = []
    one_loss = []
    
    # Go through the losses and segregate players
    for player, loss_count in losses.items():
        if loss_count == 0:
            zero_losses.append(player)
        elif loss_count == 1:
            one_loss.append(player)
            
    # Sort lists as required by the problem
    zero_losses.sort()
    one_loss.sort()
    return [zero_losses, one_loss]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), where n is the number of unique players. This is due to the final sorting step. The initial dictionary build is O(m), where m is the number of matches.
- **Space Complexity:** O(n), as we store loss counts for each unique player (and the output lists).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the number of possible player IDs is very large and sparse?  
  *Hint: Hash maps vs arrays for counts storage.*

- What if we also needed to find players who have never won?  
  *Hint: Track both first and second element counts in each match.*

- How would you return only the player(s) who have maximum/most losses?  
  *Hint: Scan the loss counts for the maximum value.*

### Summary
We used the **Counting** and **Hash Map** coding pattern to solve this, commonly found in problems requiring tallying frequencies (e.g., majority element, unique elements). The approach is space- and time-efficient for reasonable input sizes and can be adapted for related tournament statistics problems.

### Tags
Array(#array), Hash Table(#hash-table), Sorting(#sorting), Counting(#counting)

### Similar Problems
- Lowest Common Ancestor of a Binary Tree(lowest-common-ancestor-of-a-binary-tree) (Medium)