### Leetcode 3723 (Medium): Maximize Sum of Squares of Digits [Practice](https://leetcode.com/problems/maximize-sum-of-squares-of-digits)

### Description

You are given two positive integers `num` and `sum`. A positive integer `n` is considered "good" if:
1. The number of digits in `n` is exactly `num`
2. The sum of all digits in `n` equals `sum`

Your task is to find and return the largest good integer `n` as a string. The "score" of a number is the sum of the squares of its digits. If no good integer exists, return an empty string.

To maximize the score, you want digits to be as large as possible (prioritizing 9s), and to get the numerically largest number with the same score, you arrange larger digits first.

### Examples

**Example 1:**  
Input: `num = 2, sum = 3`  
Output: `"30"`  
*Explanation: Good integers with 2 digits and digit sum 3 are: 12, 21, 30. Their scores are 1² + 2² = 5, 2² + 1² = 5, 3² + 0² = 9. The maximum score is 9, achieved by 30.*

**Example 2:**  
Input: `num = 2, sum = 18`  
Output: `"99"`  
*Explanation: Good integers are 99 and 89, 98 with score 81 + 81 = 162 for 99 and 64 + 81 = 145 for others. Maximum is 99.*

**Example 3:**  
Input: `num = 1, sum = 10`  
Output: `""`  
*Explanation: A single digit cannot have a sum of 10 (max is 9), so no good integer exists.*


### Thought Process (as if you're the interviewee)

Starting with the brute force: We could generate all numbers with exactly `num` digits and check which have digit sum equal to `sum`, then compute scores for each. But this is exponential and infeasible.

**Key insight:** To maximize the sum of squares, we want digits to be as large as possible. Since squaring amplifies larger values, using 9s is optimal. For example, 9² = 81 versus 1² + 8² = 65. So we should greedily use as many 9s as possible.

**Greedy approach:**
1. First, check if it's even possible: if `sum > num × 9`, we cannot form a good number (return "")
2. Calculate how many 9s we can use: `num_nines = sum // 9`
3. Calculate the remainder: `remainder = sum % 9`
4. Build the number:
   - Start with the remainder digit (if > 0), then fill with as many 9s as possible
   - Fill remaining positions with 0s to reach exactly `num` digits
5. This gives us the maximum score (because we maximize larger digits), and the arrangement (remainder first, then 9s, then 0s) gives us the largest number with that score

### Corner cases to consider

- `sum = 0` but `num > 0`: Impossible unless `num = 0` (but constraints say `num ≥ 1`), return ""
- `sum = 0` and `num = 1`: Should return "0" (single digit zero)
- `sum > num × 9`: Impossible to achieve, return ""
- `sum` is very small and `num` is large: Need many zeros, e.g., `num = 5, sum = 1` → "10000"
- `num = 1` and `sum ≤ 9`: Return the digit itself as a string
- All 9s case: `sum = num × 9` → return string of all 9s

### Solution

```python
def maximizeSquareDigitsSum(num: int, sum: int) -> str:
    # Check if it's impossible to form a good number
    # Maximum possible digit sum with num digits is num * 9
    if sum > num * 9:
        return ""
    
    # Special case: if sum is 0, only valid if num is 0 (but num >= 1)
    # However, if num = 1 and sum = 0, return "0"
    if sum == 0:
        return "0" if num == 1 else ""
    
    # Calculate how many 9s we can use
    num_nines = sum // 9
    remainder = sum % 9
    
    # Build the result string
    result = ""
    
    # Add remainder digit first (if it exists) to get the largest number
    if remainder > 0:
        result += str(remainder)
    
    # Add all the 9s
    result += "9" * num_nines
    
    # Calculate how many zeros we need to fill
    # Total digits used so far = (1 if remainder > 0 else 0) + num_nines
    digits_used = len(result)
    zeros_needed = num - digits_used
    
    # Add zeros to reach exactly num digits
    result += "0" * zeros_needed
    
    return result
```

### Time and Space Complexity Analysis

- **Time Complexity:** O(num) – We construct a string of length `num` by concatenating the remainder digit, multiple 9s, and multiple 0s. String concatenation using `+=` in Python is amortized O(1) per character, giving us O(num) overall.

- **Space Complexity:** O(num) – The output string has exactly `num` digits, so we need O(num) space to store the result. No additional data structures are used beyond the output.

### Potential follow-up questions (as if you're the interviewer)

- (Follow-up question 1)  
  *What if we also wanted to return the maximum score (sum of squares of digits) along with the number?*  
  *Hint: Calculate sum of squares directly from the constructed digits. Remainder² + 81 × num_nines.*

- (Follow-up question 2)  
  *How would you solve this if we needed to return all good integers with the maximum score, not just the largest one?*  
  *Hint: After finding the max score, use backtracking or permutation generation to find all digit arrangements that give that score.*

- (Follow-up question 3)  
  *What if instead of maximizing the sum of squares, we needed to find the lexicographically largest number that achieves the maximum score?*  
  *Hint: Consider how different digit arrangements affect lexicographic order; you may need to adjust digit placement strategy.*

### Summary

This problem uses a **greedy algorithm** combined with **digit construction**. The key pattern is recognizing that to maximize the sum of squares, we should prioritize larger digits (9s). Since larger digits contribute exponentially more to the score, filling from 9s downward is optimal. The solution builds the number by:
1. Using as many 9s as possible
2. Placing any remainder (sum mod 9) at the front
3. Filling remaining positions with 0s

This pattern appears in similar problems like coin change, activity selection, and other optimization problems where greedy locally-optimal choices lead to globally-optimal solutions. It's a fundamental technique for digit manipulation and construction problems.


### Flashcard
Greedily use as many 9s as possible to maximize the sum of squares; if digit_sum > 9 × num_digits, use (num_digits − 1) nines and one smaller digit.

### Tags
Math(#math), Greedy(#greedy)

### Similar Problems
