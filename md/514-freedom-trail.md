### Leetcode 514 (Hard): Freedom Trail [Practice](https://leetcode.com/problems/freedom-trail)

### Description  
You are given a **circular ring** with `n` characters, and a **key** string you need to spell by rotating the ring and pressing a button when the correct character is at 12:00.  
- Each step to rotate the ring by one position (clockwise or anticlockwise) or pairing a press costs 1 step.  
- You start at position 0 (top of the ring).  
- For each character in `key`, align that character to 12:00, then press.  
- Find the **minimum total steps** needed to spell the whole `key`.

The ring may contain duplicate letters, so you can choose which occurrence to use to minimize steps.


### Examples  

**Example 1:**  
Input: `ring = "godding", key = "gd"`  
Output: `4`  
Explanation:  
- Align 'g' (already at 12:00, 0 steps), press (1 step).
- Align 'd' (two 'd's at indices 2 and 3; rotate 2 or 3 steps from position 0, but after first press position is at 0 and first 'g'), min rotation is 2 steps to index 3, press (1 step).  
Total steps = 1 (press 'g') + 2 (rotate to 'd') + 1 (press) = 4.

**Example 2:**  
Input: `ring = "abcde", key = "ade"`  
Output: `6`  
Explanation:  
- Align 'a' (already at 0), press (1)
- Rotate 4 to 'd' (index 3), press (1+3=4)
- Rotate 1 to 'e' (index 4), press (1)  
Total = 1 + 3 + 1 + 1 = 6.

**Example 3:**  
Input: `ring = "aaa", key = "a"`  
Output: `1`  
Explanation:  
- All positions are 'a', just press at index 0 (1 step).


### Thought Process (as if you’re the interviewee)  

- The brute-force way is to try **all possible choices** of each letter in the key—at each step, for key character K, consider all positions in `ring` where K occurs, and recursively compute steps.  
- For each move, compute minimal rotation (clockwise or counterclockwise) between current position and target index.  
- Recursion repeats work, so **Dynamic Programming with memoization** is needed.  
- State: (current_position_on_ring, current_index_in_key).  
- For each state, memoize minimum steps required.  
- For each character, consider all its possible ring indices—branch, compute minimum for that choice (using both rotation directions).  
- The overall minimum across all paths is the answer.  
- At each key character, add “1” for the press in addition to rotation steps.  

DP trade-offs:  
- Space is O(n × m) for ring/key sizes (since state holds each position and key index).  
- Time is O(n × m × k), where k = average number of positions per ring character.


### Corner cases to consider  
- All letters in ring are the same.  
- Key has duplicate letters.  
- Key is empty (`""`; should return 0).
- Ring has only one character.  
- Key length greater than ring length.  
- Key contains characters not present in ring (invalid in constraints).


### Solution

```python
def findRotateSteps(ring: str, key: str) -> int:
    # Map from character to list of indices in ring where the character appears
    from collections import defaultdict
    ring_map = defaultdict(list)
    n = len(ring)
    for i, ch in enumerate(ring):
        ring_map[ch].append(i)

    # Memoization cache: (current_ring_idx, key_pos) -> min_steps
    from functools import lru_cache
    
    @lru_cache(maxsize=None)
    def dp(ring_idx, key_pos):
        # Base case: Finished spelling the key
        if key_pos == len(key):
            return 0
        res = float('inf')
        target_char = key[key_pos]
        for idx in ring_map[target_char]:
            # Distance in ring (circular): min steps in either direction
            diff = abs(idx - ring_idx)
            step = min(diff, n - diff)
            # 1 for pressing button, plus steps to align + steps for remaining key
            total = step + 1 + dp(idx, key_pos + 1)
            res = min(res, total)
        return res

    return dp(0, 0)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × m × k)  
  n: length of ring, m: length of key, k: avg. number of occurrences per key character in ring.  
  For each state (ring_pos, key_index), consider up to O(n) choices (if all characters present). Usually, total subproblems is O(n × m).
- **Space Complexity:** O(n × m)  
  For memoization table storing intermediate results for each ring position × key position.


### Potential follow-up questions (as if you’re the interviewer)  

- What if the ring is extremely large and can't fit in memory?  
  *Hint: Optimize by only storing needed positions or process in a streaming way.*

- How would you handle repeated or extremely frequent characters efficiently?  
  *Hint: Use buckets or optimize lookups by sorting and binary search.*

- How could you adapt this to output not just the minimum steps but also the actual sequence of moves and button presses?  
  *Hint: Backtrack through the DP memoization table to reconstruct the path.*

### Summary
This problem uses the **DP with state memoization** pattern over a circular structure. The subproblem is defined by current position and key index, solving recursively. This approach is broadly applicable in optimal control of systems with cyclic dependencies (e.g., rotors, wheels, ring buffers, and circular DP). The pattern generalizes to other problems where you exhaustively search all choices with overlapping subproblems and combine results for optimality.

### Tags
String(#string), Dynamic Programming(#dynamic-programming), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search)

### Similar Problems
