### Leetcode 2027 (Easy): Minimum Moves to Convert String [Practice](https://leetcode.com/problems/minimum-moves-to-convert-string)

### Description  
Given a string `s` of length `n` containing only `'X'` and `'O'`, you can choose any three consecutive characters and convert each `'X'` in this segment to `'O'` in **one move** (already rendered `'O'` remain unchanged).  
Your task is to return the **minimum number of moves** needed to convert the entire string to all `'O'`s.

### Examples  

**Example 1:**  
Input: `s = "XXX"`  
Output: `1`  
*Explanation: Flip the first three chars in one move; the string is now `"OOO"`.*

**Example 2:**  
Input: `s = "XXOX"`  
Output: `2`  
*Explanation:  
- First move: flip the first three (`XXX` → `OOO`), string becomes `"OOOX"`.  
- Second move: flip the last three (`OOX`), string becomes `"OOOO"`.*

**Example 3:**  
Input: `s = "OOOO"`  
Output: `0`  
*Explanation: All characters are already `'O'`; no moves required.*


### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Check every possible starting index for three consecutive characters, and try to minimize overlapping flips. But this is inefficient: `O(n²)` for simulation.

- **Optimized approach:**  
  Since one move always flips three consecutive characters, whenever we see an `'X'` at index `i`, we must flip it (and next two). After flipping at `i`, we know positions `i`, `i+1`, `i+2` become `'O'`, so we can skip directly to `i+3`. This greedy approach ensures minimum moves, as each `'X'` is handled immediately when encountered.

  Trade-offs: This is efficient (`O(n)`) and straightforward. No need to track previously flipped indices, as overlapping doesn't reduce number of moves.

### Corner cases to consider  
- Empty string `""` → should return `0`
- All `'O'`s → already converted, answer is `0`
- All `'X'`s → length // 3 and possible remainder
- `'X'` at the end with less than 3 chars left (e.g. `"OOX"`)
- Strings shorter than three characters
- Random `'X'` and `'O'` arrangements

### Solution

```python
def minimumMoves(s: str) -> int:
    moves = 0
    i = 0
    n = len(s)

    while i < n:
        if s[i] == 'X':
            # Flip the segment s[i:i+3]
            moves += 1
            i += 3  # skip next two, as they're covered by current move
        else:
            i += 1  # move to next char if current is already 'O'
    return moves
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the string.  
  Justification: Single pass over the string, incrementing index by 1 or 3 on each loop, but never visiting same index twice.

- **Space Complexity:** O(1),  
  Justification: Only a few integer variables for counting and iterating, no additional data structures proportional to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we could flip k consecutive characters in each move, instead of 3?  
  *Hint: Try generalizing the approach to any k. How would you change the logic and the movement of your index?*

- What if each flip had a different cost (maybe flipping each `'X'` costs differently)?  
  *Hint: Think about Dynamic Programming where you maintain minimum cost for each position.*

- Can you return the exact indices where flips occurred, not just the count?  
  *Hint: Modify your loop to append start indices when you decide to flip.*

### Summary
This is a classic example of the **greedy walking pointer pattern**: sweep left-to-right, making optimal local decisions at each step ("flip when needed, then skip ahead"). This technique often appears in problems involving fixed-size operations (like k-group flips in arrays or strings) and can be adapted to sliding window scenarios when the operation is more flexible.

### Tags
String(#string), Greedy(#greedy)

### Similar Problems
- Minimum Cost to Convert String I(minimum-cost-to-convert-string-i) (Medium)
- Minimum Cost to Convert String II(minimum-cost-to-convert-string-ii) (Hard)