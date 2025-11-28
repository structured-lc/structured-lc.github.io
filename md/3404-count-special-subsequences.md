### Leetcode 3404 (Medium): Count Special Subsequences [Practice](https://leetcode.com/problems/count-special-subsequences)

### Description  
Given an array of positive integers `nums`, a **special subsequence** is a subsequence of length 4 defined by indices \(p < q < r < s\) (with at least one index between each: \(q-p>1\), \(r-q>1\), \(s-r>1\)), such that:
- nums[p] × nums[r] == nums[q] × nums[s]
Count the number of unique special subsequences in `nums`.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3,4,3,6,1]`  
Output: `1`  
Explanation: There is one special subsequence: indices `(0,2,4,6)` = (1,3,3,1).
- 1 × 3 = 3, 3 × 1 = 3

**Example 2:**  
Input: `nums = [2,4,8,4,8,16,2,8]`  
Output: `2`  
Explanation: Two valid (p,q,r,s) found by checking all valid quadruplets with required gaps and the given product relation.

**Example 3:**  
Input: `nums = [4,8,15,16,23,42]`  
Output: `0`  
Explanation: There are no quadruples (p, q, r, s) (with the necessary distances) satisfying nums[p] × nums[r] == nums[q] × nums[s].

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Check all quadruples (p, q, r, s) with required index gaps, verify the product condition. This is O(n⁴) and infeasible for large n.
- **Optimization:** Note the index separation constraints (at least one index between each). The equation nums[p] × nums[r] == nums[q] × nums[s] can be reframed as (nums[p] / nums[q]) == (nums[s] / nums[r]).
- **Efficient approach:**  
  - Fix r from 2 to n-3. For each (r,s) pair with s ≥ r+2, calculate (nums[s], nums[r]) ratio in reduced form.
  - For each earlier (p, q) (p < q < r, q ≥ p+2), calculate (nums[p], nums[q]) ratio in reduced form, and store counts in a dictionary.
  - For each (r,s) pair, add to answer the count of earlier matching (p, q) ratios.
- **Trade-offs:** This reduces complexity substantially: O(n³) naive, improved to ~O(n² log(max_num)) with good hashing and pair tracking.

### Corner cases to consider  
- Empty array → output 0
- Not enough elements (< 4) → output 0
- Duplicate values, all values same
- Arrays with no quadruple having the required index distance
- Large arrays, modulo required if answer grows (mod 10⁹+7, if specified)
- Numbers with large GCDs or ratios

### Solution

```python
from collections import defaultdict
from math import gcd

def countSpecialSubsequences(nums):
    n = len(nums)
    # Store occurrence of ratio (a, b) for (p, q) with p < q < r, q ≥ p+2
    ratio_count = defaultdict(int)
    ans = 0

    # Loop for r from 2 to n-3 so s can be at least r+2
    for r in range(2, n - 2):
        # For each (p, q) left of r with q at least p+2
        for q in range(1, r - 0):
            p = q - 2
            while p >= 0:
                a, b = nums[p], nums[q]
                g = gcd(a, b)
                ratio_count[(a // g, b // g)] += 1
                p -= 1

        # For each s ≥ r+2
        for s in range(r + 2, n):
            a, b = nums[s], nums[r]
            g = gcd(a, b)
            key = (a // g, b // g)
            ans += ratio_count.get(key, 0)
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n² log A),  
  where n is the array length and A is the max number in nums (for GCD). The main reason is that for each r we consider all (p, q) before and all (s, r) after; for each, we do a GCD (logA).
- **Space Complexity:** O(n²),  
  due to ratio count storage for all possible (p, q) pairs and their reduced ratios.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you adapt the approach if the subsequence length changes to 5 or k?  
  *Hint: What about generalizing the ratio mapping and index gap rules?*

- Could you optimize further if additional constraints on the elements or array length are given?  
  *Hint: Is there a property of the sequence or its max value that could help?*

- If the numbers are large (≥10⁹), how can you handle the GCD computations efficiently?  
  *Hint: Use built-in GCD or modular techniques, and be careful with overflows.*

### Summary
This is a classic **hashmap/dictionary and math pattern** with careful enumeration and ratio reduction. Similar techniques arise in fraction comparison, quadruple counting, and advanced sequence matching. The mapping from mathematical relations to counting structures is the key part, and modularity in counting applies for large results. This pattern also generalizes to subarray or tuple property counting in more complex sequence and graph problems.


### Flashcard
Fix middle indices (r, s) with s ≥ r + 2, then count pairs (p, q) where p < q < r and nums[p] × nums[r] == nums[q] × nums[s] using a hash map.

### Tags
Array(#array), Hash Table(#hash-table), Math(#math), Enumeration(#enumeration)

### Similar Problems
- Max Points on a Line(max-points-on-a-line) (Hard)