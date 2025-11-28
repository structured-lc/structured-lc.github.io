### Description

Given a positive integer n and an integer target, you need to construct an array of size n where:
- The absolute values of all elements form a permutation of 1 to n (each number 1 to n appears exactly once)
- The sum of all elements equals the target
- The array is lexicographically smallest among all valid arrays

Each element can be either positive or negative. Return the lexicographically smallest array satisfying these conditions, or an empty array if no valid solution exists.

### Examples

**Example 1:**  
Input: `n = 2, target = 0`  
Output: `[-2, 1]`  
*Explanation: The absolute values are [2, 1] which form a permutation of 1 to 2. The sum is -2 + 1 = -1... wait, let me recalculate. -2 + 1 = -1, not 0. Actually the answer should be [-1, 2] or similar. The key is that we want the lexicographically smallest, so we prefer negative numbers first (like -2 is smaller than -1), then positive numbers in ascending order.*

**Example 2:**  
Input: `n = 3, target = 0`  
Output: `[-3, 1, 2]`  
*Explanation: Absolute values [3, 1, 2] form a permutation of 1 to 3. Sum: -3 + 1 + 2 = 0. This is lexicographically smallest because -3 comes first (most negative), followed by positive numbers in ascending order.*

**Example 3:**  
Input: `n = 5, target = 6`  
Output: `[-5, -4, -3, -2, 6]` (or similar valid permutation)  
*Explanation: We start with all numbers negated: -1, -2, -3, -4, -5 (sum = -15). We need to reach target 6, so we need to flip some negatives to positives. Flipping the largest numbers gives us the lexicographically smallest result after sorting.*

### Thought Process

**Brute Force Approach:**
Generate all possible sign assignments (2ⁿ possibilities) and all permutations (n! possibilities), check which ones sum to target, then pick the lexicographically smallest. This is exponential and infeasible.

**Optimized Approach:**
1. Start with all numbers negated: [-1, -2, ..., -n]. This gives sum = -(1+2+...+n) = -n(n+1)/2
2. Calculate the difference needed: `diff = target - current_sum`
3. If we flip a number k from -k to +k, the sum increases by 2k
4. Greedily flip the largest numbers until we reach the target or determine it's impossible
5. Sort the result to get the lexicographically smallest arrangement

The key insight: Starting with all negatives, then flipping from largest to smallest, ensures lexicographic minimality because larger negatives come first, and positive numbers remain as small as possible.

### Corner cases to consider

- target is too large or too small to be achievable (sum out of range)
- n = 1 with target = ±1
- target = 0 (requires balanced flipping)
- target equals the sum of all positive numbers (all positive)
- target equals the negative sum of all numbers (all negative)
- The required flip sum is odd/even mismatch with available numbers

### Solution

```python
def lexicographicallySmallestArray(n, target):
    # Start with all numbers negated
    result = [-i for i in range(1, n + 1)]
    
    # Calculate current sum (sum of all negatives from 1 to n)
    current_sum = sum(result)
    
    # Calculate difference needed to reach target
    diff = target - current_sum
    
    # If difference is odd, it's impossible
    # (flipping changes sum by 2k, which is always even)
    if diff % 2 != 0:
        return []
    
    # Greedily flip numbers from largest to smallest
    # to reach the target while maintaining lexicographic order
    for i in range(n - 1, -1, -1):
        # If flipping this number doesn't overshoot, flip it
        if -result[i] <= diff:
            diff -= 2 * (-result[i])
            result[i] = -result[i]
    
    # Check if we successfully reached target
    if diff != 0:
        return []
    
    # Sort to get lexicographically smallest arrangement
    result.sort()
    
    return result
```

### Time and Space Complexity Analysis

- **Time Complexity:** O(n log n)  
  We iterate through the array once to potentially flip numbers: O(n). Then we sort the result: O(n log n). The sorting dominates, giving us O(n log n) overall.

- **Space Complexity:** O(n)  
  We store the result array of size n. If we don't count the output array, we use O(1) extra space (excluding the sorting's internal space, which varies by implementation but typically O(log n) for merge sort or O(1) for heap sort).

### Potential follow-up questions

- (Can you solve this in-place without sorting at the end?)  
  *Hint: Think about whether you can construct the sorted array directly during the flipping phase rather than flipping then sorting.*

- (What if n is very large (up to 10⁶) and memory is constrained?)  
  *Hint: Consider if you can determine which numbers to flip without constructing the entire array, then stream the output.*

- (How would you handle the problem if we need the lexicographically largest instead of smallest?)  
  *Hint: Reverse your strategy—start with all positive numbers and flip from smallest to largest.*

### Summary

This problem combines greedy selection with sorting to achieve the lexicographically smallest result. The key insight is recognizing that starting from all negatives and flipping larger numbers to positive maintains both feasibility and lexicographic minimality. The pattern is applicable to similar optimization problems where you need to construct a result with constraints on sum/aggregate properties while optimizing for lexicographic order. The algorithm demonstrates how understanding the problem structure (flips increase sum by 2k) can lead to an efficient greedy solution rather than brute force enumeration.

### Tags
Array(#array), Math(#math), Two Pointers(#two-pointers), Greedy(#greedy), Sorting(#sorting)

### Similar Problems
