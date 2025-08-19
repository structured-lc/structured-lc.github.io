### Leetcode 1953 (Medium): Maximum Number of Weeks for Which You Can Work [Practice](https://leetcode.com/problems/maximum-number-of-weeks-for-which-you-can-work)

### Description  
Given `n` projects, where each project i has `milestones[i]` tasks, you must work every week, completing **exactly one** task from any project. However, you **cannot** work on two milestones of the same project in consecutive weeks. The goal is to determine the **maximum number of weeks** you can work, following these constraints before you must stop (either all tasks are done, or only violating options remain).

### Examples  

**Example 1:**  
Input: `milestones = [1,2,3]`,  
Output: `6`  
*Explanation: Work on the projects like: 0 → 2 → 1 → 2 → 1 → 2. All milestones can be completed without breaking the rules.*

**Example 2:**  
Input: `milestones = [5,2,1]`,  
Output: `7`  
*Explanation: The largest project has far more milestones. Possible order: 0 → 1 → 0 → 2 → 0 → 1 → 0. The last milestone can't be taken without repeating project 0 consecutively.*

**Example 3:**  
Input: `milestones = [3,3,3]`,  
Output: `9`  
*Explanation: All projects are balanced. You can alternate freely, and finish all 9 milestones.*


### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** Try all possible week-by-week assignments, avoiding repeating the last project. This quickly becomes infeasible as project counts grow due to exponential combinations.
- **Greedy/Analytical reasoning:** The main constraint is that you cannot take two consecutive tasks from one project.  
  - If no project is "too big," you can finish everything by always picking a different project last week.
  - If one project's task count (`max_count`) exceeds the sum of all other projects plus one (`rest + 1`), you will be forced to break the rule at some point.
- **Optimized approach:**  
  - Compute total number of milestones (`total`), and the largest single-project count (`max_count`).
  - If `max_count` > `rest + 1`, answer is `rest × 2 + 1`. You alternate as best as possible, but after `rest × 2`, you must finally take one more from the dominant project (and then can't go further).
  - Else, you can finish all tasks: answer = `total`.
- The trade-off is between simplicity/efficiency and handling the dominance constraint accurately—a single pass computes all we need.

### Corner cases to consider  
- Single project: milestones = [k]
- Projects with only one milestone each: [1,1,1...]
- Dominant project much larger than all others: [10,1,1]
- All projects with identical milestones
- Very large inputs (test for overflow errors)


### Solution

```python
from typing import List

def numberOfWeeks(milestones: List[int]) -> int:
    # Find the total sum of all milestones
    total = sum(milestones)
    # Find the largest number of milestones in any single project
    max_count = max(milestones)
    # Sum of all other projects
    rest = total - max_count

    # If any project is too dominant, that's our limit
    if max_count > rest + 1:
        # We can only interleave rest milestones with max project, plus one more
        return rest * 2 + 1
    else:
        # Otherwise, we can finish all milestones
        return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — One scan for sum, one for max; each takes O(n).
- **Space Complexity:** O(1) — Only a constant number of variables used, not counting input.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your solution change if you could skip some weeks (i.e., not required to work every week)?  
  *Hint: Skipping might let you avoid violating the consecutive-week rule.*

- What if you could work on up to k milestones in a week, but they must be from different projects?  
  *Hint: Consider generalizing the alternation logic to k-way interleaving.*

- Suppose after completing all milestones for a project, you can merge remaining projects? How would you modify your approach?  
  *Hint: Consider when/if this merging affects sequencing.*

### Summary
This problem uses a **greedy/analytical** approach—identifying a constraint boundary (dominant single-project count) to decide between two scenarios: finish all, or finish as many as alternating rules permit. The core coding pattern is counting and bounding based on max/sum, a useful trick in task scheduling, job allocation, or whenever "no consecutive" constraints are imposed. This pattern commonly appears in round-robin scheduling and competitive task assignment problems.

### Tags
Array(#array), Greedy(#greedy)

### Similar Problems
- Task Scheduler(task-scheduler) (Medium)