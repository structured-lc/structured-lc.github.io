### Leetcode 2059 (Medium): Minimum Operations to Convert Number [Practice](https://leetcode.com/problems/minimum-operations-to-convert-number)

### Description  
Given an array of distinct integers (`nums`), and two integers, `start` and `goal`, transform the **start** value to **goal** using the minimum number of operations. At each step, you can:
- Add any `nums[i]` to the current value
- Subtract any `nums[i]` from the current value
- XOR the current value with any `nums[i]`

Operations can be performed in any order, and each `nums[i]` can be used any number of times.  
The value after each operation must stay between 0 and 1000 (inclusive).  
If it is impossible to reach the goal, return -1.

### Examples  

**Example 1:**  
Input: `nums = [2,4,12], start = 2, goal = 12`  
Output: `2`  
*Explanation: 2 ^ 4 = 6; 6 ^ 12 = 10; 10 + 2 = 12. But the shortest path is: 2 ^ 12 = 14; 14 - 2 = 12. So (2 operations).*

**Example 2:**  
Input: `nums = [3,5,7], start = 0, goal = -4`  
Output: `2`  
*Explanation: 0 - 3 = -3; -3 - 5 = -8 (which goes out of bounds). Instead, 0 + 3 = 3; 3 - 7 = -4 (2 steps). Since goal is out of range, the answer reflects the moment we reach it, even if it's outside [0,1000].*

**Example 3:**  
Input: `nums = [2,8,16], start = 0, goal = 1`  
Output: `-1`  
*Explanation: It is impossible to get from 0 to 1 using these numbers and allowed operations.*

### Thought Process (as if you’re the interviewee)  
Start by recognizing that each operation (`+`, `-`, `^`) branches into several possibilities and that we can reuse numbers from `nums` arbitrarily many times.  
A brute-force recursive approach would try all sequences, but this rapidly explodes (infeasible).  
This is a classic shortest-path/search problem on an implicit, unweighted graph:
- **State**: value after operations
- **Transitions**: for each operation, and each nums[i]
- **Target**: goal

Breadth-First Search (BFS) suits these requirements:
- BFS finds the shortest path in an unweighted graph
- States = 0..1000 (plus possibly goal, if it's out of bounds)
- Mark visited to prevent revisiting values (avoid infinite loops)

Optimize with a `seen` array for [0,1000], and queue up values after every operation unless already seen.
Check for special cases: goal may be out of bounds, but transitions can still take us there (should still return correct count).

### Corner cases to consider  
- If `start == goal`, return 0
- If `goal` is out of bounds but reachable on the first operation
- All operations leave you quickly out of bounds but never at `goal`
- `nums` contains only numbers that can't help reach goal (e.g., only even numbers, but goal is odd)
- Start or goal outside 0..1000

### Solution

```python
from collections import deque

def minimumOperations(nums, start, goal):
    # If start already equals goal, no ops needed
    if start == goal:
        return 0
    
    # visited values within [0,1000]
    visited = [False] * 1001
    queue = deque([(start, 0)])  # (current_value, steps_so_far)

    while queue:
        x, steps = queue.popleft()
        
        for num in nums:
            for op in (x + num, x - num, x ^ num):
                if op == goal:
                    return steps + 1
                # If op in range and not visited, enqueue
                if 0 <= op <= 1000 and not visited[op]:
                    visited[op] = True
                    queue.append((op, steps + 1))
    # If queue exhausted, impossible to reach goal
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × 1000).  
  There are at most 1001 different states (for each 0 ≤ x ≤ 1000); for each, we consider all nums (n) and all 3 operations, so it's O(n × max_value) overall.

- **Space Complexity:** O(1000).  
  Only states within [0,1000] are stored as visited; the queue grows up to this size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the allowed value range was much larger (e.g., 32-bit numbers)?
  *Hint: Can you avoid a huge visited array? What search tradeoffs might you face?*

- Can we optimize if all operations are invertible and goal is within range?
  *Hint: Think about bidirectional BFS. Would that help?*

- Is there a way to reconstruct the sequence of operations?
  *Hint: Modify BFS to also store the path or previous state per value.*

### Summary
This problem is a classic example of **BFS on an implicit state graph**: you’re searching through all possible values obtainable via a set of repeated operations, seeking the shortest path to a target.  
The solution shows the BFS pattern for shortest-path, applicable to other transformation and “minimum steps to reach N” problems. This pattern is common in word ladder, lock/unlock problems, and puzzle games with state transitions.


### Flashcard
Apply BFS to explore all possible operations and find the shortest path to the target value.

### Tags
Array(#array), Breadth-First Search(#breadth-first-search)

### Similar Problems
- Minimum Operations to Reduce X to Zero(minimum-operations-to-reduce-x-to-zero) (Medium)