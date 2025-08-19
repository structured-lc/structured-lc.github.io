### Leetcode 1991 (Easy): Find the Middle Index in Array [Practice](https://leetcode.com/problems/find-the-middle-index-in-array)

### Description  
Given a 0-indexed array of integers, find the **leftmost** index where the sum of all elements to its left equals the sum of all elements to its right. The value at the index itself is *not* included in either sum. Return the smallest such index if it exists, otherwise return -1. For the first index, the left sum is 0. For the last index, the right sum is 0.

### Examples  

**Example 1:**  
Input: `[2, 3, -1, 8, 4]`  
Output: `3`  
*Explanation: The sum of elements before index 3 is 2 + 3 + (-1) = 4. The sum after index 3 is 4. Both are equal, so index 3 is the answer.*

**Example 2:**  
Input: `[1, -1, 4]`  
Output: `2`  
*Explanation: Elements before index 2: 1 + (-1) = 0. Elements after index 2: (none) = 0. Both sums are 0.*

**Example 3:**  
Input: `[2, 5]`  
Output: `-1`  
*Explanation: No index has equal left and right sums, so return -1.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  For each index `i`, compute the sum of all elements to its left and all elements to its right, then compare. This would take O(n²) time (where n is array length), because for each index, we may sum up to O(n) elements on each side.

- **How to optimize:**  
  We can avoid redundant computation using prefix sums.  
  - Compute `total` as the sum of the entire array in O(n) time.  
  - As we iterate from left to right, keep a running `left_sum` that is the sum of elements before the current index.
  - For each index `i`, the sum of elements to the right is `total - left_sum - nums[i]`.
  - If `left_sum` equals `right_sum`, return the current index as the answer.

- This gives a clean O(n) time and O(1) extra space solution (if we only use variables).

### Corner cases to consider  
- Single element array, e.g. `[3]`. (Should return 0: both sums are 0.)
- All zeros, e.g. `[0, 0, 0]`. (Leftmost index should be 0.)
- Array with no valid index, e.g. `[1, 2, 3]`.
- Negative numbers, e.g. `[1, -1, 0]`.
- Large numbers, test integer overflow safety.
- Array starts or ends with possible valid index.

### Solution

```python
def findMiddleIndex(nums):
    # Compute the total sum of the array
    total_sum = sum(nums)
    left_sum = 0
    # Iterate over each index and element
    for i, num in enumerate(nums):
        # Subtract current num from total_sum to get the right sum for this position
        right_sum = total_sum - left_sum - num
        # If left sum equals right sum, we've found the answer
        if left_sum == right_sum:
            return i
        # Otherwise, update left_sum for next iteration
        left_sum += num
    # If we never find such an index, return -1
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = length of nums. We pass through the array once to calculate the total, and once again to check each index.
- **Space Complexity:** O(1) extra space (excluding the input), since we only store a few variables.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array is extremely large and may not fit in memory?
  *Hint: Consider streaming algorithms or computing sums in parts.*

- How would you find all such middle indices, not just the first leftmost one?
  *Hint: Don't return immediately; collect all indices where left sum equals right sum.*

- Can you do this if values may be floating point, and need to be compared for "close enough" equality?
  *Hint: Use a tolerance/epsilon, and make sure to avoid floating point errors. Consider math.isclose in Python.*

### Summary
This problem demonstrates the **prefix sum pattern** to achieve an efficient linear solution. Instead of recomputing sums for every index (brute-force), we use running totals to track "left sum" and derive "right sum" without extra arrays. This is a classic trick used in **pivot index**, **balanced partition**, and similar array problems.

### Tags
Array(#array), Prefix Sum(#prefix-sum)

### Similar Problems
- Find Pivot Index(find-pivot-index) (Easy)
- Partition Array Into Three Parts With Equal Sum(partition-array-into-three-parts-with-equal-sum) (Easy)
- Number of Ways to Split Array(number-of-ways-to-split-array) (Medium)
- Maximum Sum Score of Array(maximum-sum-score-of-array) (Medium)
- Left and Right Sum Differences(left-and-right-sum-differences) (Easy)