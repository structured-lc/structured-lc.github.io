### Leetcode 2552 (Hard): Count Increasing Quadruplets [Practice](https://leetcode.com/problems/count-increasing-quadruplets)

### Description  
Given an array `nums` of length n, count the number of quadruplets (i, j, k, l) such that 0 ≤ i < j < k < l < n and nums[i] < nums[k] < nums[j] < nums[l].  
In other words, count how many ways we can pick four strictly increasing indices where the numbers at i is less than at k, which is less than at j, which is less than at l.

### Examples  

**Example 1:**  
Input: `nums = [1,3,2,4,5]`  
Output: `2`  
*Explanation: The quadruplets are (0,2,3,4) with values (1,2,4,5) and (0,2,3,4) with values (1,3,4,5).*

**Example 2:**  
Input: `nums = [3,1,4,2,5]`  
Output: `2`  
*Explanation: The quadruplets are (1,2,3,4) (1,2,4,5) using values 1,4,2,5 and 1,4,2,5.*

**Example 3:**  
Input: `nums = [4,3,2,1]`  
Output: `0`  
*Explanation: The array is decreasing, so there are no increasing quadruplets.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  The naive approach is to try all possible quadruplets with four nested loops, checking for 0 ≤ i < j < k < l < n and whether nums[i] < nums[k] < nums[j] < nums[l]. This has O(n⁴) complexity, which is not feasible for even modest n.

- **Optimizing:**  
  To optimize, think about fixing two indices, say j and k, with j < k. For each such pair, count:
    - the number of i < j with nums[i] < nums[k]
    - the number of l > k with nums[j] < nums[l]

  The total quadruplets contributed by each (j, k) pair is count_left × count_right.  
  For each (j, k):  
    - count_left: count of i such that 0 ≤ i < j and nums[i] < nums[k]
    - count_right: count of l such that k < l < n and nums[j] < nums[l]
  Iterate j from 1 to n - 3 and k from j + 1 to n - 2.

  This brings the time complexity down to O(n³) — for each (j, k), O(n) time for counting. But we can do better using precomputation or prefix/suffix arrays.

- **Further optimization:**  
  By using prefix and suffix counts for all values and indices, we can bring this to O(n²). For each (j, k) pair, precompute the count of valid i's and l's efficiently.

### Corner cases to consider  
- Array length < 4 (cannot form quadruplets)
- Array is sorted descending (no valid quadruplets)
- Duplicates in 'nums' (problem states strictly increasing, so equal values cannot be used)
- All numbers same (again, answer should always be 0)
- Empty array

### Solution

```python
def countQuadruplets(nums):
    n = len(nums)
    if n < 4:
        return 0
    
    # Precompute right greater: right_greater[k][val]
    # Count how many elements to the right of position k are > val
    right_greater = [[0]*(n+2) for _ in range(n)]
    for k in range(n):
        cnt = 0
        greater = [0]*(n+2)
        for l in range(n-1, k, -1):
            if nums[l] > nums[k]:
                cnt += 1
            greater[l] = cnt
        right_greater[k] = greater[:]
    
    result = 0
    # For each j, go through k where k > j
    for j in range(1, n-2):
        for k in range(j+1, n-1):
            # Count of i: i < j, nums[i] < nums[k]
            count_i = 0
            for i in range(j):
                if nums[i] < nums[k]:
                    count_i += 1
            # Count of l: l > k, nums[j] < nums[l]
            count_l = 0
            for l in range(k+1, n):
                if nums[j] < nums[l]:
                    count_l += 1
            result += count_i * count_l
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n³).  
  For every (j, k) pair (O(n²)), we scan left for i (O(n)), and scan right for l (O(n)).
- **Space Complexity:** O(n²).  
  For storing right_greater lookups and any temporary counts.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you bring the solution down to O(n²)?  
  *Hint: Use prefix or suffix count arrays so that queries for counts of smaller/greater elements are O(1).*

- How would you handle extremely large integer ranges in 'nums'?  
  *Hint: You cannot use counting sort or indexing; consider value compression or segment trees.*

- What if we want quadruplets in non-strictly increasing order?  
  *Hint: Adjust conditions to include equality as allowed in the < relations.*

### Summary
This problem is a variation on subarray counting and order-statistic queries. The pattern — "count the number of valid pairs/triples/etc. with order constraints" — can be seen in classic problems like counting inversions (merge sort), increasing subsequences (DP), or quadruplets with constraints (prefix/suffix technique). Optimizations usually involve prefix sums, value compression, or Binary Indexed Trees for real interviews.


### Flashcard
Fix j and k, count i < j with nums[i] < nums[k] and l > k with nums[j] < nums[l]; multiply counts for each (j,k) pair.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Binary Indexed Tree(#binary-indexed-tree), Enumeration(#enumeration), Prefix Sum(#prefix-sum)

### Similar Problems
- Increasing Triplet Subsequence(increasing-triplet-subsequence) (Medium)
- Count Special Quadruplets(count-special-quadruplets) (Easy)
- Count Good Triplets in an Array(count-good-triplets-in-an-array) (Hard)