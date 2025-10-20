### Leetcode 1969 (Medium): Minimum Non-Zero Product of the Array Elements [Practice](https://leetcode.com/problems/minimum-non-zero-product-of-the-array-elements)

### Description  
Given an integer **p**, consider the array **nums = [1, 2, ..., 2ᵖ - 1]**. You can repeat this operation any number of times: pick two numbers and swap any chosen bit at the same position in both numbers. Your goal is to perform these operations to minimize the non-zero product of all elements in the array. Finally, return this minimum non-zero product modulo 10⁹ + 7.

### Examples  

**Example 1:**  
Input: `p = 1`  
Output: `1`  
*Explanation: nums = [1]. Only one element; the product is 1.*

**Example 2:**  
Input: `p = 2`  
Output: `6`  
*Explanation: nums = [1, 2, 3]. The product 1 × 2 × 3 = 6 is already minimal. No effective bit swap reduces the product more.*

**Example 3:**  
Input: `p = 3`  
Output: `1512`  
*Explanation: nums = [1, 2, 3, 4, 5, 6, 7]. After bit swaps, you can rearrange to maximize differences, ending with [1, 6, 1, 6, 1, 6, 7]. Product is 1 × 6 × 1 × 6 × 1 × 6 × 7 = 1512, which is minimal.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  For each possible arrangement, perform any (legal) bit swaps and compute the product. Quickly intractable for larger **p**—number of permutations explodes exponentially.

- **Observations:**  
  - The only way to reduce the product is to maximize the gap between numbers, making some as small (1) and some almost maximal (2ᵖ - 2).  
  - Since swapping bits strategically lets us pair all numbers except the maximum into (1, 2ᵖ-2) pairs, the minimal product is:  
    - Each pair: 1 and (2ᵖ-2), so you can create (2ᵖ-1)//2 pairs.  
    - Product: (2ᵖ-2)^{(2ᵖ-1)//2} × (2ᵖ-1).  
  - To compute very large powers modulo 10⁹+7, use fast modular exponentiation.

- **Optimized approach:**  
  - Compute (2ᵖ-2)^{(2ᵖ-1)//2} modulo 10⁹+7.  
  - Multiply by (2ᵖ-1), modulo 10⁹+7.

### Corner cases to consider  
- p = 1 (only one number)
- Very large **p** (to test integer overflows/modulo)
- p = 2 (array too small to permit swaps)

### Solution

```python
def minNonZeroProduct(p):
    # Modulo value as per constraints
    MOD = 10 ** 9 + 7

    # Compute the maximum number: 2^p - 1
    max_num = (1 << p) - 1

    # Compute the largest swappable value: 2^p - 2
    pair_val = max_num - 1

    # Number of pairs (half of max_num, rounded down)
    pairs = max_num // 2

    # Modular exponentiation: (pair_val ^ pairs) % MOD
    def mod_pow(base, exp, mod):
        result = 1
        base = base % mod
        while exp > 0:
            if exp % 2 == 1:
                result = (result * base) % mod
            base = (base * base) % mod
            exp = exp // 2
        return result

    # Final product: (pair_val^pairs × max_num) % MOD
    return (mod_pow(pair_val, pairs, MOD) * max_num) % MOD
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log p) — Due to fast exponentiation (modular power step).
- **Space Complexity:** O(1) — Only a few integer variables and no recursion or extra storage proportional to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array started with arbitrary numbers instead of [1, …, 2ᵖ-1]?  
  *Hint: Can your result be applied, or must you re-analyze based on the values present?*

- How would you adapt the solution if the allowed bit operation was different, such as swapping only a subset of bits?  
  *Hint: Analyze the groupings possible with limited bit swaps.*

- Could you generalize this solution to products other than non-zero, say, to maximize or minimize the sum under similar bitwise operations?  
  *Hint: Consider how multiplication and addition are affected by maximizing/minimizing the difference between elements.*

### Summary
This problem leverages combinatorial observations and modular exponentiation to optimize a process otherwise exponentially costly. The key is understanding that maximal bit difference, create-able via swaps, drives the minimal product, allowing you to reduce the array into repeated (1, 2ᵖ-2) pairs plus the max element. The coding pattern follows efficient modular power, which is very common in competitive math, crypto, or big-number problems. This pattern is widely applicable to any “power-product-modulo” style question.


### Flashcard
Pair all numbers except maximum into (1, 2ᵖ-2) pairs via bit swaps; product is (2ᵖ-1) × (2ᵖ-2)^(2^(p-1)-1) mod 10⁹+7.

### Tags
Math(#math), Greedy(#greedy), Recursion(#recursion)

### Similar Problems
