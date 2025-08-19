### Leetcode 2574 (Easy): Left and Right Sum Differences [Practice](https://leetcode.com/problems/left-and-right-sum-differences)

### Description  
Given an integer array, compute a new array where each index contains the absolute difference between the sum of elements to its left and the sum of elements to its right. For the iᵗʰ index, leftSum[i] is the sum before i, rightSum[i] is the sum after i. If there are no elements left/right, sum is 0.

### Examples  

**Example 1:**  
Input: `[10, 4, 8, 3]`  
Output: `[15, 1, 11, 22]`  
*Explanation:*
- leftSum = `[0, 10, 14, 22]`
- rightSum = `[15, 11, 3, 0]`
- result = `[|0-15|, |10-11|, |14-3|, |22-0|] = [15, 1, 11, 22]`

**Example 2:**  
Input: `[2, 5, 1, 6, 1]`  
Output: `[13, 6, 0, 7, 14]`  
*Explanation:*
- leftSum = `[0, 2, 7, 8, 14]`
- rightSum = `[13, 8, 7, 1, 0]`
- result = `[|0-13|, |2-8|, |7-7|, |8-1|, |14-0|] = [13, 6, 0, 7, 14]`

**Example 3:**  
Input: `[1]`  
Output: ``  
*Explanation:*
- leftSum = ``
- rightSum = ``
- result = `[|0-0|] = `

### Thought Process (as if you’re the interviewee)  
Start with the brute-force idea:  
- For each index, sum up all elements to its left and all to its right, then compute their difference.
- This is O(n²) time, since for every element, we rescan a variable section of the array.

To optimize, notice we can precompute cumulative sums:
- Calculate the total sum first.
- As we iterate from left to right, maintain `leftSum` (sum so far, starts at 0) and `rightSum = totalSum - leftSum - nums[i]`.
- But simpler is to start with rightSum = totalSum. At each step, subtract nums[i] from rightSum, now leftSum/rightSum are always up to date.

This reduces to a single pass O(n) solution with O(1) extra space if we build the output array directly.

This is a standard prefix sum pattern with a clever reuse of "rightSum" as "total - leftSum - nums[i]".

### Corner cases to consider  
- Empty array (should output empty array)
- Single element arrays `[x]` → output ``
- All elements equal
- Large numbers
- Maximum input size (check for efficiency)
- Negative numbers (problem constraints: nums[i] ≥ 1, so negatives not an issue)

### Solution

```python
def leftRightDifference(nums):
    n = len(nums)
    result = [0] * n    # Output array initialization

    total_sum = sum(nums)  # Total sum for all rightSums
    left_sum = 0

    for i in range(n):
        right_sum = total_sum - left_sum - nums[i]
        result[i] = abs(left_sum - right_sum)
        left_sum += nums[i]  # Update left_sum for next iteration

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since we traverse the array once to sum and once to compute results.
- **Space Complexity:** O(n) for the output array. Only O(1) extra for variables, not counting the result array.

### Potential follow-up questions (as if you’re the interviewer)  

- If the array is streamed and cannot be stored entirely, can you compute differences in place?
  *Hint: Consider rolling sums, but output may need to be delayed.*

- How would you modify this for negative numbers?
  *Hint: Use the same logic—absolute values still work.*

- Can you solve without using additional output space?
  *Hint: Try modifying the input array in-place if allowed.*

### Summary
This problem is a classic application of the prefix sum pattern. Efficiently tracks cumulative totals from both ends, updating them in one pass and assembling the answer in-place. This approach is common in range sum/array transformation problems, such as calculating running sums or subarray differences. Recognizing opportunities for prefix/suffix summing is a valuable skill for array-based interview problems.

### Tags
Array(#array), Prefix Sum(#prefix-sum)

### Similar Problems
- Find Pivot Index(find-pivot-index) (Easy)
- Find the Middle Index in Array(find-the-middle-index-in-array) (Easy)
- Find the Distinct Difference Array(find-the-distinct-difference-array) (Easy)
- Find the N-th Value After K Seconds(find-the-n-th-value-after-k-seconds) (Medium)