### Leetcode 2862 (Hard): Maximum Element-Sum of a Complete Subset of Indices [Practice](https://leetcode.com/problems/maximum-element-sum-of-a-complete-subset-of-indices)

### Description  
Given a 1-indexed array of integers `nums`, select a "complete subset" of indices (1-based) such that for every pair of indices \(i, j\) in the subset, \(i \times j\) is a perfect square. Return the **maximum possible sum** of the elements corresponding to a complete subset.  
A subset containing one index is always complete. The challenge is to find the subset(s) that maximize the sum.

### Examples  

**Example 1:**  
Input: `nums = [8,7,3,5,7,2,4,9]`  
Output: `16`  
*Explanation: Select indices 2 and 8 (nums[2]=7, nums=9). 2 × 8 = 16, which is a perfect square. No larger complete subset exists with a higher sum.*

**Example 2:**  
Input: `nums = [8,10,3,8,1,13,7,9,4]`  
Output: `20`  
*Explanation: Select indices 1, 4, and 9 (nums[1]=8, nums[4]=8, nums=4). All pairs (1×4=4, 1×9=9, 4×9=36) give perfect squares, so the sum is 8+8+4=20.*

**Example 3:**  
Input: `nums = [1,2,3,4,5]`  
Output: `5`  
*Explanation: Only single elements form complete subsets. The maximum is 5.*

### Thought Process (as if you’re the interviewee)  
- **First, brute force:**  
  - Try all possible subsets, check if every pair (i,j) has i×j as a perfect square, then sum the elements.  
  - This is infeasible due to exponential subset count and repeated checking.

- **Pattern discovery:**  
  - The core requirement: for all i, j selected, i×j should always be a perfect square.
  - Note that for a subset, the product of any two indices must share certain mathematical structure.

- **Mathematical insight:**  
  - If all chosen indices differ by multiplication with perfect squares, they all have the same *square-free part*.  
    (The "square-free part" is what remains after removing all squared prime factors from a number.)

  - So, group indices by their square-free part. Any subset that consists of indices all with the same square-free part is complete—their pairwise product will always be a perfect square.

- **Algorithm:**  
  - For each index (1-based), compute its square-free part.
  - For each group of indices sharing the same square-free part, sum their corresponding nums values.
  - The answer is the maximum sum among all groups.

- **Why this works:**  
  - Any set with mixed square-free parts will produce products that are not perfect squares for some pairs.
  - This grouping collapses the problem to a single scan.

### Corner cases to consider  
- Single element arrays (subset is just that element).
- All numbers are the same.
- Only one group forms the maximum subset—all others are size 1.
- Arrays of size up to 10⁴, so efficiency is critical.
- Indices with square-free part 1 (perfect squares).
- Large gaps or clustering of square-free classes.

### Solution

```python
def maximumSum(nums):
    # Helper: Calculate the square-free part of an integer
    def squareFreePart(x):
        res = 1
        d = 2
        while d * d <= x:
            cnt = 0
            while x % d == 0:
                x //= d
                cnt += 1
            if cnt % 2 == 1:
                res *= d
            d += 1
        if x > 1:
            res *= x
        return res

    from collections import defaultdict

    group_sum = defaultdict(int)
    n = len(nums)
    # 1-based index
    for i in range(1, n + 1):
        sf = squareFreePart(i)
        group_sum[sf] += nums[i - 1]  # nums is 0-based

    return max(group_sum.values())
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - For each index 1 to n, compute square-free part (O(√i) for each, worst-case O(n√n) overall but much faster in practice for reasonable n).
  - Building group sums is O(n).
  - Max lookup is O(k), where k = number of unique square-free parts (≤ n).
  - Overall: *approximately* O(n√n) in the worst case.

- **Space Complexity:**  
  - O(n) for storing group sums and some intermediate values.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle much larger input sizes (n > 10⁶)?  
  *Hint: Can you optimize the computation of square-free parts, e.g., with a sieve for all possible indices?*

- What if some indices can be zero or negative?  
  *Hint: How does this affect square-free decomposition?*

- How to reconstruct which indices made up the optimal group?  
  *Hint: Remember the indices for each square-free part during grouping.*

### Summary
The solution relies on **number theory grouping**: every valid complete subset consists of indices with the same square-free part. The core coding pattern is *group-by-invariant*, a very useful technique for problems with pairwise constraints tied to a mathematical property. This pattern can be applied to similar subset-selection problems involving products, GCDs, or group-theoretic symmetry.


### Flashcard
Only subsets of indices that are all perfect squares times a fixed base are valid; group indices by square-free part and sum the largest group.

### Tags
Array(#array), Math(#math), Number Theory(#number-theory)

### Similar Problems
- Constrained Subsequence Sum(constrained-subsequence-sum) (Hard)
- Maximum Alternating Subsequence Sum(maximum-alternating-subsequence-sum) (Medium)