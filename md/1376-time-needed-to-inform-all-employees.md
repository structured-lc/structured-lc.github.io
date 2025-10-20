### Leetcode 1376 (Medium): Time Needed to Inform All Employees [Practice](https://leetcode.com/problems/time-needed-to-inform-all-employees)

### Description  
A company has "n" employees with IDs from 0 to n-1. The company's structure is represented as a tree (the CEO has no manager, marked as headID) where "manager[i]" is the direct manager of employee i. Each employee needs time informTime[i] to pass news to all their direct subordinates. News starts at headID: **How long does it take for all employees to be informed?**

### Examples  

**Example 1:**  
Input: `n = 6`, `headID = 2`, `manager = [2,2,-1,2,2,2]`, `informTime = [0,0,1,0,0,0]`  
Output: `1`  
*Explanation: Employees 0,1,3,4,5 all have manager 2 (the head). Head takes 1 min to inform everyone (informTime[2]=1); all are informed at minute 1.*

**Example 2:**  
Input: `n = 7`, `headID = 6`, `manager = [1,2,3,4,5,6,-1]`, `informTime = [0,6,5,4,3,2,1]`  
Output: `21`  
*Explanation: The chain is 6→5→4→3→2→1→0, each adds to the total time: 1+2+3+4+5+6=21.*

**Example 3:**  
Input: `n = 4`, `headID = 2`, `manager = [3,3,-1,2]`, `informTime = [0,0,162,914]`  
Output: `1076`  
*Explanation: One chain is 2→3→0/1; head takes 162 to inform 3, then 3 takes 914 to inform subordinates (0,1). Max path = 162+914=1076.*

### Thought Process (as if you’re the interviewee)  
- Build the reporting tree: for each manager, collect their subordinates.
- Start a **DFS or BFS** from headID.
- For each manager, total inform time = their informTime + max of all their subordinates' times.
- Need the maximum time among all root-to-leaf paths, since all go in parallel.

### Corner cases to consider  
- Employees with no subordinates (should be leaf nodes)
- Multiple branches of different lengths
- Inform time zero for some managers
- Chain/linear structure (worst case for depth)

### Solution

```python
def numOfMinutes(n: int, headID: int, manager: list[int], informTime: list[int]) -> int:
    from collections import defaultdict
    tree = defaultdict(list)
    for emp, mgr in enumerate(manager):
        if mgr != -1:
            tree[mgr].append(emp)
    def dfs(node):
        if not tree[node]:
            return 0
        return informTime[node] + max(dfs(child) for child in tree[node])
    return dfs(headID)
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n) — Every employee visited once
- **Space Complexity:** O(n) — For tree structure and recursion stack (if tree is a chain)

### Potential follow-up questions (as if you’re the interviewer)  
- What if informTime can change dynamically after the process starts? How would you handle updates efficiently?  
  *Hint: Need dynamic tree/data structure for updates.*

- What if some employees can start informing before they themselves are fully informed?  
  *Hint: Would need event-driven simulation, not just recursive chain.*

- How about finding which employee(s) get informed last?  
  *Hint: Track leaf node(s) on the slowest root-to-leaf path.*

### Summary
This is a tree DFS problem for computing the maximum path sum in a rooted tree, where branching delays can act in parallel. Similar tree DP/DFS patterns appear in organizational modeling, file/directory processing, and network dissemination problems.


### Flashcard
Build a reporting tree and use DFS to calculate the maximum inform time.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search)

### Similar Problems
- Maximum Depth of Binary Tree(maximum-depth-of-binary-tree) (Easy)
- Binary Tree Maximum Path Sum(binary-tree-maximum-path-sum) (Hard)