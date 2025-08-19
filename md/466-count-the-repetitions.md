### Leetcode 466 (Hard): Count The Repetitions [Practice](https://leetcode.com/problems/count-the-repetitions)

### Description  
We define str = [s, n] as the string str which consists of the string s concatenated n times. We define that string s1 can be obtained from string s2 if we can remove some characters from s2 such that it becomes s1. You are given two strings s1 and s2 and two integers n1 and n2. You have the two strings str1 = [s1, n1] and str2 = [s2, n2]. Return the maximum integer m such that str = [str2, m] can be obtained from str1.

### Examples  

**Example 1:**  
Input: `s1 = "acb", n1 = 4, s2 = "ab", n2 = 2`  
Output: `2`  
*Explanation: str1 = "acbacbacbacb", str2 = "abab". We can obtain "abab" from "acbacbacbacb" twice, so m = 2.*

**Example 2:**  
Input: `s1 = "acb", n1 = 1, s2 = "acb", n2 = 1`  
Output: `1`  
*Explanation: str1 = "acb", str2 = "acb". We can obtain "acb" from "acb" once, so m = 1.*


### Thought Process (as if you're the interviewee)  
This is a complex string matching problem with repetition patterns.

**Key Insight:**
We need to find how many times we can form str2 (which is s2 repeated n2 times) as a subsequence from str1 (which is s1 repeated n1 times).

**Brute Force Approach:**
Simulate the process by going through str1 character by character and trying to match str2. But with n1, n2 up to 10^6, this could be too slow.

**Optimization - Pattern Detection:**
Since we're dealing with repeated strings, there will be cycles. When we finish matching one complete s2, we might be at the same position in s1 as we were in some previous iteration. We can detect these cycles and use them to avoid simulating the entire process.

**Algorithm:**
1. For each complete s1, track how many complete s2s we can match and where we end up in s2
2. Look for cycles - same starting position in s2 leads to same results
3. Use the cycle to calculate the final answer without full simulation

**State Tracking:**
- Track position in s2 after processing each complete s1
- Track how many complete s2s we've matched after each complete s1
- When we see the same s2 position again, we've found a cycle


### Corner cases to consider  
- s2 contains characters not in s1: Return 0  
- s1 and s2 are identical: Simple case  
- Very large n1, n2: Need cycle detection to avoid timeout  
- n2 = 1: Simpler subproblem  


### Solution

```python
# Just like in interviews, please do not use python libraries to take shortcuts.
# They aren't usually allowed in real interviews.
# Add comments to each step of your logic

def getMaxRepetitions(s1, n1, s2, n2):
    if n1 == 0:
        return 0
    
    # Track state after processing each complete s1
    # memo[i] = (count_s2, next_pos) where i is position in s2
    memo = {}
    count_s2 = 0  # How many complete s2s we've matched
    pos_s2 = 0    # Current position in s2
    
    # Process each complete s1
    for count_s1 in range(n1):
        # If we've seen this s2 position before, we found a cycle
        if pos_s2 in memo:
            # Extract cycle information
            prev_count_s1 = memo[pos_s2][0]
            prev_count_s2 = memo[pos_s2][1]
            
            # Calculate cycle metrics
            cycle_length = count_s1 - prev_count_s1
            cycle_s2_count = count_s2 - prev_count_s2
            
            # Calculate how many complete cycles we can fit
            remaining_s1 = n1 - count_s1
            complete_cycles = remaining_s1 // cycle_length
            count_s2 += complete_cycles * cycle_s2_count
            
            # Process remaining s1s after complete cycles
            remaining_after_cycles = remaining_s1 % cycle_length
            for _ in range(remaining_after_cycles):
                for char in s1:
                    if char == s2[pos_s2]:
                        pos_s2 += 1
                        if pos_s2 == len(s2):
                            count_s2 += 1
                            pos_s2 = 0
            break
        
        # Record current state
        memo[pos_s2] = (count_s1, count_s2)
        
        # Process one complete s1
        for char in s1:
            if char == s2[pos_s2]:
                pos_s2 += 1
                if pos_s2 == len(s2):
                    count_s2 += 1
                    pos_s2 = 0
    
    # Return how many complete str2s we can form
    return count_s2 // n2

```

### Time and Space complexity Analysis  

- **Time Complexity:** O(|s1| × |s2|) in the worst case when no cycles are found, but typically much better due to cycle detection. The cycle detection ensures we don't process all n1 iterations.
- **Space Complexity:** O(|s2|) for the memoization table storing at most |s2| different states.


### Potential follow-up questions (as if you're the interviewer)  

- What if you need to return the actual subsequence positions rather than just the count?  
  *Hint: Modify the algorithm to track and store the actual character positions during the matching process*

- How would you solve this if s1 and s2 could contain any characters, not just lowercase letters?  
  *Hint: The algorithm remains the same - character comparison works for any character set*

- What if you needed to find the lexicographically smallest subsequence instead of counting?  
  *Hint: This becomes a different problem requiring greedy selection of characters rather than cycle detection*

### Summary
This problem demonstrates advanced string processing with cycle detection optimization. The key insight is recognizing that when dealing with repeated patterns, cycles will emerge that allow us to skip redundant computation. The state-based memoization approach captures these cycles efficiently. This pattern of cycle detection appears in many problems involving repeated operations or patterns, particularly those with large iteration counts that would otherwise lead to timeouts.

### Tags
String(#string), Dynamic Programming(#dynamic-programming)

### Similar Problems
