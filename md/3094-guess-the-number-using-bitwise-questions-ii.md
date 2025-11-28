### Leetcode 3094 (Medium): Guess the Number Using Bitwise Questions II [Practice](https://leetcode.com/problems/guess-the-number-using-bitwise-questions-ii)

### Description  
You are given access to an API commonBits(num), which operates on a hidden integer n (0 ≤ n < 2³⁰). For each query:
- commonBits(num) returns the number of bit positions where n and num have the same value (0 or 1) in their 30-bit representation.
- After each query, n is mutated as n = n ⊕ num (bitwise XOR).
Your task is to determine the initial value of n by strategically querying commonBits.

### Examples  

**Example 1:**  
Input:  
API uses n = 12 (binary: 000000...01100).  
Output: `12`  
*Explanation: Through a sequence of queries and using the number of matching bits, we determine that the original n was 12.*

**Example 2:**  
Input:  
API uses n = 0  
Output: `0`  
*Explanation: Since all bits are 0, carefully querying allows recovery of n as 0.*

**Example 3:**  
Input:  
API uses n = 2³⁰ - 1 (all 30 bits set)  
Output: `1073741823`  
*Explanation: Here, all bits are 1. The sequence of queries deduces all should be set, giving us 1073741823 (= (1 << 30) - 1).*

### Thought Process (as if you’re the interviewee)  
- **Brute-force** isn’t feasible, as the range for n is huge (0 to 2³⁰-1).
- The only tool is commonBits(num), which mutates n each call. Key observations:
    - Querying with num = 0 reveals how many “0” bits n initially had.
    - For each iᵗʰ bit (0 ≤ i < 30), flipping bit i and observing the change in matching bits allows deduction of whether bit i was originally 1 or 0.
    - After querying commonBits(0) to record initial match count, perform a query for each bit position with num = 1 << i. If the number of matches increases, that bit was 1; if it decreases, that bit was 0.
    - Since each call mutates n, we must revert the mutation on n by immediately querying with the same num again to restore n to its pre-query state.
- This "bitwise scan and revert" uses 2 queries per bit plus 1 initial query for the baseline—a total of 61 queries, guaranteed O(1) per bit.

### Corner cases to consider  
- n is 0 (all bits zero, corner easy match)
- n is (1 << 30) - 1 (all bits set)
- n is a single bit set (ex: 1, 2, 4, …)
- Only one bit is zero
- Middle bits toggled, e.g. 0b001100
- n = 0, so querying with all zeros doesn't change n
- n = 1 << i, ensures correct bit positions
- Does not support n < 0 or n ≥ 2³⁰ (important constraint)

### Solution

```python
# class Problem:
#     def commonBits(self, num: int) -> int:
#         ...

class Solution(Problem):
    def findNumber(self) -> int:
        n_bits = 30  # as per constraints
        ans = 0

        # Query with 0: this gives how many bits n matches with 0 initially
        same_count = self.commonBits(0)

        for i in range(n_bits):
            mask = 1 << i
            # Query with a mask: test bit i
            matches = self.commonBits(mask)
            # If matches > same_count, that means the iᵗʰ bit was 1.
            if matches > same_count:
                ans |= mask
            # Revert mutation by querying with the same mask again
            self.commonBits(mask)

        return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(30) = O(1), as there are at most 30 bits and exactly 2 queries per bit plus one initial. All steps are constant time operations.
- **Space Complexity:** O(1); only a few integer variables are allocated regardless of input n.

### Potential follow-up questions (as if you’re the interviewer)  

- How does performance change if n is up to 2⁶⁴?
  *Hint: The approach generalizes; only the number of queries grows linearly with bit-width.*
- Can you optimize the number of queries further?
  *Hint: Are there bits you can deduce together with smarter queries?*
- What if the API did not mutate n after each query?
  *Hint: The task would convert to standard "matching bits" per query, vastly simplifying logic.*

### Summary
This problem uses a **bit manipulation and observation pattern**: test and revert each bit position to reconstruct a number with information from a mutation-causing API. The key is recovering state by inverting each mutation, enabling per-bit deduction. This "bitwise scan and revert" idea can be applied to similar problems where an action mutates state, and the solution needs to extract state information while ensuring mutations can be reverted or compensated along the way.


### Flashcard
Query commonBits(0) to get initial bit count; for each bit position i (0 ≤ i < 30), query commonBits(1 << i) to deduce if bit i was originally set by comparing change in match count.

### Tags
Bit Manipulation(#bit-manipulation), Interactive(#interactive)

### Similar Problems
