### Leetcode 1948 (Hard): Delete Duplicate Folders in System [Practice](https://leetcode.com/problems/delete-duplicate-folders-in-system)

### Description  
You are given a list of absolute folder paths in a file system, where each path is represented as a list of strings (e.g., ["a", "x", "y"] means `/a/x/y`). Due to a bug, some folder structures are **duplicates**—meaning they have exactly the same set of subfolders and structure, not necessarily at the same level.  
Whenever duplicate folder structures exist anywhere in the system (not just at the root), **all instances of those folders and their subfolders should be deleted**. The output should return a 2D array of the remaining valid absolute paths after deletion (in any order).

### Examples  

**Example 1:**  
Input: `[["a"], ["c"], ["a","x"], ["c","x"], ["b"], ["c","x","y"], ["a","x","y"]]`  
Output: `[["b"]]`  
*Explanation: Both `/a/x/y` and `/c/x/y` have the same structure. `/a` and `/c` (and all their subfolders) are duplicates and marked for deletion. Only `["b"]` remains.*

**Example 2:**  
Input: `[["a"], ["a","a"], ["a","a","a"], ["a","a","a","a"]]`  
Output: `[]`  
*Explanation: Every folder is a duplicate of another (e.g., the folder 'a' contains an 'a' which recursively contains another 'a' and so on). Hence, everything is deleted.*

**Example 3:**  
Input: `[["a","b"], ["a","c"], ["a","b","x"], ["a","c","x"]]`  
Output: `[["a"]]`  
*Explanation:  
Folders `/a/b/x` and `/a/c/x` are identical (both are single 'x' folder). So, `/a/b` and `/a/c` will be deleted along with their subfolders. Only `/a` remains.*

``` 
Tree for Example 1:
["a", "x", "y"]
["c", "x", "y"]

      root
     / | \
    a  b  c
    |     |
    x     x
    |     |
    y     y
```

### Thought Process (as if you’re the interviewee)  
My first idea is to represent the folder structure using a **Trie/tree**, where each node is a folder name. To identify duplicates, I need to compare subtrees (folders + their whole contents) for structural equality.  
- **Brute Force:** Comparing every pair of subtrees would be very slow (O(N²)), which is not feasible for large inputs.  
- **Optimized:**  
    - Traverse the tree and serialize every subtree structure (e.g., by generating a string that uniquely represents a subtree and its children).  
    - Use a hash map to count the frequency of each serialization. If a serialization occurs more than once, all folders with that structure are duplicates.  
    - In a second pass, remove all nodes (folders) whose serialization is duplicated.  
Trade-offs: The key challenge is generating reliable, unique serializations and making both passes efficient.

### Corner cases to consider  
- Paths with only one folder (no subfolders)
- All folders are unique (no duplicates at all)
- Nested duplicate folders of varying depths
- Empty input array
- Highly repetitive folders (multi-level self-similar structures)
- Folders with the same names but different structures: structure, not name, matters

### Solution

```python
class TrieNode:
    def __init__(self):
        self.children = dict()
        self.is_end = False  # Not strictly necessary, just for clarity

def build_trie(paths):
    root = TrieNode()
    for path in paths:
        node = root
        for folder in path:
            if folder not in node.children:
                node.children[folder] = TrieNode()
            node = node.children[folder]
        node.is_end = True
    return root

def serialize(node, lookup):
    # Post-order traversal; construct a unique string serialization of the subtree
    if not node.children:
        return ""
    serials = []
    for folder in sorted(node.children):  # sort for consistency
        child_serial = serialize(node.children[folder], lookup)
        serials.append(f"{folder}({child_serial})")
    serial = "".join(serials)
    lookup[serial] = lookup.get(serial, 0) + 1
    return serial

def collect_paths(node, path, lookup, result):
    # Only collect this node if its serialization is not duplicated
    if node is None or not node.children:
        return
    for folder, child in node.children.items():
        # Re-serialize to get the subtree string
        serial = serialize(child, dict())
        if serial == "" or lookup.get(serial, 0) == 1:
            result.append(path + [folder])
            collect_paths(child, path + [folder], lookup, result)
        # else: skip because subtree is duplicate

def deleteDuplicateFolder(paths):
    root = build_trie(paths)
    lookup = dict()
    # First pass: get the serialization for each subtree and count frequency
    serialize(root, lookup)
    result = []
    # Second pass: collect valid (undeleted) paths
    collect_paths(root, [], lookup, result)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N × L), where N is the number of paths and L is the average path length. Each Trie insertion takes O(L), and serializing or collecting paths is also O(L) for each node.
- **Space Complexity:** O(N × L). The trie stores every unique folder name at each level, and the serialization/result structures grow with the input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle symbolic links or cycles in the file system?  
  *Hint: You'd need to track visited nodes and avoid infinite recursion.*

- Can you modify the solution to delete only one instance of a duplicate, instead of all?  
  *Hint: Adjust how you mark and skip nodes in the tree.*

- If folder names can contain special characters (like slashes or parentheses), will serialization still work?  
  *Hint: Choose a robust string escaping or tuple-based serialization.*

### Summary
This problem demonstrates a classic *"tree serialization"* and *"duplicate subtree detection"* pattern, using **Trie/Tree**, **hash maps**, and **post-order DFS**.  
This approach is common for detecting duplicate subtrees, repeated folder structures, or sub-paths in hierarchical data structures, and generalizes to problems involving detecting similarities in trees (e.g., duplicated files, plagiarism detection, or repeated substructures in data).