### Leetcode 488 (Hard): Zuma Game [Practice](https://leetcode.com/problems/zuma-game)

### Description  
Given a row of colored balls on a board (only colors: R, Y, B, G, W), and several balls in your hand, your task is to clear the board by inserting balls from your hand one-by-one. Insert a ball (any color from your hand) into *any* position (even between two balls or at the ends). If after insertion there is a group of three or more consecutive balls of the same color, *remove* all those balls. This may cause new groups to form—repeat removal until no group of three or more exists. The goal: fully clear the board using the smallest number of insertions. If impossible, return -1.

### Examples  

**Example 1:**  
Input: `board = "WRRBBW"`, `hand = "RB"`  
Output: `-1`  
*Explanation: Not enough balls in hand (need 2 more "B"s); impossible to clear board.*

**Example 2:**  
Input: `board = "WWRRBBWW"`, `hand = "WRBRW"`  
Output: `2`  
*Explanation: Insert "B" between two "B"s to cause elimination, then "R" to eliminate all "R"s, finally "W"s chain-eliminate. Only 2 insertions needed.*

**Example 3:**  
Input: `board = "G"`, `hand = "GGGGG"`  
Output: `2`  
*Explanation: Insert 2 "G"s to make "GGG", then all eliminated in one go.*

### Thought Process (as if you’re the interviewee)  
For this problem, brute force would try all possible insertions at every step, simulate removals, and recursively repeat. Unfortunately, number of states grows exponentially—inefficient for larger boards/hands.

Optimization:  
- **DFS with Memoization:** For each board and hand state, try every possible way to insert any color from hand at every position. Remove groups of 3+, and recursively search for the minimal insertions from that point.
- Avoid duplicate work: memorize (board, hand) pairs we've already computed (pruning).
- Always try to insert where it *could* form a group of 3 or more quickly—no need to insert balls of a color nowhere near others of the same color.
- After any move, *clean* the board as needed by eliminating all groups of 3+.
- Base cases:
  - Board is empty: 0 insertions needed.
  - Hand is empty but board is not: impossible (return inf/-1).

Trade-offs: DFS+Memoization gives good pruning and can solve modest input sizes.  
Alternative: BFS is possible, but DFS is easier as we can stick with the recursive state.

### Corner cases to consider  
- Board already empty at the start.
- Hand does not contain enough balls of the needed colors.
- Board and hand both empty.
- Inserting a ball may trigger *multiple* chains of eliminations, not just one.
- Duplicate states from different insert orders—covered by memoization.

### Solution

```python
from collections import Counter

class Solution:
    def findMinStep(self, board: str, hand: str) -> int:
        # Helper to clean up board: repeatedly remove groups of 3+ consecutive balls
        def clean(b):
            i = 0
            while i < len(b):
                j = i
                # Move j to the rightmost same-colored ball
                while j < len(b) and b[j] == b[i]:
                    j += 1
                if j - i >= 3:
                    # Remove group and start over
                    b = b[:i] + b[j:]
                    i = 0  # restart (after removal, new groups might form)
                else:
                    i += 1
            return b
        
        memo = dict()
        hand_count = Counter(hand)
        colors = set('RYBGW')
        
        def dfs(b, hand_tuple):
            # hand_tuple: ((color, count), ...) for hashability
            key = (b, hand_tuple)
            if key in memo:
                return memo[key]
            if not b:
                return 0  # no balls to remove
            if all(count == 0 for _, count in hand_tuple):
                return float('inf')  # can't finish
            
            min_insert = float('inf')
            hand_map = dict(hand_tuple)
            
            # Try to insert any ball at any position
            for i in range(len(b)+1):
                for c in colors:
                    if hand_map.get(c, 0) == 0:
                        continue
                    # Skip inserting in redundant positions where adjacent are same
                    if i > 0 and b[i-1] == c:
                        continue
                    # If next char is same as insert char, prefer not to split group
                    if i < len(b) and b[i] == c:
                        continue
                        
                    # Only insert if can help formation or removal
                    new_b = b[:i] + c + b[i:]
                    cleaned = clean(new_b)
                    hand_map[c] -= 1
                    res = dfs(cleaned, tuple(sorted(hand_map.items())))
                    if res != float('inf'):
                        min_insert = min(min_insert, 1 + res)
                    hand_map[c] += 1  # backtrack
            
            memo[key] = min_insert
            return min_insert
        
        ans = dfs(board, tuple(sorted(hand_count.items())))
        return ans if ans != float('inf') else -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × 5ᵐ × n), where n = length of board, m = length of hand. For each possible (board, hand) state (pruned by memoization, but exponential in worst case), we try up to n insert positions and 5 colors; cleaning the board in O(n) steps each time.
- **Space Complexity:** O(n × 5ᵐ), dominated by memoization cache; stack depth up to O(n + m).

### Potential follow-up questions (as if you’re the interviewer)  

- What if balls in hand can be unlimited supply per color?  
  *Hint: Now focus only on minimum insertions needed per color, not hand count.*

- What if you can insert *multiple* balls in a single move?  
  *Hint: Re-model state transitions, see if reducing to batch removals helps.*

- What if certain colors are not present in hand but are present on board?  
  *Hint: Detect up front if board has balls of a color not in hand, immediately return -1.*

### Summary
This problem uses DFS with memoization to efficiently explore the sequence of *board* and *hand* states caused by insertions and chain reactions. The main coding pattern is Backtracking + State Memoization, a common technique in combinatorial game state search, similar to "remove boxes", "minimax game", and some two-player game DP problems. This pattern applies to optimization problems where state grows with sequence and branching actions.


### Flashcard
Use DFS with memoization; for each board/hand state, try all insertions, remove groups of 3+, and recurse for minimal steps.

### Tags
String(#string), Dynamic Programming(#dynamic-programming), Stack(#stack), Breadth-First Search(#breadth-first-search), Memoization(#memoization)

### Similar Problems
