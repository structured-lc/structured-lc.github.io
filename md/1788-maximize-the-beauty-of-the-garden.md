### Leetcode 1788 (Hard): Maximize the Beauty of the Garden [Practice](https://leetcode.com/problems/maximize-the-beauty-of-the-garden)

### Description  
Given an array `flowers` where each element represents the beauty value of flowers in a line, you can remove any number of flowers (possibly none) to create a **valid garden**.  
A garden is **valid** if it satisfies:
- It has at least two flowers.
- The first and last flowers have the same beauty value.

You must maximize the total beauty (sum of remaining flowers’ beauties) of the resulting valid garden.

**Example format:**  
Given an array, you can select any subarray (removing flowers from either end, possibly from the middle as well), as long as the subarray starts and ends with the same value (can be at different indices) and contains at least two elements.  

### Examples  

**Example 1:**  
Input: `flowers = [1,2,3,1,2]`  
Output: `8`  
Explanation:  
Pick the subarray `[2,3,1,2]` (indices 1 to 4):  
- First and last are `2`, length ≥ 2.
- Total beauty = 2 + 3 + 1 + 2 = 8.

**Example 2:**  
Input: `flowers = [5,5,5]`  
Output: `15`  
Explanation:  
Pick the entire array `[5,5,5]`:
- First & last are `5`, length 3.
- Beauty = 5 + 5 + 5 = 15.

**Example 3:**  
Input: `flowers = [3,1,-2,3]`  
Output: `5`  
Explanation:  
Pick the subarray `[3,1,-2,3]` (whole array):  
- Starts and ends with `3`
- Beauty = 3 + 1 + (-2) + 3 = 5.

### Thought Process (as if you’re the interviewee)  

Start by brute-forcing all possible subarrays of length ≥ 2 where the first and last element are equal; calculate the sum of each and track the maximum.  
However, that is O(n²) and won’t scale.

Since only the first and last values matter and elements in-between can be anything, we want, for each number, the *maximum beauty sum* between every pair of its occurrences.

Optimization:
- Store the first and last index for each unique value.
- For each value, consider the subarray from its first occurrence to its last occurrence (must be at least size 2).
- To efficiently get subarray sums, use prefix sums.
- For the best sum, ignore (set to 0) negative values between the two occurrences.

But if values in between are negative, we can just “skip” them for maximizing beauty; so, it's optimal to keep all positive values between the two instances.

So, compute prefix sums of max(flower, 0) to fetch the total sum between two indices.

Approach:
- For each value, track:
  - The earliest and latest index it appears.
- For each unique value, for the `[l, r]` window from the first to last occurrence (l < r), compute:
  - beauty = flowers[l] + flowers[r] + sum of all positive beauties between l+1 and r-1.
- Maximize over all such windows.

### Corner cases to consider  
- All flowers are unique (no value repeats): can't form a valid garden.
- Values are negative: only the endpoints *must* be included; all in-between negative values should be skipped (added as 0 in sum).
- All zeros.
- Only two flowers (must keep both).
- Max sum may be at the ends or somewhere in the middle.

### Solution

```python
def maximumBeauty(flowers):
    n = len(flowers)
    # Compute prefix sums where each entry is sum of max(f,0) for flowers[0:i]
    prefix = [0] * (n + 1)
    for i in range(n):
        prefix[i + 1] = prefix[i] + max(flowers[i], 0)
    
    # Track first and last occurrence of each value
    first_pos = {}
    last_pos = {}
    for idx, value in enumerate(flowers):
        if value not in first_pos:
            first_pos[value] = idx
        last_pos[value] = idx
    
    ans = float('-inf')
    for value in first_pos:
        l = first_pos[value]
        r = last_pos[value]
        if l < r:  # must have at least two flowers (l != r)
            # beauty = sum of all flowers in range [l, r]:
            # - include both endpoints (even if negative)
            # - for (l+1, r-1), sum max(f, 0)
            # So:
            # - sum_between = prefix[r] - prefix[l + 1]
            beauty = flowers[l] + flowers[r]
            sum_between = prefix[r] - prefix[l + 1]
            total_beauty = beauty + sum_between
            ans = max(ans, total_beauty)
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  - Prefix sum: O(n)
  - First/last pos: O(n)
  - Final scan: O(n)
  - No nested loops; all operations are linear.
- **Space Complexity:** O(n).  
  - For prefix sum array (size n+1).
  - For the mapping dictionaries (could be up to O(n) in degenerate case with all unique values).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle this if values could be repeated anywhere and you could skip elements in-between, not just take the window between the first and last occurrence?  
  *Hint: This becomes more like a maximum subarray problem with skipping, or considering intervals for each pair of matching values.*

- Can you modify the approach to actually return the indices of the subarray with the maximal beauty?  
  *Hint: Store the actual indices when you update the maximum.*

- What if we want to maximize beauty for gardens where the first and last element can be any value (not necessarily equal), but must be at least k apart?  
  *Hint: This could generalize to maximum subarrays of length ≥ k, possibly using sliding window.*

### Summary
We used the prefix sum pattern and hash maps to quickly answer "what is the max sum subarray that starts and ends with the same element?"—the common variant is start/end indices or prefix-sum intervals with additional logic at bounds.  
This is an instance of sliding-window/prefix-sum optimizations and can be seen in problems where subarrays must satisfy a property at the ends, for example, palindromic segments or matching boundary conditions.