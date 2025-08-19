### Leetcode 1722 (Medium): Minimize Hamming Distance After Swap Operations [Practice](https://leetcode.com/problems/minimize-hamming-distance-after-swap-operations)

### Description  
You are given two integer arrays, **source** and **target**, both of length _n_. You are also given an array **allowedSwaps**, where each entry \([a, b]\) means you can swap elements at index _a_ and _b_ in **source** any number of times (including zero swaps, and swaps can be repeated in any manner).  
The **Hamming distance** between two arrays is the number of positions with differing values.  
**Task:** Find the minimum possible Hamming distance between **source** and **target** after performing any number of swaps defined in **allowedSwaps**.

### Examples  

**Example 1:**  
Input:  
source = `[1,2,3,4]`,  
target = `[2,1,4,5]`,  
allowedSwaps = `[[0,1],[2,3]]`  
Output: `1`  
*Explanation:  
Allowed swaps split indices into two groups: [0,1] and [2,3].  
Within group [0,1], you can swap source\[_0_\]=1 and source\[_1_\]=2, so that source = [2,1,3,4].  
Within group [2,3], swap source\[_2_\]=3 and source\[_3_\]=4, so that source = [2,1,4,3].  
Comparing with target = [2,1,4,5], only position 3 differs: 3 != 5, so Hamming distance = 1.*

**Example 2:**  
Input:  
source = `[1,2,3,4]`,  
target = `[1,3,2,4]`,  
allowedSwaps = `[]`  
Output: `2`  
*Explanation:  
No swaps allowed. Compare `source` and `target` directly: positions 1 and 2 differ (2 vs 3, 3 vs 2), so Hamming distance = 2.*

**Example 3:**  
Input:  
source = `[5,1,2,4,3]`,  
target = `[1,5,4,2,3]`,  
allowedSwaps = `[[0,4],[4,2],[1,3],[1,4]]`  
Output: `0`  
*Explanation:  
Allowed swaps connect all indices, so any permutation of the source is possible.  
Therefore, you can rearrange source to exactly match target; minimum Hamming distance = 0.*

### Thought Process (as if you’re the interviewee)  
The problem is about **minimizing mismatches** between `source` and `target` using the flexibility provided by allowed swaps.  
**Naive idea:** Try all possible orders of source formed via allowedSwaps—too slow (exponential).  
**Optimization:** Notice that allowed swaps form **connected components** (groups of indices fully swappable among themselves).  
For each such component, you can permute source freely within it.  
So, for each group:
- Count frequency of each value in both source and target within the group.
- For each value, greedily match as many as you can.
- The remaining unmatched are forced mismatches.

To efficiently get connected components, use **Union Find (Disjoint Set Union)** algorithm.  
For each group, use a **Counter** or hashmap for frequency counting on both source and target.  
Iterate through each group, and subtract matches to get minimum Hamming distance.

### Corner cases to consider  
- No allowed swaps (each index is its own group).
- Empty arrays (source/target length = 0).
- Only one element (trivial case).
- All elements already match.
- All indices form a single connected component.
- Duplicates in source/target, ensuring multiset matching for each group.
- Source and target arrays have no overlap at all.

### Solution

```python
def minimumHammingDistance(source, target, allowedSwaps):
    n = len(source)
    # 1. Union-Find to group swappable indices
    parent = [i for i in range(n)]
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]  # Path compression
            x = parent[x]
        return x
    def union(x, y):
        root_x, root_y = find(x), find(y)
        if root_x != root_y:
            parent[root_y] = root_x

    for a, b in allowedSwaps:
        union(a, b)

    # 2. Gather indices by component
    from collections import defaultdict, Counter
    groups = defaultdict(list)
    for i in range(n):
        root = find(i)
        groups[root].append(i)

    # 3. For each component, match as many as possible using Counters
    res = 0
    for indices in groups.values():
        source_counter = Counter()
        target_counter = Counter()
        for i in indices:
            source_counter[source[i]] += 1
            target_counter[target[i]] += 1
        for num in target_counter:
            matched = min(source_counter[num], target_counter[num])
            target_counter[num] -= matched
        # Remaining in target_counter are mismatches (since source couldn't provide those)
        res += sum(target_counter.values())
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m), where n = length of source, m = number of allowedSwaps.  
  - Union-Find operations are nearly constant time per operation (amortized),  
  - Group assembly and Counter operations are linear in total.
- **Space Complexity:** O(n), for the parent array, groups, and frequency counters.

### Potential follow-up questions (as if you’re the interviewer)  

- What if swaps are _costly_ or have individual weights/costs?  
  *Hint: Consider minimum-cost matching in a component, possibly using min-cost flow.*

- If allowedSwaps also affect the `target` array, how would that change your approach?  
  *Hint: Symmetry means both arrays can be rearranged within their respective components.*

- How would you handle very large arrays or real-time stream of allowedSwaps?  
  *Hint: Discuss dynamic connectivity, possibly using online Union-Find with optimizations for very large datasets.*

### Summary
This problem uses the **Union-Find pattern** to break a permutation-rearrangement question into independently swappable components, and **multiset counting** to greedily minimize mismatches within each.  
This approach is common for **graph connectivity** and **grouped matching** problems and can be seen in problems like account merging, similar string groups, or reconstructing arrays with swaps.

### Tags
Array(#array), Depth-First Search(#depth-first-search), Union Find(#union-find)

### Similar Problems
- Smallest String With Swaps(smallest-string-with-swaps) (Medium)
- Make Lexicographically Smallest Array by Swapping Elements(make-lexicographically-smallest-array-by-swapping-elements) (Medium)