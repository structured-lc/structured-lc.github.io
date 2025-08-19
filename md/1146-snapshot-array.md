### Leetcode 1146 (Medium): Snapshot Array [Practice](https://leetcode.com/problems/snapshot-array)

### Description  
Design a data structure SnapshotArray. It supports three main operations:

- **Initialization**: Create an array of length `n`, initialized with all 0s.
- **set(index, val)**: Set the element at given index to `val` for the current version of the array.
- **snap()**: Take a snapshot of the current array, return a `snap_id` (incremental integer, 0-based).
- **get(index, snap_id)**: Get the value at the provided index at the time when the snapshot with given `snap_id` was taken.

Efficient retrieval and memory use are expected since there may be a large number of set and snap operations, but get should get the state as it was at the snap.

### Examples  

**Example 1:**  
Input:  
`["SnapshotArray","set","snap","set","get"]`  
`[[3],[0,5],[],[0,6],[0,0]]`  
Output:  
`[null,null,0,null,5]`  
*Explanation:*
- `SnapshotArray(3)`: creates array [0,0,0]
- `set(0,5)`: [5,0,0]
- `snap()`: returns snap_id=0
- `set(0,6)`: [6,0,0]
- `get(0,0)`: returns 5 (value at index 0 in the snapshot with id 0)[4]

**Example 2:**  
Input:  
`["SnapshotArray", "set", "set", "snap", "get", "set", "snap", "get"]`  
`[[2], [1,3], [0,2], [], [1,0], [0,5], [], [0,0]]`  
Output:  
`[null, null, null, 0, 3, null, 1, 2]`  
*Explanation:*
- `SnapshotArray(2)`: [0,0]
- `set(1,3)`: [0,3]
- `set(0,2)`: [2,3]
- `snap()`: snap_id=0, [2,3]
- `get(1,0)`: returns 3
- `set(0,5)`: [5,3]
- `snap()`: snap_id=1
- `get(0,0)`: returns 2 (value of index 0 at snap_id=0)

**Example 3:**  
Input:  
`["SnapshotArray","snap","get"]`  
`[[1],[],[0,0]]`  
Output:  
`[null,0,0]`  
*Explanation:*  
- create array size 1: 
- snap, snap_id=0
- get(0,0): returns 0 (default initial value)[4]

### Thought Process (as if you’re the interviewee)  
- **Brute-force**: Store the entire array every time `snap()` is called. This is slow and memory-inefficient: O(n) per snap, possible O(n × snaps) total space.
- **Optimize**: Observing that a lot of the array may remain unchanged across snaps, only store *changes* at each index. Each index keeps a history: a list of (snap_id, value) pairs, recording a value only when it is set. When we `get(index, snap_id)`, perform a binary search (since snap_ids are strictly increasing at each change per index) to find the value as of the requested snap. This is O(log m) for m changes at that index.
- **Data structures**: Use an array of lists/dictionaries for this history. Each index keeps its own changes, each as (snap_id, value). On `set`, record the change for the current snap id. On `snap`, increment snap id and return the previous id. On `get`, binary search for the largest snap_id ≤ requested snap_id.

### Corner cases to consider  
- `get` before any `set` or `snap`
- Calling `set` on the same index multiple times before `snap`
- Querying `get` after more snaps than sets on an index
- Multiple indices with no sets at all
- Large number of snaps and sparse sets

### Solution

```python
class SnapshotArray:
    def __init__(self, length):
        # For each index, store a list of (snap_id, value)
        self.data = [{} for _ in range(length)]    # dict (snap_id: value) or use list of tuples for each index
        self.snap_id = 0
        self.changes = [{} for _ in range(length)] # Alternatively, use list of (snap_id, value) pairs
        self.length = length
        # Optimization: use a list of lists for each index, with initial value (0, 0)
        self.history = [ [(0, 0)] for _ in range(length) ]  # (snap_id, value)

    def set(self, index, val):
        # Overwrite last value if it's for the current snap_id, else add new change
        if self.history[index] and self.history[index][-1][0] == self.snap_id:
            self.history[index][-1] = (self.snap_id, val)
        else:
            self.history[index].append((self.snap_id, val))

    def snap(self):
        self.snap_id += 1
        return self.snap_id - 1

    def get(self, index, snap_id):
        # Binary search in history[index] to find rightmost snap_id ≤ requested snap_id
        arr = self.history[index]
        left, right = 0, len(arr)-1
        res = 0
        while left <= right:
            mid = left + (right - left)//2
            if arr[mid][0] <= snap_id:
                res = arr[mid][1]
                left = mid + 1
            else:
                right = mid - 1
        return res
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - `set`: O(1), just append or overwrite at the end of a list
  - `snap`: O(1)
  - `get`: O(log m), where m is the number of times `set` was called at this index

- **Space Complexity:**  
  - O(S + N), where S = total number of `set` calls (each entry stores snap_id and value), N = array length (for initial structure). Very efficient if only a small number of changes per index.

### Potential follow-up questions (as if you’re the interviewer)  

- What if most indices change on every snap?  
  *Hint: Would direct snapshot storage be space-optimal in highly dynamic arrays?*

- Can you optimize the `get` method if you know sets are rare?  
  *Hint: Consider default values and absence of changes before/after snap_id.*

- How would you support undoing a set or unsnapping?  
  *Hint: Analyze what data structure allows O(1) time removal of latest change.*

### Summary
This problem uses the *sparse change recording* design pattern, where only modifications are logged, not entire snapshots. It's a variation of persistent data structures, with per-index histories and binary search for retrieval. This approach saves memory and is efficient for time-travel queries, and is widely applicable in persistent editors, versioned databases, and undo-redo implementations.

### Tags
Array(#array), Hash Table(#hash-table), Binary Search(#binary-search), Design(#design)

### Similar Problems
