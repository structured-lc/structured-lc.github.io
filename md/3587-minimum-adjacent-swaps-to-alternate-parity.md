### Leetcode 3587 (Medium): Minimum Adjacent Swaps to Alternate Parity [Practice](https://leetcode.com/problems/minimum-adjacent-swaps-to-alternate-parity)

### Description  
Given an array of **distinct integers**, you can only swap **adjacent elements**. The goal is to arrange the array so that **adjacent elements alternate in parity** (even-odd or odd-even). Return the **minimum number of adjacent swaps** needed to reach any valid arrangement with this property. If it's impossible, return -1.

### Examples  

**Example 1:**  
Input: `[2,4,6,5,7]`  
Output: `3`  
Explanation:  
Swap 5 and 6 → `[2,4,5,6,7]`  
Swap 4 and 5 → `[2,5,4,6,7]`  
Swap 6 and 7 → `[2,5,4,7,6]` (now even, odd, even, odd, even).  

**Example 2:**  
Input: `[2,4,5,7]`  
Output: `1`  
Explanation:  
Swap 4 and 5 → `[2,5,4,7]` (even, odd, even, odd).  

**Example 3:**  
Input: `[1,2,3]`  
Output: `0`  
Explanation:  
Already valid: odd, even, odd.

**Example 4:**  
Input: `[4,5,6,8]`  
Output: `-1`  
Explanation:  
There is no way to alternate parity for all elements, as the counts of odd and even parity don't allow an alternation for this input.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Generate all permutations and for each, check if it alternates in parity and find minimal swaps using bubble sort-like counting. This quickly becomes infeasible (O(n!)).

- **Optimized plan:**  
  Since only parity matters, collect indices of **odd** and **even** numbers. To create an alternating parity array, we need two interleaved patterns:
  - Pattern A: even at index 0, then odd at 1, even at 2, ...
  - Pattern B: odd at index 0, then even at 1, odd at 2, ...
  
  For each pattern, check if counts of odd/even can fit (difference in counts ≤ 1 for n odd, must be equal for n even). Try assigning the even or odd numbers to their “target” indices in each valid pattern, and sum the moves as the sum of differences in the source and target indices. Pick the minimum swap count among valid patterns.

- **Why use this approach?**  
  - Only need to track positions, not actual values.
  - Swapping adjacent elements means total moves to line up with target positions.
  - Fast: O(n).

### Corner cases to consider  
- Empty array.
- Only 1 element (already valid).
- All even or all odd elements (impossible for n > 1).
- odd and even counts differ by more than 1 (impossible).
- Already alternating parity.
- Large input array.

### Solution

```python
def minimum_swaps_to_alternate_parity(nums):
    n = len(nums)
    even_indices = []
    odd_indices = []
    for idx, num in enumerate(nums):
        if num % 2 == 0:
            even_indices.append(idx)
        else:
            odd_indices.append(idx)
    
    # Define helper to compute swap cost for given starting parity
    def compute_cost(start_with_even):
        even_needed = [i for i in range(n) if (i % 2 == 0) == start_with_even]
        odd_needed = [i for i in range(n) if (i % 2 == 0) != start_with_even]

        if len(even_indices) != len(even_needed) or len(odd_indices) != len(odd_needed):
            return float('inf')
        
        # The cost is sum of absolute differences (minimum swaps by greedy assignment)
        cost = sum(abs(even_indices[i] - even_needed[i]) for i in range(len(even_indices)))
        cost += sum(abs(odd_indices[i] - odd_needed[i]) for i in range(len(odd_indices)))
        return cost

    # Check if possible
    if abs(len(even_indices) - len(odd_indices)) > 1:
        return -1

    # Try both patterns and pick minimal swaps
    cost_even_start = compute_cost(True)
    cost_odd_start = compute_cost(False)
    res = min(cost_even_start, cost_odd_start)
    return res if res != float('inf') else -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  - Each index is iterated over twice: once to split into evens/odds, and once to calculate swap costs.
- **Space Complexity:** O(n).  
  - Storing indices of even and odd numbers.

### Potential follow-up questions (as if you’re the interviewer)  

- What if elements are not distinct?  
  *Hint: Consider how duplicates affect the index assignment and swap mapping.*

- How would you handle k-way alternation (not just parity, but 3 or more categories)?  
  *Hint: Generalize index assignment for each group and enforce group size constraints.*

- If only non-adjacent swaps are allowed, or costs for swaps differ, can you optimize?  
  *Hint: Think assignment algorithms or dynamic programming, like minimum cost matching.*

### Summary
This problem is a variant of the "minimum adjacent swaps to form a pattern" and uses the **greedy two-pointer/index matching pattern** (similar to minimum swaps to make binary string alternating). The **core trick** is to split indices by group, then match them greedily to their "intended" alternation slots, summing up position differences. This pattern appears in problems involving arrangement with minimal local moves, alternating patterns, and some permutation reorderings.

### Tags
Array(#array), Greedy(#greedy)

### Similar Problems
