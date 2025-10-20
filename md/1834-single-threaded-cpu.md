### Leetcode 1834 (Medium): Single-Threaded CPU [Practice](https://leetcode.com/problems/single-threaded-cpu)

### Description  
Given a list of tasks, each with an enqueue time and processing time, there's a single-threaded CPU that can only process one task at a time. At any moment, the CPU chooses the available task with the shortest processing time (and, if tied, smallest original index). If the CPU is idle and no tasks are available, it remains idle. Once a task starts, it runs to completion. After a task completes, the CPU instantly picks the next available task. Return the order in which the CPU processes the tasks (by original indices).

### Examples  

**Example 1:**  
Input: `tasks = [[1,2],[2,4],[3,2],[4,1]]`  
Output: `[0,2,3,1]`  
*Explanation:  
- At time 1, task 0 is available; only task 0 is available, so process 0 (takes 2, ends at 3).  
- At time 3, tasks 1 and 2 are available. Task 2 has shorter processing time (2 vs 4), so process 2 (ends at 5).  
- At time 5, tasks 1 and 3 are available. Task 3 has shortest processing time (1), so process 3 (ends at 6).  
- At time 6, only task 1 remains. Process 1 (ends at 10).  
Order: [0,2,3,1]*

**Example 2:**  
Input: `tasks = [[7,10],[7,12],[7,5],[7,4],[7,2]]`  
Output: `[4,3,2,0,1]`  
*Explanation:  
All tasks become available at time 7. Choose by processing time: 2 (index 4), 4 (index 3), 5 (index 2), 10 (index 0), 12 (index 1).*

**Example 3:**  
Input: `tasks = [[0,3],[1,9],[2,6]]`  
Output: `[0,2,1]`  
*Explanation:  
- At time 0: task 0 is only available, process 0 (ends at 3).  
- At time 3: tasks 1 and 2 are available; task 2 (6) < task 1 (9), so process 2 (ends at 9).  
- At time 9: only task 1 is left. Process 1.*

### Thought Process (as if you’re the interviewee)  
- **Brute force idea:** Simulate time one unit at a time, keeping track of all arrived tasks and selecting the shortest one each time. This is very slow (O(maxTime × n)).
- **Optimization:**  
  - Preprocess tasks by sorting them by enqueue time, appending original index to each.
  - Use a min-heap (priority queue) to always pick the available task with the shortest processing time (heap on (processingTime, index)).
  - Process as follows:  
    - Keep a pointer in the sorted task list for the next not-yet-enqueued task.
    - At each step, if the heap is empty and next task’s enqueue time is in the future, jump time to next enqueueTime.
    - Push all tasks with enqueueTime ≤ current time into heap.
    - Pop from heap, process task, advance time.
- **Why this approach?** Heap operations are fast (O(log n)), and sorting tasks lets us efficiently process all tasks chronologically. The overall run time is O(n log n).

### Corner cases to consider  
- Tasks arrive at the exact same time.
- Multiple tasks have the same processing time.
- CPU idles: long delay/gap before next task arrives.
- Only one task.
- All tasks available at once.
- Large input size (performance).
- Tasks with long processing times followed by short ones.
- Max/min values for enqueue/processing times.
- Output for empty input (though problem constraints say input is non-empty).

### Solution

```python
import heapq

def getOrder(tasks):
    # Attach original index to each task: [enqueueTime, processingTime, index]
    tasks_with_idx = [(enq, proc, idx) for idx, (enq, proc) in enumerate(tasks)]
    # Sort tasks by enqueueTime
    tasks_with_idx.sort()
    
    n = len(tasks)
    result = []
    heap = []
    time = 0
    task_ptr = 0

    # Process until all tasks are handled
    while len(result) < n:
        # Push all tasks whose enqueueTime ≤ current time to the heap
        while task_ptr < n and tasks_with_idx[task_ptr][0] <= time:
            enq, proc, idx = tasks_with_idx[task_ptr]
            heapq.heappush(heap, (proc, idx, enq))
            task_ptr += 1
        
        if heap:
            # Pick the task with min (processingTime, index)
            proc, idx, enq = heapq.heappop(heap)
            result.append(idx)
            time += proc  # CPU processes task, advances time
        else:
            # If no task is available, fast-forward time to next enqueueTime
            if task_ptr < n:
                time = max(time, tasks_with_idx[task_ptr][0])
            
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  - Sorting the tasks: O(n log n).
  - Each push/pop to the heap: O(log n), and each task is pushed/popped at most once.
  - Total: O(n log n).
- **Space Complexity:** O(n)  
  - For the heap and the enriched task list (with indices).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve this if you had to process multiple CPUs (multi-threaded)?
  *Hint: Think about scheduling for multiple idle CPUs; what kind of queue or data structure would be needed?*

- What if each task could have a priority or dependency?
  *Hint: Consider topological sorting for dependencies. How would you insert priority into heap?*

- What if you could only use O(1) extra space (no heap or sorting)?
  *Hint: Consider if any greedy methods or in-place techniques are possible. Are there assumptions about input constraints?*

### Summary
This problem uses the **heap + two pointer pattern** for simulating a scheduling process, combining a sorted list for chronological scanning and a min-heap for task prioritization. This approach is common for process/task scheduling problems and anywhere you need to dynamically choose the *best* available item by some criteria (e.g. Dijkstra’s, interval merging, etc). The use of a priority queue for minimum selection is broadly applicable in real-world scheduling and resource allocation scenarios.


### Flashcard
Sort tasks by enqueue time, use min-heap to always pick shortest available task; simulate time steps efficiently.

### Tags
Array(#array), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue)

### Similar Problems
- Parallel Courses III(parallel-courses-iii) (Hard)
- Minimum Time to Complete All Tasks(minimum-time-to-complete-all-tasks) (Hard)