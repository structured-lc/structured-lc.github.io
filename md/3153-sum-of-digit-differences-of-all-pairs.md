### Leetcode 3153 (Medium): Sum of Digit Differences of All Pairs [Practice](https://leetcode.com/problems/sum-of-digit-differences-of-all-pairs)

### Description  
Given an array of positive integers `nums`, **all having the same number of digits**, return the total number of digit differences across all possible pairs of integers in the array.

A **digit difference** between two numbers is the count of digits that differ in the same position. For each distinct pair (i, j) (i < j), count how many positions their digits are different, and sum this over all pairs.

### Examples  

**Example 1:**  
Input: `nums = [13,23,12]`  
Output: `4`  
*Explanation:*
- 13 vs 23: Differ at 1ˢᵗ digit (1 ≠ 2); so 1.
- 13 vs 12: Differ at 2ⁿᵈ digit (3 ≠ 2); so 1.
- 23 vs 12: Differ at 1ˢᵗ digit (2 ≠ 1), at 2ⁿᵈ digit (3 ≠ 2); so 2.  
Total = 1 + 1 + 2 = 4.

**Example 2:**  
Input: `nums = [10,10,10,10]`  
Output: `0`  
*Explanation*:  
All digits match in every position for any pair, so the sum is 0.

**Example 3:**  
Input: `nums = [123,456,789]`  
Output: `9`  
*Explanation*:  
Each number is different in all three positions from the others.
- 123 vs 456: 1 (≠ 4), 2 (≠ 5), 3 (≠ 6) ⇒ 3
- 123 vs 789: 1 (≠ 7), 2 (≠ 8), 3 (≠ 9) ⇒ 3
- 456 vs 789: 4 (≠ 7), 5 (≠ 8), 6 (≠ 9) ⇒ 3  
Total = 3 + 3 + 3 = 9

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  For every pair (i, j), compare digit by digit and count disagrees.  
  Nested loops for all pairs, and for each pair a loop for each digit.  
  For n numbers of m digits: O(n² × m). Feasible only because n ≤ 100.

- **Optimization:**  
  Since digits per position are what matter, for each digit position, count occurrences of each digit (0-9). For each position:
    - For digit d seen cnt₍d₎ times, total numbers n, cnt₍d₎ numbers match, (n - cnt₍d₎) differ with d at that position.
    - For all such digits, sum cnt₍d₎ × (n - cnt₍d₎).
  - Each difference counted twice (once as (i, j), once as (j, i)), so divide the sum by 2.
  - Final time: O(m × n), with m = number of digits, n = array length.

- **Why this approach:**  
  - Efficiently leverages the symmetry and structure—removes need for explicit pairwise checks.
  - This approach is a frequent pattern in digit/bit-based difference-counting problems.

### Corner cases to consider  
- All numbers are the same (should output 0).
- Only two numbers in the array.
- All digits are different in every position across all numbers.
- Numbers with zeros and non-zero digits.
- Numbers with leading zeros (if given as strings).
- Large n or large number of digit positions (max bounds).

### Solution

```python
def sum_digit_differences(nums):
    # Convert all numbers to strings for easy digit access
    strs = [str(num) for num in nums]
    
    n = len(nums)
    m = len(strs[0])  # All have equal digits
    
    ans = 0
    
    # For each digit position
    for pos in range(m):
        # Count frequency of each digit at this position
        digit_count = [0] * 10
        for s in strs:
            digit = int(s[pos])
            digit_count[digit] += 1
        
        # For each digit, count pairs where this digit differs
        for d in range(10):
            # cnt is how many numbers have digit d at position pos
            cnt = digit_count[d]
            # Total numbers - cnt have a different digit
            ans += cnt * (n - cnt)
    # Each pair is counted twice (once per order), so halve
    return ans // 2
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × m)  
  Where n is the number of numbers and m is the digit length. For each of m positions, we count digit frequency for n numbers, and sum over up to 10 digits.

- **Space Complexity:** O(m + n)  
  O(n) for the list of string conversions, O(1)/O(10) for temporary digit counters per loop, O(m) for pass storage overhead.

### Potential follow-up questions (as if you’re the interviewer)  

- What if numbers can have varying number of digits?  
  *Hint: Think about alignment (e.g., pad leading zeros or handle missing digits).*

- How would the solution change if the digit range wasn't 0-9, but e.g., hexadecimal digits?  
  *Hint: Generalize the counter array.*

- Can you extend the logic to allow for comparing numbers in string format with possible leading characters (e.g., '0012', '0003')?  
  *Hint: Consider consistent string lengths and preprocess.*

### Summary
This problem is a classic application of the **counting** and **pairwise difference** pattern. Instead of brute-force pair checking, we efficiently leverage per-position digit frequency counts and combinatorics to tally up the total differences. This method is common for bit/digit comparison problems—such as Hamming distance/Cyclic code calculations—and can often be adapted to a wide variety of "number of differences in all pairs" settings.

### Tags
Array(#array), Hash Table(#hash-table), Math(#math), Counting(#counting)

### Similar Problems
- Total Hamming Distance(total-hamming-distance) (Medium)