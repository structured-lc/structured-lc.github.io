### Leetcode 1320 (Hard): Minimum Distance to Type a Word Using Two Fingers [Practice](https://leetcode.com/problems/minimum-distance-to-type-a-word-using-two-fingers)

### Description  
Given a string `word` (consisting of uppercase English letters), a virtual keyboard is constructed with the layout of letters A-Z in a 6×5 grid (rows × columns, left-to-right, top-to-bottom). You can use either your left or right finger to type each character. The distance between two keys is the Manhattan distance (sum of horizontal and vertical moves). The goal is to compute the minimum total distance required to type the entire string `word` using two fingers optimally.

### Examples  

**Example 1:**  
Input: `word = "CAKE"`  
Output: `3`  
*Explanation: Place left finger on 'C', right finger on 'A'. Move right finger to 'A' (0 steps), left to 'C' (0 steps), right to 'K', then left to 'E'. The minimal total movement is 3.*

**Example 2:**  
Input: `word = "HAPPY"`  
Output: `6`  
*Explanation: Optimal use of both fingers to minimize movement between letters. 6 is the minimum sum.*

**Example 3:**  
Input: `word = "NEW"`  
Output: `3`  
*Explanation: By optimally switching finger positions, 3 is the minimal path cost.*

### Thought Process (as if you’re the interviewee)  
- The problem reduces to minimizing the sum of finger moves over the sequence.
- It’s optimal substructure: the minimum distance to finish at each character with either finger in given positions.
- Use Dynamic Programming: state = (index of letter, position of left finger, position of right finger).
- At every step, choose either finger to type the next letter, recursively compute both options.
- Use memoization, as the state space is manageable (26 letters, string length ≤ 300).
- Precompute the Manhattan distance between any keyboard positions for fast lookup.

### Corner cases to consider  
- Repeated letters (typing the same letter)
- Minimal word length (1 letter)
- Letters that are close together on the keyboard
- Long words
- Both fingers start unset (no starting position cost)

### Solution

```python
# DP with memoization for two finger positions, minimizing total move cost
from functools import lru_cache
def minimumDistance(word):
    def pos(c):
        idx = ord(c) - ord('A')
        return divmod(idx, 6)  # (row, col), since 6 columns
    n = len(word)
    @lru_cache(None)
    def dp(i, l, r):
        if i == n:
            return 0
        curr = word[i]
        curr_pos = pos(curr)
        res = float('inf')
        # Use left finger
        if l is None:
            res = min(res, dp(i+1, curr, r))
        else:
            l_dist = abs(pos(l)[0] - curr_pos[0]) + abs(pos(l)[1] - curr_pos[1])
            res = min(res, l_dist + dp(i+1, curr, r))
        # Use right finger
        if r is None:
            res = min(res, dp(i+1, l, curr))
        else:
            r_dist = abs(pos(r)[0] - curr_pos[0]) + abs(pos(r)[1] - curr_pos[1])
            res = min(res, r_dist + dp(i+1, l, curr))
        return res
    return dp(0, None, None)
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n × 26 × 26), because for every character, all configurations of left/right positions can be considered (memoized states).
- **Space Complexity:** O(n × 26 × 26), since we store state for every (i, l, r) tuple in the memoization.

### Potential follow-up questions (as if you’re the interviewer)  
- What if more fingers are allowed?  
  *Hint: State space grows exponentially — can you handle for k fingers?*

- Can you return the sequence showing which finger presses each letter?  
  *Hint: Store the decision at each DP step and reconstruct the path after.*

- What if the keyboard shape is not rectangular, or not contiguous?  
  *Hint: Generalize pos(c), or use a precomputed distance matrix.*

### Summary
This problem is a classic example of dynamic programming with multidimensional state (two "pointers" or fingers). The approach is similar to the "paint house" and other sequence DP questions, where at each step, decisions are minimized over possible moves. This pattern is widely applicable in optimal path, cost-minimization, and multi-agent problems.


### Flashcard
Use DP with state (index, left_pos, right_pos), recursively try both fingers for each letter, memoizing results for efficiency.

### Tags
String(#string), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Minimum Time to Type Word Using Special Typewriter(minimum-time-to-type-word-using-special-typewriter) (Easy)