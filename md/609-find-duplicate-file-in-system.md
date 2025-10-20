### Leetcode 609 (Medium): Find Duplicate File in System [Practice](https://leetcode.com/problems/find-duplicate-file-in-system)

### Description  
Given a list of string descriptions representing directories with their files and contents, **find all duplicate files**—meaning files which have the **same exact content** regardless of name or directory.  
Each string in the input is formatted as:  
`"directory_path file1.txt(content1) file2.txt(content2) ..."`  
Our job is to group paths of files with matching contents and return all groups that contain **more than one file**.

### Examples  

**Example 1:**  
Input:  
`["root/a 1.txt(abcd) 2.txt(efgh)", "root/c 3.txt(abcd)", "root/c/d 4.txt(efgh)", "root 4.txt(efgh)"]`  
Output:  
`[["root/a/1.txt","root/c/3.txt"], ["root/a/2.txt","root/c/d/4.txt","root/4.txt"]]`  
*Explanation:*
- "abcd" content: root/a/1.txt, root/c/3.txt → group as duplicates.
- "efgh" content: root/a/2.txt, root/c/d/4.txt, root/4.txt → group as duplicates.


**Example 2:**  
Input:  
`["root/a 1.txt(zxcv) 2.txt(qwer)", "root/b 3.txt(qwer) 4.txt(zxcv)"]`  
Output:  
`[["root/a/1.txt","root/b/4.txt"], ["root/a/2.txt","root/b/3.txt"]]`  
*Explanation:*
- "zxcv" content: root/a/1.txt, root/b/4.txt
- "qwer" content: root/a/2.txt, root/b/3.txt

**Example 3:**  
Input:  
`["a 1.txt(a)", "b 2.txt(b)", "c 3.txt(a)"]`
Output:  
`[["a/1.txt","c/3.txt"]]`
*Explanation:*
- Only content "a" appears more than once: a/1.txt, c/3.txt.

### Thought Process (as if you’re the interviewee)

- **Brute-force:**  
  Compare every file’s content to every other file (nested loops). This is not efficient: O(N²) time if there are N files.

- **Optimized Approach:**  
  - **Key Idea:** Since only the file content matters for duplication, **use a hashmap** to map content → list of file paths.
  - Parse each input string. For every file, extract its content and track the "directory/file" full path in the map under that content.
  - After traversing all, collect only those lists where the length > 1 (there are duplicates).
  - This way, finding duplicates is linear in the number of files and their characters.
  - **Trade-off:** Storing full content strings as keys increases memory, but avoids O(N²) behavior.

### Corner cases to consider  
- Empty input list: Return an empty list.
- No duplicate contents: Return an empty list (all groups have length 1).
- All files in the same directory.
- Only one file total.
- File content strings with spaces or special characters (ensure extraction is robust).
- Different files with same name but different content (don’t confuse with duplicates).
- Very large files (large content — though in the real file system that'd matter, here only the string content is stored).

### Solution

```python
def findDuplicate(paths):
    # content to file_paths mapping
    content_dict = {}
    
    for entry in paths:
        # Split once: first part is directory, rest are file specs
        parts = entry.split(" ")
        directory = parts[0]
        
        # Go through each "filename(content)"
        for file_info in parts[1:]:
            # Find the split point ( assume file_name(content) format )
            idx = file_info.find('(')
            filename = file_info[:idx]
            content = file_info[idx + 1 : -1]  # drop parenthesis
            
            # Build full file path
            full_path = directory + "/" + filename
            
            # Put in dict under its content
            if content not in content_dict:
                content_dict[content] = []
            content_dict[content].append(full_path)
    
    # Only output groups with >1 files (duplicates)
    result = []
    for files in content_dict.values():
        if len(files) > 1:
            result.append(files)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N×L)
  - N = total **number of files**
  - L = average **length of each entry** (for string parsing)
  - For each file, splitting and string processing is linear in input.
- **Space Complexity:** O(N×L)
  - Store all paths and contents in the map; one entry per unique file content, with lists of all matching file paths.

### Potential follow-up questions  

- How would you handle **real file systems with very large files** (to avoid storing whole contents in memory)?
  *Hint: Use file hashes instead of strings; consider collision handling for hashes.*

- What if **file content can contain parentheses**?
  *Hint: Use regex or careful parsing to extract content robustly.*

- If you cannot fit all file data in memory, how would you solve distributed/large-scale duplicate checking?
  *Hint: MapReduce solution or multi-pass checking with hashes then actual file comparisons.*

### Summary

This problem uses the **hashmap grouping pattern** (mapping content → file locations), a classic for all grouping or bucketing tasks—especially finding duplicates or anagrams.  
Very commonly seen in string and file deduplication problems, and similar patterns apply in email or log grouping, grouping anagrams, or grouping by signatures in security analytics.


### Flashcard
Map file content to file paths using a hash map; group and return lists where multiple files share identical content.

### Tags
Array(#array), Hash Table(#hash-table), String(#string)

### Similar Problems
- Delete Duplicate Folders in System(delete-duplicate-folders-in-system) (Hard)