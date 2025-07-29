### Leetcode 3312 (Hard): Sorted GCD Pair Queries [Practice](https://leetcode.com/problems/sorted-gcd-pair-queries)

### Description  
Given an integer array **nums** of length n and an integer array **queries**,  
let **gcdPairs** be the array formed by computing the GCD (Greatest Common Divisor) of every pair (nums[i], nums[j]) for all 0 ≤ i < j < n.  
Sort the **gcdPairs** array in ascending order.  
For each query index in **queries**, return the value at that index in the sorted **gcdPairs**.  
Return the results in an array.

### Examples  

**Example 1:**  
Input: `nums = [2, 3, 4]`, `queries = [0, 2, 2]`  
Output: `[1, 2, 2]`  
Explanation:  
gcdPairs = [gcd(2,3), gcd(2,4), gcd(3,4)] = [1, 2, 1].  
Sorted: [1, 1, 2].  
Result: [1 (index 0), 2 (index 2), 2 (index 2)].

**Example 2:**  
Input: `nums = [2, 4, 8]`, `queries = [0, 2, 3]`  
Output: `[2, 2, 2]`  
Explanation:  
gcdPairs = [gcd(2,4), gcd(2,8), gcd(4,8)] = [2, 2, 4].  
Sorted: [2, 2, 4].  
queries = [0,2,3]:  
- queries = 2 (index 0), queries[1] = 2 (index 2), queries[2] = Out of bounds (if queries are always valid, skip this check here).

**Example 3:**  
Input: `nums = [6, 12, 15]`, `queries = [1, 2]`  
Output: `[3, 6]`  
Explanation:  
gcdPairs = [gcd(6,12), gcd(6,15), gcd(12,15)] = [6, 3, 3].  
Sorted: [3, 3, 6].  
So, answer = [3 (index 1), 6 (index 2)].

### Thought Process (as if you’re the interviewee)  
To solve this, first think of the brute-force approach:
- For every pair (i, j) with 0 ≤ i < j < n, compute the GCD of nums[i] and nums[j].
- Collect all these values into an array.
- Sort the array.
- For each query, pick out the value at the requested index.

This is O(n²) for generating all pairs and O(n² log n²) for sorting if n is large. For each query, lookup is O(1).

**Optimization:**  
Can we do better than O(n²)?  
- Observing that many GCD values repeat. If nums has small values with many divisors, there will be a lot of repeats.
- By counting pair frequencies for each possible GCD more cleverly, perhaps we can generate the sorted list without materializing all pairs.
- For all potential GCD values d, count pairs having GCD=d by inclusion-exclusion, scanning all multiples of d.
- Store for each d, the number of pairs whose GCD is d.
- Build the sorted array by writing d the required number of times for each d.

**Final approach:**  
- For each possible GCD d (from max down to 1), count the number of nums that are multiples of d.
- The number of pairs: cnt of d × (cnt of d - 1) // 2, but must *subtract* counts of higher GCD multiples (to avoid overcounting pairs with GCD=kd for k>1).
- This idea is based on Möbius inversion and modified sieve.

### Corner cases to consider  
- nums is empty or contains only 1 element (no pairs).
- queries are out of possible index range (should assume valid query input).
- nums with all equal elements (all GCDs equal to that number).
- nums with large elements/duplicates.
- nums with coprime values (all GCD=1).
- nums includes 0 (normally 0 is not included, but GCD(0,n)=n).

### Solution

```python
def gcd(a, b):
    # Compute GCD using Euclidean algorithm
    while b:
        a, b = b, a % b
    return a

def sortedGcdPairQueries(nums, queries):
    n = len(nums)
    max_num = max(nums)
    freq = [0] * (max_num + 1)

    # Count occurrences for each value in nums
    for num in nums:
        freq[num] += 1

    # Count multiples: count[d] = number of nums divisible by d
    count = [0] * (max_num + 1)
    for d in range(1, max_num + 1):
        for k in range(d, max_num + 1, d):
            count[d] += freq[k]

    # gcount[d]: number of pairs whose GCD is exactly d
    gcount = [0] * (max_num + 1)
    for d in range(max_num, 0, -1):
        total = count[d] * (count[d] - 1) // 2  # all pairs with both divisible by d
        m = 2 * d
        # subtract higher multiples (to avoid overcounting)
        k = 2
        while m <= max_num:
            total -= gcount[m]
            k += 1
            m = k * d
        gcount[d] = total

    # Build the sorted GCD pair array (ascending order)
    gcd_pairs = []
    for d in range(1, max_num + 1):
        gcd_pairs.extend([d] * gcount[d])

    # Answer queries
    result = []
    for idx in queries:
        result.append(gcd_pairs[idx])
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + max(nums) log max(nums)).  
  - Counting multiples is O(n log max_num).
  - Main loops run up to max(nums) times (much better if n is small, or values are small).
  - Building the pairs list is O(number of pairs) which is O(n²) in the worst case.

- **Space Complexity:** O(max(nums)) for count arrays, and O(n²) for output if there are many pairs.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle updates to the nums array and process queries online?  
  *Hint: Think about data structures for dynamic range and factor queries.*

- What if, instead of all pairs, you only had to compute GCDs for pairs within specific sliding windows?  
  *Hint: Consider pre-processing for window queries, possibly with segment trees.*

- Can you answer, for a given GCD d, how many pairs have GCD exactly d, efficiently for multiple d's?  
  *Hint: Keep track of counts and use inclusion-exclusion or Moebius inversion.*

### Summary
This problem is a mix of **math (divisors, GCD, frequency sieve)** and **range query** patterns. The optimized solution avoids brute-force O(n²) by using frequency counting for multiples and careful subtraction for exact GCD counting. This pattern is common in divisor-related problems and can be seen in inclusion-exclusion, sieve algorithms, and advanced counting combinatorics.