### Leetcode 2275 (Medium): Largest Combination With Bitwise AND Greater Than Zero [Practice](https://leetcode.com/problems/largest-combination-with-bitwise-and-greater-than-zero)

### Description  
Given an array of positive integers, candidates, return the size of the largest subset such that the bitwise AND of all its elements is greater than 0. Each number in candidates can only be used once in each combination, and you want the largest possible combination size meeting this condition.

### Examples  

**Example 1:**  
Input: `candidates = [16,17,71,62,12,24,14]`,  
Output: `4`  
Explanation: The combination `[16,17,62,24]` has a bitwise AND of `16 & 17 & 62 & 24 = 16 > 0`. It can be shown that no combination of size >4 will have AND >0. Other valid answers include `[62,12,24,14]` (AND=8).

**Example 2:**  
Input: `candidates = [8,8]`,  
Output: `2`  
Explanation: The largest combination is `[8,8]`, their AND is `8 & 8 = 8 > 0`. All combinations with both elements will have AND=8.

**Example 3:**  
Input: `candidates = [3,1,2]`,  
Output: `2`  
Explanation: 
- [3,1]: 3 & 1 = 1
- [3,2]: 3 & 2 = 2
- [1,2]: 1 & 2 = 0  
So max size is 2.

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Try every combination of the candidates array, for all sizes from n down to 1. For each, compute AND and check if it's >0, but there are 2ⁿ possible combinations—too slow for n up to 10⁵.

- **Bit observation:**  
  For the AND of a set to be >0, some bit position must be set in all members of the subset. Instead of iterating combinations, count for each bit position how many numbers have that bit set. The largest such count is the answer, since all those elements can be ANDed to get at least that bit set (AND >0).

- **Why is this correct?**  
  If a bit is set in k numbers, AND of those k numbers will preserve that bit (and possibly others), so k is a candidate size. Check all 24-25 bits (since maximum candidate ≤ 10⁷).

- **Trade-offs:**  
  This reduces the problem to O(n log(max_num)), avoiding exponential combinations.

### Corner cases to consider  
- Array of length 1
- All numbers are the same
- All numbers are powers of two (single bit set)
- All numbers are distinct and have no common bits
- Large values, up to 10⁷
- Mixed bit patterns

### Solution

```python
def largestCombination(candidates):
    # There are at most 24 significant bits for numbers ≤ 10⁷
    max_bits = 24  # 2²⁴ = 16,777,216 > 10⁷
    max_count = 0

    # Check each bit position
    for bit in range(max_bits):
        count = 0
        for num in candidates:
            # Check if the bitᵗʰ bit is set in num
            if (num >> bit) & 1:
                count += 1
        # Keep track of the largest count at any bit position
        max_count = max(max_count, count)

    return max_count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × log m), where n=len(candidates) and m is the maximum value in candidates (since we check each bit, up to log₂m). For this problem log₂10⁷ ≈ 24, so overall O(n).
- **Space Complexity:** O(1), not counting the input array, since only variables for counts are used.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your approach change if you needed the **actual combination** as well, not just its size?  
  *Hint: Keep track of the bit positions with max count, store those numbers.*

- If the numbers could be zero or negative—would that affect your logic?  
  *Hint: Consider what happens to bit patterns with negatives (two's complement) and zeros.*

- Can this idea be extended to do **bitwise OR or XOR** instead?  
  *Hint: AND requires all numbers to have the bit set, but OR/XOR have different properties.*

### Summary
The approach relies on counting how many numbers have each bit set, and the largest such count tells us the largest subset whose AND is >0. This is a classic example of **bit manipulation** and **counting** in arrays, a pattern useful for problems where common bit properties or masks define subset properties. This avoids search/DP and leverages frequency of bits—efficient and robust for large-scale inputs.


### Flashcard
For each bit position, count how many numbers have that bit set; the maximum count is the answer, since all must share at least one set bit for AND > 0.

### Tags
Array(#array), Hash Table(#hash-table), Bit Manipulation(#bit-manipulation), Counting(#counting)

### Similar Problems
- Count Number of Maximum Bitwise-OR Subsets(count-number-of-maximum-bitwise-or-subsets) (Medium)