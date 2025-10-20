### Leetcode 581 (Medium): Shortest Unsorted Continuous Subarray [Practice](https://leetcode.com/problems/shortest-unsorted-continuous-subarray)

### Description  
Given an integer array, find the **shortest continuous subarray** such that, if you sort only this subarray in ascending order, the **whole array** becomes sorted.  
Return the length of this shortest subarray. If the array is already sorted, return 0.

### Examples  

**Example 1:**  
Input: `[2,6,4,8,10,9,15]`  
Output: `5`  
*Explanation: The subarray `[6,4,8,10,9]` is unsorted. If you sort that (result: `[4,6,8,9,10]`), the full array is `[2,4,6,8,9,10,15]` which is sorted. The length is 5.*

**Example 2:**  
Input: `[1,2,3,4]`  
Output: `0`  
*Explanation: The array is already sorted, so no subarray needs sorting.*

**Example 3:**  
Input: `[1]`  
Output: `0`  
*Explanation: A single-element array is always sorted by definition.*

### Thought Process (as if you’re the interviewee)  
First, the brute-force way is to check every possible subarray: for each possible start and end, check if sorting that subarray makes the array sorted overall, but this takes O(n³) time, which is too slow.

A better way:
- Notice that an already sorted array needs no work.
- For a faster method, compare the array to its sorted version and find where they differ: the **first** and **last** indices where they don’t match marks the unsorted window. This takes O(n log n) for the sorting step.

Optimal O(n) solution:
- Iterate left-to-right to find where the order breaks (where a number is less than the running max, which means it is out of place — update the right boundary).
- Iterate right-to-left to find where the order breaks from the right side (where a number is greater than the running min — update the left boundary).
- The shortest subarray is between these two indices.

This approach is efficient (one pass from each side) and uses constant extra space.

### Corner cases to consider  
- Already sorted array: `[1,2,3]`
- Array in reverse order: `[3,2,1]`
- Duplicates: `[1,3,2,2,2]`
- All elements equal: `[2,2,2,2]`
- Single element: ``
- Array where the smallest window is at the ends: `[1,2,4,5,3]`
- Empty array (if input allowed, though constraints show at least one element)

### Solution

```python
def findUnsortedSubarray(nums):
    # Step 1: Prepare variables
    n = len(nums)
    left, right = -1, -1
    max_seen = float('-inf')
    min_seen = float('inf')

    # Step 2: Find right boundary by tracking running max from the left
    for i in range(n):
        if nums[i] >= max_seen:
            max_seen = nums[i]
        else:
            right = i    # nums[i] is less than some max before it

    # Step 3: Find left boundary by tracking running min from the right
    for i in range(n-1, -1, -1):
        if nums[i] <= min_seen:
            min_seen = nums[i]
        else:
            left = i     # nums[i] is greater than some min after it

    # Step 4: If right was never updated, array is sorted
    return 0 if right == -1 else right - left + 1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Two passes through the array: left-to-right and right-to-left. Each loop is O(n).

- **Space Complexity:** O(1)  
  Only a few variables are used. No extra storage proportional to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you’re not allowed to modify the input array (can you do it in-place without sorting)?
  *Hint: Leverage two passes, comparing to running min/max.*

- Can you solve it if allowed only one pass?
  *Hint: You may need more complex tracking of min/max and window boundaries.*

- How would you handle multiple smallest windows if there are duplicates?
  *Hint: Define what it means to “sort the minimum subarray” in this case.*

### Summary
This problem uses the **two pointer** or **sliding window** coding pattern with running min/max from both ends to pinpoint the smallest unsorted window in O(n) time and O(1) space.  
The pattern is common in array sorting/ordering problems, and similar approaches can be applied to detect ordering violations, determine windows that need fixing, and other scenarios involving prefix/suffix checks.


### Flashcard
Compare array to its sorted version; the shortest unsorted subarray is between the first and last indices where elements differ.

### Tags
Array(#array), Two Pointers(#two-pointers), Stack(#stack), Greedy(#greedy), Sorting(#sorting), Monotonic Stack(#monotonic-stack)

### Similar Problems
- Smallest Subarray to Sort in Every Sliding Window(smallest-subarray-to-sort-in-every-sliding-window) (Medium)