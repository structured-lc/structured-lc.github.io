### Leetcode 977 (Easy): Squares of a Sorted Array [Practice](https://leetcode.com/problems/squares-of-a-sorted-array)

### Description  
Given an array of integers that’s already sorted in non-decreasing order, return a new array of the squares of each number, also sorted in non-decreasing order.  
The challenge is that squaring can mess up the order: negative numbers, when squared, become positives and might jump ahead of some positive numbers.  
You need to efficiently generate the sorted list of squares.

### Examples  

**Example 1:**  
Input: `[-4, -1, 0, 3, 10]`  
Output: `[0, 1, 9, 16, 100]`  
*Explanation: Square each element → [16, 1, 0, 9, 100]. Sort them → [0, 1, 9, 16, 100].*

**Example 2:**  
Input: `[-7, -3, 2, 3, 11]`  
Output: `[4, 9, 9, 49, 121]`  
*Explanation: Square each element → [49, 9, 4, 9, 121]. Sort them → [4, 9, 9, 49, 121].*

**Example 3:**  
Input: `[-3, -2, 1, 4]`  
Output: `[1, 4, 9, 16]`  
*Explanation: Square each element → [9, 4, 1, 16]. Sort them → [1, 4, 9, 16].*


### Thought Process (as if you’re the interviewee)  

- **Brute-force Idea:**  
  The most direct way is to square every element, then sort the new array. This is simple, but sorting takes O(n log n) time, and we can do better.

- **Optimized Idea (Two Pointers):**  
  Since the input is sorted, the largest absolute value must be on either end of the array.  
  Use two pointers: one at the start (left), one at the end (right).  
  At each step, compare abs(nums[left]) and abs(nums[right]):
    - Square the larger value, place it at the end of the result array, then move that pointer inward.
    - Repeat, filling in the result array from back to front.
  This way, only a single O(n) scan is needed, with O(n) space.

- **Why use this?**  
  We avoid sorting after squaring, improving the efficiency from O(n log n) to O(n) time.  
  This is an example of using problem constraints (pre-sorted input) to optimize.


### Corner cases to consider  
- Empty array → Should return [].
- All non-negative or all non-positive numbers.
- Array has a single element.
- Duplicates, including duplicate zeros.
- Largest/smallest possible values (overflow is not a concern in Python, but might be elsewhere).


### Solution

```python
def sortedSquares(nums):
    n = len(nums)
    result = [0] * n
    left, right = 0, n - 1
    pos = n - 1  # Start filling result from the end

    while left <= right:
        left_sq = nums[left] * nums[left]
        right_sq = nums[right] * nums[right]
        if left_sq > right_sq:
            result[pos] = left_sq
            left += 1
        else:
            result[pos] = right_sq
            right -= 1
        pos -= 1

    return result
```


### Time and Space complexity Analysis  

- **Time Complexity:** O(n) —  
  Each element is considered exactly once; no sorting is needed after squaring.
- **Space Complexity:** O(n) —  
  We create a result array of the same size as the input.


### Potential follow-up questions (as if you’re the interviewer)  

- What if the input array can be modified in-place?
  *Hint: Can you return the result without using extra space?*

- How would you handle the case if the input is not already sorted?
  *Hint: Does the two-pointer approach still work?*

- Can you generalize this to kᵗʰ powers instead of just squares?
  *Hint: What property makes squaring work with two-pointers, and would it hold for cubes or higher powers?*


### Summary
This problem uses the **two-pointer** technique to efficiently merge values from both ends of a sorted array where squaring might disrupt order. This pattern is common for problems involving sorted arrays and merging, and avoids the need for additional sorting after a transformation. The same approach is used in problems such as merging sorted arrays, partitioning, or finding max/min differences in sorted arrays.


### Flashcard
Use two pointers from both ends, compare absolute values, square the larger, and fill the result array from the end to the start.

### Tags
Array(#array), Two Pointers(#two-pointers), Sorting(#sorting)

### Similar Problems
- Merge Sorted Array(merge-sorted-array) (Easy)
- Sort Transformed Array(sort-transformed-array) (Medium)