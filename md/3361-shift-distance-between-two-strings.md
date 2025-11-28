### Leetcode 3361 (Medium): Shift Distance Between Two Strings [Practice](https://leetcode.com/problems/shift-distance-between-two-strings)

### Description  
Given two strings **s** and **t** of the same length, along with two integer arrays **nextCost** and **previousCost** each of size 26 (for each lowercase letter). For each character in **s**, you can either:
- Shift it to the *next* alphabet letter (wrapping around, so 'z' to 'a'), costing `nextCost[position_in_alphabet]`
- Shift it to the *previous* alphabet letter (wrapping, so 'a' to 'z'), costing `previousCost[position_in_alphabet]`

Your goal is to transform **s** into **t** (character by character) with the *minimum possible total cost* of such operations.  
Return this minimum cost (the "shift distance").

### Examples  

**Example 1:**  
Input:  
s = `"abcd"`,  
t = `"bcda"`,  
nextCost = `[1]*26`,  
previousCost = `[2]*26`  
Output: `4`  
*Explanation: Each character requires 1 forward shift (cost 1). Total = 4.*

**Example 2:**  
Input:  
s = `"az"`,  
t = `"za"`,  
nextCost = `[1,2,...,26]`,  
previousCost = `[26,25,...,1]`  
Output: `2`  
*Explanation:  
- For s='a' to t='z': shifting 'a' to 'z' is 25 previous shifts, costing 25×(previousCost=26)=26  
But actually only 1 previous shift: 'a'→'z', cost is previousCost=26*1=26, but forward would be 25 shifts with costs in nextCost.  
However, minimum in this example is to do one operation in each direction for both positions; try both directions for minimal cost.*

**Example 3:**  
Input:  
s = `"abc"`,  
t = `"def"`,  
nextCost = `[1]*26`,  
previousCost = `[1]*26`  
Output: `9`  
*Explanation: Each character needs 3 forward shifts (a→d, b→e, c→f), each shift costs 1, so total=3×3=9.*

### Thought Process (as if you’re the interviewee)  
1. **Brute Force:**  
   For each character sᵢ to tᵢ, try all possible ways to reach from sᵢ to tᵢ (some combination of forward & backward shifts, account for wrap-around), sum the cost for each shift and pick the minimal for the entire string. This would require simulating all 26 possible shifts per position.
   
2. **Optimized Approach:**  
   - For each character, compute both:  
     a. Cost to reach tᵢ from sᵢ by shifting forward k times (with wrap-around), sum nextCost for each such shift  
     b. Cost by shifting backward  
   - For efficiency, **precompute** for each pair of (from, to) the minimum cost to shift (using nextCost/previousCost cumulative sums for every possible distance 0–25).
   - Compute all possible shift distances (forward and backward) between two letters (with wrap), and for each, sum and compare both routes, pick the minimal.
   - Sum minimal for all characters.

This is a DP-like shortest path in a ring (length 26), but as number of characters is small (26), precomputing for each letter is fast and elegant.

### Corner cases to consider  
- s and t are already equal: cost is 0
- nextCost or previousCost contains 0s (free moves)
- Wrap-around: shifting 'z' to 'a', or 'a' to 'z'
- All costs are very large except one is 0
- s or t is empty
- nextCost ≠ previousCost

### Solution

```python
def shiftDistance(s, t, nextCost, previousCost):
    # Precompute for every pair (from, to) the min cost to shift (forward and backward):
    # shift_cost_forward[x][y]: cost to go from x to y by forward shifts
    # shift_cost_backward[x][y]: cost to go from x to y by backward shifts

    # Precompute forward and backward costs for all letter pairs
    shift_cost = [[0]*26 for _ in range(26)]
    for start in range(26):
        # Build forward cumulative cost from start
        cumulative_forward = [0] * 26
        pos = start
        for step in range(1, 26):
            pos = (pos + 1) % 26
            cumulative_forward[pos] = cumulative_forward[(pos - 1) % 26] + nextCost[(pos - 1) % 26]
        # Build backward cumulative cost from start
        cumulative_backward = [0] * 26
        pos = start
        for step in range(1, 26):
            pos = (pos - 1 + 26) % 26
            cumulative_backward[pos] = cumulative_backward[(pos + 1) % 26] + previousCost[(pos + 1) % 26]
        # For start, record minimal cost to every end position via forward/backward
        for end in range(26):
            shift_cost[start][end] = min(cumulative_forward[end], cumulative_backward[end])

    total = 0
    for a, b in zip(s, t):
        i = ord(a) - ord('a')
        j = ord(b) - ord('a')
        total += shift_cost[i][j]
    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(26² + n),  
  since we precompute all letter pair costs (constant), and one pass of length n for the answer.
- **Space Complexity:** O(26²),  
  for storing the precomputed costs for all character transitions.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle **uppercase letters** or other alphabets?
  *Hint: Adjust the alphabet size and the cost arrays accordingly.*

- Suppose you can only shift **forward**. How does that change your solution?
  *Hint: Only compute/care about the forward costs, which simplifies logic and space.*

- If the strings are **very long** and only a few letters differ, how would you optimize the runtime?
  *Hint: Process only the indices where sᵢ ≠ tᵢ.*

- How would you support **batch queries**? (Many (s, t) pairs, same cost arrays.)
  *Hint: Precompute shift costs once and reuse for all queries.*

### Summary
This problem applies a **precomputation + lookup** pattern for minimal letter transformation cost, leveraging circular (ring) arithmetic for alphabets. The main technique is all-pairs cost precomputation for efficient online queries. This pattern is common in problems involving letter shifting, ring-buffer DP, or shortest-path on small graphs. It can be extended to similar problems with customized character cost transformations.


### Flashcard
For each character pair, compute both forward and backward shift costs (accounting for wrap-around), then pick the minimum for each position.

### Tags
Array(#array), String(#string), Prefix Sum(#prefix-sum)

### Similar Problems
- Shifting Letters(shifting-letters) (Medium)
- Shifting Letters II(shifting-letters-ii) (Medium)