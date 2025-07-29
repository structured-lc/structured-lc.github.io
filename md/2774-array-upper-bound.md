### Leetcode 2774 (Easy): Array Upper Bound [Practice](https://leetcode.com/problems/array-upper-bound)

### Description  
Given a sorted array `nums` (in ascending order, possibly with duplicate elements) and an integer `target`, find the **last index** where `target` appears in the array. If `target` doesn't appear, return -1.  
You are asked to implement an efficient solution that leverages the sorted property of the array.

### Examples  

**Example 1:**  
Input: `nums = [3,4,5], target = 5`  
Output: `2`  
Explanation:  
The target `5` is found at index 2 (last position).

**Example 2:**  
Input: `nums = [1,4,5], target = 2`  
Output: `-1`  
Explanation:  
The target `2` does not exist in the array, so return -1.

**Example 3:**  
Input: `nums = [3,4,6,6,6,6,7], target = 6`  
Output: `5`  
Explanation:  
The target `6` appears multiple times, last at index 5.

### Thought Process (as if you’re the interviewee)  
First, I would consider a brute-force approach: iterate backward from the end of the array and return the first index where `nums[i] == target`. This is \(O(n)\) and not optimal for large, sorted arrays.

Because the array is sorted, binary search can be used for better efficiency. Standard binary search finds *an* occurrence, but to find the **upper bound** (last occurrence), I need to modify the search to always continue moving right if possible when `nums[m] == target`. I’ll adjust the mid calculation and pointers so that the search converges to the last position of `target`.

The final solution will use binary search with careful boundary checks, achieving \(O(\log n)\) time.

### Corner cases to consider  
- Empty array (`nums = []`)
- All values less than `target` (no occurrence)
- All values greater than `target` (no occurrence)
- Only one element (equal to or not equal to `target`)
- Multiple duplicates of `target` scattered or all together
- Target at start or end

### Solution

```python
def upperBound(nums, target):
    """
    Returns the last index of 'target' in sorted array 'nums',
    or -1 if target is not present.
    """
    if not nums:
        return -1

    left, right = 0, len(nums) - 1

    # Invariant: search space is [left, right]
    while left < right:
        # Make mid biased toward right to prevent infinite loop
        mid = (left + right + 1) // 2
        if nums[mid] > target:
            right = mid - 1  # Discard right including mid
        else:
            left = mid  # nums[mid] <= target, move left up

    # After loop, left == right, check if nums[left] == target
    return left if nums[left] == target else -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log n), because binary search reduces the range by half each step regardless of how many duplicates exist.
- **Space Complexity:** O(1). No extra structures or recursion, just a few pointers.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array is very large, e.g., stored on disk, and only partial reads are possible?  
  *Hint: Can your algorithm access array elements efficiently without loading everything?*

- How would you find the **first** (not last) occurrence of the target?  
  *Hint: Binary search, but tweak your mid and boundary logic.*

- What if the array is not sorted?  
  *Hint: Can binary search still help? What approach do you need now?*

### Summary
This is a classic **modified binary search** pattern: find the *last* occurrence of a given value in a sorted array.  
This coding pattern (variant of binary search) comes up whenever locating boundaries or extreme positions (first, last, insert position, etc.) for a target value in a sorted collection.  
Mastering these tweaks is critical for efficient searching tasks in interviews and when working with range queries.