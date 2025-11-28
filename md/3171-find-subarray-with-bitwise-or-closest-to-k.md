### Leetcode 3171 (Hard): Find Subarray With Bitwise OR Closest to K [Practice](https://leetcode.com/problems/find-subarray-with-bitwise-or-closest-to-k)

### Description  
Given an array of integers `nums` and an integer `k`, find a subarray (contiguous, non-empty) whose elements’ bitwise OR has the minimal possible absolute difference from `k`. In other words, return the minimum value of `|OR(nums[l..r]) - k|` over all possible subarrays.

### Examples  

**Example 1:**  
Input: `nums = [1,2,4,5]`, `k = 3`  
Output: `0`  
Explanation:  
The subarray `[1,2]` gives OR = 3, so |3 - 3| = 0, which is the minimal possible.

**Example 2:**  
Input: `nums = [1,2,4,8]`, `k = 5`  
Output: `1`  
Explanation:  
Subarray `[1,4]` gives OR = 5, so |5 - 5| = 0. But also, `[1,2]` gives OR = 3 (|3-5|=2), `[2,4]` gives OR = 6 (|6-5|=1). Minimum is 0.

**Example 3:**  
Input: `nums = [7,1,2,3]`, `k = 8`  
Output: `1`  
Explanation:  
Subarray `[7,1]` gives OR = 7, |7-8| = 1. Subarray `[1,2,3]` gives OR = 3, |3-8| = 5. Minimum is 1.


### Thought Process (as if you’re the interviewee)  
- Start with brute force: For all possible subarrays, compute bitwise OR and take the minimal absolute difference to `k`. This takes O(n²) subarrays × O(1) per OR (because we can compute the OR in O(1) if we cache), but actually, without caching, OR from scratch takes O(n), so naive brute-force is O(n³): not feasible.
- Observations:
  - The bitwise OR of a subarray is monotonic in extension (it never decreases if we make subarray longer), so we can cache OR values for subarrays ending at index i.
- Optimized approach:
  - For each position i, keep a set of all possible ORs of subarrays ending at i.
  - For each new number, compute OR with each value from previous set or just the number itself, and deduplicate to avoid redundant computation.
  - At every step, update the minimum absolute difference to k.
- This brings down the time complexity to O(n · logM), where M = max(nums). The logM comes from the number of possible OR values per subarray (limited by bit-length of the numbers).

### Corner cases to consider  
- Array of length 1
- All elements are the same
- Large vs. small k w.r.t. nums
- nums contains zeros or very large values
- Some subarrays OR equal to k exactly
- k = 0

### Solution

```python
def findSubarrayORClosest(nums, k):
    # Initialize the answer: minimal abs difference so far
    min_diff = float('inf')
    # Set of ORs for subarrays ending at previous index
    prev = set()
    
    for num in nums:
        curr = {num}  # Single element subarray
        
        # Update curr with OR of previous values
        for val in prev:
            curr.add(val | num)
        
        # Check minimum absolute difference for this position
        for or_val in curr:
            min_diff = min(min_diff, abs(or_val - k))
        
        prev = curr  # Use this set for the next index
    
    return min_diff
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × logM), where n is the length of nums, logM is the bit length (number of unique set values for the OR). For each index, we generate new ORs by combining with previous set (which is at most O(logM) in size).
- **Space Complexity:** O(logM), since at any step we keep at most the number of distinct ORs possible per index (up to the number of bits in the max number in nums).


### Potential follow-up questions (as if you’re the interviewer)  

- How would the approach change if we needed to return the actual subarray, not just the minimal difference?  
  *Hint: Track subarray start index along with OR value in the set.*

- What if we use bitwise AND instead of OR?  
  *Hint: AND is monotonic decreasing, so a similar logic works but details will differ for managing sets.*

- If nums is extremely large (n \> 10⁵) and only small k values, how could we further optimize?  
  *Hint: Consider more heuristics around early stopping or window pruning.*


### Summary
This problem showcases the common trick of reusing and memoizing bitwise operation results across overlapping subarrays, leading to a significant optimization over brute force. The idea is similar to "subarray XOR" or "maximum subarray sum" dynamic programming patterns, but adapted for the idiosyncrasies of the bitwise OR operator. The key is exploiting monotonicity and set-deduplication for efficiency. This technique is reusable in any problem that requires querying ranges for monotonic idempotent operations (e.g., OR, AND, but not XOR).


### Flashcard
For each starting position, extend the subarray right and cache bitwise OR values (OR is monotonic, so at most O(log max_val) distinct ORs per start); track closest OR to k.

### Tags
Array(#array), Binary Search(#binary-search), Bit Manipulation(#bit-manipulation), Segment Tree(#segment-tree)

### Similar Problems
- Minimum Sum of Values by Dividing Array(minimum-sum-of-values-by-dividing-array) (Hard)