### Leetcode 2333 (Medium): Minimum Sum of Squared Difference [Practice](https://leetcode.com/problems/minimum-sum-of-squared-difference)

### Description  
Given two 0-indexed integer arrays **nums1** and **nums2** (length **n**), you can increment or decrement any element in **nums1** up to **k1** times, and any element in **nums2** up to **k2** times (by ±1 per move). The goal is to **minimize the sum of squared differences**:  
Sum = ∑ (nums1[i] - nums2[i])² for all 0 ≤ i < n.  
You can apply your allowed modifications in any way across the arrays to achieve the minimum sum. Modifications on any entry, including making numbers negative, are allowed.

### Examples  

**Example 1:**  
Input: `nums1 = [1, 2, 3], nums2 = [2, 2, 3], k1 = 1, k2 = 0`  
Output: `0`  
*Explanation: Modify nums1 from 1 to 2 (using 1 move). Now arrays are identical, so all diffs are 0 and the sum is 0.*

**Example 2:**  
Input: `nums1 = [1,4,10,12], nums2 = [5,8,6,9], k1 = 1, k2 = 1`  
Output: `43`  
*Explanation:  
One optimal way:  
- Increase nums1 once → [2,4,10,12].  
- Increase nums2[2] once → [5,8,7,9].  
Final diffs: [3,4,3,3].  
Sum: 3² + 4² + 3² + 3² = 9 + 16 + 9 + 9 = 43.*

**Example 3:**  
Input: `nums1 = [1, 2], nums2 = [3, 4], k1 = 0, k2 = 0`  
Output: `8`  
*Explanation: No modifications allowed.  
Diffs: [2, 2].  
Sum: 2² + 2² = 4 + 4 = 8.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Consider all possible ways to allocate the modification moves across all diffs, decrementing each difference as much as possible. But this is combinatorial and not tractable for large arrays.

- **Key insight:**  
  Since squared values penalize big differences, we should always try to reduce the largest absolute differences first. This greedy approach (always reduce the largest remaining gap) will minimize the sum.

- **Efficient solution:**  
  1. Compute all absolute differences: d[i] = |nums1[i] - nums2[i]|  
  2. We have k = k1 + k2 total modification steps to use.  
  3. At each step, decrement the largest d[i] by 1 (until it is zero, then move to next largest).  
  4. Rather than literally simulate k decrements, realize we can use a frequency counter and work from the maximum down (heap or counting sort idea for speed).  
  5. When all moves used up or all differences are reduced to zero, compute the sum ∑ d[i]².

  This greedy reduction is optimal due to the convex nature of x² (reducing a large difference by 1 gives more gain than reducing a small one).

  For very large n and k, use a counting array for the frequencies of each diff value (since diff is at most max(nums1[i], nums2[i])) for efficiency.

### Corner cases to consider  
- All differences already 0, and k > 0: Output is 0.
- k1 + k2 > sum of all diffs: Output is 0 (can reduce all to zero).
- k1 = k2 = 0: No changes allowed.
- Arrays with 1 element.
- Arrays with very large values.
- Moves can drive numbers negative (allowed).
- Empty arrays (but per constraints, n ≥ 1).

### Solution

```python
def minSumSquareDiff(nums1, nums2, k1, k2):
    # Step 1: Calculate the absolute differences for each index
    from collections import Counter

    n = len(nums1)
    diffs = [abs(a-b) for a, b in zip(nums1, nums2)]
    max_diff = max(diffs)
    freq = [0] * (max_diff + 1)  # freq[d] = how many diffs have value d
    for d in diffs:
        freq[d] += 1

    k = k1 + k2  # total number of moves we can perform
    for d in range(max_diff, 0, -1):
        if freq[d] == 0:
            continue
        moves = min(freq[d], k)
        decrease_amt = min(freq[d], k)  # number of diff d's we can reduce by 1
        if k >= freq[d]:
            freq[d-1] += freq[d]
            k -= freq[d]
            freq[d] = 0
        else:
            freq[d] -= k
            freq[d-1] += k
            k = 0
            break

    # Now compute the sum of squared differences
    result = 0
    for d in range(len(freq)):
        result += freq[d] * (d * d)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + D), where D = max difference in diff array, usually up to 10⁵ (fast for given constraints).  
  - O(n) for calculating diffs, O(D) for frequency array operations.
- **Space Complexity:** O(D) for frequency array, plus O(n) for diffs (if not done in-place).

### Potential follow-up questions (as if you’re the interviewer)  

- What if only nums1 can be changed (k2 = 0)?
  *Hint: Only apply all modifications to the diffs caused by nums1.*

- What is the effect if the cost of increasing vs decreasing is different?  
  *Hint: The greedy reduction needs to balance based on cost. Try to always apply the cheaper operation first.*

- Can you output which numbers were changed and how?
  *Hint: Track the indices where you allocate each decrement. Requires more bookkeeping.*

### Summary
This problem utilizes the **greedy reduction** pattern: always reduce the largest contributor to a convex cost function (here x²) first, since decreasing the largest difference by 1 has the most impact. This is a classic example of greedy + counting/frequency array optimization—this pattern appears in **minimizing variances**, **heap-like job scheduling**, and **cost minimization** when single-step moves have additive effects.

### Tags
Array(#array), Binary Search(#binary-search), Greedy(#greedy), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue)

### Similar Problems
- Minimum Absolute Sum Difference(minimum-absolute-sum-difference) (Medium)
- Partition Array Into Two Arrays to Minimize Sum Difference(partition-array-into-two-arrays-to-minimize-sum-difference) (Hard)