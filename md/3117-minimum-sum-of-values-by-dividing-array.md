### Leetcode 3117 (Hard): Minimum Sum of Values by Dividing Array [Practice](https://leetcode.com/problems/minimum-sum-of-values-by-dividing-array)

### Description  
Given two arrays:  
- **nums**: the array of integers to be partitioned  
- **andValues**: target bitwise ANDs for `m` subarrays  

Partition **nums** into **m** disjoint contiguous subarrays. For each i (0 ≤ i < m), the iᵗʰ subarray's bitwise AND must equal andValues[i], and its "value" = last element of the subarray.  
**Return:** The minimum sum of the values of all m subarrays; return -1 if division is impossible.

### Examples  

**Example 1:**  
Input: `nums = [3,2,5,7,5]`, `andValues = [0,7,5]`  
Output: `17`  
*Explanation: Partition as [3,2], [5,7], [5].  
- [3,2] ➔ 3 & 2 = 2, doesn't match 0.  
- [3,2,5] ➔ 3&2&5 = 0, matches first value.  
  Remaining: , [5]: 7 matches 7, and 5 matches 5.  
  Subarray ends: 5, 7, 5. Sum = 5+7+5 = 17.*

**Example 2:**  
Input: `nums = [4,3,3,2]`, `andValues = [4,3,2]`  
Output: `9`  
*Explanation: Partition as [4], [3,3], [2].  
  4&=4, 3&3=3, 2=2.  
  Ends: 4,3,2. Sum = 4+3+2=9.*

**Example 3:**  
Input: `nums = [1,2,4]`, `andValues = [4,4]`  
Output: `-1`  
*Explanation: No way to partition nums into 2 segments with ANDs 4 and 4 (no prefix/subarray starts with 4).*

### Thought Process (as if you’re the interviewee)  

- **Brute-force:** Try every way of cutting **nums** into **m** contiguous subarrays, checking that AND matches **andValues**.[]
    - Too slow: exponential number of partitionings.

- **DP Optimization:** Since AND is associative, for each start index and current partition, try expanding right and keep the current AND. For every valid subarray (start→end) where subarray AND matches andValues[curr], recursively compute optimal sum for the remaining (curr+1) partitions starting at end+1.
    - Use memoization to avoid recomputation: dp(start_index, current_partition).
    - State: (idx_in_nums, idx_in_andValues)
    - At every subarray ending j (idx ≤ j < n), if current AND == andValues[partition], move on to next partition.
    - Add the last element (nums[j]) to sum.

- **Why this approach?**  
    - Avoids redundant calculations by caching results.
    - Systematically explores all possible valid partitions and selects one with minimum sum.
    - Pruning: If remaining nums are fewer than remaining partitions, or impossible ANDs, can return -1 early.


### Corner cases to consider  
- nums is empty, or andValues is empty  
- len(andValues) > len(nums)  
- Elements of andValues not possible via any subarray AND  
- All zeros, all ones, repeated elements  
- All nums are equal  
- Single partition (andValues length = 1)  
- Impossible division due to AND constraints

### Solution

```python
def minimumValueSum(nums, andValues):
    n = len(nums)
    m = len(andValues)
    memo = dict()
    
    # dp(i, k): min sum partitioning nums[i:] with andValues[k:]
    def dp(i, k):
        # Base: All andValues matched, must also have consumed all nums
        if k == m:
            return 0 if i == n else float('inf')
        # Impossible: Not enough nums left for partitions
        if n - i < m - k:
            return float('inf')
        if (i, k) in memo:
            return memo[(i, k)]
        
        ans = float('inf')
        cur_and = nums[i]
        # Expand the kth partition from i to all possible j
        for j in range(i, n - (m - k) + 1):
            if j > i:
                cur_and &= nums[j]
            if cur_and == andValues[k]:
                # Value is end element nums[j]
                rest = dp(j + 1, k + 1)
                if rest != float('inf'):
                    ans = min(ans, nums[j] + rest)
        memo[(i, k)] = ans
        return ans

    res = dp(0, 0)
    return res if res != float('inf') else -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n\*m\*n)  
    - For each of the O(n\*m) dp states, we iterate up to n values (expanding subarray).
- **Space Complexity:** O(n\*m)  
    - For memoization (dp table), and call stack depth up to O(n + m).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize if andValues can be very long (m close to n)?  
  *Hint: Look for pruning in partitioning, or special-case when m == n (every partition is one element).*

- Can you output the actual subarray indices, not just the sum?  
  *Hint: Maintain parent pointers or save best split positions during recursion.*

- What if the AND operation is replaced with OR, or XOR?  
  *Hint: Consider the combinatorial explosion possible with XOR (not monotonic), but OR might be similar to AND approach.*

### Summary
We used DP with memoization to optimally partition **nums** into m contiguous chunks, each matching a target AND, minimizing the sum of their end values. This is a classic segmented DP/cutting problem, and the technique applies to many cut/partition/interval DP contexts (e.g., palindrome partitioning, segmented cost minimization, etc.), especially when you can define state transitions in terms of subarray boundaries and accumulatable properties (like AND/OR/aggregation).

### Tags
Array(#array), Binary Search(#binary-search), Dynamic Programming(#dynamic-programming), Bit Manipulation(#bit-manipulation), Segment Tree(#segment-tree), Queue(#queue)

### Similar Problems
- Minimum Cost to Split an Array(minimum-cost-to-split-an-array) (Hard)
- Split With Minimum Sum(split-with-minimum-sum) (Easy)
- Find Subarray With Bitwise OR Closest to K(find-subarray-with-bitwise-or-closest-to-k) (Hard)
- Find X Value of Array II(find-x-value-of-array-ii) (Hard)