### Leetcode 926 (Medium): Flip String to Monotone Increasing [Practice](https://leetcode.com/problems/flip-string-to-monotone-increasing)

### Description  
Given a binary string (consisting of only '0' and '1'), the goal is to make it **monotone increasing** with the minimum number of flips.  
A string is monotone increasing if all the '0's come before any '1's (i.e., no '1' appears before a '0').  
You can flip any '0' to '1' or '1' to '0' at each position. Return the minimum number of flips needed.

### Examples  

**Example 1:**  
Input: `00110`  
Output: `1`  
*Explanation: Flip the last '0' to '1' to get `00111`. Only one flip needed.*

**Example 2:**  
Input: `010110`  
Output: `2`  
*Explanation: Flip the first '1' (at index 1) and the '0' (at index 3) to get `011111` or flip the first two '1's to get `000111`. Both need 2 flips.*

**Example 3:**  
Input: `00011000`  
Output: `2`  
*Explanation: Flip both trailing '1's (at index 4 and 5) to '0', resulting in `00000000`. Total of 2 flips.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try all possible ways to split the string into two parts: making all before the split as '0' and all after (including split) as '1'. For each split, count flips needed for both parts, then return the minimum. This is O(n²) and not efficient for larger strings.
- **Optimize:** Notice that we can use **prefix sums** to count flips efficiently.
  - Keep track of how many '1's we've seen so far (`countOnes`). If we encounter a '0' after any '1', we need to flip either this '0' to '1' or some '1's before to '0'.
  - Maintain a running count: `flips` (number of flips to keep string monotone up to current position).
  - At each index:
      - If the character is '0': Either keep flip count, or increment flip count if needed.
      - If the character is '1': increment `countOnes`.
      - At each step, take the minimum between flipping this '0' (if needed) vs. flipping previous '1's.
- This dynamic programming reduces the time to linear O(n) and uses constant space.

### Corner cases to consider  
- Empty string (should return 0)
- Single character string ('0' or '1')
- Already monotone increasing (all '0's, or all '1's, or formatted like '000...111')
- All '0's followed by all '1's (no flips needed)
- Alternating pattern (e.g. '010101') — worst-case pattern for flipping

### Solution

```python
def minFlipsMonoIncr(s: str) -> int:
    flips = 0        # Minimum flips to make string monotone so far
    countOnes = 0    # Number of '1's seen so far
    
    for c in s:
        if c == '1':
            countOnes += 1
        else:
            # We can either flip this '0' to '1' (flips + 1), 
            # or flip all previous '1's to '0's (countOnes)
            flips = min(flips + 1, countOnes)
    
    return flips
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), because we make a single pass over the input string.
- **Space Complexity:** O(1), since we only use a constant number of variables regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if '2' is allowed in the string?  
  *Hint: Now you must decide what to flip '2' to, or generalize flip logic for more than binary.*

- How would you reconstruct one valid sequence of flips that achieves the minimum?  
  *Hint: Keep track of flip locations as you go, or do a backward pass.*

- Can you solve it with only O(1) additional memory if input comes as a stream?  
  *Hint: Need to maintain only counts, not the whole string.*

### Summary
This problem is a **prefix/suffix counting + dynamic programming** pattern, where at each index you determine the cost of possible "splits" using running summaries.  
This pattern often appears in problems involving binary strings, minimum edits, or substring modifications for monotonicity or ordering.  
It is also applicable to related challenges like **minimum flips for alternating patterns**, or making arrays non-decreasing with minimal changes.


### Flashcard
Use prefix sums to track flips needed to make all left '0's and right '1's, minimizing over all split points.

### Tags
String(#string), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Minimum Cost to Make All Characters Equal(minimum-cost-to-make-all-characters-equal) (Medium)