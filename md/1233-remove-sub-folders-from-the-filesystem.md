### Leetcode 1233 (Medium): Remove Sub-Folders from the Filesystem [Practice](https://leetcode.com/problems/remove-sub-folders-from-the-filesystem)

### Description  
Given a list of folder paths (strings with slashes, like `/a/b/c`), remove all "sub-folders" — that is, folder paths that are nested inside any other folder in the list.  
A folder is a sub-folder if its path starts with another folder’s path followed by a slash and more characters.  
Return all non-subfolder paths (order does not matter).

### Examples  

**Example 1:**  
Input: `["/a","/a/b","/c/d","/c/d/e","/c/f"]`  
Output: `["/a","/c/d","/c/f"]`  
*Explanation: `/a/b` is a sub-folder of `/a`, and `/c/d/e` is a sub-folder of `/c/d`. Only top-level folders remain.*

**Example 2:**  
Input: `["/a","/a/b/c","/a/b/d"]`  
Output: `["/a"]`  
*Explanation: `/a/b/c` and `/a/b/d` are sub-folders of `/a`.*

**Example 3:**  
Input: `["/a/b","/a/b/c","/a/b/ca","/a/b/d"]`  
Output: `["/a/b","/a/b/ca"]`  
*Explanation: `/a/b/c` and `/a/b/d` are subfolders of `/a/b`. `/a/b/ca` is not a sub-folder of `/a/b` because it doesn't match the full path + '/' condition.*

### Thought Process (as if you’re the interviewee)  
- **Naive idea:** For each folder, check if any shorter path in the list is a parent of it. This is slow (O(n² × L)), where n = #folders, L = max path length.
- **Optimize with sorting:**  
  - Sort all paths lexicographically. This way, any subfolder will immediately follow its parent in the sorted order.
  - Initialize an empty result. Iterate folders in order.
    - For each folder, if it does not start with the previous folder path + '/', add to the result.
  - This avoids extra lookups, and is fast.
- **Trie or Set approaches:**  
  - A Trie can represent the folder structure, using DFS to collect only parent paths.
  - Using a Set: For each folder, check if any prefix (parent paths) are present in the set. If so, it’s a sub-folder.
- **Trade-offs:**  
  - Sorting is simple and fast (O(n log n × L)), and works especially because of the slash structure.
  - Trie is elegant for hierarchical exploration (useful for follow-ups), but overkill for just identifying parents.

### Corner cases to consider  
- Empty list  
- Only root `/` or folders under `/`  
- One folder only  
- Folders with similar prefixes but not subfolders, e.g., `/a/bc` vs `/a/b`  
- Paths with no subfolders at all

### Solution

```python
def removeSubfolders(folder):
    # Sort folders lexicographically.
    folder.sort()
    result = []
    for path in folder:
        # If result is empty or path is NOT prefixed by the last result path + '/',
        # it's a top-level (not sub-folder) path.
        if not result or not path.startswith(result[-1] + '/'):
            result.append(path)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n × L)  
  n = number of folders, L = max path length. Sorting takes O(n log n × L), and linear scan is O(n × L).
- **Space Complexity:** O(n × L)  
  Need space for sorting and storing the results.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the solution to support dynamic insertions and removals of folders in real-time?
  *Hint: Think about using a Trie to represent the folder structure efficiently.*

- What if the filesystem is extremely large and input cannot fit in memory?
  *Hint: Consider streaming, external sorting, and search optimizations.*

- How would you extend this to find all direct child folders of a given parent?
  *Hint: Trie node children or building an adjacency list per parent path.*

### Summary
The optimal solution sorts folder paths to easily group subfolders directly after their parents. This leverages lexicographical order and the folder separator (`/`) to quickly filter out subfolders in a single pass. The pattern — sorting to make hierarchical relationships adjacent — is very common for prefix-based problems. This approach avoids more complex Trie building and is efficient for this task, but understanding Tries is still useful for more dynamic or complex prefix tree manipulations.

### Tags
Array(#array), String(#string), Depth-First Search(#depth-first-search), Trie(#trie)

### Similar Problems
