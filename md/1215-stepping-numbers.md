### Leetcode 1215 (Medium): Stepping Numbers [Practice](https://leetcode.com/problems/stepping-numbers)

### Description  
Given two integers, **low** and **high**, return a sorted list of all *Stepping Numbers* in the range [low, high] inclusive.  
A **Stepping Number** is an integer where every adjacent pair of digits has an absolute difference of exactly 1.  
For example, 321 is a Stepping Number because |3-2| = 1 and |2-1| = 1. However, 421 is *not* a Stepping Number because |4-2| ≠ 1.

### Examples  

**Example 1:**  
Input: `low = 0, high = 21`  
Output: `[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 21]`  
Explanation:  
Single-digit numbers (0-9) are always Stepping Numbers. 10 (diff between 1 and 0 is 1), 12 (diff between 1 and 2 is 1), 21 (diff between 2 and 1 is 1).

**Example 2:**  
Input: `low = 10, high = 15`  
Output: `[10, 12]`  
Explanation:  
10 and 12 are Stepping Numbers in this range. For 10: |1-0| = 1, for 12: |1-2| = 1.

**Example 3:**  
Input: `low = 0, high = 0`  
Output: ``  
Explanation:  
Even 0 itself is considered a valid Stepping Number in this definition.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Check every number in the range [low, high], testing whether each is a Stepping Number by examining each pair of digits.  
  *Problem*: The range can be huge (up to 2×10⁹), making this extremely inefficient and impractical.

- **Optimized Approach (BFS):**  
  Since Stepping Numbers are built by adding digits to the end, we can generate them by performing **BFS** from every starting digit (0-9). For each number generated, append it to the answer list if it falls within [low, high]. If appending another digit would exceed high, stop extending that branch.  
  At each step for the current number, the next digit can only be last_digit-1 or last_digit+1.

- **Why BFS?**  
  BFS guarantees that numbers are found in an increasing order, which naturally gives a sorted answer without needing a final sort step.

- **DFS is also possible** but may need an extra sort step, and has deeper recursion.

### Corner cases to consider  
- The range includes 0 (should include 0 in output).
- low = high (the range is a single number).
- The range contains only single-digit numbers (quickly handled).
- Numbers with digit 0 at the end or as intermediate digit (shouldn’t drop leading zeroes except for the one-digit 0).
- Ranges where no Stepping Number exists.
- Very large ranges (efficiency matters).

### Solution

```python
from collections import deque

def countSteppingNumbers(low, high):
    result = []
    # The queue holds candidates to explore, start with digits 0-9
    queue = deque(range(10))
    
    while queue:
        num = queue.popleft()
        # Only include numbers in the given interval
        if low <= num <= high:
            result.append(num)
        # Don't extend numbers beyond high, and skip 0 as prefix except for the 0 itself
        if num == 0 or num > high:
            continue
        last_digit = num % 10
        # Generate next possible stepping numbers by appending (last_digit ± 1)
        for next_digit in [last_digit - 1, last_digit + 1]:
            if 0 <= next_digit <= 9:
                next_num = num * 10 + next_digit
                queue.append(next_num)
    return sorted(result)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(|A|) — where |A| is the count of Stepping Numbers found and generated in [low, high]. The BFS never generates numbers outside the possible value region, and each is checked exactly once.
- **Space Complexity:** O(|A|) — to store all valid results and queue entries.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the solution if the range was given as strings (to support numbers larger than 2×10⁹)?  
  *Hint: Consider using string manipulation instead of integers and avoid integer overflows.*

- Can you derive a formula to count the number of Stepping Numbers up to N without enumerating them?  
  *Hint: This may require dynamic programming or digit DP.*

- What if you need only the kᵗʰ smallest Stepping Number in the range?  
  *Hint: Try to generate numbers in increasing order and count until k.*

### Summary
We use a **Breadth-First Search (BFS)** approach to generate valid Stepping Numbers efficiently within a numeric interval. This pattern (digit-by-digit number-building with constraints) is common in “number construction” and “digital DP”-type problems. The BFS ensures only valid numbers are generated, output is sorted, and performance is practical even for large ranges. This technique applies broadly in similar problems where numbers are built or traversed subject to digit rules.


### Flashcard
Use BFS from each digit 0–9, appending next valid digits, to generate all stepping numbers in [low, high] without brute-force enumeration.

### Tags
Math(#math), Backtracking(#backtracking), Breadth-First Search(#breadth-first-search)

### Similar Problems
- Count Stepping Numbers in Range(count-stepping-numbers-in-range) (Hard)