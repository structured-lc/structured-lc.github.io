### Leetcode 2712 (Medium): Minimum Cost to Make All Characters Equal [Practice](https://leetcode.com/problems/minimum-cost-to-make-all-characters-equal)

### Description  
You are given a binary string **s** (only '0's and '1's). You may make the string uniform (all characters the same) using two kinds of **flip** operations:
- **Left flip**: Choose an index i, and flip all characters from index 0 to i (inclusive). The cost is i+1.
- **Right flip**: Choose an index i, and flip all characters from index i to the end of the string (inclusive). The cost is n-i, where n is the string length.
Flipping means inverting each character ('0' → '1', '1' → '0') in the chosen segment.  
Your goal is to make all characters in the string identical with the **minimum total cost**.

### Examples  

**Example 1:**  
Input: `s = "0011"`  
Output: `2`  
*Explanation: Flip from index 2 to 3 (right flip), cost = 2. String becomes "0000".  
Alternatively, flip from 0 to 1 (left flip), cost = 2. String becomes "1111".*

**Example 2:**  
Input: `s = "010101"`  
Output: `6`  
*Explanation: For every change in the character (at indices 1, 2, 3, 4, 5), you can flip left or right at each change.  
For minimal total cost, flip at every transition, picking the cheaper flip (left or right) at each transition. The sum is (1, 2, 3, 4, 5) = 15, but picking the minimum at each yields 1 + 2 + 1 + 2 + 1 = 6.*

**Example 3:**  
Input: `s = "1"`  
Output: `0`  
*Explanation: The string is already uniform; no flips needed.*

### Thought Process (as if you’re the interviewee)  
Let’s think about the brute-force:  
- Try every combination of allowed flips to reach a uniform string. This is exponential, clearly infeasible.

To optimize:  
- Notice that a flip at any prefix or suffix can only help at points where the character changes.  
- The **only place you ever need to flip is at a boundary between different characters**.
- For each position 1 ≤ i < n, if s[i] ≠ s[i-1], then to make the entire string uniform you must flip either left (prefix 0..i-1) or right (suffix i..n-1).
- At change position i, you have two choices each time:
    - Flip the prefix up to i-1 at cost i.
    - Flip the suffix from i to end at cost n-i.
- At every boundary, choose the cheaper: **cost += min(i, n-i)**.

Why this works:
- Flips at same types of boundaries undo each other, so minimum is when you flip at each change, and always take the cheaper flip.

### Corner cases to consider  
- Length 1 (already uniform): cost is 0.
- All '0' or all '1': no work, cost 0.
- Alternating strings: maximum number of boundaries.
- Changes happen at the start/end.
- Multiple boundaries adjacent (e.g., "1100").

### Solution

```python
def minimumCost(s: str) -> int:
    n = len(s)
    total_cost = 0
    for i in range(1, n):
        # If current character is different from previous, boundary to flip
        if s[i] != s[i-1]:
            # Add minimal flip cost for this boundary
            total_cost += min(i, n - i)
    return total_cost
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  We only scan the string once, comparing each adjacent pair and taking O(1) per iteration.

- **Space Complexity:** O(1).  
  Only variables for length and total_cost are used, no extra data structures.

### Potential follow-up questions (as if you’re the interviewer)  

- What if flips on overlapping boundaries are allowed or counted differently?  
  *Hint: Would it ever be cheaper to "merge" flips or skip a boundary?*

- How would you adapt the approach for a non-binary string with more than two characters?  
  *Hint: Generalize the “boundary” concept and cost calculation.*

- What if you had a cost array per index, instead of the fixed i+1 and n-i rules?  
  *Hint: Dynamic programming might be needed if the cost model is arbitrary.*

### Summary
The approach is a **greedy scan of transition boundaries**, always taking the minimal flip cost at each change.  
This is a common greedy or prefix-suffix boundary-flipping pattern, similar to "minimum flips to make string monotonic" and related prefix/suffix optimization problems.  
It’s highly efficient due to the additive greedy breakdown, and the trick is recognizing when/where flips are necessary.


### Flashcard
Only flip at boundaries where characters change; the answer is the minimum number of such boundaries.

### Tags
String(#string), Dynamic Programming(#dynamic-programming), Greedy(#greedy)

### Similar Problems
- Flip String to Monotone Increasing(flip-string-to-monotone-increasing) (Medium)