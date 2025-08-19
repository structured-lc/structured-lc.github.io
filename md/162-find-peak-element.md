### Leetcode 162 (Medium): Find Peak Element [Practice](https://leetcode.com/problems/find-peak-element)

### Description  
Given an array of integers, a **peak element** is an element that is strictly greater than its neighbors. For elements at either end of the array (first or last), we consider only the single neighbor that exists. The task is to return the index of any one peak element. The array may contain multiple peaks—return the index of any one. Assume that the elements outside the bounds of the array are negative infinity (−∞).

### Examples  

**Example 1:**  
Input: `nums = [1,2,3,1]`  
Output: `2`  
*Explanation: nums[2] = 3 is greater than its neighbors (2 and 1).*

**Example 2:**  
Input: `nums = [1,2,1,3,5,6,4]`  
Output: `5`  
*Explanation: nums[5] = 6 is a peak since it's greater than both its neighbors (5 and 4). Index 1 (value 2) is also a peak, so a valid output could be either 1 or 5.*

**Example 3:**  
Input: `nums = [5]`  
Output: `0`  
*Explanation: The single element is trivially a peak.*

### Thought Process (as if you’re the interviewee)  

Start with the brute-force approach:  
- Iterate through each element and check if it's greater than its neighbors. This works, but it's \(O(n)\).

Optimize with binary search:  
- Since the problem doesn't require the highest peak or a specific one, we can utilize binary search to reach \(O(\log n)\) time.
- At each step, compare nums[mid] and nums[mid+1]:
  - If nums[mid] > nums[mid+1], a peak lies to the left (including mid)—move right pointer to mid.
  - If nums[mid] < nums[mid+1], a peak lies to the right—move left pointer to mid + 1.
- By always moving toward the direction of a larger neighbor, we guarantee to find some peak. This stops when left covers right; the position is a peak. This is possible because we implicitly assume nums[-1] = nums[n] = -∞, so there must be at least one peak[1][2][3].

### Corner cases to consider  
- Array of length 1: the single element is a peak.
- Array where all elements are equal: each edge could be considered a peak by definition.
- Strictly increasing array: the last element is a peak.
- Strictly decreasing array: the first element is a peak.
- Large input sizes to ensure logarithmic performance.
- Peaks at the edges.

### Solution

```python
def findPeakElement(nums):
    # Binary search for a peak
    left, right = 0, len(nums) - 1

    while left < right:
        mid = (left + right) // 2
        # If middle element is greater than the next, peak is on the left (including mid)
        if nums[mid] > nums[mid + 1]:
            right = mid
        else:
            # Otherwise, peak is in the right half
            left = mid + 1

    # left == right at the end: found a peak
    return left
```

### Time and Space complexity Analysis  

- **Time Complexity:** \(O(\log n)\)  
  Binary search reduces the range by half each time; log₂n iterations.
- **Space Complexity:** \(O(1)\)  
  Only a few variables; no recursion or extra data structures.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you are required to return all peak indices?
  *Hint: You would need to scan linearly instead of using binary search.*

- How would you modify the approach if the input array is circular (first and last are neighbors)?
  *Hint: Adjust index checks to wrap around with modulo.*

- Could you implement this using recursion?
  *Hint: Use recursive binary search logic by adjusting pointers in the same spirit as the iterative solution.*

### Summary

This problem leverages the **binary search** pattern but applies it to a "property" (peak detection) instead of a value. It's an example of using binary search to detect a condition that divides the search space, not simply to find a target. Similar ideas arise in problems involving "mountain arrays", searching for threshold crossings, or unimodal array peaks.

### Tags
Array(#array), Binary Search(#binary-search)

### Similar Problems
- Peak Index in a Mountain Array(peak-index-in-a-mountain-array) (Medium)
- Find a Peak Element II(find-a-peak-element-ii) (Medium)
- Pour Water Between Buckets to Make Water Levels Equal(pour-water-between-buckets-to-make-water-levels-equal) (Medium)
- Count Hills and Valleys in an Array(count-hills-and-valleys-in-an-array) (Easy)
- Find the Peaks(find-the-peaks) (Easy)