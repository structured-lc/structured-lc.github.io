### Leetcode 2035 (Hard): Partition Array Into Two Arrays to Minimize Sum Difference [Practice](https://leetcode.com/problems/partition-array-into-two-arrays-to-minimize-sum-difference)

### Description  
Given an integer array nums of length 2n, partition it into two arrays of length n each, so that the absolute difference between the sums of the two arrays is minimized.  
You must pick every element into either array, with no overlap. Return the minimum absolute difference possible between the sums after such a partition.

### Examples  

**Example 1:**  
Input: `nums = [3,9,7,3]`  
Output: `2`  
*Explanation: We can partition as [3,9] and [7,3]. Sums are 12 and 10. |12-10| = 2, which is the minimal possible.*

**Example 2:**  
Input: `nums = [1,2,3,4,5,6]`  
Output: `1`  
*Explanation: Partition as [1,6,3] and [2,4,5] (sums 10 and 11). |10-11| = 1. No lower sum difference is possible.*

**Example 3:**  
Input: `nums = [1,2]`  
Output: `1`  
*Explanation: Only partitioning is [1] and [2]. |1-2| = 1.*

### Thought Process (as if you’re the interviewee)  

- Start by observing we are to split 2n elements into two groups of n, minimizing the absolute difference of their sums.
- Brute-force would involve checking all combinations of picking n elements from 2n, which is extremely slow (C(2n, n) possible divisions).
- To optimize, consider a **meet-in-the-middle** approach.  
  - Split nums into two halves of n each.
  - For each half, compute all possible sums by picking k elements (k in 0..n).
  - For each k, store all possible sum values and, for the complementary k in the other half, try to match so total sum is closest to half the original array sum.
- This significantly reduces the search space (from O(2²ⁿ) to roughly O(n × 2ⁿ)).
- Sorting and binary search help quickly find the complementing sum in the other half.

### Corner cases to consider  
- Input length of 2 (smallest possible).
- All elements equal (e.g., [5,5,5,5]).
- Very large positive and negative values.
- One half is all large and other half all small.
- Sums being exactly equal (difference 0).
- n = 1 (edge case).

### Solution

```python
from bisect import bisect_left

def minimumDifference(nums):
    n = len(nums) // 2
    total_sum = sum(nums)

    left_nums = nums[:n]
    right_nums = nums[n:]

    # Generate all possible k-element sums for both halves, up to n
    l_sums = [[] for _ in range(n + 1)]
    r_sums = [[] for _ in range(n + 1)]

    def dfs(arr, i, count, path_sum, out):
        if i == len(arr):
            out[count].append(path_sum)
            return
        # Include arr[i]
        dfs(arr, i+1, count+1, path_sum + arr[i], out)
        # Exclude arr[i]
        dfs(arr, i+1, count, path_sum, out)

    dfs(left_nums, 0, 0, 0, l_sums)
    dfs(right_nums, 0, 0, 0, r_sums)

    ans = float('inf')
    # For each way to split left and right, try all possible sum pairs
    for k in range(n + 1):
        l = l_sums[k]
        r = r_sums[n - k]
        r.sort()
        for l_sum in l:
            # Our goal is to split so one side sums to target_sum
            # Find r_sum closest to target_sum - l_sum
            target = total_sum//2 - l_sum
            idx = bisect_left(r, target)
            # Try r_sum at idx (>= target)
            if idx < len(r):
                s1 = l_sum + r[idx]
                s2 = total_sum - s1
                ans = min(ans, abs(s1 - s2))
            # Try r_sum just below target
            if idx > 0:
                s1 = l_sum + r[idx-1]
                s2 = total_sum - s1
                ans = min(ans, abs(s1 - s2))
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n × 2ⁿ + n × 2ⁿ × log(2ⁿ)), because for each subset size `k` we consider all combinations in both halves (O(2ⁿ)), and for each sum, binary search in the other half's list (with up to O(2ⁿ) sums each).

- **Space Complexity:**  
  O(n × 2ⁿ), for storing the possible subset sums for each count in both halves.

### Potential follow-up questions (as if you’re the interviewer)  

- If the size of nums is not guaranteed to be even, how would you solve it?  
  *Hint: Think about partition sizes and allow one subset to be one element larger.*

- Can you generalize this approach for more than two partitions?  
  *Hint: Explore k-way partition and its complexity.*

- What if some elements are negative?  
  *Hint: Do you need to change your logic, or will it still work?*

### Summary
This problem showcases the **meet-in-the-middle** technique, useful when n is moderate (≤ 15), and exhaustive search is otherwise infeasible. The partition/split-subset logic is common in optimization and subset-sum variants, and the binary search for closest sums appears in a number of advanced backtracking problems. This approach—with careful precomputation—enables efficiently minimizing differences among subsets beyond the classic subset sum scenario.