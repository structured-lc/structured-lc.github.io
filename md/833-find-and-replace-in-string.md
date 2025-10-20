### Leetcode 833 (Medium): Find And Replace in String [Practice](https://leetcode.com/problems/find-and-replace-in-string)

### Description  
You are given a string **s** and three lists all of the same length: **indices**, **sources**, and **targets**. Each entry describes a replacement operation:  
- For operation i, check if the substring of **s** starting at **indices[i]** matches **sources[i]**.  
- If it matches, replace that part in **s** with **targets[i]**.  
- All replacements occur *simultaneously*, based on original positions, so changes do not shift further indices.  
- There are no overlapping replacements.

The task is to perform all valid replacements and return the final string.

### Examples  

**Example 1:**  
Input:  
s = `"abcd"`, indices = `[0, 2]`, sources = `["a", "cd"]`, targets = `["eee", "ffff"]`  
Output: `"eeebffff"`  
*Explanation:*
- indices=0, sources="a": "a" at s → match → replace with "eee"
- indices[1]=2, sources[1]="cd": "cd" at s[2] → match → replace with "ffff"
- Result: `"eee"` + `"b"` + `"ffff"` = `"eeebffff"`

**Example 2:**  
Input:  
s = `"abcd"`, indices = `[0, 2]`, sources = `["ab", "ec"]`, targets = `["eee", "ffff"]`  
Output: `"eeecd"`  
*Explanation:*
- indices=0, sources="ab": "ab" at s → match → replace with "eee"
- indices[1]=2, sources[1]="ec": "ec" at s[2] → no match
- Result: "eee" + "cd" = `"eeecd"`

**Example 3:**  
Input:  
s = `"abcdef"`, indices = `[1, 3]`, sources = `["b", "de"]`, targets = `["xx", "yy"]`  
Output: `"axxcyyf"`  
*Explanation:*
- indices=1, sources="b": "b" at s[1] → match → replace with "xx"
- indices[1]=3, sources[1]="de": "de" at s[3] → match → replace with "yy"
- Result: "a" + "xx" + "c" + "yy" + "f" = `"axxcyyf"`

### Thought Process (as if you’re the interviewee)  
- **Initial approach:**  
  Brute-force try all replacements sequentially, but since replacements must be done *simultaneously*, we can't perform them one after another directly—indexes will become invalid after any modification.
- **Key insight:**  
  We need to only consider matches in the *original* string, and our replacements don't overlap.
- **Optimized plan:**  
  - Preprocess replacements as tuples (index, source, target).
  - Sort them by index.
  - Scan through **s** from start to finish, and at each index check if it's a replacement start.  
    - If yes and substring matches, append target to result and skip ahead.
    - Else, append the character as-is.
- Trade-off: By building a mapping of index → (source, target), we achieve linear scan and avoid O(n²) behavior.

### Corner cases to consider  
- Empty string s or empty indices/sources/targets.
- No matches at any index—should return original string.
- Multiple replacements where target strings are different lengths.
- Operations whose sources do not match the substring at their index.
- Replacement at start or end of s.
- No indices provided (result is s unchanged).

### Solution

```python
def findReplaceString(s, indices, sources, targets):
    # Map index to (source, target) for quick lookup
    match = {idx: (src, tgt) for idx, src, tgt in zip(indices, sources, targets)}
    res = []
    i = 0
    while i < len(s):
        if i in match:
            src, tgt = match[i]
            # Check if source matches s at index i
            if s.startswith(src, i):
                res.append(tgt)
                i += len(src)
                continue
        # No replacement, just add current character
        res.append(s[i])
        i += 1
    return ''.join(res)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N + M), where N = len(s) and M = len(indices). We only scan s once; lookup for replacements is O(1) per index using a dict.
- **Space Complexity:** O(N + M), due to the result array and the map for indices.

### Potential follow-up questions (as if you’re the interviewer)  

- What if replacements could overlap?
  *Hint: Overlap would require additional management, perhaps interval merging or greedy strategies.*

- Can you do it in-place if s is a mutable array?
  *Hint: Think carefully about managing shifting indices or process from end to start.*

- How would you handle very large s or a streaming input?
  *Hint: Possibly use generators or read-only windowed replacements.*

### Summary
This problem uses the "Scan and Replace with a Mapping" pattern: preprocess all potential replacements, then iterate once through s, performing replacements where appropriate. The approach avoids index invalidations from earlier replacements, and is common for problems where simultaneous (unaffected) replacements are needed. This technique is useful wherever indexed, non-overlapping modifications on a string are required.


### Flashcard
Sort replacements by index, scan original string left to right, and for each match at index, append target; otherwise, append original char.

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Sorting(#sorting)

### Similar Problems
