### Leetcode 3410 (Hard): Maximize Subarray Sum After Removing All Occurrences of One Element [Practice](https://leetcode.com/problems/maximize-subarray-sum-after-removing-all-occurrences-of-one-element)

### Description  
You are given an integer array `nums`. You can perform the following operation at most once:  
- Choose any integer `x` so that removing all occurrences of `x` keeps the array non-empty.
- Remove all occurrences of `x` from `nums`.

After performing this operation (possibly zero times), return the **maximum sum of a contiguous subarray** of the resulting array.  
A subarray is a contiguous, non-empty portion of the array.

### Examples  

**Example 1:**  
Input: `nums = [3, -2, 3, -3, 2]`  
Output: `6`  
*Explanation: If you remove all occurrences of -3, the array becomes [3, -2, 3, 2]. The maximum subarray sum is 3 + (-2) + 3 + 2 = 6.*

**Example 2:**  
Input: `nums = [-3, 2, -1, 3, 3]`  
Output: `7`  
*Explanation: The best option is not to delete any value. The subarray [2, -1, 3, 3] yields 2 + (-1) + 3 + 3 = 7.*

**Example 3:**  
Input: `nums = [1, -1, 2, -1, 3, -1, 4]`  
Output: `10`  
*Explanation: Remove all -1's to get [1,2,3,4]. The subarray sum is 1+2+3+4=10.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  For each unique value x in nums (or skip x altogether),  
  - Remove all occurrences of x  
  - Compute maximum subarray sum of the resulting array (standard Kadane's algorithm)  
  - Return the largest such sum  

  This is **O(n²)**: O(n) unique values, for each, scanning the array O(n).

- **Optimization:**  
  - Realize that for each distinct value x, the "after removal" array is easily obtained via one scan.
  - But doing full Kadane's O(n) for every x is still O(n²).
  - **Speedup idea:** Precompute for each position the contribution to the max subarray sum if we skip all occurrences of a given value.
  - Use a **contribution-based** approach: For each unique x, process the array keeping a running maximum Kadane's subarray sum, skipping all x's.
  - Because removal is always of *all* x's, and the input arr can contain duplicates and negatives, and removal may split the array into several fragments (between x's). The max sum is the max over all possible contiguous subarrays in the fragments.

  So,
  - For each unique value x:
    - Loop through nums, build fragments (portions between x's). For each fragment, compute max subarray sum (Kadane’s). Keep track of the biggest.
    - The answer for that x is the maximum among all fragments' max subarray sum.
  - The overall answer is the max of all x's answer, and the answer with *no removal* (original nums' max subarray sum).

  Since for each x, every element is only visited once (since fragmenting is a simple forward scan), and x count is O(n) (but usually much less), and processing all x's is O(n|U|), where |U| is the number of unique elements. If |U| is small, it's efficient for reasonable n.

### Corner cases to consider  
- All elements are identical  
- Removing all occurrences leaves the array empty (must not allow)
- Array of length 1  
- The optimal answer involves not removing any element  
- Large negative or large positive values  
- Multiple occurrences of the best-to-remove value  
- Removing any element reduces the best subarray sum  
- Input array contains only negative numbers

### Solution

```python
def maxSumAfterRemoval(nums):
    # Helper: Kadane's algorithm on a list
    def kadane(arr):
        max_ending = arr[0]
        max_so_far = arr[0]
        for num in arr[1:]:
            max_ending = max(num, max_ending + num)
            max_so_far = max(max_so_far, max_ending)
        return max_so_far

    # Compute max subarray sum without removing any element
    max_sum = kadane(nums)

    unique_vals = set(nums)
    n = len(nums)

    for val in unique_vals:
        removed = []
        has_nonval = False
        temp = []
        for x in nums:
            if x == val:
                if temp:
                    # only add non-empty splits
                    removed.append(temp)
                    temp = []
            else:
                has_nonval = True
                temp.append(x)
        if temp:
            removed.append(temp)

        # Don't consider removal if it would empty the array
        if not has_nonval:
            continue

        # Compute max subarray sum over all fragments
        best = float('-inf')
        for fragment in removed:
            best = max(best, kadane(fragment))
        max_sum = max(max_sum, best)

    return max_sum
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n × u), where u is the number of unique numbers in nums. For each unique x, we do a single scan (splitting into fragments and Kadane's). Typically, u ≪ n, so it's efficient for most cases.

- **Space Complexity:**  
  O(u × n) in the worst case if all values in nums are unique (each fragment is length 1), but more commonly O(n).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you are only allowed to remove *one* occurrence, instead of all?
  *Hint: Consider modifying standard "maximum subarray sum with at most one deletion" problem.*

- How would you handle the case where you can delete up to k distinct numbers entirely?
  *Hint: It's similar, but track all subsets of up to k unique numbers and use fragment logic.*

- Can you find the leftmost/rightmost subarray achieving the maximum sum after removal?
  *Hint: While computing fragments, retain indices to recover the answer.*

### Summary
This problem generalizes the **maximum subarray sum (Kadane's algorithm)** by adding a "remove all of x" operation, and is solved by scanning fragments between all x's for each unique x. This is a clean application of **divide-and-conquer on array fragments** and an extension of dynamic programming for single/removal-deletion maximum subarray problems. Similar logic can be applied to mutation or split problems in arrays where segments are affected by a global operation.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Segment Tree(#segment-tree)

### Similar Problems
- Maximum Subarray(maximum-subarray) (Medium)
- Maximum Subarray Sum with One Deletion(maximum-subarray-sum-with-one-deletion) (Medium)