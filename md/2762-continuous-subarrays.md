### Leetcode 2762 (Medium): Continuous Subarrays [Practice](https://leetcode.com/problems/continuous-subarrays)

### Description  
Given a 0-indexed array of integers `nums`, count the number of **continuous subarrays** where for any two indices inside the subarray, the **absolute difference** between their values is at most 2.

In other words, for any subarray from i to j, and for any chosen i₁, i₂ where i ≤ i₁, i₂ ≤ j:  
  |nums[i₁] - nums[i₂]| ≤ 2

Return the **total number** of such subarrays.

### Examples  

**Example 1:**  
Input: `nums = [5,4,2,4]`  
Output: `8`  
*Explanation:*
- Single elements: [5], [4], [2], [4]
- Size 2: [5,4], [4,2], [2,4] (each difference ≤ 2)
- Size 3: [4,2,4] (max=4, min=2; 4-2=2 ≤ 2)
- Size 4 is invalid (min=2, max=5, 5-2=3 > 2)
Total = 4 (size 1) + 3 (size 2) + 1 (size 3) = 8

**Example 2:**  
Input: `nums = [1,2,3]`  
Output: `6`  
*Explanation:*
- All single elements: [1], [2], [3]
- Size 2: [1,2], [2,3]
- Size 3: [1,2,3] (max=3, min=1; 3-1=2)
Total = 3 (size 1) + 2 (size 2) + 1 (size 3) = 6

**Example 3:**  
Input: `nums = [4,7,5]`  
Output: `3`  
*Explanation:*
- [4], , [5] are valid (single elements)
- [4,7]: |4-7|=3 (>2) ⇒ invalid
- [7,5]: |7-5|=2 (valid)
- [4,7,5]: min=4, max=7, 7-4=3 (>2) ⇒ invalid
So, total = 3 (size 1) + 1 (size 2) = 4

### Thought Process (as if you’re the interviewee)  
Start with **brute-force**: Check every subarray, and for each, verify the min and max difference.  
- For each start index, for each end index, extract subarray, check all pairs.
- This leads to O(n³) in worst case.

To **optimize**:
- Since only min and max matter (difference between any two elements can be at most 2 ⇒ max-min ≤ 2), we can maintain a sliding window [l, r]:
    - When expanding right, update min and max.
    - If max-min ≤ 2, extend window; else, move l forward till validity restored.
    - For each right endpoint, all windows [l, r] are valid (consecutive).
- We can track min and max efficiently within O(log n) time using a data structure like TreeMap or multiset; in Python, we can use SortedList (or a manual approach for interviews).

This **sliding window** approach is O(n) ~ O(n log n) depending on min/max maintenance.

**Why this?** The sliding window lets us efficiently track valid subarrays and count with less than O(n²) work.

### Corner cases to consider  
- Empty array (likely 0, but problem says non-empty)
- All elements equal (all subarrays valid)
- Array of length 1 (trivially valid)
- Elements alternating between max-min repeatedly
- Array strictly increasing/decreasing
- Large input size (test for efficiency)
- Duplicates, negative values

### Solution

```python
# Sliding window, maintain min and max using simple tracking.
# All code logic is commented for clarity and interview style.

def continuous_subarrays(nums):
    n = len(nums)
    from collections import deque
    
    min_q, max_q = deque(), deque()  # Monotonic queues for min and max
    l = 0
    count = 0
    
    for r in range(n):
        # Maintain decreasing max_q
        while max_q and nums[r] > max_q[-1]:
            max_q.pop()
        max_q.append(nums[r])
        
        # Maintain increasing min_q
        while min_q and nums[r] < min_q[-1]:
            min_q.pop()
        min_q.append(nums[r])
        
        # Slide l forward if window is invalid
        while max_q[0] - min_q[0] > 2:
            if max_q[0] == nums[l]:
                max_q.popleft()
            if min_q[0] == nums[l]:
                min_q.popleft()
            l += 1
        
        # For each r, number of valid subarrays ending at r is (r - l + 1)
        count += (r - l + 1)
    
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  - Each element is pushed/popped to the (at most) monotonic min and max deques once, so overall O(n).
- **Space Complexity:** O(n) in worst case due to deques storing up to n elements, but typically much less.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the difference allowed is a variable k instead of 2?  
  *Hint: Replace constant by parameter and use the same sliding window idea.*

- How would you do this if the array is changing (elements updated frequently, with queries)?  
  *Hint: Consider segment trees or balanced BST for dynamic range min/max queries.*

- If the elements can be very large (like 1e9), can you still do O(n)?  
  *Hint: Yes—since you only care about ordering for min and max, the element value magnitude is not a bottleneck.*

### Summary
This problem uses the **sliding window with two pointers** technique, enhanced by two monotonic queues to efficiently track the minimum and maximum in a window. When a window violates the constraint (max-min > 2), move the left pointer forward.  
This pattern is common for problems requiring "subarrays/substrings where some property is true for all elements", particularly when the property can be checked or updated efficiently (like monotonic min/max, frequency counts).  
The sliding window and monotonic deque idea is key in many modern array, string, and interval problems.

### Tags
Array(#array), Queue(#queue), Sliding Window(#sliding-window), Heap (Priority Queue)(#heap-priority-queue), Ordered Set(#ordered-set), Monotonic Queue(#monotonic-queue)

### Similar Problems
