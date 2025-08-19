### Leetcode 1955 (Hard): Count Number of Special Subsequences [Practice](https://leetcode.com/problems/count-number-of-special-subsequences)

### Description  
Given an array `nums` consisting only of 0s, 1s, and 2s, return the number of *special* subsequences.  
A **special subsequence** has:
- At least one 0 (all at the start),
- followed by at least one 1 (all together, after all 0s),
- followed by at least one 2 (all together, after all 1s).

You may delete some or no elements and keep the original order. Two subsequences are different if they use distinct indices. The answer must be given modulo 10⁹+7.

Examples of valid:  
`[0,1,2]`, `[0,0,1,1,2,2,2]`  
Examples of invalid:  
`[2,1,0]`, `[0,1]`, `[1,2,2]`, `[0,1,2,0]`

### Examples  

**Example 1:**  
Input: `[0,1,2,2]`  
Output: `3`  
Explanation:  
The special subsequences:
- `[0,1,2]` (indices 0,1,2)
- `[0,1,2]` (indices 0,1,3)
- `[0,1,2,2]` (indices 0,1,2,3)

**Example 2:**  
Input: `[2,2,0,0,1,2]`  
Output: `4`  
Explanation:  
The possible are  
- indices 2,4,5: `[0,1,2]`  
- indices 2,4,3,5: `[0,0,1,2]`  
- indices 3,4,5: `[0,1,2]`  
- indices 3,4,5: `[0,1,2]` (there are two different indices with 2,4,5 and 3,4,5)

**Example 3:**  
Input: `[0,1,2,0,1,2]`  
Output: `7`  
Explanation:  
There are 7 possible special subsequences by picking different combinations of the three required sections.

### Thought Process (as if you’re the interviewee)  
First, brute-force considers trying all possible subsequences and checking if each fits the special form. But an array of length n has 2ⁿ subsequences—completely infeasible.

Recognizing the "all 0s, then all 1s, then all 2s" structure, I can instead keep track as I iterate over the array:
- How many subsequences end with 0 (count0)?
- How many extend those with a 1 (count1)?
- How many extend those with a 2 (count2)?

For each number:
- If it's 0: Every existing "0-seq" can have or not have this new 0, plus a new seq starts with this 0.
- If it's 1: Every existing "1-seq" can take this 1 or not, plus every "0-seq" can be extended with a 1.
- If it's 2: Every existing "2-seq" can take this 2 or not, plus every "1-seq" can be extended with a 2.

This is an iterative dynamic programming with three states.  
Time: O(n), no nested loops!  
Space: O(1) - just three counters.

### Corner cases to consider  
- Empty array → 0
- Arrays with all 0s, all 1s, or all 2s → 0 (must have all three)
- Arrays with missing any of 0, 1, or 2 → 0
- Repeated 0s, 1s, or 2s
- Large arrays: ensure mod is used accordingly

### Solution

```python
def countSpecialSubsequences(nums):
    mod = 10**9 + 7
    
    # count0: special subsequences ending with 0's
    # count1: special subsequences ending with 1's (after at least one 0)
    # count2: special subsequences ending with 2's (after at least one 0 and one 1)
    count0, count1, count2 = 0, 0, 0

    for num in nums:
        if num == 0:
            # We can either extend any previous "all-0" subsequence with this 0,
            # or start a new "all-0" subsequence from this 0 alone.
            count0 = (2 * count0 + 1) % mod
        elif num == 1:
            # We can either extend any previous "all-1" subsequence,
            # or extend any previous "all-0" subsequence by appending this 1.
            count1 = (2 * count1 + count0) % mod
        elif num == 2:
            # We can either extend any previous "all-2" subsequence,
            # or extend any previous "all-1" subsequence by appending this 2.
            count2 = (2 * count2 + count1) % mod

    return count2
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n). We process each number exactly once, constant operations per element.
- **Space Complexity:** O(1), only three counters are maintained regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you needed to return all the actual subsequences, not just the count?  
  *Hint: Use backtracking, but this would be exponential in time and space.*

- How would you modify this if the valid sequence required four blocks: 0s, 1s, 2s, then 3s?  
  *Hint: Generalize your DP to four states.*

- What if elements could be any integer, and you had to count all subsequences of the form a,b,c (strictly increasing distinct blocks)?  
  *Hint: Sort input, then try dynamic programming across values with more states.*

### Summary
This problem fits the classic "count subsequences with a pattern" dynamic programming pattern, where at each stage we use previous results to extend all candidates efficiently.  
The core DP state tracking (count0, count1, count2) is a powerful approach for similar problems involving subsequences with block requirements—an interview favorite!

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
