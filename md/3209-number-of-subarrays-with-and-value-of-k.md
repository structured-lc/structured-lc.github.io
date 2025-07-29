### Leetcode 3209 (Hard): Number of Subarrays With AND Value of K [Practice](https://leetcode.com/problems/number-of-subarrays-with-and-value-of-k)

### Description  
Given an array of integers `nums` and an integer `k`, return the number of subarrays of `nums` where the bitwise AND of all the elements in the subarray equals `k`. A subarray is a contiguous section of the array.  
Explain how you would solve this efficiently for large arrays (up to 10⁵ elements) and large integer values.

### Examples  

**Example 1:**  
Input: `nums = [1,1,1]`, `k = 1`  
Output: `6`  
*Explanation: Every subarray in [1,1,1] has AND = 1. There are 6 subarrays: [1], [1], [1], [1,1], [1,1], [1,1,1].*

**Example 2:**  
Input: `nums = [1,1,2]`, `k = 1`  
Output: `3`  
*Explanation: Valid subarrays are [1], [1], and [1,1]. Subarrays including 2 have AND ≠ 1.*

**Example 3:**  
Input: `nums = [1,2,3]`, `k = 2`  
Output: `2`  
*Explanation: Valid subarrays are [2] and [2,3]. ([2] is at index 1, [2,3] is indices 1-2. Both have AND=2.)*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Check all subarrays (from each i, try all j ≥ i), compute AND for each. This is O(n²), which will time out for n up to 10⁵.
- **Optimization:** Notice AND operation is monotonic (AND-ing more numbers cannot increase the result).  
  - For each position, keep a hash map of all possible AND results ending at that index, extending each AND value with the current number.  
  - For each `r` from 0 to n-1, build a map: For every AND result `v` of subarrays ending at r-1, calculate `v & nums[r]`. Also, include `nums[r]` itself.
  - For each AND result matching `k`, add up the counts.  
- This approach leverages that the number of distinct AND values for all contiguous subarrays is O(log(max(nums))) per index, since repeated ANDs quickly converge down.
- This dynamic method ensures each subarray is only considered once, keeping time close to O(n × log(max_num)), which is feasible.

### Corner cases to consider  
- Empty array (though per constraints, at least 1 element).
- All elements the same, equals or not equals k.
- Large numbers (near 10⁹) with very different bits.
- No subarrays can have AND=k.
- When k=0 (special case: only subarrays containing at least one 0-bit everywhere).
- nums containing zeros (AND drops to zero and stays zero as we include more items).

### Solution

```python
def subarray_and_k(nums, k):
    # The idea: For each index, keep track of all possible AND results.
    n = len(nums)
    from collections import Counter

    prev = Counter()   # Maps AND value → count of subarrays ending at previous index
    count = 0

    for num in nums:
        curr = Counter()
        # Start a new subarray at this position
        curr[num] += 1
        # Extend previous subarrays by including num
        for v in prev:
            curr[v & num] += prev[v]
        # Add up all subarrays ending here with AND == k
        count += curr[k]
        prev = curr   # Move on to next index

    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × L), where L is the number of distinct AND values per position, which is O(logₐ(max(nums))) in practice because AND-ing repeatedly with numbers only reduces bitwise 1s.  
- **Space Complexity:** O(L), for the hash map of AND-values per position.

### Potential follow-up questions (as if you’re the interviewer)  

- If k can never be represented as an AND of any subarray, can you return early?  
  *Hint: Can you pre-filter by checking k is a subAND of some element?*

- How would you adapt for OR instead of AND?  
  *Hint: OR increases with more elements, rather than decreasing!*

- How do you count subarrays for which AND is at least (≥) k (not exactly k)?  
  *Hint: Inclusion-exclusion or DP over sets of bits can help.*

### Summary
This problem leverages *dynamic programming over subarrays* and bit manipulation. The central idea is to maintain a hash table of all possible AND results for subarrays ending at each position, exploiting that repeated ANDs rapidly compress the set of tracked values.  
It's a useful pattern for sliding subarrays with associative, monotonic operations (like AND/OR), and can be generalized for similar bitmasking problems.