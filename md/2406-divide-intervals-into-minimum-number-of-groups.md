### Leetcode 2406 (Medium): Divide Intervals Into Minimum Number of Groups [Practice](https://leetcode.com/problems/divide-intervals-into-minimum-number-of-groups)

### Description  
You are given a list of intervals, where each interval is represented as [start, end]. You need to assign each interval to a group such that no two intervals in the same group overlap or even touch (that is, [1,4] and [4,5] overlap at 4). The goal is to return the minimum number of groups required so that every interval is assigned and the above constraint is not violated.

### Examples  

**Example 1:**  
Input: `intervals = [[5,10],[6,8],[1,5],[2,3],[1,10]]`  
Output: `3`  
*Explanation: We can assign groups as follows:*
- Group 1: [1,5]
- Group 2: [2,3],[6,8]
- Group 3: [5,10],[1,10]  
*At time 5, three intervals overlap: [1,5], [5,10], [1,10]. Thus, minimum needed = 3.*

**Example 2:**  
Input: `intervals = [[1,3],[5,6],[8,10]]`  
Output: `1`  
*Explanation: There is no overlap between intervals, so all can be in one group.*

**Example 3:**  
Input: `intervals = [[1,5],[2,6],[3,7],[4,8]]`  
Output: `4`  
*Explanation: All intervals overlap at time 4, so each must be in its own group.*


### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Assign groups one by one and check for conflicts in each group (O(n²)), but this is too slow.
- **Optimized Greedy:** This is analogous to the 'meeting rooms II' or 'minimum number of platforms' problem.  
  The key is that the answer is the *maximum number of overlapping intervals at any point* in time.
- **Approach:**  
  - Sort all interval start and end points.
  - Sweep through the timeline, increment count at each start, decrement at each end+1 (due to inclusive overlap).
  - The peak count seen is the answer.
- **Heap-based variant:** Another method is to sort intervals by start, use a min-heap to store end times, and keep popping from heap if current start > earliest end. Heap size is group count.

### Corner cases to consider  
- Empty input: `intervals = []` ⇒ return 0.
- Intervals that only touch at endpoints: [1,2] and [2,3] are considered overlapping, must be in separate groups.
- Completely nested intervals: All overlapping at a single moment.
- Intervals with same start/end: e.g., [1,3], [1,3], [1,3].
- Single interval: Should return 1.

### Solution

```python
def minGroups(intervals):
    # Collect all start and end+1 points for the sweep line
    events = []
    for start, end in intervals:
        events.append((start, 1))      # +1 for interval starting
        events.append((end + 1, -1))   # -1 for interval ending (end is inclusive)

    # Sort events by time; if times are equal, ends before starts (so that overlapping is correct)
    events.sort()
    ongoing = max_groups = 0

    for _, delta in events:
        ongoing += delta
        max_groups = max(max_groups, ongoing)
    
    return max_groups
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  Sorting all interval endpoints dominates; sweep line is linear.
- **Space Complexity:** O(n)  
  O(n) for event list and O(1) auxiliary.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you need to actually return the group assignments?
  *Hint: Can you use a heap to track actual group availability? Assign group indices using available resource pattern.*
  
- How would your code change if intervals were open (exclusive at end)?
  *Hint: Adjust end+1 to just end, and possibly adjust overlap definition.*

- Can you solve the problem without explicitly building an events array?
  *Hint: Incrementally add and remove from a heap of end times while traversing sorted intervals.*

### Summary
This problem uses the **sweep line / interval overlap counting** pattern, also common in "meeting rooms II", "minimum number of platforms", and event scheduling problems. The core technique is to track how many intervals are active at any point; the maximum is the required groups. This approach is efficient, elegant, and widely applicable to overlapping intervals or resource allocation problems.