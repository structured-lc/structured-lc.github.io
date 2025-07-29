### Leetcode 2426 (Hard): Number of Pairs Satisfying Inequality [Practice](https://leetcode.com/problems/number-of-pairs-satisfying-inequality)

### Description  
You are given two integer arrays, `nums1` and `nums2`, of the same length `n`, and an integer `diff`.  
Your task is to count the number of index pairs (i, j) such that:  
- 0 ≤ i < j < n  
- `nums1[i] - nums1[j] ≤ nums2[i] - nums2[j] + diff`  
In other words, for each such pair, the difference in `nums1` at i and j must not exceed the difference in `nums2` at the same positions plus `diff`.

### Examples  

**Example 1:**  
Input: `nums1 = [3,2,5], nums2 = [2,2,1], diff = 1`  
Output: `3`  
Explanation:  
There are 3 valid pairs:  
- (0,1): 3-2 = 1 ≤ 2-2+1 = 1  
- (0,2): 3-5 = -2 ≤ 2-1+1 = 2  
- (1,2): 2-5 = -3 ≤ 2-1+1 = 2  

**Example 2:**  
Input: `nums1 = [2,1], nums2 = [1,2], diff = 0`  
Output: `0`  
Explanation:  
The only pair is (0,1): 2-1 = 1 ≤ 1-2+0 = -1 (false)

**Example 3:**  
Input: `nums1 = [1,2,3,4], nums2 = [2,2,2,2], diff = 1`  
Output: `6`  
Explanation:  
Every pair (0,1), (0,2), (0,3), (1,2), (1,3), (2,3) satisfies the required inequality, since nums2 is the same throughout and diff=1.

### Thought Process (as if you’re the interviewee)  
- Start with the brute-force way: For every possible pair (i,j) with i < j, check if the inequality holds. This is O(n²) and would time out for large n.
- Let's rewrite the condition:  
  nums1[i] - nums1[j] ≤ nums2[i] - nums2[j] + diff  
  ⇒ (nums1[i] - nums2[i]) ≤ (nums1[j] - nums2[j]) + diff  
  Let arr[k] = nums1[k] - nums2[k].
- The problem then becomes: Given arr and diff, count the number of pairs (i, j) with i < j and arr[i] ≤ arr[j] + diff.
- This is similar to counting reverse pairs or "smaller after self": Think merge sort, Binary Indexed Tree (BIT), or use SortedList/bisect (if allowed).
- By iterating from right to left, for each i, you count how many arr[j] (j > i) are ≥ arr[i] - diff (equivalently, arr[j] + diff ≥ arr[i]).
- We need a data structure to support: "How many already-seen arr[j] ≥ arr[i] - diff?" For this, use a Binary Indexed Tree or a Balanced BST, after value compression (since arr values can be negative and large).
- This brings the time down to O(n log n): value compression + n queries/updates.

### Corner cases to consider  
- Empty arrays (n = 0): should return 0.
- All equal elements in both arrays.
- diff = 0, diff negative, or large diff.
- nums1 and nums2 with negative elements.
- Only one element: should return 0 (since no valid pairs).
- Large input values, requiring value compression to avoid memory overflow.

### Solution

```python
def numberOfPairs(nums1, nums2, diff):
    # arr[i] = nums1[i] - nums2[i], reduce the problem to "pairs (i,j): arr[i] ≤ arr[j] + diff"
    arr = [a - b for a, b in zip(nums1, nums2)]

    # All possible arr[i], arr[i] - diff values, for coordinate compression
    all_vals = set(arr)
    all_vals.update(x - diff for x in arr)
    val_to_idx = {val: idx+1 for idx, val in enumerate(sorted(all_vals))}

    # Fenwick Tree (BIT) - 1-indexed; classic for nums ≤ 1e5, after compression
    class BIT:
        def __init__(self, size):
            self.n = size + 2
            self.tree = [0] * (self.n)

        def update(self, idx, delta):
            while idx < self.n:
                self.tree[idx] += delta
                idx += idx & -idx

        def query(self, idx):
            res = 0
            while idx > 0:
                res += self.tree[idx]
                idx -= idx & -idx
            return res

    bit = BIT(len(val_to_idx))
    count = 0
    # iterate from right to left to ensure j > i
    for num in reversed(arr):
        # For arr[i], count # of arr[j] ≥ arr[i] - diff
        q_idx = val_to_idx[num - diff]
        count += bit.query(len(val_to_idx)) - bit.query(q_idx - 1)
        # Insert arr[i] into BIT
        bit.update(val_to_idx[num], 1)
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n).  
  - O(n) to construct arr.
  - O(n log n) for sorting and coordinate compression.
  - Each update/query in BIT is O(log n), and there are O(n) such operations.

- **Space Complexity:** O(n)  
  - For arr, all_vals, and the BIT array (max 2n entries).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify your solution if the arrays were not the same length?  
  *Hint: Which indices would be paired; is the comparison still meaningful?*

- Can you do it without coordinate compression?  
  *Hint: What if values are very limited? Would a direct BIT/array work?*

- What if there are frequent updates/queries (online version)?  
  *Hint: Which data structures support logarithmic insertion and range queries?*

### Summary
This problem uses a common "count of pairs with a difference condition" pattern, closely related to reverse pair counting. The main coding techniques are coordinate compression and Binary Indexed Tree (BIT) or segment tree. This is a classic approach for competitive problems needing efficient query and update operations over compressed value ranges, applicable also in problems like inversion count, reverse pairs, or 2D range queries.