### Leetcode 1202 (Medium): Smallest String With Swaps [Practice](https://leetcode.com/problems/smallest-string-with-swaps)

### Description  
Given a string **s** and a list of index pairs (**pairs**), where each pair \([a, b]\) means you can swap characters at positions **a** and **b** any number of times, construct the **lexicographically smallest** string possible by performing any number of allowed swaps.  
Essentially, indices that are *connected* via some chain of swaps can have their characters rearranged in any order among themselves. The challenge is to efficiently find these connected groups and rearrange their letters for the smallest result.

### Examples  

**Example 1:**  
Input: `s = "dcab", pairs = [[0,3],[1,2]]`  
Output: `bacd`  
Explanation:  
Swap s and s[3] → `"bcad"`  
Swap s[1] and s[2] → `"bacd"`  

**Example 2:**  
Input: `s = "dcab", pairs = [[0,3],[1,2],[0,2]]`  
Output: `abcd`  
Explanation:  
Swap s and s[3] → `"bcad"`  
Swap s and s[2] → `"acbd"`  
Swap s[1] and s[2] → `"abcd"`  

**Example 3:**  
Input: `s = "cba", pairs = [[0,1],[1,2]]`  
Output: `abc`  
Explanation:  
Swap s and s[1] → `"bca"`  
Swap s[1] and s[2] → `"bac"`  
Swap s and s[1] → `"abc"`  

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Try all possible swaps for each pair, generate all strings, and take the smallest.  
  *Not practical*: Exponential time—far too slow for non-tiny cases.

- **Observation:**  
  Any two indices connected through some chain of swap pairs can freely rearrange their characters amongst themselves. So, indices are grouped by their *connected components*.

- **Optimized Approach:**  
  - Use a **Union-Find (Disjoint Set)** data structure to group indices into connected components based on the swap pairs.
  - For each group, collect the characters, sort them, and assign smallest characters to the smallest indices in the group.
  - This gives the smallest lexicographical order possible.

- **Why Union-Find:**  
  Union-Find is efficient (amortized nearly O(1) per union/find), lets us quickly determine which indices are connected (“can be fully swapped with each other”).

### Corner cases to consider  
- No pairs: return original string.
- All indices connected: return fully sorted string.
- Pairs forming multiple separate groups.
- Repeated or self pairs ([[i, i]]).
- Empty string.
- String of length 1.

### Solution

```python
from collections import defaultdict

def smallestStringWithSwaps(s, pairs):
    # Step 1: Union-Find structure
    n = len(s)
    parent = list(range(n))

    def find(x):
        # Path compression
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]
    
    def union(a, b):
        parent[find(a)] = find(b)
    
    # Step 2: Union all connected indices
    for a, b in pairs:
        union(a, b)
    
    # Step 3: Group all indices by their connected component root
    components = defaultdict(list)
    for i in range(n):
        root = find(i)
        components[root].append(i)
    
    # Step 4: Build answer: sort chars in each component and assign them back
    res = list(s)
    for indices in components.values():
        chars = [res[i] for i in indices]
        chars.sort()
        for idx, ch in zip(sorted(indices), chars):
            res[idx] = ch
    return ''.join(res)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  - Union-Find operations: O(n) (nearly constant per op)
  - Sorting characters for each component: O(n log n) in total (all components together)
  - Building result: O(n)
- **Space Complexity:** O(n)  
  - For Union-Find parent array, components map, and temporary storage for chars.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the number of pairs and string length are both up to 10⁵?  
  *Hint: Optimize connected component finding—use Union-Find, avoid DFS/recursive stack*

- How would you adapt the solution if swaps have cost and you want the smallest lex string under a swap cost constraint?  
  *Hint: Graph shortest path, not just connected components*

- If you could only swap indices in pairs at most once, how would it change?  
  *Hint: Need to trace swap application and not just connected components; could be a matching problem*

### Summary
This problem uses the classic **Union-Find pattern** to discover connected components defined by interchangeable indices. The key coding pattern is grouping, sorting, and assignment by component.  
The approach generalizes to problems involving grouping by connectivity and applying optimizations such as sorting or aggregation within each group. This is common in problems involving equivalence classes, social networks, and any interchangeable grouping scenario.