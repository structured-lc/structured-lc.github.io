### Leetcode 588 (Hard): Design In-Memory File System [Practice](https://leetcode.com/problems/design-in-memory-file-system)

### Description  
Design an in-memory file system that supports basic file and directory operations—just like a mini version of a real computer’s filesystem. The API should support:

- **ls(path)**:  
  Given a path, return all file and directory names in that directory (sorted lexicographically). If given a file path, return only that filename.
- **mkdir(path)**:  
  Create a new directory at the specified path, including any intermediate directories if they do not exist (like `mkdir -p` in UNIX).  
- **addContentToFile(filePath, content)**:  
  Add content to the file specified by `filePath`. If the file doesn’t exist, create it. If it exists, append the new content to the existing content.
- **readContentFromFile(filePath)**:  
  Return all contents in the file at `filePath`.

All paths are absolute, start with `'/'`, and never have a trailing slash except root.


### Examples  

**Example 1:**  
Input:  
`["FileSystem","ls","mkdir","addContentToFile","ls","readContentFromFile"]`  
`[[],["/"],["/a/b/c"],["/a/b/c/d","hello"],["/"],["/a/b/c/d"]]`  
Output:  
`[null,[],null,null,["a"],"hello"]`  
Explanation:  
- `FileSystem()` → initializes empty root (`/`).
- `ls("/")` → returns `[]` (root is empty).
- `mkdir("/a/b/c")` → creates directory tree `/a/b/c`.
- `addContentToFile("/a/b/c/d","hello")` → creates file `d` in `/a/b/c` with content `"hello"`.
- `ls("/")` → returns `["a"]` (directory `a` created under `/`).
- `readContentFromFile("/a/b/c/d")` → returns `"hello"`.

**Example 2:**  
Input:  
`mkdir("/go/code")`,  `addContentToFile("/go/code/main.py", "print('hi')")`, `ls("/go/code")`  
Output:  
`null, null, ["main.py"]`  
Explanation:  
- Directory `/go/code` is created.
- File `main.py` is created with given content.
- Directory listing returns only the file.

**Example 3:**  
Input:  
`addContentToFile("/file.txt", "abc")`, `ls("/")`, `readContentFromFile("/file.txt")`  
Output:  
`null, ["file.txt"], "abc"`  
Explanation:  
- Adds file directly under `/`.
- `ls("/")` lists the filename in root.
- Content readout returns `"abc"`.


### Thought Process (as if you’re the interviewee)  

- **Brute Force Idea:**  
  Use a flat dictionary {full_path: content}. For directories, content can be a set of children. However, this makes operations like intermediate directory creation and files vs directories distinction messy and error-prone.

- **Optimal Approach:**  
  Use a nested hierarchical tree (trie-like) structure:
  - Each node is either a **directory** (mapping name → children) or a **file** (stores content).
  - For **ls**, traverse down the path; if a file, return its name, else return sorted list of children.
  - For **mkdir/addContentToFile**, traverse or create directories as needed.
  - For **addContentToFile**, if the final node is not a file, create a file node and append as needed.
  - For **readContentFromFile**, just traverse and retrieve file content.
  - This matches the file system’s tree nature, and enables efficient traversal and storage.

**Trade-offs:**  
- Trie/tree structure offers clean and fast traversal; memory usage grows with number/length of names.
- Flat mapping is simpler but gets clumsy for hierarchical paths, especially with mkdir-like operations.


### Corner cases to consider  
- Creating a file or directory whose parent(s) do not exist (should create intermediates).
- Inserting into an existing file (append, not overwrite).
- Attempting to `ls` a file path (should return only the file).
- Listing the root directory (`"/"`).
- Deeply nested structures.
- Content with newline, empty content, or when content is appended multiple times.
- Name collision between file and directory in the same location (should not be possible by design).


### Solution

```python
class FileSystem:
    class Node:
        def __init__(self):
            self.children = {}  # name -> Node
            self.is_file = False
            self.content = ""

    def __init__(self):
        self.root = self.Node()

    def _traverse(self, path: str):
        # Helper to walk the path and return the Node
        node = self.root
        if path == "/":
            return node
        for part in path.strip("/").split("/"):
            if part not in node.children:
                node.children[part] = self.Node()
            node = node.children[part]
        return node

    def ls(self, path: str):
        node = self._traverse(path)
        if node.is_file:
            # Return only the file name, not full path
            return [path.split("/")[-1]]
        return sorted(node.children.keys())

    def mkdir(self, path: str):
        self._traverse(path)  # Ensures the whole path exists

    def addContentToFile(self, filePath: str, content: str):
        node = self._traverse(filePath)
        if not node.is_file:
            node.is_file = True
            node.content = ""
        node.content += content

    def readContentFromFile(self, filePath: str):
        node = self._traverse(filePath)
        if node.is_file:
            return node.content
        return ""  # Or raise error if path is not a file
```


### Time and Space complexity Analysis  

- **Time Complexity:**  
    - `ls`, `mkdir`, `addContentToFile`, `readContentFromFile`: O(L + N),  
      where L is the number of parts in the path, and N is the number of immediate children (for ls directory listing and sorting).
    - Sorting in `ls` is O(N log N), but N is usually small (number of children in a directory).

- **Space Complexity:**  
    - O(T), where T is the total number of characters in all path components and file contents, since every directory/file and string content is stored.


### Potential follow-up questions (as if you’re the interviewer)  

- How would this scale if there are millions of files and directories?  
  *Hint: Would you optimize for memory usage or disk IO?*

- How would you implement file/directory deletion, and what should happen if a directory is not empty?  
  *Hint: Think about tree structure and edge cases like deleting non-empty directories.*

- How could you support permissions or attributes (like file size, timestamps)?  
  *Hint: Add extra fields/metadata to each Node, and consider efficient updates.*


### Summary
The solution uses a **tree/trie pattern** (each node is either a directory or a file), which naturally fits hierarchical problems involving paths (e.g., file systems, URL routers, prefix-based queries). The coding pattern is broadly applicable anywhere paths need to be efficiently traversed and modified. In-memory file system problems like this are a great exercise in using recursive or iterative tree structures for real-world hierarchical data.