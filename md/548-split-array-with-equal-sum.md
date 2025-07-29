### Leetcode 548 (Hard): Split Array with Equal Sum [Practice](https://leetcode.com/problems/split-array-with-equal-sum)

### Description  
Given an array of integers, determine whether it’s possible to split the array into four non-overlapping parts by choosing indices i, j, k such that:

- 0 < i, i + 1 < j, j + 1 < k < n - 1
- The sums of the following four subarrays are all equal:
    - Subarray 1: elements from index 0 to i‒1
    - Subarray 2: elements from i+1 to j‒1
    - Subarray 3: elements from j+1 to k‒1
    - Subarray 4: elements from k+1 to n‒1

Return True if such a split exists; otherwise, return False.

### Examples  

**Example 1:**  
Input: `[1,2,1,2,1,2,1]`  
Output: `True`  
Explanation:  
- i = 1, j = 3, k = 5  
- subarray(0, 0) = 1  
- subarray(2, 2) = 1  
- subarray(4, 4) = 1  
- subarray(6, 6) = 1

**Example 2:**  
Input: `[2,3,2,3,2,3,2]`  
Output: `False`  
Explanation:  
- No possible way to split such that all four required subarray sums are equal.

**Example 3:**  
Input: `[0,0,0,0,0,0,0]`  
Output: `True`  
Explanation:  
- Any valid split with enough elements can give all subarrays sum 0.

### Thought Process (as if you’re the interviewee)  
First, brute-force: Try every possible combination of i, j, k. Check if splitting as described gives equal sums. This is O(n³), which is impractical for n up to 2000.

Optimized approach:
- Use a prefix sum array so that any subarray sum can be computed in O(1).
- Fix the middle cut (j), then try all possible i to the left of j and all possible k to the right of j, while checking whether the three needed sums are equal.
- To speed things up:
    - For a fixed j, precompute subarray sums for i and store them in a set.
    - As we loop through possible k, check if a matching sum exists from the i-side and matches the k-side sum.
- This drops complexity to O(n²), which is acceptable for interview.

Trade-offs: This is faster than brute-force but does use extra space for prefix sums and a set at each j.

### Corner cases to consider  
- Arrays with less than 7 elements (not enough elements for all required subarrays and indices)
- All elements are the same or all zero
- Negative numbers
- Duplicates
- No possible valid split

### Solution

```python
def splitArray(nums):
    n = len(nums)

    # If less than 7 elements, can't split into the required 4 parts
    if n < 7:
        return False

    # Prefix sums for fast subarray sum queries
    prefix = [0] * n
    prefix[0] = nums[0]
    for i in range(1, n):
        prefix[i] = prefix[i-1] + nums[i]

    # Try each possible j (middle cut)
    # i goes from 1 to j-2, k goes from j+2 to n-2
    for j in range(3, n - 3):
        seen = set()
        # Try all left split positions i
        for i in range(1, j - 1):
            sum1 = prefix[i-1]          # sum(0, i-1)
            sum2 = prefix[j-1] - prefix[i]  # sum(i+1, j-1)
            if sum1 == sum2:
                seen.add(sum1)

        # Try all right split positions k for current j
        for k in range(j + 2, n - 1):
            sum3 = prefix[k-1] - prefix[j]      # sum(j+1, k-1)
            sum4 = prefix[n-1] - prefix[k]      # sum(k+1, n-1)
            if sum3 == sum4 and sum3 in seen:
                return True

    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²), because for each possible j (O(n)), we may check up to O(n) i and k positions.
- **Space Complexity:** O(n) for the prefix sum array, plus up to O(n) space for the `seen` set per j.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you are to return all possible splits (the indices), not just whether one exists?  
  *Hint: Instead of returning early, collect all valid (i, j, k) triples.*

- How would you solve this for an unknown number of splits, say, k equal-sum subarrays?  
  *Hint: Consider generalizing partition logic and recursion.*

- How does your solution behave if elements can be very large or very small (risking integer overflow)?  
  *Hint: Discuss constraints and data types.*

### Summary
This is a classic prefix sum + hash set problem, with **partitioning** and **subarray-sum manipulation.** The technique of fixing a middle cut and scanning both sides for possible splits (storing partial results in a set) is common in subarray partitioning problems and comes up in interview settings when optimizing nested loops. Variants can appear for any “split into parts with equal sum” style question, and the prefix sum trick is broadly reusable.