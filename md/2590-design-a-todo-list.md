### Leetcode 2590 (Medium): Design a Todo List [Practice](https://leetcode.com/problems/design-a-todo-list)

### Description  
Design a Todo List system where users can add tasks with due dates and tags, mark tasks as complete, retrieve all tasks, or filter tasks by specific tags. The system should efficiently manage tasks for multiple users.

### Examples  

**Example 1:**  
Input:  
- `todoList = TodoList()`
- `taskID1 = todoList.addTask(1, "Buy groceries", 2023-04-20, ["shopping", "urgent"])`
- `taskID2 = todoList.addTask(1, "Pay bills", 2023-04-22, ["finance"])`
  
Output:  
- `taskID1 = 1`, `taskID2 = 2`
  
Explanation: User 1 adds two tasks. The system assigns task IDs 1 and 2 to "Buy groceries" and "Pay bills," respectively.

**Example 2:**  
Input:  
- `allTasks = todoList.getAllTasks(1)`
- `financeTasks = todoList.getTasksForTag(1, "finance")`

Output:  
- `allTasks = ["Buy groceries", "Pay bills"]` if both tasks are pending.
- `financeTasks = ["Pay bills"]`
  
Explanation: This retrieves all pending tasks for user 1 and tasks tagged as "finance."

**Example 3:**  
Input: `todoList.completeTask(1, 1)`  
- Assume "Buy groceries" is task ID 1.

Output: "Buy groceries" is marked as complete.

Explanation: This marks "Buy groceries" as complete for user 1.

### Thought Process  
1. **Brute-Force Approach**: Initially, consider using separate data structures for each user's tasks, such as lists or dictionaries, to store tasks and their details. This approach would be simple but inefficient for filtering tasks by tags or due dates.

2. **Optimized Approach**: For efficiency, use a combination of data structures:
   - **HashMap**: Store tasks per user, allowing for fast access and modification of tasks.
   - **Set or List**: Use this for storing tags, ensuring efficient filtering and minimizing redundancy.

3. **Final Approach**: Implement `TodoList` class with methods to add tasks, retrieve tasks, and filter tasks by tags. This encapsulates data and operations, ensuring a clean interface.

### Corner Cases to Consider  
- **Empty Input**: Handle cases where users have no tasks or empty tag lists.
- **Duplicate Tasks**: Decide whether to allow duplicate task descriptions or handle them uniquely.
- **Invalid Input**: Validate user IDs, task IDs, and tags to prevent errors.
- **Task Completion**: Ensure that completed tasks are correctly marked and removed from the list of pending tasks.

### Solution

```python
class Task:
    def __init__(self, task_id, description, due_date, tags):
        self.task_id = task_id
        self.description = description
        self.due_date = due_date
        self.tags = set(tags)
        self.completed = False

class TodoList:
    def __init__(self):
        # Initialize task ID counter
        self.task_id = 1
        # Dictionary mapping user IDs to their tasks
        self.user_tasks = {}

    def addTask(self, userId: int, taskDescription: str, dueDate: int, tags: list[str]):
        # Create a new task and assign it an ID
        task = Task(self.task_id, taskDescription, dueDate, tags)
        
        # Add the task to the user's task list
        if userId not in self.user_tasks:
            self.user_tasks[userId] = []
        self.user_tasks[userId].append(task)
        
        # Increment task ID for the next task
        task_id = self.task_id
        self.task_id += 1
        return task_id

    def getAllTasks(self, userId: int):
        # Filter out completed tasks and return their descriptions
        pending_tasks = [task.description for task in self.user_tasks.get(userId, []) if not task.completed]
        return pending_tasks

    def getTasksForTag(self, userId: int, tag: str):
        # Filter tasks by the specified tag
        tasks_for_tag = [task.description for task in self.user_tasks.get(userId, []) if tag in task.tags and not task.completed]
        return tasks_for_tag

    def completeTask(self, userId: int, taskId: int):
        # Mark a task as completed
        for task in self.user_tasks.get(userId, []):
            if task.task_id == taskId:
                task.completed = True
                break

### Time and Space Complexity Analysis  
- **Time Complexity**: 
  - `__init__`: O(1)
  - `addTask`: O(1)
  - `getAllTasks`, `getTasksForTag`: O(n log n) due to sorting tasks when retrieving them (if necessary to maintain order)
  - `completeTask`: O(n) where n is the number of tasks for a user

- **Space Complexity**: O(n) where n is the total number of tasks across all users.

### Potential Follow-up Questions  

1.   How would you implement a priority queue to manage tasks based on their due dates?  
  *Hint: Consider using a data structure like a binary heap or SortedList to efficiently maintain tasks by due date.*

2.   How would you handle tasks with recurring due dates?  
  *Hint: Introduce a field to track recurrence patterns and automatically regenerate tasks when they are completed.*

3.   If the system needs to handle thousands of users and tasks efficiently, what optimizations could be made?  
  *Hint: Consider using databases for persistent storage and indexing tags for faster lookup.*


### Summary  
This solution uses object-oriented design to encapsulate task data and operations, providing a clean interface for managing tasks. It leverages dictionaries and sets for efficient storage and lookup, making it suitable for systems with multiple users and tasks. This pattern is common in task management systems and can be applied to various problems involving data management and filtering.

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Design(#design), Sorting(#sorting)

### Similar Problems
