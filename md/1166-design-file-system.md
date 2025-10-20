### Leetcode 1166 (Medium): Design File System [Practice](https://leetcode.com/problems/design-file-system)

### Description  
Design a class called **FileSystem** that can:
- **`createPath(path: str, value: int) → bool`**: Create a new path and map it to the given value. If the parent directory doesn't exist, or if the path already exists, return false. If creation succeeds, return true.
- **`get(path: str) → int`**: Retrieve the value for the provided path. If the path does not exist, return -1.

Paths are UNIX-style, always start with `/` and consist of lowercase letters. Both the empty path `""` and root-only path `"/"` are invalid. Creation succeeds only if the parent already exists, ensuring proper hierarchy.

### Examples  

**Example 1:**  
Input:  
`fs = FileSystem()`  
`fs.createPath("/leet", 1)`  
Output:  
`True`  
*Explanation: The `/leet` path is created and mapped to 1.*

**Example 2:**  
Input:  
`fs.createPath("/leet/code", 2)`  
Output:  
`True`  
*Explanation: The parent `/leet` exists, so `/leet/code` is created and mapped to 2.*

**Example 3:**  
Input:  
`fs.get("/leet/code")`  
Output:  
`2`  
*Explanation: `/leet/code` exists, so it returns its value of 2.*

**Example 4:**  
Input:  
`fs.createPath("/leet/code", 3)`  
Output:  
`False`  
*Explanation: Path `/leet/code` already exists.*

**Example 5:**  
Input:  
`fs.createPath("/c/leet", 3)`  
Output:  
`False`  
*Explanation: Parent `/c` does not exist, so creation fails.*

**Example 6:**  
Input:  
`fs.get("/c")`  
Output:  
`-1`  
*Explanation: Path `/c` does not exist.*

### Thought Process (as if you’re the interviewee)  
First, the requirements are to map paths (with values) and support checking both presence and parent existence efficiently. Brute-force would be to store paths in a list, but finding parents in such a list would be inefficient (\(O(n)\) per check).

Instead, using a **dictionary** (hash map) can solve path lookup and parent checks in \(O(1)\) time. The dictionary keys are full paths and values are their values.

For `createPath`:
- Check if the given path exists (if yes, return False).
- Split path to get the parent path (e.g., parent of `/a/b` is `/a`).
- If parent is empty string, it's invalid.
- If parent not in the dict, cannot create.
- If all checks pass, insert the new path and return True.

For `get`:
- Return the value from the dict if present; otherwise, return -1.

A Trie could also work, but it's unnecessarily complex since path strings are the keys and always unique.

### Corner cases to consider  
- Creating at root ("/") or "" (not allowed)
- Creating a path where parent does not exist
- Creating a path that already exists
- Getting a path that doesn’t exist
- Path with trailing/duplicate slashes (assume valid input as per problem)
- Creating very deeply nested paths, missing some intermediate parents

### Solution

```python
class FileSystem:
    def __init__(self):
        # Store paths and values in a hash map
        self.paths = {}

    def createPath(self, path: str, value: int) -> bool:
        # Cannot create root or empty path
        if not path or path == "/" or path in self.paths:
            return False

        # Find parent by removing the last component
        parent = path[:path.rfind('/')]
        if not parent:
            # Parent must not be empty (""); only "/name" not allowed
            return False
        if parent not in self.paths:
            return False

        self.paths[path] = value
        return True

    def get(self, path: str) -> int:
        return self.paths.get(path, -1)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  `createPath` and `get` both run in O(1) average-case time, since dictionary operations for insert, check, and retrieval are constant time.

- **Space Complexity:**  
  O(n × k), where n = number of created paths, and k = average path length (since longer paths mean more string data to store as keys).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you support path deletion?
  *Hint: What if children paths exist?*
- How can you rename a directory?
  *Hint: Renaming might require updating all sub-paths.*
- What if many concurrent create/get requests must be supported efficiently?
  *Hint: Consider thread safety and locking strategies.*

### Summary
This solution uses a simple and effective **hash map pattern** to implement the virtual file system, emphasizing fast O(1) lookups and insertions for each path. This dictionary-based approach is common for mapping unique entities (e.g., word counts, route lookups, URL shorteners) and is a recurring design in problems involving unique string keys with arbitrary values.


### Flashcard
Use a hash map to store full paths and their values; for createPath, check parent existence and path uniqueness in O(1) time.

### Tags
Hash Table(#hash-table), String(#string), Design(#design), Trie(#trie)

### Similar Problems
