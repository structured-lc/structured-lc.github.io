### Leetcode 582 (Medium): Kill Process [Practice](https://leetcode.com/problems/kill-process)

### Description  
You are given a list of process IDs (`pid`) and their corresponding parent process IDs (`ppid`). The set of processes forms a tree-like hierarchy: each process has exactly one parent except the root, which has no parent (ppid = 0). When you kill a process (identified by a certain `kill` pid), all its child processes and their descendants (recursively) should also be killed.  
Your task is: given `pid`, `ppid`, and a `kill` process ID, return all process IDs that will be killed in any order.  
This simulates how terminating a parent process recursively kills its entire subtree in the process tree.

### Examples  

**Example 1:**  
Input: `pid = [1, 3, 10, 5]`, `ppid = [3, 0, 5, 3]`, `kill = 5`  
Output: `[5, 10]`  
*Explanation: The process tree is:*
```
      3
     / \
    1   5
         \
         10
```
*When kill = 5, processes 5 and its child 10 are terminated.*

**Example 2:**  
Input: `pid = [1, 2, 3, 4]`, `ppid = [0, 1, 1, 2]`, `kill = 1`  
Output: `[1, 2, 4, 3]`  
*Explanation: The process tree is:*
```
     1
    / \
   2   3
  /
 4
```
*Killing process 1 causes all its descendants (2, 4, 3) to also be killed.*

**Example 3:**  
Input: `pid = [1]`, `ppid = `, `kill = 1`  
Output: `[1]`  
*Explanation: With only one process, killing it kills itself.*

### Thought Process (as if you’re the interviewee)  
- The problem is about modeling a parent-child relationship as a **tree** (or a directed graph).
- Naive method: For each process, recursively look for children whose ppid equals the process to be killed. This is O(n²), since for each process you may scan the entire list to find children.
- A better way is to **build an adjacency list** (mapping parent -> list of children).
  - This way, you can traverse the subtree starting from the node to be killed, using either DFS (recursive, stack) or BFS (queue) to collect all processes in the "killed" subtree.
- Choose **DFS**: It’s easy to implement, and memory- and time-efficient for this scenario (O(n) time and space).
- Trade-offs: BFS is just as good, but DFS has slightly less verbose code in interviews. Both guarantee we visit each relevant node once.

### Corner cases to consider  
- Empty input lists (`pid` and `ppid` both empty)
- Killing a process that doesn't exist in the tree
- The kill process is the root node (must recursively return all pids)
- All ppid values are 0 (forest, though problem guarantees only 1 root)
- Multiple children per parent
- No children for kill node (should only return itself)
- Large trees with many layers (test stack/recursion limits)

### Solution

```python
def killProcess(pid, ppid, kill):
    # Build an adjacency list: parent -> list of children
    from collections import defaultdict
    tree = defaultdict(list)
    for child, parent in zip(pid, ppid):
        tree[parent].append(child)

    # Result list
    killed = []
    
    # DFS to collect all processes to kill
    def dfs(process):
        killed.append(process)
        for child in tree.get(process, []):
            dfs(child)
    
    dfs(kill)
    return killed
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is number of processes.  
  - Building the adjacency list: O(n)  
  - In the worst case (killing the root), traverse all n nodes.
- **Space Complexity:** O(n)  
  - The adjacency list/tree stores each process as a key or value once.
  - The recursion stack and the killed list can each grow up to O(n) in the worst case (all processes killed).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the function to return the killed processes in level-order (breadth-first)?  
  *Hint: Try using a queue (BFS) instead of recursion.*

- What changes if every process could have multiple parents (i.e., it's a DAG, not a tree)?  
  *Hint: Need to handle visited nodes to avoid cycles, and ensure all paths are traversed.*

- Could you solve this if only `pid` and `ppid` were available as a database table  
  and queries must be run dynamically (no prebuilt adjacency list)?  
  *Hint: Consider with what queries can fetch all descendants efficiently (e.g., recursive CTE).*

### Summary
You model the process relationships as a tree using an adjacency list, then recursively traverse (DFS) to collect all nodes in the subtree rooted at the `kill` node.  
This is a standard tree traversal pattern, relevant anywhere you handle hierarchical or recursive structures: file systems, org charts, or dependency graphs.  
The adjacency list + DFS (or BFS) approach is optimal for such process-killing or deletion “domino” problems.