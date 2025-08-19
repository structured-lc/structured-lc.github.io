### Leetcode 1013 (Easy): Partition Array Into Three Parts With Equal Sum [Practice](https://leetcode.com/problems/partition-array-into-three-parts-with-equal-sum)

### Description  
Given an integer array, we want to determine if it is possible to split it into **three non-empty contiguous parts** such that the sum of the elements in each part is equal. In other words:  
Does there exist indices **i** and **j** with  
  0 < i < j < n  
so that  
  sum(arr[0:i]) == sum(arr[i:j]) == sum(arr[j:])?

### Examples  

**Example 1:**  
Input: `arr = [0,2,1,-6,6,-7,9,1,2,0,1]`  
Output: `True`  
*Explanation: One possible partition: [0,2,1,-6], [6,-7,9], [1,2,0,1]. All have sum 0.*

**Example 2:**  
Input: `arr = [0,2,1,-6,6,7,9,-1,2,0,1]`  
Output: `False`  
*Explanation: No way to split into three contiguous parts with equal sum.*

**Example 3:**  
Input: `arr = [3,3,6,5,-2,2,5,1,-9,4]`  
Output: `True`  
*Explanation: One possible partition: [3,3,6], [5,-2,2], [5,1,-9,4]. Each part has sum 12.*

### Thought Process (as if you’re the interviewee)  
Start by noting the **total sum** of the array.  
- If the total sum is not divisible by 3, it’s **impossible**; so return False immediately.
- Let `target = total_sum // 3`.  
To find 3 contiguous parts, I should scan from **left to right** to find the first part with sum == target, then from the end to find the last part with sum == target, making sure that there is at least one element in the middle for the second part.  
If I can find two such ends (left and right) with at least one index in between them, then it’s possible and I return True.  
This avoids brute force partitioning, which would be too slow.

### Corner cases to consider  
- Array where total sum not divisible by 3 (e.g. `[1,2,3,5]`)
- All zeroes (e.g. `[0,0,0,0]`)
- Negative numbers in array
- Array of size < 3 (not possible to split)
- Multiple valid partitions (only need one to answer True)
- Parts being single elements

### Solution

```python
def canThreePartsEqualSum(arr):
    # Calculate the total sum of the array
    total_sum = sum(arr)
    # Early exit: if not divisible by 3, can't partition
    if total_sum % 3 != 0:
        return False
    target = total_sum // 3

    left_sum = 0
    left_index = 0
    # Move from left to right to find the first partition
    while left_index < len(arr):
        left_sum += arr[left_index]
        if left_sum == target:
            break
        left_index += 1

    # Move from right to left to find the last partition
    right_sum = 0
    right_index = len(arr) - 1
    while right_index > left_index + 1:  # Ensure at least 1 elem in the middle
        right_sum += arr[right_index]
        if right_sum == target:
            break
        right_index -= 1

    # Must have non-overlapping partitions, so left_index < right_index
    return left_sum == target and right_sum == target and left_index < right_index
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  We traverse the array at most twice (from both sides).
- **Space Complexity:** O(1)  
  Only a few integer variables for bookkeeping.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we needed to partition into k equal-sum contiguous parts?
  *Hint: Think about extending the two-pointer approach and k-1 splits.*

- Can you do it without explicitly scanning from both ends?
  *Hint: Try counting how many times you've seen the target sum as you iterate.*

- What if the partitions need not be contiguous?
  *Hint: This is similar to "subset sum" problems, much harder.*

### Summary
This problem uses the **prefix sum with two pointers** pattern.  
It’s a classic way to check for possible subarray partitions.  
This approach is common for "partition with equal sum" problems when partitions must be contiguous.  
Recognizing sum divisibility and using either scan-from-ends or a running counter are core techniques.

### Tags
Array(#array), Greedy(#greedy)

### Similar Problems
- Find the Middle Index in Array(find-the-middle-index-in-array) (Easy)