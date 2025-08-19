### Leetcode 34 (Medium): Find First and Last Position of Element in Sorted Array [Practice](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array)

### Description  
Given a sorted array of integers and a target value, find the first and last position (indices) of the target in the array.  
If the target is not present, return `[-1, -1]`.

For example, if the array is `[5,7,7,8,8,10]` and the target is `8`, you should return `[3, 4]` (since `8` appears from index 3 to 4).  
The key is to do this efficiently—preferably in O(log n) time—by exploiting the fact that the array is sorted. You should not use a linear scan.

### Examples  

**Example 1:**  
Input: `nums = [5,7,7,8,8,10], target = 8`  
Output: `[3, 4]`  
*Explanation: Target 8 is found at indices 3 and 4.*

**Example 2:**  
Input: `nums = [5,7,7,8,8,10], target = 6`  
Output: `[-1, -1]`  
*Explanation: 6 is not present in the array, so both positions are -1.*

**Example 3:**  
Input: `nums = [], target = 0`  
Output: `[-1, -1]`  
*Explanation: Array is empty, so return -1 for both indices.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  - Scan from left to right, store first index where `nums[i] == target`, continue to update last index for every occurrence.
  - O(n) time.  
  - Not acceptable because the array is sorted and we should do better.

- **Optimal (Binary Search):**  
  - Since the array is sorted, use binary search to narrow the range efficiently.
  - Two separate binary searches:
    - One to find the **first occurrence** of target. If mid is target, continue searching left.
    - One to find the **last occurrence**. If mid is target, continue searching right.
  - This ensures O(log n) time.
  - Return `[-1, -1]` if the target is not found in either search.

**Why binary search twice instead of once?**
- Searching for only the leftmost or rightmost can miss one side, especially if target occurs multiple times.  
- Binary search guarantees we do not miss any occurrences.

### Corner cases to consider  
- Empty array (`nums = []`)
- Array with one element—not target or is target
- All elements same as target
- Target smaller/larger than all elements
- Target only appears at one end
- Array with non-consecutive occurrences (shouldn’t happen in sorted list, but good to check)
- Negative numbers

### Solution

```python
def searchRange(nums, target):
    # Helper to find the leftmost (first) index of target
    def findFirst(nums, target):
        left, right = 0, len(nums) - 1
        first = -1
        while left <= right:
            mid = left + (right - left) // 2
            if nums[mid] == target:
                first = mid
                right = mid - 1  # continue searching left
            elif nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
        return first

    # Helper to find the rightmost (last) index of target
    def findLast(nums, target):
        left, right = 0, len(nums) - 1
        last = -1
        while left <= right:
            mid = left + (right - left) // 2
            if nums[mid] == target:
                last = mid
                left = mid + 1  # continue searching right
            elif nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
        return last

    first = findFirst(nums, target)
    last = findLast(nums, target)
    return [first, last]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log n)  
  - Each binary search is O(log n), and we do two searches.
- **Space Complexity:** O(1)  
  - No extra storage except a few variables; recursion stack is not used.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array is *not* sorted?
  *Hint: Would binary search still work?*

- How would you adapt the algorithm for a linked list?
  *Hint: Is random access possible with a linked list?*

- Could you do this in a single pass instead of two?
  *Hint: Carefully track both first and last while scanning; how does this affect complexity?*

### Summary
This problem is a classic use of the **binary search** pattern, adapted to find leftmost/rightmost bound (not just existence).  
It’s essential for efficiently handling **range queries** on sorted data. The approach is widely applicable in problems involving searching for the boundaries of a value in a sorted structure—such as finding the starting/ending timestamps, ranges of IDs, or event boundaries.

### Tags
Array(#array), Binary Search(#binary-search)

### Similar Problems
- First Bad Version(first-bad-version) (Easy)
- Plates Between Candles(plates-between-candles) (Medium)
- Find Target Indices After Sorting Array(find-target-indices-after-sorting-array) (Easy)