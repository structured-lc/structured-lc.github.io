### Leetcode 4 (Hard): Median of Two Sorted Arrays [Practice](https://leetcode.com/problems/median-of-two-sorted-arrays)

### Description  
Given two **sorted arrays**, find the **median** of the combined data set. The arrays may be of different lengths and may be empty. You are required to solve this in **O(log (m+n))** time, where m and n are the lengths of the arrays.

### Examples  

**Example 1:**  
Input: `nums1 = [1, 3]`, `nums2 = [2]`  
Output: `2.0`  
*Explanation: Combined array is [1, 2, 3], so the median is the middle value 2.*

**Example 2:**  
Input: `nums1 = [1, 2]`, `nums2 = [3, 4]`  
Output: `2.5`  
*Explanation: Combined array is [1, 2, 3, 4]. Median is (2+3)/2 = 2.5.*

**Example 3:**  
Input: `nums1 = [0, 0]`, `nums2 = [0, 0]`  
Output: `0.0`  
*Explanation: Combined array is [0, 0, 0, 0], so the median is 0.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
  - Merge both arrays into a single sorted array.  
  - The median is the middle element, or the average of the two middle elements if the length is even.  
  - **Drawback:** This takes O(m+n) time and O(m+n) space, which doesn’t meet the O(log(m+n)) constraint.

- **Optimized approach — Binary Search partitioning:**  
  - Since both arrays are sorted, we can use **binary search** to find a perfect partition point:  
    - Partition nums1 and nums2 so that the left side holds ⌊(m+n)/2⌋ elements, and all elements on the left are ≤ all on the right.
    - Find the partition point by binary-searching the shorter of the two arrays.
    - At each step, compare the edge values of the partitions to know if the partition is good, too far left, or right.
  - Once partitioned, the median is either:
    - The maximum of the left partition (if the total length is odd).
    - The average of the max of the left and min of the right (if the total length is even).
  - This achieves O(log(min(m, n))) time and O(1) extra space.

### Corner cases to consider  
- One or both arrays are empty.
- All elements are the same.
- Arrays have very different sizes (one much larger than the other).
- Arrays don’t overlap (all in nums1 < all in nums2 or vice versa).
- Arrays contain negative or positive numbers only.
- Median falls between arrays, i.e., no overlap, but the border elements are adjacent.

### Solution

```python
def findMedianSortedArrays(nums1, nums2):
    # Ensure nums1 is the shorter array for minimal binary search range
    if len(nums1) > len(nums2):
        nums1, nums2 = nums2, nums1

    m, n = len(nums1), len(nums2)
    # Half partition for both arrays
    half = (m + n + 1) // 2
    left, right = 0, m

    while left <= right:
        i = (left + right) // 2        # Partition index for nums1
        j = half - i                   # Partition index for nums2

        nums1_left = float('-inf') if i == 0 else nums1[i - 1]
        nums1_right = float('inf') if i == m else nums1[i]
        nums2_left = float('-inf') if j == 0 else nums2[j - 1]
        nums2_right = float('inf') if j == n else nums2[j]

        # Check if partition is correct
        if nums1_left <= nums2_right and nums2_left <= nums1_right:
            # Found correct partition
            if (m + n) % 2 == 1:
                return float(max(nums1_left, nums2_left))
            else:
                return (max(nums1_left, nums2_left) + min(nums1_right, nums2_right)) / 2.0
        elif nums1_left > nums2_right:
            # Too far right in nums1, move left
            right = i - 1
        else:
            # Too far left in nums1, move right
            left = i + 1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log(min(m, n))) — We binary search the shorter array only, halving the search space on each iteration.
- **Space Complexity:** O(1) — Just a constant number of variables for pointers/indices; no extra storage proportional to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the arrays are not sorted?
  *Hint: Is this approach still possible? What’s the lowest complexity you can achieve?*

- Could you generalize this algorithm to find the kᵗʰ smallest element (not just the median)?
  *Hint: Think about how median is the (total_length//2)-th element. How would you change your partitioning?*

- How would you handle finding the median if the arrays are stored externally and cannot both fit in memory?
  *Hint: Consider sequential access or streaming with a heap, and trade-offs about time and space.*

### Summary
This problem uses the **binary search + two-way partitioning** pattern, which is fundamental in advanced array problems. It efficiently finds the median of two sorted arrays without merging, by exploiting the sorted structure to find a partition where all left elements are ≤ all right elements. The pattern appears in problems about finding the kᵗʰ smallest element, merging sorted stream data, and external data processing.

### Tags
Array(#array), Binary Search(#binary-search), Divide and Conquer(#divide-and-conquer)

### Similar Problems
- Median of a Row Wise Sorted Matrix(median-of-a-row-wise-sorted-matrix) (Medium)