### Leetcode 3287 (Hard): Find the Maximum Sequence Value of Array [Practice](https://leetcode.com/problems/find-the-maximum-sequence-value-of-array)

### Description  
Given an integer array **nums** and a positive integer **k**, you are to select any subsequence of length 2 × k (i.e. pick any 2k elements in any order).  
Partition the chosen 2k elements into two groups of size k each:  
- The value of the sequence is defined as:  
  (**bitwise-OR of the first k elements**) XOR (**bitwise-OR of the last k elements**).  
Your task is to return the maximum value possible for any such subsequence.

### Examples  

**Example 1:**  
Input: `nums = [2,6,7]`, `k = 1`  
Output: `5`  
*Explanation: The subsequence [2, 7] gives the value 2 XOR 7 = 5. No other subsequence of length 2 gives a higher value.*

**Example 2:**  
Input: `nums = [4,2,5,6,7]`, `k = 2`  
Output: `2`  
*Explanation:  
Pick [4,5,6,7] as the subsequence.  
Group-1: [4,5], Group-2: [6,7].  
OR([4,5]) = 4|5 = 5  
OR([6,7]) = 6|7 = 7  
So value = 5 XOR 7 = 2.  
Trying all other pairs gives at most 2.*

**Example 3:**  
Input: `nums = [1,1,1,1]`, `k = 2`  
Output: `0`  
*Explanation:  
Any 4 elements will be two groups of [1,1], [1,1].  
OR([1,1]) = 1, so the value is 1 XOR 1 = 0.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force Idea:**  
  The naive method is to choose every possible subsequence of 2k elements from nums, then enumerate all partitions into two sets of k each, compute the OR of each set, and XOR them.  
  As both selecting subsequences and splitting into two groups of size k are combinatorial (C(n,2k) × "number of ways to split into two size-k groups" is huge), this is infeasible, especially since n ≤ 400.

- **Optimization:**  
  Notice that k ≤ n/2 and nums[i] < 128 (all values fit in 7 bits).  
  - Since the value depends only on OR and XOR results, we can try all possible k-element OR subsets efficiently.  
  - Use DP: dp[i][j][S], where i = position, j = number of elements chosen for the left group, and S = their current OR, to keep track of the best possible result for each (number of elements picked, their OR).  
  - For the right set, iterate the remaining and combine efficiently using prefix/suffix DP or bitmask DP since values are small.

- **Efficient Solution:**  
  Fix the left group of k elements and track their OR, then pick the right group of k elements from the rest, track their OR, and combine for maximal XOR.  
  By iterating through all possible ways to pick k elements and keeping their OR values in a map, we can check maximal combinations.  
  Constraints on nums[i] make this DP and bitmask approach tractable.

- **Trade-offs:**  
  We avoid overcounting and optimize by focusing on OR-values (since the OR can only produce 128 possible results), reducing the state space.

### Corner cases to consider  
- All elements are the same.  
- k = 1 (only two numbers selected; the answer is just maximized aᵢ XOR aⱼ for all pairs).  
- nums contains both very small and very large values (in terms of bits set).  
- nums has length exactly 2k (must partition the full array into two groups).  
- Large k but many duplicate elements.

### Solution

```python
def maximum_sequence_value(nums, k):
    from itertools import combinations

    n = len(nums)

    # Special case: k == 1 (just maximize aᵢ XOR aⱼ for all i < j)
    if k == 1:
        res = 0
        for i in range(n):
            for j in range(i+1, n):
                res = max(res, nums[i] ^ nums[j])
        return res

    # DP approach for general k: Use bitmask since OR result can only be up to 127 (7 bits)
    from collections import defaultdict

    # dp1[i][or_val] = exists: can we pick i elements whose OR is or_val (from nums)
    # For counting, we need not only existence, but *which indices* are picked for left set
    dp_left = [defaultdict(set) for _ in range(k+1)]
    dp_left[0][0] = set([()])

    # for each number, try to add to relevant dp[k][OR]
    for idx, num in enumerate(nums):
        # reverse to not overwrite current layer
        for cnt in range(min(k-1, idx), -1, -1):
            for or_val in dp_left[cnt]:
                for comb in dp_left[cnt][or_val]:
                    next_comb = comb + (idx,)
                    next_or = or_val | num
                    if next_comb not in dp_left[cnt+1][next_or]:
                        dp_left[cnt+1][next_or].add(next_comb)

    ans = 0

    # Now, for each possible left group of k indices, try all possible k indices for the right group not overlapping
    # Build a similar dp for right
    for or_left in dp_left[k]:
        for left_tuple in dp_left[k][or_left]:
            # mask indices used
            used = set(left_tuple)
            # build right set from unused indices
            right_nums = [nums[i] for i in range(n) if i not in used]
            m = len(right_nums)
            dp_right = defaultdict(set)
            dp_right[0].add( (0, ()) )
            for idx_r, num_r in enumerate(right_nums):
                for cnt in range(min(k-1, m-1), -1, -1):
                    for or_val, comb in list(dp_right[cnt]):
                        next_or = or_val | num_r
                        next_comb = comb + (idx_r,)
                        dp_right[cnt+1].add( (next_or, next_comb) )
            for or_right, _ in dp_right[k]:
                val = or_left ^ or_right
                ans = max(ans, val)

    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  For k = 1, O(n²).  
  For general k, O(C(n, k) × C(n-k, k) × max OR values), but with OR-value cardinality limited to 128, and n ≤ 400 & k ≤ 200, it is tractable.  
  The dominating cost is iterating over all k-combinations and mapping OR values, which is optimized using DP and bitmasks.

- **Space Complexity:**  
  O( (n choose k) ) for the dp structures, but storing only the OR values and representatives. Since values are capped at 128 unique ORs, practical space is much less.

### Potential follow-up questions (as if you’re the interviewer)  

- What if n is even larger (e.g. up to 2000)?
  *Hint: Explore greedy and bit-pruning. Can we avoid full enumeration?*

- What if instead of bitwise-OR, we used sum or product in the group calculation?
  *Hint: How does sum behave differently from OR in terms of combining states?*

- How would you modify your approach to return the actual subsequence (not just the value)?
  *Hint: Track sets/paths during DP for reconstruction.*

### Summary
This problem applies **combinatorial DP** and **bitmask optimization** based on bitwise-OR properties, keeping the solution feasible despite the exponentially many possible groupings. The key insight is leveraging the small universal set of possible OR values and canonicalizing group selections to prune redundant exploration.  
This coding pattern—decomposing into state-DP over subsets and tracking compact aggregations (like OR, AND, XOR)—is frequent in subset, bitwise, and selection partition problems. It can be adapted for similar 'split and maximize/minimize' scenarios with symmetric group operations.


### Flashcard
Use DP with bitmask to represent selected elements; for each state, track the maximum XOR of (OR of first k elements) XOR (OR of last k elements) among all valid 2k-element subsequences.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Bit Manipulation(#bit-manipulation)

### Similar Problems
- Bitwise ORs of Subarrays(bitwise-ors-of-subarrays) (Medium)