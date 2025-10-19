### Leetcode 3245 (Hard): Alternating Groups III [Practice](https://leetcode.com/problems/alternating-groups-iii)

### Description  
Given an array **colors** representing a circular arrangement of tiles (where each tile is 0 for red or 1 for blue), and a list of **queries**, process the following query types:
- `queries[i] = [1, sze]`: Return the count of *alternating groups* of size `sze` (a contiguous group of `sze` tiles, possibly wrapping around, where every tile except the first and last alternates with its neighbors).
- `queries[i] = [2, idx, color]`: Update `colors[idx]` to `color`.

An *alternating group* is any contiguous subarray (with wrap-around) of the given size, such that every pair of neighboring tiles inside the group have different colors.

Return an array containing the answers to query type 1, in order.

### Examples  

**Example 1:**  
Input:  
`colors = [0,1,0,1,0]`,  
`queries = [[1,3],[2,1,0],[1,3]]`  
Output:  
`[5,3]`  
*Explanation:  
- The first query asks for the number of alternating groups of size 3. Since the array is circular, all possible groups are alternating:  
  [0,1,0], [1,0,1], [0,1,0], [1,0,1], [0,1,0]  
  So the answer is 5.  
- Second query changes index 1 to color 0, so colors becomes [0,0,0,1,0].  
- Third query again asks for alternating groups of size 3. Valid ones are:  
  [0,0,0] (not alternating),  
  [0,0,1] (not alternating),  
  [0,1,0] (alternating),  
  [1,0,0] (not alternating),  
  [0,0,0] (not alternating).  
  Only [0,1,0] is alternating (starts at index 2), so answer is 1.*

**Example 2:**  
Input:  
`colors = [1,0,1]`,  
`queries = [[1,2],[2,2,0],[1,2]]`  
Output:  
`[3,2]`  
*Explanation:  
- For size 2: [1,0], [0,1], [1,1]  
  First two are alternating, last is not; wraparound makes all three alternating (since [1,0], [0,1], [1,0]).  
- Second query changes index 2 to 0, so array becomes [1,0,0].  
- Now, groups of size 2:  
  [1,0] (alternating),  
  [0,0] (not alternating),  
  [0,1] (alternating; wrap from end to start).  
  So answer is 2.*

**Example 3:**  
Input:  
`colors = [0,0,0,0]`,  
`queries = [[1,4],[2,0,1],[1,4]]`  
Output:  
`[0,1]`  
*Explanation:  
- For size 4: Only the whole array, [0,0,0,0], is possible. Since all elements are same, it's not alternating.  
- After update, array becomes [1,0,0,0]. Only full array [1,0,0,0] exists; it's not alternating. Thus, answer is 0.*

### Thought Process (as if you’re the interviewee)  
Start from brute-force:
- For each query of type 1, and each possible window, check if the subarray (with wrap-around) is alternating.
  - For `n` elements and subgroup of size `k`, we have `n` windows to check (wrap-around).
  - Each check is O(k).
  - So O(q × n × k) time, too slow for large n or many queries.

Optimizations:
- Key property: After each update, at most O(k) groups affected (since only subarrays containing the updated index might become or stop being alternating).
- For type 1 queries, precompute where the alternating runs are, possibly using a "good alternating run" marker.
- BUT every query can ask about different sizes, so naive memoization per size doesn't work after updates.

Final approach:
- Keep the current color array.
- For each type 1 query (for size s), run the window in a circular loop from each possible starting point, checking only "does this window alternate?".
- Since updates are infrequent and only affect one cell, and group count per query is up to n, that's O(n) per query.
- We cannot precompute result for all window sizes, since size s can vary per query and updates occur.

Trade-offs:
- The sliding window / two pointer doesn’t help since "alternating" for arbitrary size is not regular.
- Complicated optimizations exist if queries can be batched, but worst-case O(n) per type 1 is expected.

### Corner cases to consider  
- Empty colors (n=0) — return 0 for any type 1 query.
- All colors same (all 0 or all 1) — only size 1 windows valid (but size ≥ 2 returns 0).
- Size 1 window (always valid, each single element group alternates trivially).
- Size n window (the whole circle).
- Updates that do not change the color at index — should not affect counts.
- Multiple updates at the same index.
- Circular subarrays: careful with wrap-around indexing.

### Solution

```python
def alternating_groups_iii(colors, queries):
    n = len(colors)
    
    # Helper to check if window starting at i is alternating for length k
    def is_alternating(start, size):
        for j in range(size - 1):
            a = colors[(start + j) % n]
            b = colors[(start + j + 1) % n]
            if a == b:
                return False
        return True

    answer = []
    for query in queries:
        if query[0] == 1:
            sze = query[1]
            count = 0
            for i in range(n):
                if is_alternating(i, sze):
                    count += 1
            answer.append(count)
        else:
            idx, color = query[1], query[2]
            colors[idx] = color
    return answer
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Each type 1 query is O(n × sze), where sze is the group size in the current query (since checking each window of size sze may require up to sze steps, for n windows; but in practice, if sze is small, this is fast).
  - Each type 2 (update) query is O(1).
  - Overall: For Q queries, worst case O(Q × n × sₘₐₓ).

- **Space Complexity:**  
  - O(n) for the colors array (in-place).
  - O(1) extra space aside from input and output.

### Potential follow-up questions (as if you’re the interviewer)  

- Suppose queries are batched and no updates occur — can you preprocess faster for multiple sizes?
  *Hint: Use dynamic programming to count lengths of alternating runs starting at each index.*

- How would you scale this to very large n and queries, where updates are rare compared to type 1 queries?
  *Hint: Use segment trees or block decomposition — cache results, only recompute segments affected by updates.*

- What if the colors are not just 0 and 1, but k different colors? How does the solution change?
  *Hint: Generalize the alternating condition: simply compare colors of adjacent elements for inequality.*

### Summary
This problem uses a classic *sliding window* / window enumeration pattern with careful handling of **circular arrays**. The approach is to directly check each window for the alternating property whenever queried, since update queries may invalidate all precomputed results. For similar window property problems (like substring matching, run lengths, circular substring queries), this strategy and attention to corner cases (wrapping) is widely applicable.

### Tags
Array(#array), Binary Indexed Tree(#binary-indexed-tree), Ordered Set(#ordered-set)

### Similar Problems
