### Leetcode 35 (Easy): Search Insert Position [Practice](https://leetcode.com/problems/search-insert-position)

### Description  
Given a **sorted array** of distinct integers and a **target** value, find the index of the target if it exists in the array. If the target does not exist, return the index where it **would be inserted** in order to keep the array sorted. The array is sorted in ascending order.

### Examples  

**Example 1:**  
Input: `nums = [1, 3, 5, 6]`, `target = 5`  
Output: `2`  
Explanation: 5 exists in the array at index 2.

**Example 2:**  
Input: `nums = [1, 3, 5, 6]`, `target = 2`  
Output: `1`  
Explanation: 2 does not exist in the array. It should be inserted at index 1 to keep the array sorted, between 1 and 3.

**Example 3:**  
Input: `nums = [1, 3, 5, 6]`, `target = 7`  
Output: `4`  
Explanation: 7 does not exist in the array. It should be inserted at the end, index 4.

### Thought Process (as if you’re the interviewee)  
- **Brute-force**:  
  Iterate through the array from left to right. For each element, check if it is equal to the target. If found, return its index. If an element greater than the target is found, return its index as the insert position. If we reach the end, return the array's length.  
  Downside: O(n) time, which is not efficient for large n.

- **Optimize with Binary Search**:  
  Since the array is sorted, binary search is ideal.  
  - Set left = 0, right = len(nums)  
  - While left < right:  
      - mid = ⌊(left + right) / 2⌋  
      - If nums[mid] ≥ target, move right = mid  
      - Else, move left = mid + 1  
  - The answer is left  
  Why: This approach narrows the search logarithmically and always returns the current possible insert position.

- **Why this approach?**  
  It guarantees O(log n) time which is efficient and required by the problem statement (per hints in Leetcode and discussions).

### Corner cases to consider  
- Empty array (`[]`): Should return 0.
- Target smaller than all elements: Should return 0.
- Target greater than all elements: Should return len(nums).
- Target equal to an element: Should return that element’s index.
- Array of length 1.
- Arrays with all elements > target or < target.

### Solution

```python
def searchInsert(nums, target):
    # Define left and right pointers
    left = 0
    right = len(nums)
    
    # Perform binary search
    while left < right:
        mid = (left + right) // 2  # Compute the middle index
        
        # If nums[mid] is greater or equal, narrow to left half
        if nums[mid] >= target:
            right = mid
        # If nums[mid] is less, narrow to right half
        else:
            left = mid + 1
    
    # 'left' is now the index where target should be inserted
    return left
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log n), because we halve the search space with each iteration (binary search).
- **Space Complexity:** O(1), as we use only a constant amount of extra space (pointers and variables).

### Potential follow-up questions (as if you’re the interviewer)  

- How would your approach change if the array contained duplicates?  
  *Hint: Try to return the first or last position where the target could be inserted.*

- If the array is extremely large and cannot fit into memory, how could you perform this search efficiently?  
  *Hint: Consider memory-mapped files or external storage algorithms.*

- How would you modify the binary search to return the range of all indices where the target could occur if duplicates are allowed?  
  *Hint: Find leftmost and rightmost occurrences with two binary searches.*

### Summary
This problem is a **classic binary search template** application on a sorted array to determine either the target's index or the correct insertion point. It's a pattern commonly seen in search-related problems and variant interview questions, making mastery valuable for array and sorted data structure problems.


### Flashcard
Use binary search to find the first index where nums[i] ≥ target; return i as insert position or found index.

### Tags
Array(#array), Binary Search(#binary-search)

### Similar Problems
- First Bad Version(first-bad-version) (Easy)
- Minimum Operations to Exceed Threshold Value I(minimum-operations-to-exceed-threshold-value-i) (Easy)