### Leetcode 3164 (Medium): Find the Number of Good Pairs II [Practice](https://leetcode.com/problems/find-the-number-of-good-pairs-ii)

### Description  
Given two integer arrays, **nums₁** and **nums₂**, and a positive integer **k**, find the total number of *good* pairs (i, j) such that **nums₁[i]** is divisible by **nums₂[j] × k**, where 0 ≤ i < n (length of nums₁), 0 ≤ j < m (length of nums₂).  
That is, count all (i, j) such that: `nums₁[i] % (nums₂[j] × k) == 0`.

### Examples  

**Example 1:**  
Input: `nums1 = [1, 3, 4]`, `nums2 = [1, 3, 4]`, `k = 1`  
Output: `5`  
*Explanation:  
The good pairs are (0,0), (1,0), (1,1), (2,0), and (2,2):  
- nums₁ = 1, 1 % (1×1) == 0  
- nums₁[1] = 3, 3 % (1×1) == 0  
- nums₁[1] = 3, 3 % (3×1) == 0  
- nums₁[2] = 4, 4 % (1×1) == 0  
- nums₁[2] = 4, 4 % (4×1) == 0  
*

**Example 2:**  
Input: `nums1 = [1,2,4,12]`, `nums2 = [2,4]`, `k = 3`  
Output: `2`  
*Explanation:  
The good pairs are (3,0) and (3,1):  
- nums₁[3] = 12, 12 % (2×3) == 0, 12 % (4×3) == 0  
*

**Example 3:**  
Input: `nums1 = [2,3,5]`, `nums2 = [10,6]`, `k = 2`  
Output: `0`  
*Explanation:  
There are no pairs where nums₁[i] is divisible by nums₂[j]×k.  
*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Check every possible pair (i, j), and simply test if `nums1[i] % (nums2[j] × k) == 0`.  
  Time complexity: O(n × m) which is feasible for small input, but can be slow for large arrays.

- **Optimized:**  
  The main observation: For each nums₁[i], count the number of nums₂[j] such that nums₂[j] divides nums₁[i] and (nums₁[i] % (nums₂[j] × k) == 0).  
  This is equivalent to: nums₂[j] divides (nums₁[i] / k).  
  Precompute, for all nums₁[i], the integer part q = nums₁[i] // k (only for those divisible by k).  
  For each such q, count the number of divisors of q that also appear in nums₂.  
  To do this efficiently:
    - Build a frequency count of nums₂.
    - For every nums₁[i], if divisible by k, let q = nums₁[i] // k. Enumerate all divisors d of q and, if d is present in nums₂, add its frequency to the answer.

- **Trade-off:**  
  - This approach dramatically improves efficiency, especially when k is small and q is not too large.  
  - Enumerating all divisors is O(√q) per nums₁[i], so total complexity is O(n × √max(nums₁[i])) — fast in practice for reasonable constraints.

### Corner cases to consider  
- nums₁ or nums₂ empty ⇒ answer is 0  
- k > max(nums₁) ⇒ no pair possible  
- Duplicate elements in nums₂  
- nums₁ contains elements not divisible by k  
- Large/small values for k  
- Single element in nums₁ or nums₂  
- All elements are 0 (divisibility by 0 is not allowed)

### Solution

```python
def countGoodPairs(nums1, nums2, k):
    # Step 1: Build frequency map for nums₂ for efficient divisor lookup.
    from collections import Counter
    num2_count = Counter(nums2)
    result = 0

    for num in nums1:
        # Step 2: Only consider nums₁[i] that is divisible by k
        if num % k != 0:
            continue
        q = num // k

        # Step 3: For each divisor d of q, if d in nums2, add its frequency.
        d = 1
        while d * d <= q:
            if q % d == 0:
                # If d is in nums₂, count all occurrences
                if d in num2_count:
                    result += num2_count[d]
                # If d and q//d are different and q//d in nums₂, count these as well
                if d != q // d and (q // d) in num2_count:
                    result += num2_count[q // d]
            d += 1

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × √max(nums₁[i]))  
  - For each nums₁[i], we enumerate all its divisors (up to √q).
  - Building the Counter for nums₂: O(m)
- **Space Complexity:** O(m)  
  - For the Counter for nums₂.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the range of nums₁ or nums₂ is very large?  
  *Hint: Is there a way to avoid maintaining a huge frequency table?*

- How would you handle negative numbers in nums₂?  
  *Hint: Carefully consider how divisors are enumerated for negative quotients.*

- If you could sort either nums₁ or nums₂, would it help improve runtime?  
  *Hint: Sorting might allow binary search or prefix sum tricks for range queries.*

### Summary
This problem is an application of the **Divisor Enumeration** pattern combined with a **hash map frequency lookup**. The optimized approach leverages number properties to move from brute-force O(n×m) to O(n×√max(nums₁[i])), allowing efficient counting of pairs based on divisibility relationships. Such techniques are widely useful in number theory and combinatorics-based problems, especially when direct pairwise iteration is too slow but a mathematical reformulation enables fast divisor checks.

### Tags
Array(#array), Hash Table(#hash-table)

### Similar Problems
- Count Array Pairs Divisible by K(count-array-pairs-divisible-by-k) (Hard)