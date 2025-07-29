### Leetcode 3237 (Medium): Alt and Tab Simulation [Practice](https://leetcode.com/problems/alt-and-tab-simulation)

### Description  
You are given an array `windows` of distinct integers (window ids), representing the order in which windows are stacked (top to bottom). There's also a `queries` array: each time you "Alt+Tab" to a window with id `q`, you move window `q` to the top (if not already on top).  
Given `windows` and `queries`, return the **final order** of windows after processing all `queries` in sequence.  
Think of it like simulating how real Alt+Tab works: after switching to several windows (possibly multiple times), what is the new z-order of all the windows?

### Examples  

**Example 1:**  
Input: `windows = [1,2,3]`, `queries = [3,3,2]`  
Output: `[2,3,1]`  
*Explanation:*
- Initial: `[1,2,3]`
- Alt+Tab to 3: `[3,1,2]`
- Alt+Tab to 3 again (already on top): `[3,1,2]`
- Alt+Tab to 2: `[2,3,1]`

**Example 2:**  
Input: `windows = [4,2,7,1]`, `queries = [7,4,2]`  
Output: `[2,7,4,1]`  
*Explanation:*
- Initial: `[4,2,7,1]`
- Alt+Tab to 7: `[7,4,2,1]`
- Alt+Tab to 4: `[4,7,2,1]`
- Alt+Tab to 2: `[2,4,7,1]`

**Example 3:**  
Input: `windows = [10,20,30]`, `queries = [30,20,20,10]`  
Output: `[10,20,30]`  
*Explanation:*
- Initial: `[10,20,30]`
- Alt+Tab to 30: `[30,10,20]`
- Alt+Tab to 20: `[20,30,10]`
- Alt+Tab to 20 again: `[20,30,10]`
- Alt+Tab to 10: `[10,20,30]`

### Thought Process (as if you’re the interviewee)  
First, brute-force: for each query, find its index in the current `windows` list, remove it, and insert at position 0. This is O(q·n), slow for larger inputs.

Next, can we optimize?  
Notice that repeatedly Alt+Tab-ing to the same window keeps it at the top, so multiple queries for the same window are redundant if closer together.

Observation:  
- After all the Alt+Tab queries, the order is: *last to most recently activated*, then all other windows in their current relative order.

Optimized plan:
- Iterate over `queries` **in reverse**.
- For each, if we haven’t seen this window yet, record it.
- After this, add all windows from the original windows array that haven’t been seen.
- This recreates the "top first, rest as before" effect.

This reduces each query from O(n) to O(1) via a hash set, making overall time O(n + q), much faster.

### Corner cases to consider  
- `windows` or `queries` empty (should just return windows)
- All queries are distinct
- All queries are for the same window
- Windows/queries with only one element
- Windows listed in the queries but not in `windows` (not possible as per constraints)
- Large `windows`/`queries` with many duplicates in queries

### Solution

```python
def simulationResult(windows, queries):
    # Use a set to track which windows have already been moved to the top
    seen = set()
    ans = []

    # First, add queries to result in reverse order, only if not already added
    for q in reversed(queries):
        if q not in seen:
            ans.append(q)
            seen.add(q)

    # Then add the remaining windows in their original order
    for w in windows:
        if w not in seen:
            ans.append(w)
            seen.add(w)

    # The answer was built from top to bottom, so reverse to get final order
    ans.reverse()
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + q)  
  Where n = len(windows), q = len(queries).  
  Each query and window is processed at most once with set and list operations.

- **Space Complexity:** O(n)  
  For the final answer array and the set used for tracking, both proportional to the number of windows.

### Potential follow-up questions (as if you’re the interviewer)  

- What if windows could duplicate in the queries or initial list?  
  *Hint: Think about using an OrderedDict or linked list for deduplication and quick move-to-front.*

- Could you handle millions of windows efficiently?  
  *Hint: Discuss trade-offs between using a hash set for fast lookups versus memory usage.*

- What if you wanted to track the previous active window each time?  
  *Hint: Could keep track of a history stack to simulate real OS window switching.*

### Summary
This approach leverages the **order preservation and deduplication** pattern—a common interview theme for LRU cache simulators and window/tab management simulations.  
By building the "top windows" first (in reverse query order), and then filling in with the untouched windows, we achieve a clean O(n + q) linear method.  
This strategy is widely applicable wherever you need to track "most recent" or "move-to-top" elements efficiently without repeated shifting.