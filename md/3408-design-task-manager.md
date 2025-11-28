### Leetcode 3408 (Medium): Design Task Manager [Practice](https://leetcode.com/problems/design-task-manager)

### Description  
Implement a task management system to efficiently handle user tasks, where each task has:
- a userId (user to whom it belongs),
- a unique taskId, and
- a priority (higher number means higher priority).

You must support:
- Initializing the system with a list of tasks.
- Adding a new task, given userId, taskId, and priority (taskId is guaranteed unique).
- Editing the priority of an existing task, given taskId and newPriority.
- Removing a task by taskId.
- Executing (returning & removing) the task with the highest priority, breaking ties by lexicographically smaller userId, and then taskId.

Essentially, design an efficient TaskManager class to support these operations with fast lookups and updates.

### Examples  

**Example 1:**  
Input:  
`TaskManager([[1, 100, 5], [2, 200, 3]])`  
`add(2, 300, 7)`  
`execute()`  
Output:  
`[2, 300]`  
*Explanation: Adds two initial tasks. Adds a new task (2, 300, 7). execute() removes (2, 300, 7), as it has highest priority (7).*

**Example 2:**  
Input:  
`TaskManager([[1, 100, 5], [2, 200, 3]])`  
`edit(100, 9)`  
`execute()`  
Output:  
`[1, 100]`  
*Explanation: Edits task 100 to priority 9. Then execute() returns (1, 100) as it now has the highest priority.*

**Example 3:**  
Input:  
`TaskManager([[5, 80, 10], [3, 70, 10], [7, 90, 9]])`  
`execute()`  
Output:  
`[3, 70]`  
*Explanation: Both [5, 80, 10] and [3, 70, 10] have the highest priority (10), but userId 3 < 5, so (3, 70) is returned.*

### Thought Process (as if you’re the interviewee)  
- **Brute force:**  
  Store all tasks in a list. For each execute(), scan all tasks to find max priority. This is O(n) per execute, not scalable if lots of tasks.

- **Need fast lookup and removal by taskId:**  
  Use a hash map taskId→task info for O(1) edit/rmv, and to build convenient indices.

- **Need to efficiently find and remove the highest-priority task, breaking ties:**  
  Use a priority queue (max-heap) of (priority, userId, taskId) (with negative priority for max-heap), alongside the map.

- **Handling removals/edits (because heapq does not support key removal):**  
  When rmv or edit is used, mark the taskId as invalid in the hash map. When popping from heap, skip if taskId is not present or out of sync.

- **Trade-offs:**  
  - Map gives O(1) lookup/update/removal by id.
  - Heap gives O(log n) insert/extract-max for execution.
  - May incur some "garbage" in the heap, but all ops are efficient.

### Corner cases to consider  
- Add or edit non-existent taskId (guaranteed not to happen by problem).
- execute() on empty system (not specified, assume always called only when tasks remain).
- Multiple tasks with same priority/userId, test tie-breaking.
- Remove or edit and then execute (make sure removals/updates propagate).
- Large n: test for time efficiency.

### Solution

```python
import heapq

class TaskManager:
    def __init__(self, tasks):
        # Map: taskId → (userId, priority)
        self.task_map = {}
        # Heap for efficient max-priority extraction:
        #   (-priority, userId, taskId) for max heap, break ties w/ userId, taskId
        self.heap = []

        for userId, taskId, priority in tasks:
            self.task_map[taskId] = (userId, priority)
            # Python heapq is min-heap, so use -priority for max-heap ordering
            heapq.heappush(self.heap, (-priority, userId, taskId))

    def add(self, userId, taskId, priority):
        self.task_map[taskId] = (userId, priority)
        heapq.heappush(self.heap, (-priority, userId, taskId))

    def edit(self, taskId, newPriority):
        if taskId in self.task_map:
            userId, _ = self.task_map[taskId]
            self.task_map[taskId] = (userId, newPriority)
            heapq.heappush(self.heap, (-newPriority, userId, taskId))
        # If not present, do nothing (problem guarantees valid input)

    def rmv(self, taskId):
        # Remove from the map (leave old entries in heap - lazy delete)
        if taskId in self.task_map:
            del self.task_map[taskId]

    def execute(self):
        # Pop until we find a valid, up-to-date task
        while self.heap:
            neg_priority, userId, taskId = heapq.heappop(self.heap)
            if taskId not in self.task_map:
                continue  # Removed previously
            mapped_userId, mapped_priority = self.task_map[taskId]
            # Ensure priority and userId match latest version
            if (mapped_userId == userId) and (mapped_priority == -neg_priority):
                del self.task_map[taskId]
                return [userId, taskId]
        # If we're here, no valid tasks left (not expected under problem promise)
        return []
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - add, edit: O(log n) (heap push).
  - rmv: O(1).
  - execute: amortized O(log n); may need to skip "deleted/updated" entries, but each task only skipped once.
  - Constructor: O(n log n) for initial heap pushes.

- **Space Complexity:**  
  - O(n) for task_map.
  - O(n) for heap (can be bigger if many edits before execute).

### Potential follow-up questions (as if you’re the interviewer)  

- What if execute() needs to return all highest-priority tasks (not just the smallest userId)?
  *Hint: Need to pop multiple from heap, collect matches, handle tie-breaking for all.*

- How would you support updating taskId, or moving task between users?
  *Hint: Remove old id/add new id; handle mapping and update structures accordingly.*

- How would you support undo of the last operation?
  *Hint: Store operation history, design reversible data structure or method for revert.*

### Summary
This problem uses the classic "lazy deletion heap" pattern, combining a hash map for fast id-based lookup/updates/removals with a heap for priority extraction and correct tie-breaking. This design provides efficient O(log n) operations for all required methods and is commonly used in problems requiring priority queue semantics alongside id-indexed lookup (e.g., LRU caches, real-world schedulers). The approach generalizes to systems where items can change priority or be removed dynamically.


### Flashcard
Use a hash map for O(1) task lookup/edit and a max-heap (priority, −userId, taskId) to efficiently extract the highest-priority task.

### Tags
Hash Table(#hash-table), Design(#design), Heap (Priority Queue)(#heap-priority-queue), Ordered Set(#ordered-set)

### Similar Problems
