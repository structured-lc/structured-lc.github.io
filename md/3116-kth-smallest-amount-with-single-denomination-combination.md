### Leetcode 3116 (Hard): Kth Smallest Amount With Single Denomination Combination [Practice](https://leetcode.com/problems/kth-smallest-amount-with-single-denomination-combination)

### Description  
Given an integer array **coins** representing different coin denominations, and an integer **k**:  
You have infinite supply of each type of coin.  
You can only use coins of the *same denomination* to make an amount — that is, each amount must be the sum of only one denomination (not mixing coins).  
Return the **kᵗʰ smallest positive integer** that can be made by just using coins of any single denomination.  

This is like: For coins = [2,5], you can make 2,4,6,... or 5,10,15,...  
Your goal is to find the kᵗʰ smallest distinct positive amount that can be formed this way (across all denominations, no repeats).

### Examples  

**Example 1:**  
Input: `coins = [2, 5], k = 5`  
Output: `10`  
*Explanation: The possible amounts are 2, 4, 5, 6, 8, 10, ... (i.e., 2×1, 2×2, ...; 5×1, 5×2, ...). Duplicate values are merged. Sorted: 2, 4, 5, 6, 8. The 5ᵗʰ is 10.*

**Example 2:**  
Input: `coins = [3, 5], k = 7`  
Output: `12`  
*Explanation: Can form: 3, 5, 6, 9, 10, 12, 15, ... The first 7 are 3, 5, 6, 9, 10, 12, 15. The 7ᵗʰ is 12.*

**Example 3:**  
Input: `coins = [4], k = 3`  
Output: `12`  
*Explanation: Only denomination is 4, so possible values are 4, 8, 12, ... The 3ʳᵈ value is 12.*

### Thought Process (as if you’re the interviewee)  
- **Naive/Brute-force**:  
    - For each denomination c, generate values c, 2c, ..., kc, for all c in coins.
    - Merge all lists, remove duplicates, sort, and return the kᵗʰ smallest.
    - But k and values can be large (k up to 10⁹). This approach is too slow and memory-intensive!
- **Optimization idea**:  
    - Instead of generating all possible amounts, **use binary search**.
    - **Key observation:** If we can quickly count how many unique values ≤ X can be made using coins, we can use this for binary search.
    - For a given X, each coin c can make ⌊X/c⌋ values (c, 2c, ..., t\*c ≤ X). But this double-counts their overlaps (e.g., numbers divisible by both coins).
    - So use **Inclusion-Exclusion Principle** over all subsets of coins:  
        For each subset, calculate LCM of its denominations:  
        - For odd subset size: add ⌊X / LCM(subset)⌋  
        - For even: subtract ⌊X / LCM(subset)⌋  
    - Do this for all subsets, sum results = number of distinct values ≤ X.
    - Use this function in a binary search:  
        - Find the minimal X such that count(X) ≥ k.
- **Trade-offs**:  
    - Complexity is exponential in number of denominations but logarithmic in value range.
    - Efficient for |coins| ≤ 15, as required by constraints.

### Corner cases to consider  
- Single denomination only (just arithmetic progression)  
- All denominations are pairwise co-prime or have common factors  
- k = 1 (edge of range)  
- Large denominations (no overlap for a long time)  
- Denominations contain duplicates (should count as unique!)  
- Coins include 1 (all positives can be made; edge?)  
- Very large k (output might be huge)

### Solution

```python
def findKthSmallest(coins, k):
    from math import gcd
    from functools import reduce

    def lcm(a, b):
        return a * b // gcd(a, b)

    n = len(coins)
    
    # Count how many unique numbers ≤ mx can be formed
    def count_up_to(mx):
        total = 0
        # Enumerate all non-empty subsets of coins
        for mask in range(1, 1 << n):
            subset_lcm = 1
            bits = 0
            for j in range(n):
                if (mask >> j) & 1:
                    subset_lcm = lcm(subset_lcm, coins[j])
                    bits += 1
                    if subset_lcm > mx:
                        break
            else:
                add = mx // subset_lcm
                # Inclusion-Exclusion principle:
                if bits % 2 == 1:
                    total += add
                else:
                    total -= add
        return total

    # Binary search over possible X
    left, right = 1, 10**11
    while left < right:
        mid = (left + right) // 2
        if count_up_to(mid) < k:
            left = mid + 1
        else:
            right = mid
    return left
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(2ⁿ × logK), where n = len(coins).  
  - Each binary search step (logK steps, as answer is ≈K×min_coins)  
  - Each count_up_to computes O(2ⁿ) subset LCMs.
- **Space Complexity:**  
  O(n) for basic variables; O(2ⁿ) if optimizing by memoizing LCMs, but here only a few variables.

### Potential follow-up questions (as if you’re the interviewer)  

- If coins can be used together (mix denominations), how would you solve for kᵗʰ amount?  
  *Hint: Try Dijkstra/priority queue “Ugly Numbers” approach.*

- What if you had to return the actual list of first k values, not just the kᵗʰ?  
  *Hint: Heap-based merging; or optimize memory with streaming.*

- What if denominations are not guaranteed distinct or are very large (>15 coins)?  
  *Hint: Pruning input; optimize by removing redundant denominations.*

### Summary
This problem is a classic use of **binary search on answer + inclusion-exclusion principle for counting**.  
The key is to count efficiently how many distinct values ≤ X can be made by only one coin denomination at a time, using subset LCMs.  
This fits a common “search on value + count by subsets/inclusion-exclusion” pattern, widely applicable to divisibility, generating non-overlapping sums, or similar resource allocation problems.


### Flashcard
Binary search on the answer. For a candidate value X, count how many unique amounts ≤ X can be formed using each denomination via inclusion-exclusion principle.

### Tags
Array(#array), Math(#math), Binary Search(#binary-search), Bit Manipulation(#bit-manipulation), Combinatorics(#combinatorics), Number Theory(#number-theory)

### Similar Problems
- Kth Smallest Number in Multiplication Table(kth-smallest-number-in-multiplication-table) (Hard)
- Find the Number of Possible Ways for an Event(find-the-number-of-possible-ways-for-an-event) (Hard)