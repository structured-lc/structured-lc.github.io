### Leetcode 3695 (Hard): Maximize Alternating Sum Using Swaps [Practice](https://leetcode.com/problems/maximize-alternating-sum-using-swaps)

### Description  
Given an integer array `nums` and a list of allowed swap pairs between positions, you can swap the values at any two indices in a pair any number of times (even transitively between pairs). Your goal is to permute `nums` using those swaps to **maximize the alternating sum**:  
Sum = nums₀ − nums₁ + nums₂ − nums₃ + ...  
To achieve the maximum, you want the largest available numbers in even positions and the smallest in odd positions, within each group of indices that can be swapped among themselves.

### Examples  

**Example 1:**  
Input: `nums = [1, 2, 3], swaps = [[0,1],[1,2]]`  
Output: `4`  
*Explanation: You can freely swap among all indices. Arrange as [3,1,2]. Alternating sum = 3 - 1 + 2 = 4.*

**Example 2:**  
Input: `nums = [5, 6, 3], swaps = []`  
Output: `2`  
*Explanation: No swaps allowed; alternating sum = 5 - 6 + 3 = 2.*

**Example 3:**  
Input: `nums = [4, 7, 2, 10], swaps = [[0,1],[2,3]]`  
Output: `15`  
*Explanation:  
There are two connected components: [0,1] and [2,3].  
- Positions 0,1: possible values [4,7], assign 7 to 0 (even), 4 to 1 (odd).
- Positions 2,3: possible values [2,10], assign 10 to 2 (even), 2 to 3 (odd).  
Alternating sum = 7 (pos 0) - 4 (pos 1) + 10 (pos 2) - 2 (pos 3) = 11.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force**: Enumerate all possible valid permutations via swaps and check the alternating sum. Very slow (factorial complexity), not feasible for large arrays.
  
- **Key observation**: Each set of indices connected via swaps forms a *connected component*. Inside each group, elements can be rearranged in any order.

- **Optimization**: For each component:  
  - Gather available nums and indices.
  - Sort both.  
  - Assign largest available numbers to smallest even indices and smallest numbers to smallest odd indices.
  - For even index positions, assign highest available numbers; for odd positions, assign lowest.

- **Trade-offs**:  
  - Using Union-Find (DSU) efficiently finds components.
  - Sorting is O(M log M) per group, where M is the group size.
  - Final method is O(N log N), scalable.

### Corner cases to consider  
- Empty `nums` or `swaps`
- No swaps allowed (each element stuck in place)
- One-element array (always return that value)
- Multiple disconnected components
- Duplicates in `nums`
- All indices mutually connected (full permutation possible)
- All swaps repeated or cycles in swap graph

### Solution

```python
def maximize_alternating_sum(nums, swaps):
    # Find connected components using Union-Find (Disjoint Set)
    n = len(nums)
    parent = list(range(n))
    def find(u):
        while parent[u] != u:
            parent[u] = parent[parent[u]]
            u = parent[u]
        return u
    def union(u, v):
        pu, pv = find(u), find(v)
        if pu != pv:
            parent[pu] = pv
    
    # Build the union-find structure from swaps
    for a, b in swaps:
        union(a, b)
    
    # Map indices to their components
    groups = {}
    for i in range(n):
        p = find(i)
        if p not in groups:
            groups[p] = []
        groups[p].append(i)
    
    # For each group, optimize assignment for maximum alternating sum
    result_nums = [0] * n
    for indices in groups.values():
        # Gather group values and sort them descending
        group_vals = [nums[i] for i in indices]
        indices.sort()
        group_vals.sort(reverse=True)
        # Assign largest values to even indices, smallest to odd
        even_pos = [i for idx, i in enumerate(indices) if idx % 2 == 0]
        odd_pos = [i for idx, i in enumerate(indices) if idx % 2 == 1]
        vals_even = group_vals[:len(even_pos)]
        vals_odd = group_vals[len(even_pos):]
        for i, v in zip(even_pos, vals_even):
            result_nums[i] = v
        for i, v in zip(odd_pos, vals_odd):
            result_nums[i] = v
    
    # Calculate final alternating sum
    total = 0
    for i, v in enumerate(result_nums):
        if i % 2 == 0:
            total += v
        else:
            total -= v
    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N log N)  
  - Union-Find operations are nearly O(N).
  - Sorting each group totals to O(N log N) for all numbers (since groups partition the array).
  - Final sum calculation is O(N).

- **Space Complexity:** O(N)  
  - Storage for Union-Find parent array.
  - Mapping from components to group indices and their values.
  - New array for rearranged nums.

### Potential follow-up questions (as if you’re the interviewer)  

- What if duplicate swaps are given, or swaps form cycles?  
  *Hint: Union-Find structure automatically handles cycles and duplicate pairs; only connectivity matters.*

- Can you do it in-place without constructing extra arrays?  
  *Hint: Rearrange nums within each group directly by swapping, or keep pointers to current assignments.*

- What if nums length is 1e6 but swaps are very sparse?  
  *Hint: Union-Find remains efficient; unconnected indices become singleton components.*

### Summary
This problem uses a **connected component + greedy sort** pattern: each swap group acts as an independent pool for optimal assignment. Identifying components (Union-Find/DSU) followed by **greedy assignment** per group allows the alternating sum to be maximized efficiently. This technique is broadly applicable wherever permutation constraints exist due to restricted swap pairs—common in graph and network problems with local rearrangement or optimization requirements.


### Flashcard
Information not available in search results.

### Tags
Array(#array), Greedy(#greedy), Union Find(#union-find), Sorting(#sorting)

### Similar Problems
