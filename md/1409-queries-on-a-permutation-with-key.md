### Leetcode 1409 (Medium): Queries on a Permutation With Key [Practice](https://leetcode.com/problems/queries-on-a-permutation-with-key)

### Description  
Given a list of queries and an initial permutation P of [1, 2, ..., m], for each query queries[i], find the index of queries[i] in P (0-based), record it, and then move queries[i] to the front of P. Return an array of recorded positions for all queries.

### Examples  
**Example 1:**  
Input: `queries = [3,1,2,1], m = 5`  
Output: `[2,1,2,1]`  
*Explanation: P starts as [1,2,3,4,5]. For query 3: index=2, move 3 to front ⇒ [3,1,2,4,5]. For 1: index=1, move to front ⇒ [1,3,2,4,5]. For 2: index=2, move to front ⇒ [2,1,3,4,5]. For 1: index=1, move to front ⇒ [1,2,3,4,5].*

**Example 2:**  
Input: `queries = [4,1,2,2], m = 4`  
Output: `[3,1,2,0]`  
*Explanation: Start: [1,2,3,4]. Query 4 at index 3, move to front ⇒ [4,1,2,3]. Next, query 1 at index 1, move to front ⇒ [1,4,2,3], etc.*

**Example 3:**  
Input: `queries = [1,1,1,1], m = 1`  
Output: `[0,0,0,0]`  
*Explanation: Only one element; always at index 0.*

### Thought Process (as if you’re the interviewee)  
Simulate the process: start with P = [1,2,...,m]. For each query, find its index, append index to result, remove it from current position and insert at the front. For small m and queries, this naive approach is sufficient. For larger m/n, can use a data structure supporting fast index lookup and move-to-front, such as a doubly linked list with a mapping from value to position, or a segment tree/BIT for more advanced optimization. But as constraints are usually small (m ≤ 1000), the direct simulation is fine.

### Corner cases to consider  
- Only one element, many queries (no change in result).
- All queries are the same value.
- Queries with repeated elements.
- Large m with few queries (performance check).

### Solution

```python
def processQueries(queries, m):
    P = list(range(1, m+1))
    res = []
    for q in queries:
        idx = P.index(q)           # Find the index
        res.append(idx)
        P.pop(idx)
        P.insert(0, q)             # Move to front
    return res
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(q × m), q = number of queries, m = size of permutation. Each index lookup is O(m), pop/insert is also O(m).
- **Space Complexity:** O(m) for storing the permutation, plus O(q) for result array.

### Potential follow-up questions (as if you’re the interviewer)  
- How to optimize for very large m?  
  *Hint: Use Indexed data structure (like BIT or Segment Tree, or built-in linked list with hash map for fast lookup and move operations).*

- Can you do all operations in O(q log m) time?  
  *Hint: Data structures supporting range queries and point updates can help.*

- What if queries is streaming, and you can't keep all of P in memory?  
  *Hint: Consider offline simulation or windowed buffer processing.*

### Summary
Simulate move-to-front queries directly using a Python list and index/insert operations. This is a classic simulation/data structure problem, with opportunities to optimize via hash maps or advanced trees for faster operations, commonly seen in list reordering interview questions.

### Tags
Array(#array), Binary Indexed Tree(#binary-indexed-tree), Simulation(#simulation)

### Similar Problems
