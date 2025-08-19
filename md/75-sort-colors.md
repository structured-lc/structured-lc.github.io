### Leetcode 75 (Medium): Sort Colors [Practice](https://leetcode.com/problems/sort-colors)

### Description  
You’re given an array `nums` where each element is either 0, 1, or 2.  
Each integer represents a color:  
- 0 → red  
- 1 → white  
- 2 → blue  

Sort the array in-place so that all objects of the same color are adjacent, ordered as red (0), then white (1), then blue (2).  
Do not use any built-in sort function; your solution must be in-place and run in linear time.

### Examples  

**Example 1:**  
Input: `[2,0,2,1,1,0]`  
Output: `[0,0,1,1,2,2]`  
*Explanation: All reds (0s) come first, followed by all whites (1s), then all blues (2s).*

**Example 2:**  
Input: `[2,0,1]`  
Output: `[0,1,2]`  
*Explanation: One of each color, just put each into its place.*

**Example 3:**  
Input: ``  
Output: ``  
*Explanation: Only one element—already "sorted".*

### Thought Process (as if you’re the interviewee)  
First idea:  
- Brute force: use a sorting algorithm (like quicksort, mergesort, or even Python’s sort), but that takes O(n log n) time.  
- Another simple option: do a **counting sort**—count the number of 0s, 1s, and 2s, then overwrite the array. This is O(n) time, but needs two passes.

Optimized approach:  
- Notice that there are only **three distinct values**.
- We can maintain **three regions** in the array—one for 0s, one for 1s, and one for 2s.
- This is the classic **Dutch National Flag algorithm** using three pointers:  
    - `low` (end of 0’s region, starts at 0),  
    - `mid` (current element, starts at 0),  
    - `high` (start of 2’s region, starts at len(nums)-1).
- Traverse the array with `mid`:
    - If `nums[mid] == 0`: swap with `nums[low]`, increment `low` and `mid`.
    - If `nums[mid] == 2`: swap with `nums[high]`, decrement `high`. (Don’t advance `mid`, as the swapped-in value could be 0, 1, or 2.)
    - If `nums[mid] == 1`: just increment `mid`.
- This sorts the whole array in a **single pass** using **constant space**.

Why this way?  
- Meets O(n) time and O(1) space requirements.
- No need for extra memory except a few pointers.
- Demonstrates the ability to do in-place classification or partitioning—common for interview problems involving a small range of values.

### Corner cases to consider  
- Empty array: `[]`
- Array with all the same elements: `[0,0,0,0]`, `[2,2,2]`
- Array with only two types of values: `[1,2,2,1]`
- Array with one element: `[1]`
- Already sorted input: `[0,0,1,1,2,2]`
- Reverse sorted input: `[2,2,1,1,0,0]`

### Solution

```python
def sortColors(nums):
    """
    Do not return anything, modify nums in-place instead.
    """
    low = 0         # All elements before low are 0
    mid = 0         # Current element
    high = len(nums) - 1  # All elements after high are 2

    while mid <= high:
        if nums[mid] == 0:
            # Swap current element with the region of 0's
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1
            mid += 1
        elif nums[mid] == 2:
            # Swap current element with the region of 2's
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1
        else:
            # If it's 1, just move forward
            mid += 1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Every element is moved at most once, single pass through the array.
- **Space Complexity:** O(1) — Only a few integer pointers are used; sorting is done in-place.

### Potential follow-up questions (as if you’re the interviewer)  

- Could you generalize this for **k** colors instead of just 3?  
  *Hint: Would the Dutch National Flag approach work if you had k distinct values? How does counting sort fit in?*

- How would you sort the colors if you could use **extra memory**?  
  *Hint: Consider using a frequency array (counting sort) and overwriting the array.*

- Can you ensure the algorithm remains **stable** (keeps the same order for same elements as in input)?  
  *Hint: Is the Dutch National Flag algorithm stable? Why or why not?*

### Summary
This problem uses the **Dutch National Flag algorithm**—a classic case of in-place partitioning with multiple regions—also useful anywhere you need to segregate elements into distinct groups when the domain is small (e.g., 0/1 arrays, grouping negatives/positives/zeros, color sorting in image processing).  
It demonstrates both pointer manipulation and in-place sorting patterns common to array problems in interviews.

### Tags
Array(#array), Two Pointers(#two-pointers), Sorting(#sorting)

### Similar Problems
- Sort List(sort-list) (Medium)
- Wiggle Sort(wiggle-sort) (Medium)
- Wiggle Sort II(wiggle-sort-ii) (Medium)