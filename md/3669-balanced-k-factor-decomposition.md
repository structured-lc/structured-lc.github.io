### Leetcode 3669 (Medium): Balanced K-Factor Decomposition [Practice](https://leetcode.com/problems/balanced-k-factor-decomposition)

### Description  
Given two integers n and k, split n into exactly k positive integers whose product is n. Return a possible decomposition such that the difference between the maximum and minimum of these k numbers is minimized.

Or, more simply:
- You must split n into exactly k strictly positive integers so that their product is exactly n.
- Among all possible such k-sets, output one where max - min is minimized.

### Examples  

**Example 1:**  
Input: `n = 12, k = 3`  
Output: `[2, 2, 3]`  
Explanation: Product is 2 \* 2 \* 3 = 12. Difference between max and min is 1. Other decompositions (e.g. [1,1,12]) have a larger difference.

**Example 2:**  
Input: `n = 16, k = 4`  
Output: `[2, 2, 2, 2]`  
Explanation: All elements are equal, min = max = 2, difference is 0.

**Example 3:**  
Input: `n = 18, k = 3`  
Output: `[2, 3, 3]`  
Explanation: Best balanced: product is 2 \* 3 \* 3 = 18, max - min = 1.

### Thought Process (as if you’re the interviewee)  
First, I recognize this is a constrained integer factorization: I need exactly k positive integers multiplying to n, with the balancing criterion.

- **Brute force:**  
  Try all possible (unordered) k-tuples whose product is n and pick the one with minimal max-min. This quickly becomes infeasible due to combinatorics for large n or k.

- **Observation:**  
  To minimize max-min, the numbers should be as "close" as possible. For an optimal solution, their values should not differ by more than 1.  
  This is like distributing n’s prime factors “as evenly as possible” among k numbers.

- **Approach:**
  1. Prime factorize n.
  2. Distribute the factors among k buckets as evenly as possible.
  3. For each bucket, take the product of every assigned factor to get each integer in the output.
  4. If not enough prime factors (i.e., n has fewer than k factors), pad with 1’s.

This guarantees that difference between max and min is minimized, since partitioning the factors as evenly as possible cannot be improved upon (if we make any two outputs differ by 2 or more, we could "swap" factors to balance them better).

- **Edge:**  
  If n = 1, the only possible output is k 1’s.

### Corner cases to consider  
- n = 1; k arbitrary (only possible: [1, 1, ..., 1])
- k = 1; should output [n]
- Not enough factors: output must use padded 1’s.
- n = prime; only way is [1, 1, ..., n]
- Large n; must maintain efficiency in prime factorization.

### Solution

```python
def balanced_k_factor_decomposition(n, k):
    # Step 1: Prime factorization of n
    def get_factors(x):
        factors = []
        d = 2
        while d * d <= x:
            while x % d == 0:
                factors.append(d)
                x //= d
            d += 1
        if x > 1:
            factors.append(x)
        return factors

    # Step 2: Distribute factors as evenly as possible
    factors = get_factors(n)
    result = [1] * k  # start with k 1's

    # Assign each factor to the smallest bucket so far (greedy)
    for i, f in enumerate(factors):
        # Assign to bucket with smallest current product so far
        min_idx = result.index(min(result))
        result[min_idx] *= f

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(√n + k \* log k) in the worst case. √n for prime factorization, and for each factor you search for min bucket (up to k buckets, each search is O(k), but could be optimized with a heap).
- **Space Complexity:**  
  O(k) for output array, plus O(log n) for factor list in worst case (very composite).

### Potential follow-up questions (as if you’re the interviewer)  

- If multiple decompositions have the same minimal max - min, how do you prefer the output order?  
  *Hint: Sorting, or original order as assigned (publish the criterion).*

- Can you do better than O(k) per assignment when distributing factors to buckets?  
  *Hint: Use a heap for result buckets to track min bucket efficiently.*

- What if instead of minimizing max-min, you're asked to minimize the maximum output value (“fair partition”)?  
  *Hint: This is related but not identical—setup and greedy distribution may not always suffice.*

### Summary
The core coding pattern here is **greedy partitioning / fair distribution** and **prime factorization**.  
Balancing partitioning of multiplicative factors appears in several combinatorial and optimization contexts (load balancing, fair product partition).  
The brute force is replaced by an efficient greedy approach that nearly always achieves the optimal max-min difference for such "balance by partitioning" problems.

### Tags

### Similar Problems
