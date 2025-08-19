### Leetcode 1487 (Medium): Making File Names Unique [Practice](https://leetcode.com/problems/making-file-names-unique)

### Description  
You are given an array of strings, where each string is a file name. If a file name duplicates an existing one, you must make it unique by appending the smallest integer (k) in parentheses such that the new name does not exist in the array or among the already processed names. Return the list of unique file names in the order they appear.

### Examples  

**Example 1:**  
Input: `names = ["gta","gta(1)","gta","avalon"]`  
Output: `["gta","gta(1)","gta(2)","avalon"]`  
*Explanation: The second "gta" becomes "gta(2)" because "gta(1)" already exists.*

**Example 2:**  
Input: `names = ["onepiece","onepiece(1)","onepiece(2)","onepiece(3)","onepiece"]`  
Output: `["onepiece","onepiece(1)","onepiece(2)","onepiece(3)","onepiece(4)"]`  
*Explanation: The last "onepiece" becomes "onepiece(4)", as all lower values exist.*

**Example 3:**  
Input: `names = ["wano","wano","wano","wano"]`  
Output: `["wano","wano(1)","wano(2)","wano(3)"]`  
*Explanation: Each duplicate gets the smallest available index.*

### Thought Process (as if you’re the interviewee)  
- Key is to keep track of all existing file names (can use a set).
- For each name, check if it exists:
    - If not, add as is.
    - If exists, increment the suffix until an unused name is found.
- For efficiency, remember for each base name the next k to try (use a hashmap: name → next k).
- Avoid repeatedly checking from k=1 for every duplicate. Update the map each time a new name is forged.

### Corner cases to consider  
- Names already have suffixes with parentheses.
- Large values of k (e.g., ["a","a(1)", ... "a(99999)", "a"]).
- All names are unique.
- Empty input array.

### Solution

```python
def getFolderNames(names):
    used = set()  # all existing names
    counters = {}  # base name: next available k
    result = []
    for name in names:
        if name not in used:
            used.add(name)
            counters[name] = 1
            result.append(name)
        else:
            k = counters[name]
            while True:
                candidate = f"{name}({k})"
                if candidate not in used:
                    break
                k += 1
            used.add(candidate)
            counters[name] = k + 1
            counters[candidate] = 1  # future collisions with candidate
            result.append(candidate)
    return result
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(N), where N = number of names, assuming average O(1) for set/map operations.
- **Space Complexity:** O(N), used set and map of up to N names.

### Potential follow-up questions (as if you’re the interviewer)  
- What if file names may have more complex patterns (multiple suffixes)?  
  *Hint: Parse base name vs. suffix robustly.*
- Can you efficiently support millions of files?  
  *Hint: Consider hash collisions and data structure scaling.*
- Can your code handle arbitrary Unicode file names?  
  *Hint: String method compatibility.*

### Summary
This uses the hash map pattern for deduplication and collision resolution, as with URL shorteners or username systems. It's a form of greedy allocation with memory for quick lookup.

### Tags
Array(#array), Hash Table(#hash-table), String(#string)

### Similar Problems
