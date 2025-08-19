### Leetcode 839 (Hard): Similar String Groups [Practice](https://leetcode.com/problems/similar-string-groups)

### Description  
Given a list of strings where all strings have the same length and are all anagrams of each other, a **group** is a set of strings such that every string in the group is either:
- similar to at least one other string in the group,
- or connected (directly or indirectly) to other strings through one or more similar strings.

Two strings are **similar** if they are equal or if you can swap exactly two different characters in the first string to get the second string.  
The task is to determine how many such groups exist in the input list.


### Examples  

**Example 1:**  
Input: `["tars","rats","arts","star"]`  
Output: `2`  
*Explanation: "tars", "rats", and "arts" are all similar to each other (e.g., swap positions 1 and 2 in "tars" to get "rats"), so they form one group. "star" is not similar to any of them, so it forms another group.*

**Example 2:**  
Input: `["omv","ovm"]`  
Output: `1`  
*Explanation: "omv" and "ovm" are similar (swap positions 1 and 2), so they form a single group.*

**Example 3:**  
Input: `["abc","acb","bac","bca","cab","cba"]`  
Output: `1`  
*Explanation: Every string here is similar to every other via one or more swaps (they are all anagrams and can be made equivalent by a sequence of swaps). They all belong to a single connected group.*


### Thought Process (as if you’re the interviewee)  

- **Brute-force approach:**  
  For each string, compare it with every other string and check if they are similar. Build a graph connecting similar strings, then count how many connected components there are (each component is a group).

- **How to check similarity:**  
  Compare each pair of strings. If they have exactly 0 or 2 positions where they differ, they are similar, because swapping those two positions would make them identical.

- **Optimizing group formation:**  
  Use Union-Find (Disjoint Set Union / DSU).  
  Initially, each string is its own group. For every pair of strings that are similar, union their groups together.  
  At the end, the number of unique root parents in DSU—the number still as their own group—gives the final answer.

- **Why this approach:**  
  Graph traversal (DFS/BFS) would also work, but DSU is efficient for merging groups dynamically, especially with path compression and union by rank optimizations.


### Corner cases to consider  
- List has only one string → output is 1.
- All strings are identical.
- None of the strings are similar to any other (e.g., differing in three or more positions).
- Large `n`, small string length, or vice versa.
- Input contains strings forming more than two groups.
- All possible pairings form a single group.


### Solution

```python
def numSimilarGroups(strs):
    # Helper to check if two strings are similar
    def is_similar(a, b):
        diff = []
        for i in range(len(a)):
            if a[i] != b[i]:
                diff.append(i)
                # Early exit if more than 2 diff found
                if len(diff) > 2:
                    return False
        return len(diff) == 2 or len(diff) == 0

    # Disjoint Set Union with path compression
    parent = [i for i in range(len(strs))]
    
    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]
    
    def union(x, y):
        rootX = find(x)
        rootY = find(y)
        if rootX != rootY:
            parent[rootY] = rootX

    n = len(strs)
    for i in range(n):
        for j in range(i+1, n):
            if is_similar(strs[i], strs[j]):
                union(i, j)

    # Count number of root parents (groups)
    return sum(1 for i in range(n) if find(i) == i)
```


### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n² × k), where n is number of strings, and k is the length of each string.  
  This is because each pair of strings (O(n²)) is compared character by character (O(k)). Union-Find operations are nearly constant (amortized) due to path compression.

- **Space Complexity:**  
  O(nk) for storing the input, and O(n) for the Union-Find parent array and recursion stack.


### Potential follow-up questions (as if you’re the interviewer)  

- What if strings can have different lengths?  
  *Hint: Would the property of similarity still be well-defined?*

- How would you implement this with DFS/BFS, and compare space usage?  
  *Hint: Think of marking visited nodes and possible recursive call stack depth.*

- If similarity is defined as changing at most _k_ positions instead of just swapping two, how would you adapt your check?  
  *Hint: You'd have to generalize the is_similar function.*


### Summary
This problem is a classic application of **Union-Find / Disjoint Set Union** and the **connected components in a graph** pattern.  
The pattern is broadly useful for grouping elements by connectivity/transitivity: e.g., grouping people by mutual friendship, islands in a grid, or synonym chains in dictionaries.  
Similar string checking, combined with DSU, gives an efficient, easily generalizable solution.

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Union Find(#union-find)

### Similar Problems
- Groups of Strings(groups-of-strings) (Hard)