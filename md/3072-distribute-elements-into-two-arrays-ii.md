### Leetcode 3072 (Hard): Distribute Elements Into Two Arrays II [Practice](https://leetcode.com/problems/distribute-elements-into-two-arrays-ii)

### Description  
Given a **1-indexed** array `nums` of integers of length n, you must distribute all elements into two arrays `arr₁` and `arr₂` using the following rules, one element at a time in order:
- Step 1: Place `nums[1]` into `arr₁`.
- Step 2: Place `nums[2]` into `arr₂`.
- For each next value at position i (i ≥ 3):
  - Let `greaterCount(arr, val)` be the count of elements in `arr` strictly greater than `val`.
  - If `greaterCount(arr₁, nums[i])` > `greaterCount(arr₂, nums[i])`: add `nums[i]` to `arr₁`.
  - If `greaterCount(arr₁, nums[i])` < `greaterCount(arr₂, nums[i])`: add `nums[i]` to `arr₂`.
  - If equal, add to the smaller of the two arrays.
  - If sizes are equal, add to `arr₁`.
Finally, the output is all elements from `arr₁` followed by all elements from `arr₂`.

### Examples  

**Example 1:**  
Input: `nums = [2,3,1]`  
Output: `[2,1,3]`  
*Explanation:  
- Step 1: 2 → arr₁ = [2]  
- Step 2: 3 → arr₂ = [3]  
- Step 3:  
  greaterCount(arr₁, 1) = 1 (since 2 > 1)  
  greaterCount(arr₂, 1) = 1 (since 3 > 1)  
  Both are equal, array sizes: arr₁ = 1, arr₂ = 1 → tie, so add to arr₁ (per rule)  
- arr₁ = [2,1], arr₂ = [3]  
Result: [2,1,3]*

**Example 2:**  
Input: `nums = [5,6,7,4]`  
Output: `[5,7,6,4]`  
*Explanation:  
- Step 1: 5 → arr₁ = [5]  
- Step 2: 6 → arr₂ =   
- Step 3: 7:  
  greaterCount(arr₁, 7) = 0, arr₂ = 0  
  Tie, equal sizes → arr₁ gets 7  
  arr₁ = [5,7], arr₂ =   
- Step 4: 4  
  greaterCount(arr₁, 4) = 2 (5,7)  
  greaterCount(arr₂, 4) = 1 (6)  
  arr₁ has more, so arr₁ gets 4  
  arr₁ = [5,7,4], arr₂ =   
Result: [5,7,4,6]*

**Example 3:**  
Input: `nums = [4,9,3,6,8]`  
Output: `[4,3,8,9,6]`  
*Explanation:  
- Step 1: 4 → arr₁ = [4]  
- Step 2: 9 → arr₂ =   
- Step 3: 3  
  greaterCount(arr₁, 3) = 1 (4 > 3)  
  greaterCount(arr₂, 3) = 1 (9 > 3)  
  Tie, same sizes → arr₁ gets 3  
  arr₁ = [4,3]  
- Step 4: 6  
  greaterCount(arr₁, 6) = 0  
  greaterCount(arr₂, 6) = 1 (9 > 6)  
  arr₂: 1 > arr₁: 0 → arr₂ gets 6  
  arr₂ = [9,6]  
- Step 5: 8  
  greaterCount(arr₁, 8) = 0  
  greaterCount(arr₂, 8) = 1 (9 > 8)  
  arr₂: 1 > arr₁: 0 → arr₂ gets 8  
  arr₁ = [4,3], arr₂ = [9,6,8]  
But sizes: arr₁ = 2, arr₂ = 3 → should have gone to arr₁ if counts equal, but here arr₂ had more, so sequence correct.  
Result: [4,3,9,6,8]*

### Thought Process (as if you’re the interviewee)  
- The brute-force approach is to, for every number starting from index 3, count the strictly greater elements in both arrays at each step and make placement decisions as per the above rules.  
- This brute-force count is O(N²) since for every insert we need to scan all existing elements of both arr₁ and arr₂.
- To optimize, notice that we frequently need to count elements strictly greater than a value in a dynamic array.  
- We can use a Binary Indexed Tree (Fenwick Tree) or a Balanced BST (like bisect.insort in Python, though that’s library-specific, so would implement own version in interviews) to maintain sorted order and, for each number, quickly find how many existing numbers are strictly greater than it.
- Discretize `nums` so all values fit in a small range (compress values) and use BIT on that range for prefix/suffix sums.
- Each placement and query becomes O(log N), overall O(N log N) time.
- I would choose BIT (Fenwick Tree) with discretization since it's efficient and commonly used for such tasks.

