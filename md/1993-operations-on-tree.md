### Leetcode 1993 (Medium): Operations on Tree [Practice](https://leetcode.com/problems/operations-on-tree)

### Description  
Design a `LockingTree` data structure to support three operations on each node of a rooted tree:
- **lock(num, user):** Locks node `num` by user `user` if it's not already locked. Returns True if successful, otherwise False.
- **unlock(num, user):** Unlocks node `num` by user `user` only if it was locked by the same user. Returns True if successful, otherwise False.
- **upgrade(num, user):** Locks node `num` by user `user` if ALL these conditions are met:
  - Node `num` is currently unlocked.
  - Node `num` has at least one locked descendant (child, grandchild, etc.) locked by any user.
  - None of the ancestors (`parent`, `parent of parent`, etc.) of `num` are locked.
  If successful, unlock ALL locked descendants and lock node `num`. Returns True if upgrade was successful, otherwise False.

Tree is provided by a `parent` array where `parent[i]` gives the parent of the iᵗʰ node, with `parent = -1` (root).

### Examples  

**Example 1:**  
Input:  
LockingTree obj = LockingTree([−1,0,0,1,1,2,2])  
obj.lock(2, 2)  
obj.unlock(2, 3)  
obj.unlock(2, 2)  
obj.lock(4, 5)  
obj.upgrade(0, 1)  
obj.lock(0, 1)  
Output:  
False, False, True, True, True, False  
*Explanation:  
- lock(2,2): Node 2 is now locked by user 2 → True  
- unlock(2,3): User 3 didn't lock node 2 → False  
- unlock(2,2): User 2 unlocks node 2 → True  
- lock(4,5): Node 4 is now locked by user 5 → True  
- upgrade(0,1): Node 0 is unlocked and has a locked descendant (4), no ancestor is locked. All descendants unlocked and node 0 gets locked by 1 → True  
- lock(0,1): Node 0 is already locked → False*

**Example 2:**  
Input:  
LockingTree obj = LockingTree([−1,0,0])  
obj.lock(1, 3)  
obj.unlock(1, 3)  
obj.lock(1, 3)  
obj.upgrade(0, 4)  
Output:  
True, True, True, False  
*Explanation:  
- lock(1,3): True  
- unlock(1,3): True  
- lock(1,3): True  
- upgrade(0,4): No locked descendants → False*

**Example 3:**  
Input:  
LockingTree obj = LockingTree([−1,0,0,1,1,2,2])  
obj.lock(3, 2)  
obj.lock(4, 3)  
obj.upgrade(1, 1)  
Output:  
True, True, True  
*Explanation:  
- lock(3,2): Node 3 locked by 2 → True  
- lock(4,3): Node 4 locked by 3 → True  
- upgrade(1,1): Node 1 is unlocked, has locked descendants (3 & 4), no locked ancestors. Descendants get unlocked, node 1 locked by 1 → True*

### Thought Process (as if you’re the interviewee)  
First, we need to represent the tree so we can traverse both parents and children efficiently. We'll:
- Map parent array to a children list for O(1) descendancy traversal.
- Track locked status (user id or -1) for each node.

For `lock` and `unlock`:
- Straightforward: check current lock and set/reset user.

For `upgrade`:
- Check all ancestors: walk up parent pointers to ensure none are locked.
- Check at least one locked descendant. This requires DFS/BFS from current node.
- Unlock all descendants: Again, DFS/BFS to visit and unlock all.

Brute-force is acceptable because the tree is usually limited to a few thousand nodes (as per constraints).

Optimization:  
For more efficiency, we can precompute children for fast descendant searches, and store lock status as a simple array. For upgrade, both descendant search and ancestor check are just bounded by tree height.

### Corner cases to consider  
- Node is already locked when trying to lock.
- Unlock attempt by wrong user.
- Upgrade where some, but not all, conditions are met.
- Tree with only root (size 1).
- Node with no descendants.
- Multiple locked descendants at different depths.
- Node is both ancestor and descendant in upgrade search (proper handling needed).

### Solution

```python
class Node:
    def __init__(self):
        self.children = []
        self.lockedBy = -1  # -1 means unlocked

class LockingTree:
    def __init__(self, parent):
        self.parent = parent
        self.nodes = [Node() for _ in range(len(parent))]
        for i in range(1, len(parent)):
            self.nodes[parent[i]].children.append(i)

    def lock(self, num, user):
        if self.nodes[num].lockedBy != -1:
            return False
        self.nodes[num].lockedBy = user
        return True

    def unlock(self, num, user):
        if self.nodes[num].lockedBy != user:
            return False
        self.nodes[num].lockedBy = -1
        return True

    def upgrade(self, num, user):
        # Check for locked ancestors
        ancestor = self.parent[num]
        while ancestor != -1:
            if self.nodes[ancestor].lockedBy != -1:
                return False
            ancestor = self.parent[ancestor]
        # Check if there's at least one locked descendant
        locked_nodes = []
        def dfs(node):
            found = False
            if self.nodes[node].lockedBy != -1:
                locked_nodes.append(node)
                found = True
            for child in self.nodes[node].children:
                if dfs(child):
                    found = True
            return found
        if not dfs(num):
            return False
        # Unlock all locked descendants
        for ln in locked_nodes:
            self.nodes[ln].lockedBy = -1
        # Lock this node
        self.nodes[num].lockedBy = user
        return True
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - `lock`, `unlock`: O(1) (direct check and update)
  - `upgrade`: O(h + d)  
    - h = height of tree (to check ancestors),  
    - d = size of subtree (to check/unlock descendants)
- **Space Complexity:**  
  - O(n) for storing the nodes, parents, locked status, and children of all nodes.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle upgrade efficiently for extremely deep trees?  
  *Hint: Can ancestor/descendant lock info be cached?*

- Could we add a method to list all currently locked nodes in a subtree?  
  *Hint: Precompute or maintain an index/projection of locked nodes per subtree.*

- Suppose users can only lock a *fixed* number of nodes at a time. How can you implement per-user quotas?  
  *Hint: HashMap tracking user's lock counts.*

### Summary
The problem uses a standard tree modeling pattern where parent-child and lock status are managed explicitly. The common patterns here are tree traversal (DFS for subtrees, parent-walking for ancestors) and stateful mutation (locking/unlocking). This approach is directly applicable to problems like file system locks, permission propagation, or collaborative editors with hierarchical objects.

### Tags
Array(#array), Hash Table(#hash-table), Tree(#tree), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Design(#design)

### Similar Problems
- Throne Inheritance(throne-inheritance) (Medium)