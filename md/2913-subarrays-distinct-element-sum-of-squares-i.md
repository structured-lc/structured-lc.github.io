### Leetcode 2913 (Easy): Subarrays Distinct Element Sum of Squares I [Practice](https://leetcode.com/problems/subarrays-distinct-element-sum-of-squares-i)

### Description  
Given a 0-indexed integer array `nums`, for every contiguous subarray (`nums[i..j]` for all 0 ≤ i ≤ j < n), compute the number of **distinct** elements in that subarray, square it, and sum this value across all subarrays.  
Return the total sum.

A **subarray** is any contiguous sub-sequence of the array (not necessarily unique). The **distinct count** for a subarray is the number of unique numbers within that subarray.

### Examples  

**Example 1:**  
Input: `nums = [1,2,1]`  
Output: `15`  
*Explanation:  
Six possible subarrays are:  
[1]: 1 distinct → 1² = 1  
[2]: 1 distinct → 1² = 1  
[1]: 1 distinct → 1² = 1  
[1,2]: 2 distinct → 2² = 4  
[2,1]: 2 distinct → 2² = 4  
[1,2,1]: 2 distinct → 2² = 4  
Total sum = 1 + 1 + 1 + 4 + 4 + 4 = 15.*

**Example 2:**  
Input: `nums = [1,1]`  
Output: `3`  
*Explanation:  
Subarrays:  
[1]: 1 distinct → 1² = 1  
[1]: 1 distinct → 1² = 1  
[1,1]: 1 distinct → 1² = 1  
Total = 1 + 1 + 1 = 3.*

**Example 3:**  
Input: `nums = [2,3,2]`  
Output: `15`  
*Explanation:  
Subarrays:  
[2]: 1 distinct → 1² = 1  
[3]: 1 distinct → 1² = 1  
[2]: 1 distinct → 1² = 1  
[2,3]: 2 distinct → 2² = 4  
[3,2]: 2 distinct → 2² = 4  
[2,3,2]: 2 distinct → 2² = 4  
Total: 1 + 1 + 1 + 4 + 4 + 4 = 15.*

### Thought Process (as if you’re the interviewee)  
Start with a brute-force, clear solution:  
- Generate all subarrays, for each, count the number of unique elements, square it, and add to the running sum.
- Since n ≤ 100, there are at most n(n+1)/2 ≈ 5,000 subarrays, making brute-force practical.
  - For each subarray, counting unique values can be done using a set in O(L), where L is subarray length. Overall O(n³) in worst case, but still acceptable for small n.
- For an optimized approach:
  - Can use a frequency map to maintain the unique count as the right end of subarray increases, but since we evaluate all subarrays, and unique values are in small range (≤ 100), it's likely not a significant speedup for these constraints.  
  - A frequency array (since 1 ≤ nums[i] ≤ 100) can also be used instead of a set if optimizing inner loop.

For interview: I would choose the double-loop (i, j) method with a set or frequency array, as it's readable and performant enough for this problem size.

### Corner cases to consider  
- Empty array (problem constraints: n ≥ 1, so safe)
- All elements are the same
- All elements are unique
- Array of length 1
- Elements at min/max values in allowed range (1 and 100)

### Solution

```python
def sum_of_distinct_squares(nums):
    n = len(nums)
    total = 0

    for i in range(n):
        # Use a frequency counter for values 1..100
        freq = [0] * 101
        distinct = 0

        for j in range(i, n):
            if freq[nums[j]] == 0:
                distinct += 1
            freq[nums[j]] += 1

            total += distinct * distinct  # Add current subarray's result

    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²)  
  For each starting index i (from 0 to n-1), we extend subarrays to every j (i ≤ j < n), doing O(1) work to update distinct count using the fixed-size frequency array. With n ≤ 100, this is acceptable.
- **Space Complexity:** O(1) extra (excluding input):  
  Only a fixed-size frequency array (~101 elements) is needed for any subarray, regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- Could you compute this for much larger arrays efficiently?
  *Hint: Sliding window or inclusion-exclusion, rethink counting faster than brute-force for long arrays.*

- How would you modify the algorithm if you wanted the sum of cubes (or a general power) of the distinct count?
  *Hint: Only a single line change if power is fixed, or parameterize the power function.*

- Could you adapt this to count only subarrays of a certain length?
  *Hint: Restrict the j-i+1 range in the inner loop.*

### Summary
This problem is solved by generating all subarrays and counting the distinct values in each, squaring that count and summing up.  
It uses a common brute-force subarrays enumeration pattern with a minor optimization (frequency array for fast unique counting), which is broadly useful for similar small-n sliding-window or distinct-counting subarray problems. This approach is practical thanks to the modest input limits.

### Tags
Array(#array), Hash Table(#hash-table)

### Similar Problems