### Corner cases to consider  
- All numbers are the same: e.g. [1,1,1,1,1]
- All numbers are strictly increasing or decreasing
- Only one element, or n = 2
- Ties after tie-breaking rules (arrays always have equal size?)
- Large n with small value range

### Solution

```python
def distributeElements(nums):
    # 1-indexed input, so insert dummy at index 0
    nums = [0] + nums
    n = len(nums) - 1

    # Discretize numbers for use with BIT
    value_set = sorted(set(nums[1:]))
    value_dict = {v: i+1 for i, v in enumerate(value_set)}  # 1-based indexing for BIT

    class BIT:
        def __init__(self, size):
            self.N = size + 2
            self.tree = [0] * (self.N)

        def update(self, i, v):
            while i < self.N:
                self.tree[i] += v
                i += (i & -i)
        def query(self, i):
            res = 0
            while i > 0:
                res += self.tree[i]
                i -= (i & -i)
            return res
        def query_greater(self, x):  # count of elements strictly greater than x
            idx = value_dict[x]
            return self.query(self.N-1) - self.query(idx)

    arr1 = []
    arr2 = []
    bit1 = BIT(len(value_set))
    bit2 = BIT(len(value_set))
    sz1 = 0
    sz2 = 0

    # Step 1: nums[1] to arr1
    arr1.append(nums[1])
    bit1.update(value_dict[nums[1]], 1)
    sz1 += 1

    if n >= 2:
        # Step 2: nums[2] to arr2
        arr2.append(nums[2])
        bit2.update(value_dict[nums[2]], 1)
        sz2 += 1

    for i in range(3, n+1):
        x = nums[i]
        g1 = bit1.query_greater(x)
        g2 = bit2.query_greater(x)
        if g1 > g2:
            arr1.append(x)
            bit1.update(value_dict[x], 1)
            sz1 += 1
        elif g2 > g1:
            arr2.append(x)
            bit2.update(value_dict[x], 1)
            sz2 += 1
        else:
            if sz1 < sz2:
                arr1.append(x)
                bit1.update(value_dict[x], 1)
                sz1 += 1
            elif sz2 < sz1:
                arr2.append(x)
                bit2.update(value_dict[x], 1)
                sz2 += 1
            else:
                arr1.append(x)
                bit1.update(value_dict[x], 1)
                sz1 += 1

    return arr1 + arr2
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N log N). Discretization is O(N log N). Each BIT update/query for n steps is log N.  
- **Space Complexity:** O(N) due to arrays, discretization map, and BITs sized by unique value count (≤ N).

### Potential follow-up questions (as if you’re the interviewer)  

- What if we need to support deletion or moving of elements between the arrays?  
  *Hint: Consider balanced BSTs or segment trees with dynamic operations.*

- How would you handle more than two arrays, or extend to k arrays?  
  *Hint: Generalize array selection, maybe lazy segment trees for each array.*

- Can this be parallelized or done in an online distributed manner?  
  *Hint: Which steps are independent, can you batch or process with locks?*

### Summary
This problem demonstrates how advanced prefix sum data structures (like Binary Indexed Trees) and discretization can turn a naive O(N²) solution into a fast O(N log N) algorithm, a common and sought-after interview pattern. The "greaterCount" query is equivalent to rank queries, which arise frequently in problems about order statistics, range queries, and dynamic ranking. Variants occur in competitive programming and in interview questions related to medians, order-statistics trees, and custom sortings.

### Tags
Array(#array), Binary Indexed Tree(#binary-indexed-tree), Segment Tree(#segment-tree), Simulation(#simulation)

### Similar Problems
- Split Array Largest Sum(split-array-largest-sum) (Hard)
- Divide Array Into Equal Pairs(divide-array-into-equal-pairs) (Easy)