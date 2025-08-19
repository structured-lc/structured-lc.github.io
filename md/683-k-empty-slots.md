### Leetcode 683 (Hard): K Empty Slots [Practice](https://leetcode.com/problems/k-empty-slots)

### Description  
Given a garden with `n` slots, each holding a flower that blooms on a different day, you are given an array `flowers` where `flowers[i]` is the position (1-indexed) of the flower that blooms on day `i+1`.  
Find the earliest day where there exist **two flowers that have just bloomed** such that **there are exactly k empty slots between them**—with none of the flowers in those slots bloomed yet.  
Return **that day’s number (1-indexed)**, or `-1` if no such day exists.

### Examples  

**Example 1:**  
Input: `flowers = [1,3,2]`, `k = 1`  
Output: `2`  
*Explanation: On day 1, position 1 blooms. On day 2, position 3 blooms. Position 2 is unbloomed and sits between 1 and 3, so there is exactly 1 empty slot between two bloomed flowers.*

**Example 2:**  
Input: `flowers = [1,2,3]`, `k = 1`  
Output: `-1`  
*Explanation: Every day, adjacent positions bloom, so there’s never a gap of 1 unbloomed slot between any two bloomed slots.*

**Example 3:**  
Input: `flowers = [6,5,8,9,7,1,3,2,4]`, `k = 2`  
Output: `8`  
*Explanation: Track each day's bloom. On day 8, position 2 blooms. The two bloomed flowers at positions 1 and 4 have exactly 2 empty unbloomed slots (positions 2 and 3) between them right after.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  - For every day after a flower blooms, track which slots are bloomed.
  - For every pair of bloomed flowers, check if there are exactly k unbloomed slots between them.
  - This leads to O(n²) time complexity—too slow for large n (up to 20,000).

- **How to optimize?**  
  - The core is: after each day, can we quickly check if two flowers have bloomed with k empty slots between?
  - Instead of checking all pairs, think positionally:  
    - If on day `d` a flower blooms at position `p`, how can we efficiently check if there’s a bloomed flower at position `p - k - 1` or `p + k + 1`, with all flowers in between still unbloomed?
  - A sorted set or tree structure can track bloomed positions, but insert/search is O(log n).
  - **Optimized O(n) approach:**  
    - Precompute for each slot the day it blooms (`days[i] = day slot i+1 blooms`).
    - Use a sliding window of size `k` between two slots; for each window, check if the outer two are lower (bloom earlier) than any flower inside—that means there was a window with k empty slots on the maximum of those two days.
    - Move the window greedily when an invalid slot is found for current window.

### Corner cases to consider  
- `flowers` is empty (return -1)
- `k = 0` (looking for two adjacent bloomed flowers)
- No two flowers ever have k empty slots between them (return -1)
- `k` ≥ `n` (impossible)
- Multiple answers: Only return the earliest day
- All slots bloom in order (never enough gap)

### Solution

```python
def kEmptySlots(flowers, k):
    n = len(flowers)
    if n == 0 or k >= n:
        return -1

    # days[i]: the day the flower at position (i+1) blooms (0-indexed), so use i=slot-1
    days = [0] * n
    for day, slot in enumerate(flowers):
        days[slot - 1] = day + 1  # 1-indexed days

    # Use sliding window
    result = float('inf')
    left, right = 0, k + 1
    while right < n:
        valid = True
        for i in range(left + 1, right):
            # If any flower in window blooms earlier, not valid
            if days[i] < max(days[left], days[right]):
                left = i
                right = i + k + 1
                valid = False
                break
        if valid:
            # Found a pair (left, right) with k empty slots between
            result = min(result, max(days[left], days[right]))
            left = right
            right = left + k + 1
    return result if result < float('inf') else -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n). Each window is considered at most once; if invalid, we skip to the next possible window quickly.
- **Space Complexity:** O(n) for the `days` array.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the code if you needed to support multiple queries (k values) efficiently?  
  *Hint: Precompute additional structures or answer for multiple k at once.*

- Can you achieve it in O(n log n) with real-time add/remove (e.g., not all days known up-front)?  
  *Hint: Use balanced BST (like SortedList) or similar for dynamic insertions.*

- Does this extend to 2D garden grids?  
  *Hint: Think about axes and interval gaps in both directions—requires more sophisticated data structures.*

### Summary
This approach demonstrates the **sliding window/prefix minimum** pattern for interval checking, paired with array preprocessing for O(1) queries. This is a common technique when you need to find a window or subarray with certain min/max properties relative to the edges (seen also in problems like "subarray with constraints," "min/max in all sliding windows," or advanced variation of two-pointer problems).

### Tags
Array(#array), Binary Indexed Tree(#binary-indexed-tree), Segment Tree(#segment-tree), Queue(#queue), Sliding Window(#sliding-window), Heap (Priority Queue)(#heap-priority-queue), Ordered Set(#ordered-set), Monotonic Queue(#monotonic-queue)

### Similar Problems
