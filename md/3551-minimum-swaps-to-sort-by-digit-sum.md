### Leetcode 3551 (Medium): Minimum Swaps to Sort by Digit Sum [Practice](https://leetcode.com/problems/minimum-swaps-to-sort-by-digit-sum)

### Description  
Given an array of **distinct positive integers**, sort it in ascending order by the **sum of the digits** of each number.  
If two numbers have the same digit sum, the **smaller** number comes first.  
Return the **minimum number of swaps** required to arrange the array into this sorted order.  
A swap exchanges elements at two different positions.

### Examples  

**Example 1:**  
Input: `[37,100]`  
Output: `1`  
*Explanation: Digit sums: 37 → 10, 100 → 1. After sorting by digit sum: [100, 37]. Requires swapping 37 and 100 (i.e., one swap).*

**Example 2:**  
Input: `[22,14,33,7]`  
Output: `0`  
*Explanation: Digit sums: 22 → 4, 14 → 5, 33 → 6, 7 → 7. Sorted by digit sum: [22,14,33,7]. Already sorted, no swaps needed.*

**Example 3:**  
Input: `[56,41,20,13]`  
Output: `2`  
*Explanation: Digit sums: 56 → 11, 41 → 5, 20 → 2, 13 → 4. Sorted by digit sum: [20 (2), 13 (4), 41 (5), 56 (11)].  
Original: [56,41,20,13] → Target: [20,13,41,56]. Minimum swaps to reach target are 2 (swap 56↔20, then 41↔13).*

### Thought Process (as if you’re the interviewee)  
- **Brute Force:**  
  Try all permutations to find the minimum swaps needed to make the array sorted by digit sum, but this is **not feasible** for large `n`.
  
- **Observation:**  
  The problem reduces to finding the minimum number of swaps to convert the array to its "digit sum sorted" order. For unique elements, this is a classic **minimum swaps to sort** problem (cycle decomposition).
  
- **Steps:**  
  1. **Compute the target order:**  
      For each value, compute its digit sum. Sort all elements by (digit sum, value).
  2. **Build mapping:**  
      For each index, find where the current value should go in the sorted array.
  3. **Cycle Decomposition:**  
      Go through the positions; for each element not yet in place, follow the cycle until it returns to the start, incrementing swaps needed by (cycle length - 1).
  
- **Why this approach?**  
  - It leverages properties of sorting via swaps when all elements are distinct.  
  - Time complexity is O(n log n) for sorting and O(n) for swaps, suitable for interview settings.

### Corner cases to consider  
- Empty array: output should be 0.
- Single element: no swaps needed.
- Array already in the correct digit sum order.
- Array requires full reversal.
- Multiple elements with same digit sum (order by numeric value).

### Solution

```python
def min_swaps_to_sort_by_digit_sum(nums):
    # Helper function to compute digit sum
    def digit_sum(x):
        s = 0
        while x:
            s += x % 10
            x //= 10
        return s

    n = len(nums)
    # Determine target sorted order by digit sum (and value as tie breaker)
    sorted_nums = sorted(nums, key=lambda x: (digit_sum(x), x))
    
    # Build: value -> target index in sorted array
    value_to_index = {num: i for i, num in enumerate(sorted_nums)}
    
    # Visited to avoid repeated cycles
    visited = [False] * n
    swaps = 0

    for i in range(n):
        if visited[i] or value_to_index[nums[i]] == i:
            continue

        # Start forming cycle
        cycle_len = 0
        j = i
        while not visited[j]:
            visited[j] = True
            j = value_to_index[nums[j]]
            cycle_len += 1
        if cycle_len > 1:
            swaps += (cycle_len - 1)
    return swaps
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n log n)  
  - Sorting requires O(n log n).  
  - Mapping positions and visiting all cycles is O(n).
- **Space Complexity:** O(n)  
  - For mapping, visited array, and the sorted list.

### Potential follow-up questions (as if you’re the interviewer)  

- What if elements were **not distinct**?  
  *Hint: Need to handle duplicates, cycles may become more complex.*

- How would you **restore the actual swap operations**, not just count them?  
  *Hint: Track swaps during the cycle decompositions.*

- What if sorting order changes, e.g., **descending by digit sum** or **different tiebreaker**?  
  *Hint: Change the comparator logic in the sort step.*

### Summary
This solution uses the **cycle decomposition pattern** commonly found in "minimum swaps to sort" problems.  
It computes the target sorted state using custom criteria (digit sum), then processes the array to count swap cycles.  
This pattern generalizes to any sorting-by-criteria + swap-minimization question, and is seen in problems like "Minimum Swaps to Sort an Array" and "Min Swaps To Make Palindrome".


### Flashcard
Compute digit sum for each element; sort array by digit sum to get target order; use cycle decomposition to find minimum swaps needed.

### Tags
Array(#array), Hash Table(#hash-table), Sorting(#sorting)

### Similar Problems
