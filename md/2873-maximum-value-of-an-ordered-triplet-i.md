### Leetcode 2873 (Easy): Maximum Value of an Ordered Triplet I [Practice](https://leetcode.com/problems/maximum-value-of-an-ordered-triplet-i)

### Description  
Given a 0-indexed integer array `nums`, find the **maximum value** of an ordered triplet \((i, j, k)\) such that \(0 ≤ i < j < k < n\), where the value is defined as **(nums[i] - nums[j]) × nums[k]**.  
If *all such triplet values are negative*, return `0`.

### Examples  

**Example 1:**  
Input: `nums = [12, 6, 1, 2, 7]`  
Output: `77`  
*Explanation: Choose i=0, j=2, k=4. (nums - nums[2]) × nums[4] = (12 - 1) × 7 = 11 × 7 = 77. No other triplet yields a higher value.*

**Example 2:**  
Input: `nums = [1, 10, 3, 4, 19]`  
Output: `133`  
*Explanation: Choose i=1, j=2, k=4. (nums[1] - nums[2]) × nums[4] = (10 - 3) × 19 = 7 × 19 = 133.*

**Example 3:**  
Input: `nums = [1, 2, 3]`  
Output: `0`  
*Explanation: Only possible triplet is (0, 1, 2), (1 - 2) × 3 = -1 × 3 = -3. No positive answer, so return 0.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Try all possible triplets (i, j, k) with i < j < k. For each, calculate (nums[i] - nums[j]) × nums[k].  
  This approach is O(n³), which will be slow for n up to 100.

- **Optimize:**  
  Notice that for each j, k (where j < k), the best i is the one before j that maximizes nums[i].  
  But even better:  
  - For each j, precompute the maximum value to its left (i < j).
  - For each j, precompute the maximum value to its right (k > j).
  - For each j, try all possible i < j and k > j efficiently using precalculated arrays.
  - However, since the formula is (nums[i] - nums[j]) × nums[k], and for each (j, k) we want the largest nums[i] before j, a further simplified approach is to:  
    - For each j, keep track of the maximum nums[i], i < j.
    - For each k, keep track of maximum nums[k], k > j.
    - Iterate all pairs (j, k), or all pairs (i, j), and use precomputed max values.

  - **Best O(n²) approach for constraints:**  
    - Precompute for each j, the max_to_left[j] (maximum nums[i] for i < j)
    - Precompute for each j, the max_to_right[j] (maximum nums[k] for k > j)
    - For each j (1 to n-2):  
        - For i < j, use max_to_left[j] as nums[i]  
        - For k > j, use max_to_right[j] as nums[k]  
        - Compute (max_to_left[j] - nums[j]) × max_to_right[j]
        - Track the maximum obtained.
    - Constraints are small, so O(n²) is acceptable.

- Since `nums.length ≤ 100`, O(n²) is fine and easy to implement.

### Corner cases to consider  
- All values are equal (e.g., `[3, 3, 3]`)
- Array is strictly increasing or decreasing
- The only possible triplet produces a negative or zero result
- Large vs small numbers
- Positive or negative results only

### Solution

```python
def maximumTripletValue(nums):
    n = len(nums)
    max_ans = 0

    # Precompute the maximum to the right of each index
    max_right = [0] * n
    cur_max = float('-inf')
    for i in range(n-1, -1, -1):
        max_right[i] = cur_max
        cur_max = max(cur_max, nums[i])

    max_left = float('-inf')
    # Iterate over all possible j
    for j in range(1, n-1):
        max_left = max(max_left, nums[j-1])  # largest nums[i] to the left of j
        if max_right[j] == float('-inf'):
            continue  # no k > j
        value = (max_left - nums[j]) * max_right[j]
        max_ans = max(max_ans, value)

    return max_ans if max_ans > 0 else 0
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  We traverse the array a few times:  
  - Once to precompute max_right (O(n)),
  - Once in the main loop (O(n)).  
  So overall, O(n).
- **Space Complexity:** O(n)  
  - We use an extra array of size n for max_right.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you solve this using O(1) extra space?  
  *Hint: Is the precomputation strictly necessary?*

- How would you return the actual triplet indices, not just the value?  
  *Hint: Track the best indices during computation.*

- If the formula changed to (nums[i] + nums[j]) × nums[k], what adjustments are needed?  
  *Hint: Rethink what you need to maximize/minimize.*

### Summary
This problem uses the **prefix/suffix maximums** technique—a common pattern for efficiently answering range queries and finding optimal triplets or subarrays. Precomputing maximums lets you reduce a brute-force O(n³) check down to an efficient linear scan and is a staple skill in coding interviews.

### Tags
Array(#array)

### Similar Problems
- Number of Arithmetic Triplets(number-of-arithmetic-triplets) (Easy)
- Minimum Sum of Mountain Triplets I(minimum-sum-of-mountain-triplets-i) (Easy)