### Leetcode 841 (Medium): Keys and Rooms [Practice](https://leetcode.com/problems/keys-and-rooms)

### Description  
Suppose there are **n** rooms numbered from 0 to n-1. All rooms are locked except for room 0. Each room may contain one or more keys to other rooms. Once you enter a room, you can pick up all the keys in that room and use them to unlock other rooms. The task is to determine if you can visit **all** the rooms starting from room 0.

### Examples  

**Example 1:**  
Input: `rooms = [[1],[2],[3],[]]`  
Output: `True`  
*Explanation: Start in room 0, get key to 1. Go to room 1, get key to 2. Go to room 2, get key to 3. Go to room 3. All rooms visited.*

**Example 2:**  
Input: `rooms = [[1,3],[3,0,1],[2],]`  
Output: `False`  
*Explanation: Starting from room 0, you can visit rooms 1 and 3, but you never get the key to room 2, so not all rooms are accessible.*

**Example 3:**  
Input: `rooms = [[1],[2],[3],]`  
Output: `True`  
*Explanation: Start from room 0 (key to 1), go to 1 (key to 2), go to 2 (key to 3), go to 3 (key to 0). All rooms are accessible. Even though keys cycle, that’s fine as long as all rooms are visited.*

### Thought Process (as if you’re the interviewee)  

To solve this, I think of the **rooms and keys as a graph**, where:
- Each room is a node.
- Having a key from one room to another means there’s a direct edge.

The problem is then: Starting from room 0, *can I reach every node in the graph?*

The **brute-force approach** would be to recursively or iteratively visit every room whose key you find, marking rooms as visited. If, at the end, all rooms are marked as visited, return True. Otherwise, return False.

I can use either **DFS** (using a stack or recursion) or **BFS** (using a queue).  
DFS is more natural here, since as soon as I find a new key, I want to immediately use it to explore more.

Key points:
- Track visited rooms to avoid cycles and redundant work.
- At the end, check if the size of the visited set equals n.

**Trade-offs:**  
Both DFS and BFS have similar complexity, but with DFS the auxiliary space is the recursion stack (worst-case O(n)), with BFS it is the queue (also O(n)). Both are acceptable.

### Corner cases to consider  
- All rooms already unlocked: `[[1,2,3],[],[],[]]`
- Already visited rooms/duplicate keys in one room
- Room contains no keys (e.g., last room: `[]`)
- Single room: `[[ ]]` (should return True)
- Disconnect: Some keys exist such that one room is never accessible
- Large cycles (rooms contain keys to each other in a cycle)

### Solution

```python
def canVisitAllRooms(rooms):
    # Create a set to keep track of visited rooms
    visited = set()
    
    # Recursive DFS function
    def dfs(room):
        # Mark the current room as visited
        visited.add(room)
        # Visit all the keys found in this room
        for key in rooms[room]:
            if key not in visited:
                dfs(key)
    
    # Start DFS from room 0
    dfs(0)
    
    # Check if all rooms have been visited
    return len(visited) == len(rooms)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m) where n = number of rooms, m = total number of keys across rooms;  
  _Each room and each key is visited/explored at most once_.
- **Space Complexity:** O(n) for the visited set and O(n) recursion stack in the worst case.

### Potential follow-up questions (as if you’re the interviewer)  

- Suppose the list of keys can be very large (very many keys in some rooms).  
  *Hint: Can you handle constraints for both memory and stack size?*

- Can you do it iteratively (without recursion)?  
  *Hint: Use a stack to simulate recursion—iterative DFS or BFS.*

- What if rooms can be *opened* or *locked* again as you progress?  
  *Hint: Add logic or data structure to represent lock state dynamically.*

### Summary

This problem is a classic example of the **graph traversal pattern**, specifically **DFS/BFS for reachability**.  
It’s a fundamental interview pattern for problems about visiting all nodes or components in a graph or network, and it regularly applies to problems involving unlocking, traversing, or marking visited elements.  
Other examples: course schedule, number of connected components, islands in a grid, etc.


### Flashcard
Treat rooms as graph nodes; use DFS or BFS from room 0 to visit all reachable rooms, then check if all rooms are visited.

### Tags
Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Graph(#graph)

### Similar Problems
- Graph Valid Tree(graph-valid-tree) (Medium)