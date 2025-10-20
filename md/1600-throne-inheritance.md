### Leetcode 1600 (Medium): Throne Inheritance [Practice](https://leetcode.com/problems/throne-inheritance)

### Description  
Design a system to manage the inheritance of a throne in a kingdom. The king has children; children can have their own children, and so on. When someone dies, their descendants continue the line. Implement:

- `birth(parentName, childName)`: A child with `childName` is born to `parentName`.
- `death(name)`: Register the death of the given person. Dead people do not ascend the throne, but their children do.
- `getInheritanceOrder()`: Return the current inheritance order as a list of names, excluding dead people. The succession is by order of birth (oldest first).

### Examples  

**Example 1:**  
Input:  
```
ThroneInheritance("king")
birth("king", "andy")
birth("king", "bob")
birth("king", "catherine")
birth("andy", "matthew")
birth("bob", "alex")
birth("bob", "asha")
death("bob")
getInheritanceOrder()
```
Output:  
```
["king", "andy", "matthew", "catherine", "alex", "asha"]
```
*Explanation: 
- Bob is dead, skipped in the order. 
- Inheritance order: king → andy → matthew (andy's child) → catherine → alex (bob's child) → asha (bob's child).*

**Example 2:**  
Input:  
```
birth("catherine", "tom")
birth("tom", "jerry")
death("andy")
getInheritanceOrder()
```
Output:  
```
["king", "matthew", "catherine", "tom", "jerry", "alex", "asha"]
```
*Explanation: 
- Andy died. 
- Tom (child of catherine) and jerry (child of tom) both newly added. The DFS goes by the order of births.*

### Thought Process (as if you’re the interviewee)  

I need to simulate a family tree and efficiently update and query the inheritance order after any combination of births or deaths. For births, it must preserve order among siblings. For deaths, it should skip dead people but still traverse their descendants. Each query should output the current living inheritance order, starting from the king and following birth order recursively. 

Brute-force: Keep a list of (name, parent, alive status), scanning all for each query to reconstruct the order. But repeated queries are inefficient.

Optimized: Represent the family as a tree using a dictionary (adjacency list) from parent to an ordered list of children. Maintain a set of dead people. On each `getInheritanceOrder` call, perform a DFS from the king — include a person if alive, then recursively process their children left to right by birth order. Both birth and death operations are O(1). Queries are O(n), with n=total people. Trade-off: Slightly slower queries for much simpler design and O(1) updates.

### Corner cases to consider  
- Multiple children born to same parent
- Death of the king or of any person (root or leaf)
- Querying order after everyone dies except the initial king
- No births or deaths yet
- Serial births to chain-of-one-children (degenerate tree)
- Repeated deaths (shouldn’t duplicate)
- Very deep or very wide family tree (check stack usage or traversal correctness)

### Solution

```python
class ThroneInheritance:
    def __init__(self, kingName: str):
        # Each parent maps to ordered children list
        self.family = {}
        self.king = kingName
        self.dead = set()
        self.family[kingName] = []

    def birth(self, parentName: str, childName: str) -> None:
        if parentName not in self.family:
            self.family[parentName] = []
        self.family[parentName].append(childName)
        self.family[childName] = []

    def death(self, name: str) -> None:
        self.dead.add(name)

    def getInheritanceOrder(self) -> list[str]:
        order = []
        def dfs(name):
            if name not in self.dead:
                order.append(name)
            for child in self.family.get(name, []):
                dfs(child)
        dfs(self.king)
        return order
```

### Time and Space complexity Analysis  

- **Time Complexity:**
    - `birth` and `death`: O(1) each — just append or add to a set/dict.
    - `getInheritanceOrder`: O(n), where n = total number of people, since it traverses the entire family tree in a DFS for each call.
- **Space Complexity:** O(n) for storing the tree structure (dict of adjacency lists), the set of dead people, and recursion stack during DFS (up to height of the family tree).

### Potential follow-up questions (as if you’re the interviewer)  

- Return only the next successor instead of full order?
  *Hint: Modify traversal to stop after first living successor found.*

- Add a function to bring someone back to life (undo death)?
  *Hint: Use set discard for dead/alive status management.*

- How would you make `getInheritanceOrder` faster if called very frequently?
  *Hint: Cache order; invalidate on every birth or death; trade-off update cost for query speed.*

### Summary
This approach uses a combination of tree (adjacency list) and DFS to model family relationships and inheritance order. It's a classic *design + traversal* problem: each query is handled by a DFS that follows ordered children and skips dead people by checking a set. This pattern is widely applicable in problems about genealogy, filesystem navigation, and organization hierarchies.


### Flashcard
Model the family tree as a graph, use DFS to traverse children in birth order, and skip dead people when listing the inheritance order.

### Tags
Hash Table(#hash-table), Tree(#tree), Depth-First Search(#depth-first-search), Design(#design)

### Similar Problems
- Operations on Tree(operations-on-tree) (Medium)