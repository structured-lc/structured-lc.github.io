### Leetcode 248 (Hard): Strobogrammatic Number III [Practice](https://leetcode.com/problems/strobogrammatic-number-iii)

### Description  
Given two strings representing two integers, **low** and **high**, where low ≤ high, count how many **strobogrammatic numbers** exist in the range [low, high].  
A **strobogrammatic number** is a number that looks the same when rotated 180° (turned upside down). Examples: 69, 88, and 1 are strobogrammatic; 2 and 3 are not.  
Be aware the range can represent very large numbers, so you are given the bounds as strings.

### Examples  

**Example 1:**  
Input: `low = "50", high = "100"`  
Output: `3`  
Explanation: The strobogrammatic numbers in this range are 69, 88, and 96.

**Example 2:**  
Input: `low = "0", high = "0"`  
Output: `1`  
Explanation: 0 itself is strobogrammatic.

**Example 3:**  
Input: `low = "1", high = "181"`  
Output: `6`  
Explanation: The strobogrammatic numbers in this range are 1, 8, 11, 69, 88, and 96.


### Thought Process (as if you’re the interviewee)  

Let's start by understanding strobogrammatic digits and how we can form strobogrammatic numbers.
- Allowed strobogrammatic digit mappings:  
  - 0 ↔ 0
  - 1 ↔ 1
  - 6 ↔ 9
  - 8 ↔ 8
  - 9 ↔ 6

The brute-force idea:
- For every number in range [low, high], check if the number is strobogrammatic. But the range can be up to 10¹⁵, so brute force is not feasible.

Optimization:
- We'll **generate** all possible strobogrammatic numbers of lengths from len(low) to len(high), using a recursive (DFS) approach that builds numbers from outside in.
- For each generated number:
  - Skip leading zeros (except for "0" itself).
  - Check if it is within the [low, high] range.
- Count only those numbers that meet the above criteria.

Trade-offs:
- Recursion generates only valid candidates, so there's no wasted effort.
- No need to generate numbers outside the digit length we need.
- Comparing strings allows us to handle very large numbers (as input is string).

Why this is preferred:
- DFS only explores valid numbers. Building candidates directly means we need not do additional filtering afterward.
- This approach is standard for permutation-based range-constrained enumeration.

### Corner cases to consider  
- low and high are the same value
- Range contains "0" (which is a valid strobogrammatic number)
- Leading zeros: skip numbers with leading zero, except when the number is "0"
- Different digits lengths: e.g., low="8", high="101"
- Input such that no strobogrammatic number exists in the range
- Both low and high may be very long (up to 15 digits)
- low or high at boundary of strobogrammatic numbers (e.g. low="69", high="69")

### Solution

```python
def strobogrammaticInRange(low: str, high: str) -> int:
    # strobogrammatic number pairs (outside↔inside)
    pairs = [('0','0'), ('1','1'), ('6','9'), ('8','8'), ('9','6')]
    
    def dfs(n, total_length):
        # Base cases:
        if n == 0:
            return [""]
        if n == 1:
            return ["0", "1", "8"]
        
        middles = dfs(n-2, total_length)
        result = []
        for mid in middles:
            for a, b in pairs:
                # Skips numbers with leading '0' (unless it's top-level and single-digit "0")
                if n == total_length and a == '0':
                    continue
                result.append(a + mid + b)
        return result
    
    count = 0
    for length in range(len(low), len(high)+1):
        candidates = dfs(length, length)
        for num in candidates:
            # skip numbers with leading zero (but allow '0' itself)
            if (len(num) > 1 and num[0] == '0'):
                continue
            # Range check as string comparison is enough for same length numbers
            if ( (len(num) > len(low) or num >= low) and
                 (len(num) < len(high) or num <= high) ):
                count += 1
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  The number of strobogrammatic numbers of length n grows exponentially (roughly O(5ⁿ)), but in practice for input up to 15 digits, recursion is manageable because most generated numbers are immediately pruned by range checks, and leading-zero skips further cut down candidates.

- **Space Complexity:**  
  O(L) for recursion stack, where L is the max number length (≤ 15). Space for storing current numbers is manageable since we build and discard each candidate on the fly.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we wanted to **list all strobogrammatic numbers** in the range, not just count them?  
  *Hint: Modify the DFS to collect valid candidates into a result list instead of just counting.*

- How would your approach change if **low** and **high** can be negative (e.g., allow negative signs)?  
  *Hint: Negative strobogrammatic numbers are not possible since '-' is not strobogrammatic.*

- Can you optimize by **counting** strobogrammatic numbers without full generation, for very large ranges?  
  *Hint: Determine the total count by combinatorial reasoning and subtract out-of-range cases (tricky for arbitrary lower and upper bounds).*

### Summary
We **generate** all strobogrammatic numbers of lengths between those of low and high using DFS with backtracking, **pruning** any with leading '0' (other than "0" itself), and **count** only those falling within the string-bounds. This is a classic use of recursive construction for palindromic (symmetrical) patterns and constrained enumeration. The pattern is reusable for questions where you must generate numbers/strings with custom symmetry or self-inverse properties, such as palindromes or reflection-invariant strings.