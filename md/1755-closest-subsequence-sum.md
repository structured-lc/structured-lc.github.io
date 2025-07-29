### Leetcode 1755 (Hard): Closest Subsequence Sum [Practice](https://leetcode.com/problems/closest-subsequence-sum)

### Description  
Given a list of integers `nums` and an integer `goal`, select any subsequence (can be empty or non-contiguous) whose sum is as close as possible to `goal`. Return the minimum possible absolute difference between the subsequence sum and the goal.  
A subsequence means we can skip any elements, keeping order.

### Examples  

**Example 1:**  
Input: `nums = [5, -7, 3, 5]`, `goal = 6`  
Output: `0`  
*Explanation: Choosing the whole array gives sum 6, which exactly matches the goal.*

**Example 2:**  
Input: `nums = [7, -9, 15, -2]`, `goal = -5`  
Output: `1`  
*Explanation: Subsequence [7, -9, -2] has sum = -4. abs(-4 - (-5)) = 1.*

**Example 3:**  
Input: `nums = [1, 2, 3]`, `goal = -7`  
Output: `7`  
*Explanation: Choosing no elements means sum = 0. abs(0 - (-7)) = 7, which is the smallest possible.*

### Thought Process (as if you’re the interviewee)  
- **Brute force idea:**  
  Try all possible subsets (2ⁿ possibilities), calculate each sum, and track the minimal |sum - goal|.  
  This has O(2ⁿ × n) time because each subset takes O(n) to compute the sum, which is not feasible for n up to 40.

- **Optimization:**  
  Use **"Meet in the Middle"**.  
  1. Split nums into two halves.
  2. Generate all possible subset sums for each half (2^{n/2} for each).  
  3. For each sum from the first half, find in the second-half list the sum such that their total is closest to `goal`. This can be efficiently done by sorting the second half sums and using binary search.
  4. For each pair, track the minimum absolute difference with `goal`.

- **Why this works:**  
  Splitting reduces exponential complexity to O(2^{n/2} × log(2^{n/2})), making it practical for n ≤ 40.

- **Trade-offs:**  
  More space is used for storing all subset sums, but the time savings are huge.

### Corner cases to consider  
- Empty array ⇒ Only possible sum is 0.
- All elements are negative or all positive.
- goal far outside possible sum range.
- Duplicated elements.
- One element (single choice subsequence).
- Choosing the empty subsequence.

### Solution

```python
from bisect import bisect_left

def closestSubsequenceSum(nums, goal):
    # Helper function to compute all possible subsequence sums for a list
    def get_subseq_sums(arr):
        # Start with sum 0 (empty subsequence)
        sums = [0]
        for num in arr:
            new_sums = [num + s for s in sums]
            sums += new_sums
        return sums

    n = len(nums)
    mid = n // 2

    left_part = nums[:mid]
    right_part = nums[mid:]

    # All possible sums for left and right halves
    left_sums = get_subseq_sums(left_part)
    right_sums = get_subseq_sums(right_part)
    right_sums.sort()

    min_diff = float('inf')

    # For each sum on the left, binary search in right_sums for the closest complement
    for l in left_sums:
        target = goal - l
        idx = bisect_left(right_sums, target)

        # Check the right sum just before or at idx (since right_sums is sorted)
        if idx < len(right_sums):
            s = l + right_sums[idx]
            min_diff = min(min_diff, abs(s - goal))
        if idx > 0:
            s = l + right_sums[idx - 1]
            min_diff = min(min_diff, abs(s - goal))

    return min_diff
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(2⁽ⁿᐟ²⁾ × log(2⁽ⁿᐟ²⁾))  
  Generating all sums for both halves is O(2⁽ⁿᐟ²⁾) each. Sorting one half is O(2⁽ⁿᐟ²⁾ × log(2⁽ⁿᐟ²⁾)). Each left sum is processed in O(log(2⁽ⁿᐟ²⁾)) via binary search.

- **Space Complexity:**  
  O(2⁽ⁿᐟ²⁾) for storing all possible sums for each half.


### Potential follow-up questions (as if you’re the interviewer)  

- What if nums can be up to length 100?
  *Hint: Meet-in-the-middle is not sufficient; can you use pseudo-polynomial DP or approximation?*

- Can you reconstruct the subsequence (not just the sum) achieving the minimal abs difference?
  *Hint: Track subset indices or pathways during subset sum generation.*

- How would you modify the algorithm if negative numbers are not allowed?
  *Hint: Use regular DP for subset sum; complexity may drop as possible sums are limited.*

### Summary
The problem uses a classic **meet-in-the-middle** strategy to tame exponential enumeration of subset sums when n is moderately small (n ≤ 40). By splitting into two halves, building all possible subset sums for each, and efficiently searching with binary search, we achieve a practical and elegant solution. This divide-and-conquer pattern is common in subset-related and knapsack problems when full enumeration is otherwise prohibitive.