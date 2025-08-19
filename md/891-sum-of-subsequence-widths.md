### Leetcode 891 (Hard): Sum of Subsequence Widths [Practice](https://leetcode.com/problems/sum-of-subsequence-widths)

### Description  
Given an array of integers, you must return the sum of the widths of all **non-empty subsequences**.  
- The **width** of a subsequence is the difference between its maximum and minimum element.
- Since the number of subsequences grows exponentially, you need an efficient method without generating all of them.
- The final answer should be given modulo 10⁹ + 7.

### Examples  

**Example 1:**  
Input: `[2,1,3]`  
Output: `6`  
*Explanation:  
Subsequences and their widths:  
- [1] → 0  
- [2] → 0  
- [3] → 0  
- [2,1] → 1  
- [2,3] → 1  
- [1,3] → 2  
- [2,1,3] → 2  
The total sum: 0+0+0+1+1+2+2 = 6.*

**Example 2:**  
Input: `[1,2,3,4]`  
Output: `23`  
*Explanation:  
All non-empty subsequences' widths sum up to 23.*

**Example 3:**  
Input: ``  
Output: `0`  
*Explanation:  
Only one subsequence: . Width is 0.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Find all subsequences, compute width (max - min), and sum them.  
  But this is not practical since number of subsequences is 2ⁿ, which is too slow for n up to 20,000.

- **Optimized idea:**  
  Notice that for each subsequence, we care only about the contribution of the max and min element.

  Let's sort the array (`A`) so that A ≤ A[1] ≤ ... ≤ A[n-1].

  For element at index i:
  - It will be the **maximum** in 2ⁱ subsequences (can choose any subset of 0..i-1 as "smaller" elements).
  - It will be the **minimum** in 2ⁿ⁻ⁱ⁻¹ subsequences (can choose any subset of i+1..n-1 as "larger" elements).

  So, it's total contribution is:  
  A[i] × 2ⁱ (as max) − A[i] × 2ⁿ⁻ⁱ⁻¹ (as min).

  Sum this for all i.

- **Tradeoffs:**  
  Sorting is O(n log n), and computing powers-of-two is O(n) with pre-computation.

  This avoids exponential time by computing individual contributions.

### Corner cases to consider  
- Array of length 1 (single element)
- All elements equal (width should always be 0)
- Some elements repeated
- Large numbers (overflow, so use modulo)
- Empty array is not possible (per constraints)

### Solution

```python
MOD = 10**9 + 7

def sumSubseqWidths(A):
    n = len(A)
    A.sort()

    # Precompute all powers of 2 up to n-1 under modulo
    pow2 = [1]
    for _ in range(n - 1):
        pow2.append(pow2[-1] * 2 % MOD)

    ans = 0
    for i in range(n):
        # Contribution: A[i] * (2^i as max) - A[i] * (2^(n-i-1) as min)
        max_contrib = A[i] * pow2[i] % MOD
        min_contrib = A[i] * pow2[n - i - 1] % MOD
        ans = (ans + max_contrib - min_contrib) % MOD

    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)
  - Sorting takes O(n log n)
  - Precomputing powers O(n)
  - Single loop through array O(n)

- **Space Complexity:** O(n)
  - For power-of-two precomputation array

### Potential follow-up questions (as if you’re the interviewer)  

- If the input array could have negative numbers, would the approach change?
  *Hint: Try small examples by hand — see if formula still correctly tracks minimum/maximum contributions!*

- Can you solve the problem if only subsequences of a particular length k are counted?
  *Hint: Try using combinations with fixed size subsequences; there may be a binomial pattern.*

- How would this solution change if asked about the sum of products of min and max for all subsequences?
  *Hint: Would the counting logic change? Explore similar pattern of separating out max/min roles.*

### Summary
- This problem uses the insight that each element’s role as min or max in various subsequences can be counted combinatorially using powers-of-two, avoiding brute force.
- Sorting the array simplifies the process of counting.
- The pattern of “element’s role as min vs. max in combinatorially different subsets” arises in various subset or combinatorial contribution problems, especially those involving sums across all subsets or subsequences.

### Tags
Array(#array), Math(#math), Sorting(#sorting)

### Similar Problems
