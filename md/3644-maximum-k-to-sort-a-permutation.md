### Leetcode 3644 (Medium): Maximum K to Sort a Permutation [Practice](https://leetcode.com/problems/maximum-k-to-sort-a-permutation)

### Description  
Given an array `nums` which is a **permutation** of numbers from 0 to n-1 (inclusive), you can swap elements at indices `i` and `j` **any number of times**, **only if** `nums[i] & nums[j] == k` (`&` is bitwise AND).  
Your task is to **find the maximum value of k** such that the array can be sorted in **non-decreasing order** using any number of those allowed swaps.  
If the array is already sorted, return `0`.

### Examples  

**Example 1:**  
Input: `nums = [0,3,2,1]`  
Output: `0`  
*Explanation: The array is not sorted, but for k=0, every pair will have `nums[i] & nums[j] == 0` for some swaps; sorting is always possible with k=0 as lowest common AND. But we want the largest k! Try all k from highest down and see if sorting is possible. For k=0, the answer is always 0 if not sorted.*

**Example 2:**  
Input: `nums = [1,2,0]`  
Output: `0`  
*Explanation: See above. Only with k=0 do all swaps become possible.*

**Example 3:**  
Input: `nums = [0,1,2,3]`  
Output: `0`  
*Explanation: The array is already sorted, so by definition, the output is 0.*

### Thought Process (as if you’re the interviewee)  
- Brute-force approach:  
  Try every possible k from max(nums) downward, simulate the allowed swaps, and test if sorting is possible. This is slow; n is up to 10⁵, so must optimize.

- Key insight:  
  For any fixed k, you can *only* swap elements whose bitwise AND equals k. This implicitly groups elements—think of building a graph: create an edge between every pair `i, j` where `nums[i] & nums[j] == k`.  
  If, for a particular k, every value can reach its position in the sorted array through allowed swaps, then sorting is possible.

- Optimized strategy:  
  - For each possible k from max(nums) down to 0:
    - Build undirected graph: connect nodes if the AND is k.
    - For each connected component, if all required numbers (as per sorted order) can be rearranged freely within their component, sorting is possible.
    - Stop at the highest such k and return.

- Trade-offs:  
  - Brute-force is too slow.
  - Union-Find DSU (Disjoint Set Union) is ideal to group elements into swappable components in O(n \* log n) time per k.

### Corner cases to consider  
- Array already sorted: must return 0.
- n = 1 (single element), trivially sorted.
- Large n, max(nums) = n-1.
- All bits set, where AND is nontrivial.
- Multiple connected components, requiring swaps across them.

### Solution

```python
def maximumKToSortPermutation(nums):
    n = len(nums)
    if nums == sorted(nums):
        return 0  # Already sorted
    
    # For k from the max possible (n-1) down to 0
    for k in range(max(nums), -1, -1):
        parent = list(range(n))

        def find(x):
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        def union(x, y):
            px, py = find(x), find(y)
            if px != py:
                parent[py] = px

        # Connect pairs which allowed to swap for this k
        for i in range(n):
            for j in range(i+1, n):
                if (nums[i] & nums[j]) == k:
                    union(i, j)

        # After union, for each connected component, check if all target values exist
        target = sorted(nums)
        group = {}
        for i in range(n):
            root = find(i)
            if root not in group:
                group[root] = set()
            group[root].add(nums[i])

        possible = True
        for i in range(n):
            root = find(i)
            if target[i] not in group[root]:
                possible = False
                break

        if possible:
            return k

    return 0
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Outer loop for k: up to n (worst-case n possible k values: n-1 to 0)
  - Inner double loop: O(n²) for each k
  - DSU (Union-Find): nearly O(n) per union/find, but double loop makes overall worst-case O(n³)  
  => For practical input (n up to 16, 32, or similar by constraints), this runs fast; with large n, further optimizations (bitwise bucketing) are needed.

- **Space Complexity:**  
  - O(n) for parent, group sets.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you optimize scanning pairs where (nums[i] & nums[j]) == k more efficiently?  
  *Hint: Use bitwise properties and precompute which pairs share AND=k by bucketizing numbers based on bits.*

- Can you solve it for a very large n (10⁵+) within time bounds?  
  *Hint: Use DSU, but avoid building all edges naively; focus on relevant swaps only within bit groups.*

- What if the array is not a permutation, but can have duplicate numbers?  
  *Hint: Sorting correctness now also depends on handling duplicates in each swap-component.*

### Summary

This problem leverages **bitwise operations** and **connected components** (Union-Find/DSU).  
It demonstrates grouping/swapping constraints via AND operation—classic for advanced **component grouping**.  
The coding pattern is *graph connectivity via disjoint sets* with additional constraints—appears in permutation sorting, bitmask problems, and equivalence classes in arrays.  
Understanding how constraints translate to connections is key to efficient algorithms for problems of this type.

### Tags

### Similar Problems
