### Leetcode 3753 (Hard): Total Waviness of Numbers in Range II [Practice](https://leetcode.com/problems/total-waviness-of-numbers-in-range-ii)

### Description  

Given two integers `num1` and `num2`, return the total waviness of all numbers in the range [num1, num2].

A number's **waviness** is the count of peaks and valleys in its digits. A digit at position i is:
- A **peak** if digit[i-1] < digit[i] > digit[i+1]
- A **valley** if digit[i-1] > digit[i] < digit[i+1]

For example, the number 4848 has 2 waves: the second digit 8 is a peak and the third digit 4 is a valley.


### Examples  

**Example 1:**  
Input: `num1 = 10, num2 = 20`  
Output: `3`  
*Explanation: Waviness of 11 is 0, 12 is 0, 13 is 1 (peak at 3), 14 is 1, 15 is 1, 16 is 1, 17 is 1, 18 is 1, 19 is 1, 20 is 0. Total = 1 + 1 + 1 = 3*

**Example 2:**  
Input: `num1 = 4848, num2 = 4848`  
Output: `2`  
*Explanation: The number 4848 has the second digit 8 as a peak and the third digit 4 as a valley, giving a waviness of 2*

**Example 3:**  
Input: `num1 = 1, num2 = 10`  
Output: `0`  
*Explanation: Single and double-digit numbers cannot have peaks or valleys (require at least 3 digits)*


### Thought Process (as if you're the interviewee)  

**Brute Force Approach:** Iterate through all numbers from num1 to num2 and for each number, count the peaks and valleys. This would be O((num2 - num1) × log(num2)) which is too slow for large ranges.

**Optimization - Digit DP:** Use a digit dynamic programming technique similar to "count numbers with restricted digit sum" problems. The key insight is to use the mathematical property:
```
waviness(num1, num2) = waviness(0, num2) - waviness(0, num1 - 1)
```

This reduces the problem to counting total waviness from 0 to n for any given n.

**Why Digit DP:** We build numbers digit-by-digit and track:
- Current position in the number
- Previous two digits (to determine if current digit forms a peak/valley)
- Whether we're still bounded by the upper limit (tight constraint)
- Whether we've started placing non-zero digits (leading zeros)

For each valid state, we count how many numbers satisfy the waviness condition and accumulate their contributions.

**Trade-offs:** Digit DP is complex but necessary here because brute force would timeout on large ranges (up to 10⁹). The memoization reduces repeated calculations significantly.


### Corner cases to consider  

- Single-digit numbers: No peaks or valleys possible
- Two-digit numbers: No peaks or valleys possible (need at least 3 digits)
- Numbers with leading zeros: Must track whether we've started the actual number
- Range boundaries: num1 = 1 or num1 = 0
- Full range: num1 = num2 (single number query)
- Large numbers: Up to 10⁹ require efficient digit DP
- All same digits: No peaks or valleys (e.g., 1111)


### Solution

```python
def totalWaviness(num1: int, num2: int) -> int:
    def count_waviness(n):
        if n < 0:
            return 0
        
        s = str(n)
        m = len(s)
        memo = {}
        
        def dp(idx, prev1, prev2, tight, started):
            # idx: current position
            # prev1: digit at position idx-1
            # prev2: digit at position idx-2
            # tight: whether we're bounded by the upper limit
            # started: whether we've placed a non-zero digit
            
            if idx == m:
                return 0
            
            state = (idx, prev1, prev2, tight, started)
            if state in memo:
                return memo[state]
            
            limit = int(s[idx]) if tight else 9
            result = 0
            
            for digit in range(0, limit + 1):
                new_tight = tight and (digit == limit)
                new_started = started or (digit != 0)
                
                # Count peaks and valleys only after we've started
                # and have at least 3 digits (idx >= 2)
                waves_count = 0
                if new_started and idx >= 2:
                    # Check if prev2 forms a peak
                    if prev2 > prev1 and prev1 < digit:
                        waves_count = 1
                    # Check if prev2 forms a valley
                    elif prev2 < prev1 and prev1 > digit:
                        waves_count = 1
                
                # Contribution from all suffixes with this digit fixed
                if not new_started:
                    # Still in leading zeros
                    suffix_result = dp(idx + 1, digit, prev1, new_tight, False)
                else:
                    suffix_result = dp(idx + 1, digit, prev1, new_tight, True)
                
                # Add contribution: this digit's waves + all suffixes
                result += waves_count + suffix_result
            
            memo[state] = result
            return result
        
        return dp(0, -1, -1, True, False)
    
    # Total waviness from num1 to num2 using difference
    return count_waviness(num2) - count_waviness(num1 - 1)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × 10 × 10 × 2 × 2) = O(m) where m is the number of digits in num2. The digit DP has at most 10 × 10 possible values for prev1 and prev2, 2 states for tight and started flags, and 10 digit choices at each position. With memoization, each state is computed once.

- **Space Complexity:** O(m × 10 × 10 × 2 × 2) = O(m) for the memoization dictionary storing all possible states. The recursion stack depth is at most m (number of digits).


### Potential follow-up questions (as if you're the interviewer)  

- (What if you needed to optimize space further?)  
  *Hint: Consider space-optimized DP where you only keep track of the current and previous rows. Think about whether all historical states are needed.*

- (How would the approach change if you needed to count numbers with waviness equal to exactly k?)  
  *Hint: Add another DP state to track the current waviness count and stop exploring branches where waviness exceeds k.*

- (Can you extend this to count numbers where waviness is within a range [k1, k2]?)  
  *Hint: Modify the DP to track both minimum and maximum waviness constraints simultaneously, returning results for all values in range.*

### Summary

This problem applies the **Digit DP** pattern—a technique for efficiently solving range-based digit constraint problems. The key strategy is decomposing the range query into two boundary queries using the difference method. We build numbers digit-by-digit while tracking the previous two digits to identify peaks and valleys, maintaining a tight bound constraint to ensure we don't exceed the upper limit. The pattern appears in problems like "count integers in range with specific digit properties" and can be adapted for various digit-based constraints by modifying the state tracking and counting logic.

### Tags
Math(#math), Dynamic Programming(#dynamic-programming)

### Similar Problems
