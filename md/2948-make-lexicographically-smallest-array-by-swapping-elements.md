### Leetcode 2948 (Medium): Make Lexicographically Smallest Array by Swapping Elements [Practice](https://leetcode.com/problems/make-lexicographically-smallest-array-by-swapping-elements)

### Description  
Given a 0-indexed array of positive integers `nums` and a positive integer `limit`, you can swap any two elements `nums[i]` and `nums[j]` as long as their absolute difference is ≤ limit. Your goal is to perform any number of such swaps to make the array **lexicographically smallest** possible.  
That means: among all possible final arrays using these swaps, return the one which comes first in dictionary order (that is, for the first position where `a` and `b` differ, `a` is smaller if `a[i] < b[i]`).  

### Examples  

**Example 1:**  
Input: `nums = [1,5,3,9,8]`, `limit = 2`  
Output: `[1,3,5,8,9]`  
*Explanation: You can swap 5 and 3 because |5-3| = 2. Then swap 9 and 8 because |9-8| = 1. The array becomes [1,3,5,8,9], which is the smallest possible.*

**Example 2:**  
Input: `nums = [2,10,3]`, `limit = 7`  
Output: `[2,3,10]`  
*Explanation: |10-3| = 7 allows swapping 10 and 3. The array becomes [2,3,10]. No other operations can produce a smaller array.*

**Example 3:**  
Input: `nums = [1,7,28,19,10]`, `limit = 3`  
Output: `[1,7,28,19,10]`  
*Explanation: No two elements except (7,10) or (19, 22), but none of those pairs are within the limit. So the array stays the same.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Try every possible sequence of swaps that are allowed, tracking all permutations. This is clearly infeasible for anything but the smallest inputs.

- **Observation:**  
  Two elements can be swapped if and only if there is a direct or indirect path between them by repeatedly swapping adjacent elements whose difference is ≤ limit.

- **Optimized Approach:**  
  - **Model as Connected Components:**  
    Treat the array indices as nodes in a graph. Connect indices i and j if |nums[i] - nums[j]| ≤ limit. All nodes within the same connected component can be freely swapped among themselves.
    
  - **Sorting Within Components:**  
    For each connected component, gather the indices and values, sort values, and assign sorted values to the sorted indices to achieve lexicographically smallest arrangement.

- **Trade-offs:**  
  - No need for recursive search or repeated swapping. Use union-find to group indices.  
  - Efficient for large arrays.

### Corner cases to consider  
- Empty array (`nums = []`)
- Single element (`[x]`), any limit
- All elements equal, any limit
- Large limit—may allow entire array to be rearranged
- Limit = 0 (only equal elements can be swapped)
- Several isolated groups (components) in array, non-overlapping swaps

### Solution

```python
def lexicographicallySmallestArray(nums, limit):
    # Union Find with path compression
    class DSU:
        def __init__(self, n):
            self.parent = list(range(n))
        def find(self, x):
            if self.parent[x] != x:
                self.parent[x] = self.find(self.parent[x])
            return self.parent[x]
        def union(self, x, y):
            px, py = self.find(x), self.find(y)
            if px != py:
                self.parent[py] = px

    n = len(nums)
    dsu = DSU(n)
    
    # First, sort the values together with indices
    arr = list(zip(nums, range(n)))
    arr.sort()
    
    # Union adjacent items whose values are within limit
    for i in range(1, n):
        if arr[i][0] - arr[i-1][0] <= limit:
            dsu.union(arr[i][1], arr[i-1][1])
    
    # Group indices by their component (root parent)
    from collections import defaultdict
    groups = defaultdict(list)
    for idx in range(n):
        groups[dsu.find(idx)].append(idx)
    
    # For each group, sort the indices and the values,
    # then assign sorted values to sorted indices
    res = [0]*n
    for indices in groups.values():
        vals = [nums[i] for i in indices]
        indices.sort()
        vals.sort()
        for idx, v in zip(indices, vals):
            res[idx] = v
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n log n)  
  - Sorting values: O(n log n)  
  - Union-find (amortized nearly O(1) per operation)  
  - Sorting and assigning per group: each element only handled once.

- **Space Complexity:**  
  O(n) for DSU parent array, groupings, and output array.

### Potential follow-up questions (as if you’re the interviewer)  

- What happens if the elements are not unique?  
  *Hint: Try test cases with duplicates. Does the union-find grouping or sorting logic break?*

- Can you do it without extra space?  
  *Hint: Is in-place rearrangement possible? Think about index cycles and constraints.*

- If the allowed difference is not symmetric (say, can only swap if nums[i] - nums[j] ≤ limit but not the other way), how would it affect your approach?  
  *Hint: The component connectivity might become directional. Can you still group freely?*

### Summary
This solution leverages **union-find (disjoint set union)** to model the allowed connected swaps, then sorts elements within components—classic connected-component reasoning using union-by-condition.  
This pattern is broadly useful whenever set-rearrangement constraints can be expressed as a graph problem, such as swap-to-sorted, minimal swaps to group objects, or selecting orderings under pairing constraints.  
The approach is **graph + greedy sorting within sets**, and is very standard in array rearrangement under swap limitations.


### Flashcard
Model as a graph where indices are nodes; connect i and j if |nums[i] - nums[j]| ≤ limit. Find connected components, sort elements within each component, and place them back in sorted order.

### Tags
Array(#array), Union Find(#union-find), Sorting(#sorting)

### Similar Problems
- Smallest String With Swaps(smallest-string-with-swaps) (Medium)
- Minimize Hamming Distance After Swap Operations(minimize-hamming-distance-after-swap-operations) (Medium)