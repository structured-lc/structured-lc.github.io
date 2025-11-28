### Leetcode 2589 (Hard): Minimum Time to Complete All Tasks [Practice](https://leetcode.com/problems/minimum-time-to-complete-all-tasks)

### Description  
Given a list of tasks, where each task is described by `[start, end, duration]`:
- You must “run” each task for exactly `duration` seconds, within its window `[start, end]` (inclusive).
- Running time does **not** have to be contiguous; it just has to add up to `duration`, all within `[start, end]`.
- The computer can simultaneously run any number of tasks, but the **cost** is the total number of distinct seconds the computer was on.
The goal is to **minimize** the total distinct seconds where the computer is on so all tasks are completed.

### Examples  

**Example 1:**  
Input: `tasks = [[2,3,1],[4,5,1],[1,5,2]]`  
Output: `2`  
*Explanation: You can run task three at times 2 and 4. The other two tasks can be assigned to these same times (because their windows allow it). So you only need to turn on the computer at t=2 and t=4 (or t=3 and t=5, etc).*

**Example 2:**  
Input: `tasks = [[1,2,1],[2,3,1],[3,4,1]]`  
Output: `3`  
*Explanation: Each task is required to run for 1 second and their windows only overlap at respective end/start points. So you must use distinct seconds for each, such as t=1, t=2, t=3.*

**Example 3:**  
Input: `tasks = [[1,1000,1000]]`  
Output: `1000`  
*Explanation: A single giant task needs 1000 total seconds within window [1,1000], so every second will be required.*

### Thought Process (as if you’re the interviewee)  
First, brute-force: Try every combination of time slots for each task. But that's infeasible: the search space is enormous, especially with big windows.

Key insight: **Reuse as many seconds as possible across overlapping tasks.**  
- Each task can be fulfilled by any set of seconds in its interval; we should "stack" them to overlap wherever possible.
- If we process tasks by earliest *ending time* first, then always assign their required time starting as late as possible, we maximize reuse for future (later-ending) intervals.

So:  
- Sort tasks by end.
- For each, count already-used seconds in its window (due to earlier tasks).
- For remaining need, mark unused seconds, starting from the end (so as to be most “reusable” for future tasks with later end times).

This greedy + sweep works because selecting slots as late as possible maximizes overlap for tasks with later deadlines.

**Trade-offs:**  
- We use O(1) space for marking seconds (since all endpoints are ≤2010 in this problem).
- Greedy is justified because, for each task, occupying the latest possible times always leaves more options for the future.

### Corner cases to consider  
- Empty list of tasks (`[]`): should output 0.
- Multiple tasks with identical windows, or completely overlapping: sharing is maximized.
- Tasks with non-overlapping intervals: need own time for each.
- Tasks with duration = 0: should never increase the answer.
- Max window size: e.g., giant range [1,2000].
- Large input, but durations sum to less than the window: do we reuse where possible?

### Solution

```python
def findMinimumTime(tasks):
    # Sort tasks by end time to maximize overlap for stricter intervals
    tasks.sort(key=lambda x: x[1])

    # Mark which seconds we've used; problem says endpoints ≤ 2000
    used = [0] * 2010

    ans = 0
    for start, end, duration in tasks:
        # Calculate how much time we've already spent in this task's window
        already = sum(used[start:end+1])

        need = duration - already
        # Assign remaining 'need' time slots, from end towards start
        t = end
        while need > 0 and t >= start:
            if used[t] == 0:
                used[t] = 1
                ans += 1
                need -= 1
            t -= 1
        # At loop end, either need is zero or window exhausted
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × m), where n = number of tasks, m = maximum possible seconds spanned (up to 2010).  
  - Each task scans its interval, which may cumulatively add up to n × m in worst case.
- **Space Complexity:** O(m), to track the used seconds array (2010 elements regardless of input size).

### Potential follow-up questions (as if you’re the interviewer)  

- If the maximum endpoint was very large (e.g., 10⁹), how would you handle the used array?  
  *Hint: Segment trees, interval trees, or hash sets; sparse usage.*

- Can you return the actual time points used, not just their count?  
  *Hint: Collect time slots in a list as you assign them.*

- What happens if the durations must be contiguous for each task?  
  *Hint: Would need interval-packing; much trickier, may require interval covering approaches.*

### Summary
This is a classic **greedy interval scheduling and covering problem**.  
The pattern—sort by deadline, greedily choose as late as possible—appears in interval packing/covering, scheduling, and bandwidth assignment scenarios.  
Efficiently finding minimum overlap “cover cost” for union of intervals is a common theme in advanced scheduling or resource allocation problems.


### Flashcard
Sort tasks by end time, greedily assign required seconds as late as possible within each task's interval to maximize overlap.

### Tags
Array(#array), Binary Search(#binary-search), Stack(#stack), Greedy(#greedy), Sorting(#sorting)

### Similar Problems
- Single-Threaded CPU(single-threaded-cpu) (Medium)