### Leetcode 898 (Medium): Bitwise ORs of Subarrays [Practice](https://leetcode.com/problems/bitwise-ors-of-subarrays)

### Description  
Given an array of non-negative integers, find **the number of distinct results** you can get by taking the bitwise OR of every possible non-empty contiguous subarray. The bitwise OR combines elements by setting a bit if it is set in any of the subarray elements. Only unique OR results are counted.

### Examples  

**Example 1:**  
Input: ``  
Output: `1`  
*Explanation: The only subarray is , whose bitwise OR is 0.*

**Example 2:**  
Input: `[1,1,2]`  
Output: `3`  
*Explanation: Subarrays:  
[1] → 1  
[1,1] → 1  
[1,1,2] → 3  
[1] (second element) → 1  
[1,2] → 3  
[2] → 2  
Unique results: {1,2,3}.*

**Example 3:**  
Input: `[1,2,4]`  
Output: `6`  
*Explanation: Subarrays:  
[1] → 1  
[1,2] → 3  
[1,2,4] → 7  
[2] → 2  
[2,4] → 6  
[4] → 4  
Unique results: {1,2,3,4,6,7}.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  Consider all ⌊n²⌋ subarrays, calculate their bitwise ORs, and use a set to hold unique results. This is too slow (`O(n³)`) for large arrays.

- **Optimize:**  
  Notice that for each end position `j`, the set of ORs that end at index `j` can be built from ORing the current value with all ORs ending at `j-1`.  
  Maintain a set of possible results `cur` for the current position and update it as:  
  - For each value in last set, OR with current element, plus current element itself (for a new start).  
  - Keep a global set to accumulate all unique results.

- **Why this works:**  
  - Each position only adds a limited number (up to 32, due to the maximum bit length of an integer) of new OR values, so iterating through recent ORs is efficient.
  - Total complexity is about `O(32n)` or `O(n \* 32)`.

- **Trade-offs:**  
  - This uses extra space for storing sets but is far faster than brute force.

### Corner cases to consider  
- Array with all zeros, e.g. `[0,0,0]`  
- Array with all elements equal, e.g. `[2,2,2]`  
- Array of length 1  
- Very large values (close to maximum 32-bit integer)  
- Array in increasing/decreasing order  
- Array with powers of two: `[1,2,4,8]`

### Solution

```python
def subarrayBitwiseORs(arr):
    # Set to collect all unique OR results.
    result = set()
    # Set of ORs for subarrays ending at previous index.
    prev = set()
    
    for num in arr:
        # OR num with all previous ORs, plus start new subarray at num.
        cur = {num}
        for p in prev:
            cur.add(p | num)
        # Update global result set.
        result.update(cur)
        # Assign for next round.
        prev = cur
        
    return len(result)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(32 × n); each number has, at most, 32 possible new OR results due to integer constraints, so total steps are proportional to 32 \* n.

- **Space Complexity:**  
  O(32 × n); global and temporary sets can hold up to 32 \* n unique results in the worst case (though usually much less).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you needed to compute the actual distinct OR values, not just the count?  
  *Hint: Return the set, not just its length.*

- How does the algorithm's complexity change if the numbers are larger (e.g., 64-bit)?  
  *Hint: Bit length grows, so per-position set of ORs could hold more values.*

- Can this be extended to handle bitwise AND or XOR?  
  *Hint: XOR and AND have different properties; AND can be optimized, but XOR generally requires extra tricks.*

### Summary
This problem uses a **sliding window set dynamic programming** pattern, where for each array position we maintain possible OR results from previous positions and update for the current number. This approach is efficient due to the limited growth of possible results (since each new OR can only flip more bits on) and is a common technique when asked about subarray properties that have monotonic or bitwise nature. This pattern can be applied to subarray bitwise AND, maximums, and minimums with suitable modifications.


### Flashcard
For each position, build the set of ORs ending there by ORing current value with all previous ORs; use a set to collect unique results.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Bit Manipulation(#bit-manipulation)

### Similar Problems
- Longest Nice Subarray(longest-nice-subarray) (Medium)
- Smallest Subarrays With Maximum Bitwise OR(smallest-subarrays-with-maximum-bitwise-or) (Medium)
- Bitwise OR of All Subsequence Sums(bitwise-or-of-all-subsequence-sums) (Medium)
- Find the Maximum Sequence Value of Array(find-the-maximum-sequence-value-of-array) (Hard)