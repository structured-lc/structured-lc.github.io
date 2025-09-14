### Leetcode 3683 (Easy): Earliest Time to Finish One Task [Practice](https://leetcode.com/problems/earliest-time-to-finish-one-task)

### Description  
Given the start times and durations for several tasks, you must pick **exactly one task** to complete. For each task, calculate its finish time as `startTime[i] + duration[i]`, then find the **earliest possible time** by which you can finish any one of the tasks.  
Return the **minimum finish time** across all tasks.

### Examples  

**Example 1:**  
Input: `startTime = [1,2], duration = [6,3]`  
Output: `5`  
*Explanation:  
- Task 0 finishes at 1 + 6 = 7  
- Task 1 finishes at 2 + 3 = 5  
Earliest finish is 5.*

**Example 2:**  
Input: `startTime = [3,3,3], duration = [2,5,1]`  
Output: `4`  
*Explanation:  
- Task 0: 3 + 2 = 5  
- Task 1: 3 + 5 = 8  
- Task 2: 3 + 1 = 4  
Earliest is 4.*

**Example 3:**  
Input: `startTime = , duration = [2]`  
Output: `12`  
*Explanation:  
Only one task: 10 + 2 = 12.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  The brute-force approach is to calculate the finish time for every task: finish = startTime[i] + duration[i]. Keep track of the minimum finish time encountered.
- **Optimized:**  
  Since we only need the earliest finish time across all tasks and there are no dependencies, this brute-force solution is already optimal.
- **Trade-offs:**  
  This requires only a single pass; nothing more efficient is possible for arbitrary input. No need for sorting or advanced data structures.

### Corner cases to consider  
- Only one task.
- Multiple tasks with the same finish time.
- startTime or duration contains zeros.
- Empty lists (should validate inputs; undefined behavior).
- Large inputs, but fits in allowed constraints (e.g., up to 10⁵ tasks).

### Solution

```python
def earliestTimeToFinishOneTask(startTime, duration):
    # Initialize the minimum finish time as infinity
    min_finish = float('inf')
    # Iterate through each task
    for i in range(len(startTime)):
        finish = startTime[i] + duration[i]
        # Update minimum if a smaller finish time is found
        if finish < min_finish:
            min_finish = finish
    return min_finish
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — where n = number of tasks. We iterate through each task once to compute finish time and track the minimum.
- **Space Complexity:** O(1) — Only constant extra space for min_finish.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you must finish **k** tasks and want the earliest time when all k are done?  
  *Hint: Sort finish times, take the kᵗʰ largest.*

- What if each task has a release time, and you can start only after that, with dependencies between tasks?  
  *Hint: This might require topological sort or simulating task dependencies.*

- Can these arrays be very large or streamed?  
  *Hint: How would you process in constant or small memory?*

### Summary
This problem is a straightforward use of the **linear scan/min tracking pattern**—for each task, calculate its finish time and keep the smallest. This approach is **general for finding an overall min (or max) through a list** and appears in array and stream-processing contexts. No dependencies mean we don't need sorting, heap, or advanced techniques.

### Tags


### Similar Problems
