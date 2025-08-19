### Leetcode 724 (Easy): Find Pivot Index [Practice](https://leetcode.com/problems/find-pivot-index)

### Description  
Given an array of integers, **find the pivot index**, which is the index where the sum of all numbers to the left of the index is equal to the sum of all numbers to the right of it.  
- If the pivot index is at the very beginning (index 0), the left sum is considered 0.  
- If it's at the end, the right sum is 0.  
Return the **leftmost** such index if multiple exist; otherwise, return `-1` if no pivot index is found.

### Examples  

**Example 1:**  
Input: `[1,7,3,6,5,6]`  
Output: `3`  
*Explanation: Left sum for index 3 is 1+7+3=11, right sum is 5+6=11. Both are equal, so 3 is the pivot.*

**Example 2:**  
Input: `[1,2,3]`  
Output: `-1`  
*Explanation: No index satisfies the condition where left and right sums are equal.*

**Example 3:**  
Input: `[2,1,-1]`  
Output: `0`  
*Explanation: Left sum for index 0 is 0, right sum is 1+(-1)=0, so 0 is the pivot.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** For each index, calculate the sum of all numbers to the left and the sum to the right and check if they're equal. This is O(n²) since every index requires up to n sums, which is inefficient.
- **Optimized Approach:**  
  - Compute the **total sum** of the array: `total_sum`.
  - Use a variable, `left_sum`, to keep track of the sum of numbers to the left as you iterate.
  - For each index \(i\):
    - Right sum = `total_sum - left_sum - nums[i]`.
    - If `left_sum == right sum`, return \(i\).
    - Update `left_sum` by adding `nums[i]`.
  - This only requires one pass after calculating the total sum, leading to O(n) time and O(1) space.
- This approach immediately returns the **first** index that satisfies the condition, fulfilling the leftmost requirement.

### Corner cases to consider  
- Empty array: Should return -1.
- Array with a single element: Pivot index is 0, since both left and right sums are 0.
- All elements are the same.
- Array contains negative numbers.
- Multiple possible pivot indices: Should return the smallest index.
- Large arrays for efficiency testing.

### Solution

```python
def pivotIndex(nums):
    total_sum = sum(nums)
    left_sum = 0

    for i, num in enumerate(nums):
        # right sum = total_sum - left_sum - num
        if left_sum == total_sum - left_sum - num:
            return i
        left_sum += num

    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)
  - One pass for total sum, one pass for traversal.
- **Space Complexity:** O(1)
  - Only a few variables for sums and index; no extra space needed aside from input.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array is updated frequently?  
  *Hint: Can you maintain prefix sums efficiently for dynamic pivot queries?*
- How would you handle very large arrays with potential overflow?  
  *Hint: Consider using data types with larger capacity or handle using modular arithmetic.*
- How to extend to circular arrays?  
  *Hint: Think about how left and right sums wrap around.*

### Summary
The pattern used here is maintaining a **running prefix sum** and using the formula `left_sum == total_sum - left_sum - nums[i]` to efficiently determine the pivot index in a single pass. This "prefix-sum + total-sum" trick is a common pattern for balance or split-point problems and can be adapted for other subarray or partitioning challenges.

### Tags
Array(#array), Prefix Sum(#prefix-sum)

### Similar Problems
- Subarray Sum Equals K(subarray-sum-equals-k) (Medium)
- Find the Middle Index in Array(find-the-middle-index-in-array) (Easy)
- Number of Ways to Split Array(number-of-ways-to-split-array) (Medium)
- Maximum Sum Score of Array(maximum-sum-score-of-array) (Medium)
- Left and Right Sum Differences(left-and-right-sum-differences) (Easy)