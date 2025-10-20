### Leetcode 81 (Medium): Search in Rotated Sorted Array II [Practice](https://leetcode.com/problems/search-in-rotated-sorted-array-ii)

### Description  
You are given an array of integers `nums` that was initially sorted in non-decreasing order, but then rotated at an unknown pivot, and it **may contain duplicates**. Given a `target` value, determine if `target` exists in `nums`.  
Return `True` if found, else `False`.  
The array might look like `[0,0,1,2,2,5,6]` rotated to `[2,5,6,0,0,1,2]`. You must account for duplicates, which makes the search more complex than the classic rotated-array binary search.

### Examples  

**Example 1:**  
Input: `nums = [2,5,6,0,0,1,2]`, `target = 0`  
Output: `True`  
*Explanation: Array is rotated; 0 is present at index 3 and 4.*

**Example 2:**  
Input: `nums = [2,5,6,0,0,1,2]`, `target = 3`  
Output: `False`  
*Explanation: 3 does not occur anywhere in the array.*

**Example 3:**  
Input: `nums = [1,1,1,3,1]`, `target = 3`  
Output: `True`  
*Explanation: Though the array has duplicate 1s, 3 is still present at index 3.*

### Thought Process (as if you’re the interviewee)  
To begin, the brute force approach is just to scan through the array and compare each element to `target`—this gives O(n) time.

But the array is sorted (though rotated), so normally you would use a binary search (O(log n)). However, because of possible duplicates (e.g., `nums[left] == nums[mid] == nums[right]`), you **can't always determine which side is sorted** based on usual comparisons, and in worst cases (like all elements the same), you fallback to O(n) time.

I’d use a modified binary search:
- Set two pointers, `left` and `right`, at the ends.
- While `left ≤ right`, compute `mid`.
- If `nums[mid] == target`, return True.
- If the left, mid, and right values are *distinct*, we can determine which side is sorted:
    - If `nums[left] < nums[mid]`, the left side is sorted. If `target` within that segment, move `right`.
    - If `nums[left] > nums[mid]`, right side is sorted.
- If `nums[left] == nums[mid]`, we can't decide; **increment left** to shrink search space (since this duplicate can't help).
- Continue until pointers cross, return False.

**Trade-off:**  
- In presence of many duplicates, performance degrades to O(n).

### Corner cases to consider  
- Array is empty.
- All elements are the same.
- Only one element in the array.
- Target is not in the array.
- Duplicates surround the pivot.
- Pivot is at the start or end.
- Target occurs more than once.

### Solution

```python
def search(nums, target):
    left = 0
    right = len(nums) - 1

    while left <= right:
        mid = left + (right - left) // 2

        # Check mid directly
        if nums[mid] == target:
            return True

        # If left, mid, and right are equal, we can't tell the sorted part
        if nums[left] == nums[mid] == nums[right]:
            left += 1
            right -= 1
        # If left to mid is sorted
        elif nums[left] <= nums[mid]:
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        # If mid to right is sorted
        else:
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1

    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log n) *on average*, but **O(n) worst-case** when most elements are duplicates, since you may need to linearly check each element.
- **Space Complexity:** O(1) extra space, as only variables are used and no new data structures.

### Potential follow-up questions (as if you’re the interviewer)  

- What would you do if you wanted to return the *index* of any occurrence of the target instead of just `True`/`False`?  
  *Hint: A minor tweak in the return condition and storage of the position when found.*

- How would your approach change if there were **no duplicates** in `nums`?  
  *Hint: You would not need the duplicate-skipping step—can always divide the array using value comparisons.*

- Can you adapt the algorithm to search for the *first* or *last* occurrence if `nums` is seen as a circular array?  
  *Hint: Modify standard binary search to continue searching until the edge condition is violated.*

### Summary
This problem is a variation on **binary search in rotated sorted arrays**, but complicated by the presence of duplicates. The main pattern is the use of pointers and modified binary search logic to manage ambiguous situations caused by repeated elements. This approach is applicable not just here, but in any rotated or nearly-sorted structures where duplicates can occur—classic "search in rotated sorted array" with extensions for duplicate handling.


### Flashcard
Use modified binary search; when duplicates prevent determining the sorted side, increment left or decrement right to shrink the search space.

### Tags
Array(#array), Binary Search(#binary-search)

### Similar Problems
- Search in Rotated Sorted Array(search-in-rotated-sorted-array) (Medium)