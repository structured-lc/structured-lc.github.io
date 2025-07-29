### Leetcode 33 (Medium): Search in Rotated Sorted Array [Practice](https://leetcode.com/problems/search-in-rotated-sorted-array)

### Description  
Given an array of **distinct integers** `nums` that was originally sorted in ascending order but then **rotated** at some unknown pivot, you are to search for a given `target` value. The task is to return the index of `target` if it exists in `nums`—otherwise return -1.  
For example, the array `[4,5,6,7,0,1,2]` was the sorted array `[0,1,2,4,5,6,7]`, rotated at pivot index 3.  
The goal is to find `target` using an **efficient algorithm** (ideally O(log n) time).

### Examples  

**Example 1:**  
Input: `nums=[4,5,6,7,0,1,2]`, `target=0`  
Output: `4`  
*Explanation: The array was rotated at index 3. The value `0` is at index 4.*

**Example 2:**  
Input: `nums=[4,5,6,7,0,1,2]`, `target=3`  
Output: `-1`  
*Explanation: The target `3` is not present in the array, so return -1.*  

**Example 3:**  
Input: `nums=[1]`, `target=0`  
Output: `-1`  
*Explanation: Single element array, target not found.*

### Thought Process (as if you’re the interviewee)  
First, I would consider the brute-force solution, which is to **linearly search** through the array and return the index if the target is found. This approach takes O(n) time and is not optimal for large arrays.

Since the rotated array consists of two segments, each individually sorted, I can leverage a **modified binary search**. In every iteration, I look at `nums[mid]`:

- If `nums[mid]` is equal to the `target`, return `mid`.
- Determine which half is sorted by comparing `nums[left]` and `nums[mid]`.
  - If `nums[left] ≤ nums[mid]`, the left half is sorted.
      - If `target` is between `nums[left]` and `nums[mid]`, search left; otherwise search right.
  - If not, the right half is sorted.
      - If `target` is between `nums[mid]` and `nums[right]`, search right; otherwise search left.

This way, I narrow the search space by half at every step, achieving O(log n) time complexity.

### Corner cases to consider  
- Empty array `[]`
- Array of one element, where target may or may not be present.
- Rotated at 0 (no rotation)—array is still sorted.
- Target at the beginning, end, or rotation pivot.
- Target is not present at all.
- Large arrays to validate time complexity.

### Solution

```python
def search(nums, target):
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = (left + right) // 2
        
        # If target is found
        if nums[mid] == target:
            return mid

        # Determine if left half is sorted
        if nums[left] <= nums[mid]:
            # Is target in the left sorted portion?
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:
            # Otherwise, right half is sorted
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1

    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log n), because we eliminate half of the search interval per iteration due to the sorted structure in either half of the array.
- **Space Complexity:** O(1), since we only use pointers (no extra storage proportional to input).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array contains **duplicates**?
  *Hint: The check for which half is sorted may not work cleanly if duplicates are present; can you handle the ambiguity?*
  
- Can you search the **pivot point** (i.e., index of smallest element) efficiently?
  *Hint: Try locating the minimal value using binary search properties.*

- How do you adapt this approach to **find all occurrences** of a target if elements are not unique?
  *Hint: After finding one occurrence, expand left/right.*

### Summary
This solution uses a **modified binary search** pattern to efficiently search a rotated sorted array in O(log n) time without extra space. The binary search logic adapts to identify which section of the array is sorted, making it a robust technique that generalizes to many array search problems with slight modifications (e.g., searching in rotated arrays with duplicates or finding rotation pivots). This is a frequently encountered pattern in array/search interview questions.