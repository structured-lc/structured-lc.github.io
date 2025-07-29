### Leetcode 280 (Medium): Wiggle Sort [Practice](https://leetcode.com/problems/wiggle-sort)

### Description  
Given an unsorted integer array, reorder it **in-place** so that it alternates between up and down:  
nums ≤ nums[1] ≥ nums[2] ≤ nums[3] ≥ nums[4] ...  
That is, even indices should be smaller or equal to the following odd index, and odd indices should be greater or equal to the following even index.  
For example, after wiggle sort, the array may look like `[1, 4, 2, 5, 3, 6]`.  
The order is not unique—multiple valid wiggle arrays may exist for the same input.

### Examples  

**Example 1:**  
Input: `[3, 5, 2, 1, 6, 4]`  
Output: `[3, 5, 1, 6, 2, 4]`  
*Explanation:  
- 3 ≤ 5, 5 ≥ 1, 1 ≤ 6, 6 ≥ 2, 2 ≤ 4. Each adjacent pair fits the wiggle order.*

**Example 2:**  
Input: `[6, 7, 2, 4, 5]`  
Output: `[6, 7, 2, 5, 4]`  
*Explanation:  
- 6 ≤ 7, 7 ≥ 2, 2 ≤ 5, 5 ≥ 4. One of many valid outputs.*

**Example 3:**  
Input: `[1, 1, 1, 1]`  
Output: `[1, 1, 1, 1]`  
*Explanation:  
- All values are equal; any ordering will satisfy the wiggle sort conditions.*

### Thought Process (as if you’re the interviewee)  

First, I clarify that "wiggle sort" requires alternating ≤ and ≥ between adjacent elements, starting with ≤ at index 0.

**Brute-force:**  
Sort the array and then try to interleave the halves, but that's unnecessarily complex and doesn't match the problem constraints—in fact, a full sort is not needed and would waste time.

**Optimized greedy approach:**  
Iterate from left to right with only local swaps:
- For each index `i` (0 to n-2):
    - If `i` is even and nums[i] > nums[i+1], swap nums[i] and nums[i+1].
    - If `i` is odd and nums[i] < nums[i+1], swap nums[i] and nums[i+1].

This works because at every step, only one pair needs to be fixed to ensure local compliance. No previous swaps break earlier invariants, so a single linear scan is enough[1][2][3][4].  
It avoids extra memory and sorting.

**Why this works:**  
By repeatedly enforcing the "up" and "down" constraints locally, the whole array fits the wiggle property from left to right.

### Corner cases to consider  
- Empty array `[]`
- Array with one element `[a]`
- Already wiggle-sorted input `[1,4,2,5,3]`
- All elements equal `[1,1,1,1]`
- Arrays of odd/even length
- Descending or ascending sorted input `[6,5,4,3]`, `[1,2,3,4]`

### Solution

```python
def wiggleSort(nums):
    # Iterate through the array, up to n-2
    for i in range(len(nums) - 1):
        # For even index, enforce nums[i] ≤ nums[i+1]
        if i % 2 == 0:
            if nums[i] > nums[i+1]:
                nums[i], nums[i+1] = nums[i+1], nums[i]
        # For odd index, enforce nums[i] ≥ nums[i+1]
        else:
            if nums[i] < nums[i+1]:
                nums[i], nums[i+1] = nums[i+1], nums[i]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) because we make a single pass through the array, comparing and possibly swapping adjacent pairs only once each.
- **Space Complexity:** O(1) since it modifies the original array in place; no extra storage is needed.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you wiggle sort if duplicate values are not allowed for strict inequalities?  
  *Hint: Adjust conditions to use `<` or `>` instead of `≤` or `≥`.*

- What if you needed to return all possible valid wiggle sort permutations?  
  *Hint: Think backtracking or permutation generation with constraints.*

- How would you wiggle sort a singly linked list in O(1) space?  
  *Hint: The approach is similar; use pointer swaps without extra memory.*

### Summary
This problem uses a **greedy in-place single-pass pattern** where local swaps guarantee the global alternating order. It avoids unnecessary sorting or memory use.  
This pattern is widely applicable when only a local-enforcement of invariants suffices for global correctness, such as for alternating peaks/valleys, “zig-zag” traversals, or locally sorted intervals.