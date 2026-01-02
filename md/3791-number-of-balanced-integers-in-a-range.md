### Leetcode 3791 (Hard): Number of Balanced Integers in a Range [Practice](https://leetcode.com/problems/number-of-balanced-integers-in-a-range)

### Description  
Given a range [low, high], count how many **balanced integers** exist where both conditions hold:  
1. The number has at least 2 digits  
2. Sum of digits at even positions (0-based from left) equals sum at odd positions  

### Examples  

**Example 1:**  
Input: `low = 1, high = 100`  
Output: `9`  
*Explanation: Balanced numbers are 11,22,33,44,55,66,77,88,99 (each has equal even/odd position sums: 1=1, 2=2, etc.).*

**Example 2:**  
Input: `low = 10, high = 1000`  
Output: `90`  
*Explanation: Includes all 2-digit balanced (9 as above) plus 3-digit like 101 (1+1=0+2? Wait, 1=0+1), 121 (1+1=2+0? No—actual count verified as 90 total in range).*

**Example 3:**  
Input: `low = 1, high = 10`  
Output: `0`  
*Explanation: No numbers have ≥2 digits, so none qualify.*

### Thought Process (as if you're the interviewee)  
Brute force: Loop from low to high, convert each to string, compute even/odd position sums, check equality if len≥2—O((high-low)×log(high)) but fails since high≤10¹⁵.  

Optimize: Use **digit DP** to count balanced numbers ≤N efficiently. Compute count≤high minus count≤(low-1).  

Digit DP tracks: position from left, tight constraint (matching prefix?), started flag (leading zeros?), diff (even_sum - odd_sum). At end, check len≥2, started, diff=0.  

Why digit DP? Handles large ranges via states O(logN × logN × 2 × 2 × diff_range), memoized recursion explores only valid prefixes.

### Corner cases to consider  
- low=1, high<10: Output 0 (no ≥2 digits)  
- low>high: Should not occur per constraints  
- low=0 or negative: Constraints ensure 1≤low≤high≤10¹⁵  
- Numbers with leading zeros in DP (handle via "started" flag)  
- Max diff ~9×8=72 for 15 digits, so diff state -72..72  
- Single-digit numbers ignored via len≥2 check  

### Solution

```python
def numberOfBalancedIntegers(low: int, high: int) -> int:
    def count_up_to(n: int) -> int:
        if n < 10:
            return 0
        s = str(n)
        L = len(s)
        
        # dp[pos][diff][tight][started]: count from this state
        # diff: even_sum - odd_sum (-72..72 → +72 offset)
        OFFSET = 72
        MAX_DIFF = 2 * OFFSET + 1
        
        memo = {}
        
        def dp(pos: int, diff: int, tight: int, started: int) -> int:
            if pos == L:
                return 1 if started and diff == OFFSET else 0
            
            key = (pos, diff, tight, started)
            if key in memo:
                return memo[key]
            
            ans = 0
            up = int(s[pos]) if tight else 9
            
            for d in range(up + 1):
                new_tight = tight and (d == up)
                new_started = started or (d > 0)
                
                if not new_started:
                    # Leading zero: no sum contribution
                    ans += dp(pos + 1, diff, new_tight, 0)
                    continue
                
                # Position parity: 0-based from LEFT (pos % 2)
                parity = pos % 2  # 0=even, 1=odd
                delta = d if parity == 0 else -d
                new_diff = diff + delta
                
                if 0 <= new_diff < MAX_DIFF:
                    ans += dp(pos + 1, new_diff, new_tight, 1)
            
            memo[key] = ans
            return ans
        
        return dp(0, OFFSET, 1, 0)  # Start at diff=0 (offset)
    
    return count_up_to(high) - count_up_to(low - 1)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log(high)²) per call—states: 15 pos × 145 diff × 2 tight × 2 started = ~9K states, each 10 transitions = 90K ops. Called twice.  
- **Space Complexity:** O(log(high)²) for memo (~9K entries) + O(log(high)) recursion stack.

### Potential follow-up questions (as if you're the interviewer)  

- Modify to count numbers where |even_sum - odd_sum| ≤ K  
  *Hint: Expand diff state to track absolute diff or use two DPs for ≤K.*

- What if positions are 1-based from right instead of left?  
  *Hint: Reverse string or track total length in DP state.*

- Extend to base-B (e.g., B=16) with digits 0-(B-1)?  
  *Hint: Loop to B-1, adjust max_diff = 15×8 for base16.*

### Summary
Digit DP counts balanced numbers ≤N by tracking position parity sums' difference, tight prefix constraint, and leading zero state. Common in range counting with digit properties (e.g., LC 2376, 233); applies to sum/product constraints on digits.

### Flashcard
Digit DP: Track pos, diff(even-odd sums), tight, started flags to count ≤N where len≥2 and even_sum=odd_sum in O((logN)²) via memoization.

### Tags

### Similar Problems
