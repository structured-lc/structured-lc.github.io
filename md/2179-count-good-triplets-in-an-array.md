### Leetcode 2179 (Hard): Count Good Triplets in an Array [Practice](https://leetcode.com/problems/count-good-triplets-in-an-array)

### Description  
You are given two 0-indexed arrays, **nums1** and **nums2**, each of length n and both being permutations of the integers from 0 to n-1.  
A **good triplet** is a set of three distinct values (x, y, z) such that the indices of these values occur in **increasing order** in both nums1 and nums2. That is, if you look up the index of x, y, z in nums1 and likewise in nums2, both should satisfy:  
pos₁₍ₓ₎ < pos₁₍ᵧ₎ < pos₁₍𝓏₎  
pos₂₍ₓ₎ < pos₂₍ᵧ₎ < pos₂₍𝓏₎  
Return the total number of such good triplets.

### Examples  

**Example 1:**  
Input: `nums1 = [4,0,1,3,2]`, `nums2 = [4,1,0,2,3]`  
Output: `4`  
Explanation:  
The 4 good triplets are (4,0,3), (4,0,2), (4,1,3), and (4,1,2).

**Example 2:**  
Input: `nums1 = [1,0,2]`, `nums2 = [1,2,0]`  
Output: `0`  
Explanation:  
No good triplets exist since there’s no triple whose positions in both arrays are strictly increasing.

**Example 3:**  
Input: `nums1 = [0,1,2]`, `nums2 = [0,1,2]`  
Output: `1`  
Explanation:  
Only one triplet: (0,1,2).

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  - Try all possible triplets (x, y, z) such that 0 ≤ x < y < z < n.
  - For each triplet, get their positions in nums1 and nums2, and check if positions have increasing order.
  - This approach is O(n³) and will time out for larger n.

- **Optimize:**  
  - Notice that both arrays are permutations, so every value from 0 to n-1 appears exactly once in each array.
  - Fix y as the middle value, and try to count how many x and z satisfy the order conditions relative to y.
  - If for value y (acting as the middle), count how many values less than y are before it in both arrays, and how many after.
  - Formulate this as: for each y, the answer is left × right, where
    - left = count of values before y in both arrays (i.e., appear before y in both nums1 and nums2)
    - right = count of values after y in both arrays.

- **Efficient Counting:**  
  - Since we need to efficiently count number of smaller indices less/greater than current for two arrays, we can use a **Binary Indexed Tree (Fenwick Tree)**.
  - Map elements to their indices in nums2.
  - Go through nums1 in order, and for each y at index i, count how many elements before i (in nums1) have an index in nums2 less than nums2's current index (can be queried/updated using BIT).
  - Similarly, for right, reverse iterate to count elements after i.
  - For each y, multiply left × right and sum.

- **Choice:**  
  - Fenwick Tree or Segment Tree is optimal here due to the efficient range sum and update capabilities (O(log n) per operation).
  - This brings the overall complexity to O(n log n), which is acceptable.

### Corner cases to consider  
- n < 3 (no triplets possible)
- Identically ordered arrays (only one triplet exists)
- Reversed arrays (no triplet possible)
- Arrays of length exactly 3 (single possible triplet)
- Arbitrary permutations (should not assume any order)

### Solution

```python
def countGoodTriplets(nums1, nums2):
    n = len(nums1)
    # Map value to index in nums2 for O(1) lookup.
    pos2 = [0] * n
    for i, v in enumerate(nums2):
        pos2[v] = i

    # BIT/Fenwick tree helpers.
    class BIT:
        def __init__(self, n):
            self.tree = [0] * (n + 2)
            self.n = n + 2

        # Increase the value at position i by delta (1 for insert).
        def update(self, i, delta):
            i += 1 # 1-based index
            while i < self.n:
                self.tree[i] += delta
                i += i & -i

        # Query sum of values in [0, i)
        def query(self, i):
            res = 0
            while i > 0:
                res += self.tree[i]
                i -= i & -i
            return res

    # Calculate left count (prefix) for each y.
    left_bit = BIT(n)
    left_count = [0] * n
    for i in range(n):
        y = nums1[i]
        idx2 = pos2[y]
        left_count[y] = left_bit.query(idx2)
        left_bit.update(idx2, 1)

    # Calculate right count (suffix) for each y.
    right_bit = BIT(n)
    right_count = [0] * n
    for i in reversed(range(n)):
        y = nums1[i]
        idx2 = pos2[y]
        right_count[y] = right_bit.query(n) - right_bit.query(idx2 + 1)
        right_bit.update(idx2, 1)

    # For each y, number of good triplets with y as the middle:
    ans = 0
    for y in range(n):
        ans += left_count[y] * right_count[y]
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  - Two passes through nums1 (forward and backward), each updates and queries the BIT for each element (O(log n)).
  - The final loop to compute the answer is O(n).

- **Space Complexity:** O(n)  
  - O(n) for position mapping, left and right count arrays, and the Fenwick Trees.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the arrays are not permutations?  
  *Hint: Duplicates would require counting equal values and handling multiple occurrences.*

- Can you solve it for k-length tuples, not just triplets?  
  *Hint: Can the BIT or segment tree logic be generalized? Think dynamic programming using prefix counts for k dimensions.*

- Could you do better than O(n log n)?  
  *Hint: Consider restriction to special patterns, or more restrictive cases (e.g., sorted arrays).*

### Summary
This problem is a classic application of **coordinate compression + range query (Fenwick Tree/BIT)** pattern, commonly used for efficiently counting pairs or triplets with ordering constraints in permutations. The main technique generalizes to problems where you need to count increasing subsequence-like objects efficiently. You may see this technique in other combinatorial counting problems on permutations or arrays with unique elements.