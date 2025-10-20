### Leetcode 1436 (Easy): Destination City [Practice](https://leetcode.com/problems/destination-city)

### Description  
Given a list of direct city-to-city paths (edges), each path as a pair [cityA, cityB] representing a direct travel from cityA to cityB, find the **destination city**: the city with **no outgoing path**, i.e., it never appears as cityA in any path.

Exactly one such destination city will exist.

### Examples  

**Example 1:**  
Input: `paths = [["London","New York"],["New York","Lima"],["Lima","Sao Paulo"]]`  
Output: `"Sao Paulo"`  
*Explanation: "Sao Paulo" is never a cityA (source) in any path; all other cities are source cities.*

**Example 2:**  
Input: `paths = [["B", "C"], ["D", "B"], ["C", "A"]]`  
Output: `"A"`  
*Explanation: "A" is a destination; no path starts from it.*

**Example 3:**  
Input: `paths = [["A", "Z"]]`  
Output: `"Z"`  
*Explanation: Only two cities: "A" → "Z". "Z" is not a start.*

### Thought Process (as if you’re the interviewee)  
The crux is identifying the city that never appears as a source (first element of any path). Collect all source cities into a set, and then for each destination candidate (second element), check which one is not in the sources set.

### Corner cases to consider  
- Only one path in the input
- Repeated paths (if any; but not expected per description)
- All cities chained (no cycles)

### Solution

```python
def destCity(paths):
    sources = set()
    for a, b in paths:
        sources.add(a)
    for a, b in paths:
        if b not in sources:
            return b
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — iterate twice through all paths, n = number of paths.
- **Space Complexity:** O(n) — set of source cities.

### Potential follow-up questions (as if you’re the interviewer)  
- What if there were multiple disconnected routes/graphs?  
  *Hint: Scan for more than one city with no outbound edges.*

- Can you find a city that is only a source (never a destination)?  
  *Hint: Swap the logic.*

- What if routes can have cycles?  
  *Hint: Consider strongly connected components.*

### Summary
This uses a hash set for quick membership lookup — a classic set difference task, common for graph endpoint detection and unique elements in lists.


### Flashcard
Collect all source cities in a set, then return the destination city that never appears as a source.

### Tags
Array(#array), Hash Table(#hash-table), String(#string)

### Similar Problems
