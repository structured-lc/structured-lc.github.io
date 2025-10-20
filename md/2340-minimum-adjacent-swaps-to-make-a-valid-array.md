### Leetcode 2340 (Medium): Minimum Adjacent Swaps to Make a Valid Array [Practice](https://leetcode.com/problems/minimum-adjacent-swaps-to-make-a-valid-array)

### Description  
Given a zero-indexed integer array **nums**, you can swap any two *adjacent* elements as many times as you want.  
You want the array to be *valid*, defined as:
- The **smallest** element is at the **leftmost** (index 0) position (if duplicates: any one of the smallest).
- The **largest** element is at the **rightmost** (last index) position (if duplicates: any one of the largest).
Return the **minimum number of adjacent swaps** needed to make the array valid.

### Examples  

**Example 1:**  
Input: `nums = [3,4,5,5,3,1]`  
Output: `6`  
*Explanation:*
- Move the smallest (`1`) to front:  
  Swap 5 with 1 → [3,4,5,5,3,1]  
  Swap 3 with 1 → [3,4,5,5,1,3]  
  Swap 5 with 1 → [3,4,5,1,5,3]  
  Swap 4 with 1 → [3,4,1,5,5,3]  
  Swap 3 with 1 → [3,1,4,5,5,3]  
  Swap 3 with 1 → [1,3,4,5,5,3]  
  Total: 5 swaps for the smallest.  
- Largest (`5`) to end:  
  After above, one `5` is already at index 4.  
  Swap 5 and 3 → [1,3,4,5,3,5]  
  Total: 1 more swap.  
  **Total swaps: 6**

**Example 2:**  
Input: `nums = [2,1,4,3,5]`  
Output: `3`  
*Explanation:*
- Smallest (`1`) from index 1 to 0: 1 swap  
- Largest (`5`) from index 4 to 4: 0 swaps  
  **Total: 1 + 0 = 1 swap**
- But in this specific case, since largest is already in the correct place, only 1 swap needed.

**Example 3:**  
Input: `nums = [2,1]`  
Output: `1`  
*Explanation:*
- Smallest (`1`) at index 1, largest (`2`) at index 0.
- Move `1` to front: 1 swap → [1,2]
- Now largest is already at end after moving.
- **Total swaps: 1**

### Thought Process (as if you’re the interviewee)  
First, I noticed that **only the relative positions of the smallest and largest elements matter**—other numbers don't affect the needed swaps, since only the extremes need to be moved.  
Brute force could simulate all swaps, but that's O(n²) and unnecessary.  
Optimized idea:  
- Find the **leftmost smallest (min)** and **rightmost largest (max)**.  
- Moving smallest to front: costs `min_index` swaps.  
- Moving largest to back: costs `n-1 - max_index` swaps.  
- If the min comes after the max (`min_index > max_index`), moving the min "over" the max causes a double-count, so subtract 1 from total swaps to avoid overcount.  
This fits a **greedy + two-pointer** pattern.

### Corner cases to consider  
- Array already valid: smallest at start, largest at end → 0 swaps.
- Multiple smallest/largest elements.
- min_index == max_index (single element array).
- Smallest and largest swapped (e.g. [2,1]).
- Empty array (shouldn't happen per constraints, but handle gracefully).
- Only one element.

### Solution

```python
def minimumSwaps(nums):
    n = len(nums)

    # Find leftmost index of smallest value
    min_val = min(nums)
    min_index = nums.index(min_val)

    # Find rightmost index of largest value
    max_val = max(nums)
    # use rindex style: scan from right for rightmost max
    for i in range(n-1, -1, -1):
        if nums[i] == max_val:
            max_index = i
            break

    # Swaps to bring min to front + swaps to bring max to end
    swaps = min_index + (n - 1 - max_index)

    # If min comes after max, moving min shifts max right, so subtract 1
    if min_index > max_index:
        swaps -= 1

    return swaps
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)
  - One pass to find min, one pass to find max. No nested loops.
- **Space Complexity:** O(1)
  - Uses a few variables, no extra storage apart from input.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to generalize to k smallest and k largest in fixed positions?  
  *Hint: Think of the effect on swap order for multiple extremes.*

- How would you handle this if swaps could only move to non-adjacent positions?  
  *Hint: Does the greedy approach still work?*

- Can you output the actual swap sequence?  
  *Hint: Simulate the shift while tracking swaps.*

### Summary
This problem is a variation of the greedy, two-pointer, and optimal swap strategy seen in similar array manipulation questions.  
It's an example of focusing on *key elements* (min/max) and their *relative order*, and not getting distracted by the rest.  
The greedy insight—adjust for overlaps when movement paths of min and max cross—is a common thread in swap/min-move array problems.


### Flashcard
Find leftmost min and rightmost max; swaps needed are min_index + (n-1 - max_index) minus one if min comes after max.

### Tags
Array(#array), Greedy(#greedy)

### Similar Problems
- Minimum Adjacent Swaps for K Consecutive Ones(minimum-adjacent-swaps-for-k-consecutive-ones) (Hard)