### Leetcode 821 (Easy): Shortest Distance to a Character [Practice](https://leetcode.com/problems/shortest-distance-to-a-character)

### Description  
Given a string `s` and a character `c` that is guaranteed to exist in `s`, for each index in `s`, return the length of the shortest distance between that index and the nearest occurrence of `c`. For every character, you need to determine how close it is to any occurrence of that given character in the string, going both left and right.


### Examples  

**Example 1:**  
Input: `s = "loveleetcode", c = 'e'`  
Output: `[3,2,1,0,1,0,0,1,2,2,1,0]`  
*Explanation:*
- For each position, we find the closest `'e'`.  
- s[3] and s[5] and s and s are all `'e'` themselves, so distance is 0.  
- s ('l') is 3 from position 3 (`l‑o‑v‑e`), so 3.  
- s[1] ('o') is 2 from position 3 (`o‑v‑e`), so 2.  
- s[2] ('v') is 1 from position 3.  
- ...and so on.

**Example 2:**  
Input: `s = "aaab", c = 'b'`  
Output: `[3,2,1,0]`  
*Explanation:*
- Last character is `'b'` (distance 0).
- From right to left: `'a'` is 1 from `'b'`, next `'a'` is 2, first `'a'` is 3.

**Example 3:**  
Input: `s = "baba", c = 'a'`  
Output: `[1,0,1,0]`  
*Explanation:*
- Indices 1 and 3 are `'a'`, so distance is 0 at those indices.
- Indices 0 and 2 are `'b'`, both next to nearest `'a'` (distance 1).


### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  For every character in the string, look both left and right to find the distance to the closest `c`. This takes O(n²) time (for each character, loop over all others), which is inefficient for big strings.

- **Optimized idea (two-pass approach):**  
  - First, make a left-to-right pass: Whenever you see the target character, record its position. For the rest, save the distance to the latest seen target.
  - Second, a right-to-left pass: Do the same, and take the minimum of the previously recorded value and the new value from this pass.
  - This ensures each character gets the minimum distance from either side and only needs two passes (O(n) time, O(n) space).  
  - This pattern is efficient and commonly used for problems needing “minimum distance to the closest X” in an array or string.

This approach is chosen because it works in linear time and does not require additional passes.


### Corner cases to consider  
- `s` where all characters are the same as `c` (every output is 0).  
- `s` where only the first/last character is `c` (must see if distance calculation is correct at both ends).  
- Very short strings, e.g., length 1 or 2.  
- Multiple consecutive occurrences of `c`.  
- Very long strings (to test performance of two-pass approach).


### Solution

```python
def shortestToChar(s: str, c: str) -> list[int]:
    n = len(s)
    res = [0] * n

    # First pass: left to right
    prev = float('-inf')
    for i in range(n):
        if s[i] == c:
            prev = i
        res[i] = i - prev if prev != float('-inf') else float('inf')

    # Second pass: right to left
    prev = float('inf')
    for i in reversed(range(n)):
        if s[i] == c:
            prev = i
        res[i] = min(res[i], prev - i if prev != float('inf') else float('inf'))

    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Two passes over the string (each O(n)), each index only considered twice.

- **Space Complexity:** O(n)  
  Output array is O(n). Only a few variables (constant space) otherwise.


### Potential follow-up questions (as if you’re the interviewer)  

- What if you have to support multiple queries with different target characters on the same string?  
  *Hint: Precompute positions of each character and use binary search or preprocessing.*

- Can this be extended to work on 2D grids or matrices?  
  *Hint: Consider BFS or multi-source shortest path techniques.*

- What if the target character might not always exist in the string?  
  *Hint: Need to decide on an error/default for those cases (such as returning -1 or inf).*


### Summary
This uses the classic **two-pass array scan pattern**, where left-to-right and right-to-left traversals each record partial results; the final answer at each position is the minimum from both directions. This pattern is very effective for minimum distance or accumulations where information from both left and right neighbors is needed, and is widely applicable in strings and arrays (see: shortest distance to 1s in binary arrays, dynamic programming with dependencies, etc).