### Leetcode 621 (Medium): Task Scheduler [Practice](https://leetcode.com/problems/task-scheduler)

### Description  
You are given a list of tasks represented by capital letters (A–Z) and a non-negative integer n, which is the cooling interval between two same tasks. Each task takes 1 unit of time to execute and the CPU can either execute a task or be idle in each unit. The same type of task must be separated by at least n intervals (including idle or other tasks). Your goal is to find the **minimum total time** required to execute all tasks.

### Examples  

**Example 1:**  
Input: `tasks = ["A","A","A","B","B","B"], n = 2`  
Output: `8`  
*Explanation: One possible order: A → B → idle → A → B → idle → A → B. Total time: 8 units. The cooldown interval forces two idle slots between each repeat of the same task (A or B), minimized by scheduling other tasks in between if possible.*

**Example 2:**  
Input: `tasks = ["A","A","A","B","B","B"], n = 0`  
Output: `6`  
*Explanation: No cooldown needed. Tasks can be scheduled back-to-back: A → A → A → B → B → B.*

**Example 3:**  
Input: `tasks = ["A","A","A","B","B","B","C","C","D","D"], n = 2`  
Output: `10`  
*Explanation: Here the variety of tasks is enough to avoid all idles. Schedule as A → B → C → A → B → D → A → B → C → D, taking a total of 10 units.*

### Thought Process (as if you’re the interviewee)  
First, I would try to focus on minimizing idle time by greedily placing the most frequent tasks as far apart as needed.  
A brute-force would try all orderings, but that's intractable for large inputs.  

The key is:
- Count how many times each task appears.
- The most frequent task (maxFreq) sets the “frame”: we need (maxFreq - 1) groups of at least (n + 1) to separate these tasks.
- For each maxFreq task, they fill one slot in each group.
- Extra tasks of maxFreq contribute to filling in the groups, shortening idles.
- The minimum time is either the length of all tasks (if they fit without idles) or the “framed length”:  
  (maxFreq - 1) × (n + 1) + (number of tasks with maxFreq occurrence).

Optimized approach:
- Count appearances.
- Find max frequency (maxFreq) and its count (how many tasks appear maxFreq times).
- The answer is `max(len(tasks), (maxFreq - 1) × (n + 1) + maxFreqTasksCount)`.

Trade-off:  
This approach is O(N) time and O(1) space (since task types are at most 26).

### Corner cases to consider  
- n = 0 (no cooldown)
- All tasks are different (no idles)
- Only one type of task, n > 0 (maximum idles)
- Tasks fit exactly, so no idle is needed
- Empty tasks list

### Solution

```python
from typing import List
from collections import Counter

def leastInterval(tasks: List[str], n: int) -> int:
    # Count how many times each task appears
    freq = Counter(tasks)
    
    # Find the maximum frequency of any task
    max_freq = max(freq.values())
    
    # Count how many tasks have the maximum frequency
    max_freq_count = sum(1 for v in freq.values() if v == max_freq)
    
    # Main formula:
    # (max_freq - 1) groups, each of (n + 1) size, plus the last group where we place all max_freq tasks
    min_time = (max_freq - 1) * (n + 1) + max_freq_count
    
    # The minimum time is either full packed, or length of tasks (if idle time is not needed)
    return max(len(tasks), min_time)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N is the number of tasks. We count frequencies and process the histogram.
- **Space Complexity:** O(1), since there are at most 26 different task types (upper-case letters A-Z).

### Potential follow-up questions (as if you’re the interviewer)  

- What if tasks can have different lengths?  
  *Hint: How would you modify the idle calculation if task duration isn't always 1?*

- Could you output the actual schedule (sequence) rather than just the length?  
  *Hint: You’d need to track task selection at each time unit and update cooling intervals.*

- Can you optimize further if the input list is very large, but number of unique tasks is always ≤ 26?  
  *Hint: Can you avoid extra heap or list usage?*

### Summary
This solution applies the **Greedy** and **Counting** pattern. By focusing on the frequency of the most common tasks and their constraints, we transform the problem into a mathematical formula that yields optimal time. This scheduling framework is common in similar “cooldown” or “task assignment with gaps” problems. The counting-and-framing trick is widely useful in both greedy and combinatorial scheduling scenarios.

### Tags
Array(#array), Hash Table(#hash-table), Greedy(#greedy), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue), Counting(#counting)

### Similar Problems
- Rearrange String k Distance Apart(rearrange-string-k-distance-apart) (Hard)
- Reorganize String(reorganize-string) (Medium)
- Maximum Number of Weeks for Which You Can Work(maximum-number-of-weeks-for-which-you-can-work) (Medium)
- Find Minimum Time to Finish All Jobs II(find-minimum-time-to-finish-all-jobs-ii) (Medium)
- Task Scheduler II(task-scheduler-ii) (Medium)