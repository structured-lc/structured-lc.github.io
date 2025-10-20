### Leetcode 2382 (Hard): Maximum Segment Sum After Removals [Practice](https://leetcode.com/problems/maximum-segment-sum-after-removals)

### Description  
Given an array **nums** and an array **removeQueries** (both of length n), you remove elements from **nums** one by one at the indices specified in **removeQueries**. Each time you remove an element, the array may split into new segments of *consecutive, non-removed* elements; a *segment* is a run of adjacent, still-present elements. After each removal, report the **maximum sum among all segments**. Return this as an array for each step, in order of removal.  
You must answer efficiently even for large \( n \).

### Examples  

**Example 1:**  
Input:  
nums = `[1,2,5,6,1]`, removeQueries = `[0,3,2,4,1]`  
Output:  
`[14,7,2,1,0]`  
*Explanation:*
- Remove index 0: nums = `[0,2,5,6,1]` → segments: [2,5,6,1] sum = 14
- Remove index 3: nums = `[0,2,5,0,1]` → segments: [2,5], [1]; max = 7
- Remove index 2: nums = `[0,2,0,0,1]` → segments: [2], [1]; max = 2
- Remove index 4: nums = `[0,2,0,0,0]` → segment: [2]; max = 2
- Remove index 1: nums = `[0,0,0,0,0]` → no segment left; max = 0

**Example 2:**  
Input:  
nums = `[3,2,11,1]`, removeQueries = `[3,2,1,0]`  
Output:  
`[16,5,3,0]`  
*Explanation:*
- Remove idx 3: `[3,2,11,0]` → [3,2,11] sum = 16
- Remove idx 2: `[3,2,0,0]` → [3,2]; sum = 5
- Remove idx 1: `[3,0,0,0]` → [3]; sum = 3
- Remove idx 0: `[0,0,0,0]` → empty

**Example 3:**  
Input:  
nums = `[1]`, removeQueries = ``  
Output:  
``  
*Explanation:*
- Remove the only element, empty array → 0

### Thought Process (as if you’re the interviewee)  
- Start with brute force: after each removal, scan the entire array and sum each segment. But this is \( O(n^2) \), far too slow.
- Realize that adding/removing elements changes only the neighboring segments—might we process *in reverse*?
- Try *reversing* the removals: build the array from empty, re-adding indices in reverse of **removeQueries**, and after each addition, track which segment is updated and what is the new max segment sum.
- Use a Union-Find (Disjoint Set) structure:
  - Each number starts as a single "activated" cell with its own sum.
  - When a new element is added (from reverse-removal order), merge left/right segments if they exist.
  - After each add, update the running max of any segment sum.
- This brings time per operation to nearly \( O(\log n) \) or just a few operations because each merge is (amortized) near-constant.

Trade-offs:
- Union-Find is ideal here since we only ever join/merge at most 2 neighboring segments per step.
- We must use extra arrays to store segment sum, parent mapping, and find roots quickly.

### Corner cases to consider  
- Removing all elements: output always ends with 0.
- nums of length 1.
- All numbers equal (test merging).
- Remove produces multiple segments of same sum.
- nums with negatives or zeros (though constraint: 1 ≤ nums[i] ≤ 10⁹).
- Remove in order, reverse order, random order.

### Solution

```python
def maximumSegmentSum(nums, removeQueries):
    n = len(nums)
    result = [0] * n
    parent = [i for i in range(n)]
    seg_sum = [0] * n
    active = [False] * n
    max_sum = 0

    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    # process removals in reverse: treat as adds
    for ans_pos, idx in enumerate(reversed(removeQueries)):
        result[n - ans_pos - 1] = max_sum
        active[idx] = True
        seg_sum[idx] = nums[idx]

        # Merge with left
        if idx - 1 >= 0 and active[idx - 1]:
            l = find(idx - 1)
            parent[l] = idx
            seg_sum[idx] += seg_sum[l]
        # Merge with right
        if idx + 1 < n and active[idx + 1]:
            r = find(idx + 1)
            parent[r] = idx
            seg_sum[idx] += seg_sum[r]

        max_sum = max(max_sum, seg_sum[idx])
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n α(n)), where α(n) is inverse Ackermann, due to nearly constant time union-find operations—one per element. We process each removal (or "add") once, and merges are very fast.
- **Space Complexity:** O(n) - for the parent, seg_sum, active status, and result arrays.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you support splits in the middle (removal of more than one index at a time)?
  *Hint: You'd need to manage multiple segment boundaries and possibly an interval tree.*

- If negative nums[i] are allowed, how would your approach change?
  *Hint: You'd need to handle merging of segments that could reduce the max.*

- How would you extend this for add/remove queries in arbitrary order?
  *Hint: Consider dynamic segment/interval structures like balanced BST with segment sum annot.*

### Summary
This is a classic **disjoint-set (Union-Find) application**, tracking group sums as you add/merge back the elements.  
It’s a pattern for problems involving dynamic grouping of elements with fast aggregation: can be used in dynamic connectivity, range merging, and online interval management problems.  
Efficient segment sum maintenance with merges is the core trick.


### Flashcard
Process removals in reverse using Union-Find: add elements back, merging adjacent segments and tracking max segment sum after each addition.

### Tags
Array(#array), Union Find(#union-find), Prefix Sum(#prefix-sum), Ordered Set(#ordered-set)

### Similar Problems
