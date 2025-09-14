### Leetcode 3679 (Medium):  Minimum Discards to Balance Inventory [Practice](https://leetcode.com/problems/minimum-discards-to-balance-inventory)

### Description  
You are given two integers, **w** and **m**, and an array **arrivals** where arrivals[i] indicates the type of item arriving on day i (days are 1-indexed).  
After each arrival, you may choose to **keep** or **immediately discard** the item. An item can only be discarded on the day it arrives.  
**Rule:** For every consecutive window of **w** days (i.e., days [max(1, i-w+1), i]), no item type can occur more than **m** times among the arrivals you kept in that window.  
Return the **minimum number of discards** needed so all windows are valid.

### Examples  

**Example 1:**  
Input: `w = 3, m = 2, arrivals = [1, 2, 1, 1, 1]`  
Output: `1`  
Explanation:  
- Days 1-3: arrivals = [1,2,1]. Type 1 appears 2 times (≤2), ok.  
- Day 4: [2,1,1] — type 1 appears 2 times, ok.  
- Day 5: [1,1,1] — type 1 would appear 3 times if we kept all.  
- So, we **must discard** one of the type 1s to ensure only 2 type 1s in the current window.  
- Minimum number of discards: 1.

**Example 2:**  
Input: `w = 2, m = 1, arrivals = [1, 2, 1, 2, 1]`  
Output: `2`  
Explanation:  
- Window [1,2]: arrivals [1,2], both unique, ok.  
- Day 3: [2,1], type 1 appears for the first time, ok, but for day 4:  
- Window [3,4]: arrivals [1,2], both unique, ok.  
- For day 5: window is [4,5]: arrivals [2,1], both unique, ok.  
- But if kept all, in day 3 both type 1s would violate (max 1 per window). Discard either one in day 3/5, total: 2 discards.

**Example 3:**  
Input: `w = 4, m = 2, arrivals = [1,1,1,1,1]`  
Output: `2`  
Explanation:  
- Any window of size 4, if we keep all, some windows will have type 1 repeated 4 times. We must discard 2 so that in every length-4 window, type 1 appears up to 2 times.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Try all possible ways to keep/discard items, but that’s exponential — for each day, 2 choices (keep/discard).

- **Better idea: Sliding window + HashMap:**  
  The problem is to maintain up to m of any type in every window of length w.  
  For each day, keep a count per type for the current window.  
  - When an arrival comes, if keeping it would make its count in the window > m, **discard** it (count as a discard, don't add to count).
  - Otherwise, keep it (increment count).
  - As window moves forward (i ≥ w), decrement count for items that are leaving the window (i-w index).

- Why is this correct?  
  Always greedily discard an arrival only when that type would become too frequent in the current window. Every window is checked exactly.  
  Tracking the window using a hashmap will avoid unnecessary recomputation.

### Corner cases to consider  
- Arrivals array is empty (output: 0).
- All items are distinct (never discard).
- w = 1 (never discard because only 1 per window).
- m = 0 (must discard all).
- All arrivals are of the same type.
- Arrivals shorter than w.

### Solution

```python
def minimum_discards(w, m, arrivals):
    # Map: type → count of that type within window
    from collections import defaultdict
    count = defaultdict(int)
    discards = 0
    n = len(arrivals)
    
    # To know which element is leaving the window,
    # keep a queue of the arrivals kept (and their indices/types)
    window = []
    
    for i in range(n):
        item = arrivals[i]
        # If keeping would exceed m in window, discard
        if count[item] < m:
            window.append(item)
            count[item] += 1
            # ok, kept this one
        else:
            discards += 1
            window.append(None) # Mark as discarded, so no count
            
        # If we've just added the (i-w+1)ᵗʰ arrival, remove its effect if it's in window
        if i >= w - 1:
            out_item = window[i - (w - 1)]
            if out_item is not None:
                count[out_item] -= 1
    return discards
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each arrival is processed once. Sliding window updates and hashmap operations are O(1) amortized per element.

- **Space Complexity:** O(n)  
  The window array keeps track of past kept/discarded elements (at most n).  
  Hashmap keeps up to the number of unique types (could be up to n in worst case).

### Potential follow-up questions (as if you’re the interviewer)  

- What if w is very large compared to n?  
  *Hint: Can you optimize space if the window always covers the entire array?*

- How would you modify this solution to return the actual indices of discarded items?  
  *Hint: Track the indices you discard along the way.*

- If arrivals is a stream, how do you handle discards in real time?  
  *Hint: Maintain only recent window items and counts, do not materialize full list.*

### Summary
This uses the **sliding window + hashmap** pattern, a classic technique for problems with constraints on recent/fixed-length subarrays.  
This pattern often appears in frequency counting, substring, and unique/majority element problems, such as “Longest Substring with At Most K Distinct Characters,” moving average, etc.

### Tags


### Similar Problems
