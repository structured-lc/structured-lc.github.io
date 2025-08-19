### Leetcode 3637 (Easy): Trionic Array I [Practice](https://leetcode.com/problems/trionic-array-i)

### Description  
You are given an array of integers `nums`. The array is called **trionic** if there exist indices 0 < p < q < n-1 such that:
- The subarray from index 0 to p (inclusive) is **strictly increasing**,
- The subarray from p to q (inclusive) is **strictly decreasing**,
- The subarray from q to n-1 (inclusive) is **strictly increasing**.

Return `True` if `nums` is trionic, otherwise return `False`. 
Both transitions (from increasing to decreasing, and then back to increasing) must have at least one element, so each segment is non-empty and strictly monotonic.

### Examples  

**Example 1:**  
Input: `nums = [1,3,5,4,2,6]`  
Output: `True`  
*Explanation:*
- For p = 2, q = 4:
- [1,3,5] is strictly increasing → 1 < 3 < 5
- [5,4,2] is strictly decreasing → 5 > 4 > 2
- [2,6] is strictly increasing → 2 < 6

**Example 2:**  
Input: `nums = [2,1,3]`  
Output: `False`  
*Explanation:*
- No such p, q exist to form required three segments.

**Example 3:**  
Input: `nums = [1,2,3,2,1,2,3]`  
Output: `True`  
*Explanation:*
- For p = 2, q = 4:
- [1,2,3] is strictly increasing,
- [3,2,1] is strictly decreasing,
- [1,2,3] is strictly increasing.

### Thought Process (as if you’re the interviewee)  
First, let's clarify the requirements:
- There need to be three contiguous segments: increase → decrease → increase.
- The indices p and q must satisfy 0 < p < q < n-1 (each segment has at least one element, and none can overlap with the array edges).
- All transitions must be **strictly** increasing or decreasing, not just non-decreasing or non-increasing.

The **brute force** approach would be to try all possible p, q pairs and check if the segments meet the criteria, but that would be O(n²) and undesirable for interview.

Instead, I’ll use a **single pass pointer approach**:
- Move a pointer p from 0, as long as each next element increases.
- If p == 0, there wasn’t any increase, so return False.
- Move a pointer q from p, as long as each next element decreases.
- If q == p, there was no decrease, so return False.
- Move a pointer r from q, as long as each next element increases.
- If r == q, there was no final increase, so return False.
- Return whether r reaches the end (r == n-1).

This takes linear time, O(n), and only needs constant space.

### Corner cases to consider  
- Array length < 4 (you can’t have 3 segments).
- All elements are the same.
- No strictly increasing or strictly decreasing segments (e.g., already monotonic).
- Segments touch edges of array (segments can’t start at 0 or end at n-1).
- Segments with single elements.

### Solution

```python
def isTrionic(nums):
    n = len(nums)
    if n < 4:
        return False

    p = 0
    # 1st segment: strictly increasing
    while p + 1 < n and nums[p] < nums[p + 1]:
        p += 1

    # p can't be at first element (need at least one increase)
    if p == 0:
        return False

    q = p
    # 2nd segment: strictly decreasing
    while q + 1 < n and nums[q] > nums[q + 1]:
        q += 1

    # need at least one decrease
    if q == p:
        return False

    r = q
    # 3rd segment: strictly increasing
    while r + 1 < n and nums[r] < nums[r + 1]:
        r += 1

    # need at least one increase at the end, and r should reach last index
    if r == q:
        return False

    return r == n - 1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each loop traverses any element at most once; total work is proportional to array length n.

- **Space Complexity:** O(1)  
  Only a few integer pointers are used, and no extra space scales with input.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the segments were allowed to be non-strict (allowing equal elements)?  
  *Hint: Adjust comparisons to allow “≤” and “≥” instead of “<” and “>”.*

- How would you return the indices p and q, not just whether the array is trionic?  
  *Hint: Track and return the index positions where each segment ends.*

- Can you generalize this to k “mountain-valley” alternations?  
  *Hint: Alternate scans for increasing and decreasing segments, tracking transitions.*

### Summary
This problem uses a **multi-pointer / scan partitioning technique** to classify array regions in a single linear pass. It’s a great example of reducing brute-force segment-checking to O(n) greedy scanning. This pattern can be generalized to problems like valleys and mountains (peak/valley arrays), stock trading, or tripartite array segmentation where strict monotonicity is required.

### Tags
Array(#array)

### Similar Problems
