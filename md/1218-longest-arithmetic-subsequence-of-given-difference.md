### Leetcode 1218 (Medium): Longest Arithmetic Subsequence of Given Difference [Practice](https://leetcode.com/problems/longest-arithmetic-subsequence-of-given-difference)

### Description  
Given an array of integers and a target difference, find the length of the longest subsequence where the difference between adjacent elements is always equal to the given difference.  
A **subsequence** is any sequence that can be derived by deleting some (or no) elements from the array, without changing the order of the remaining elements.

### Examples  

**Example 1:**  
Input: `arr = [1,2,3,4]`, `difference = 1`  
Output: `4`  
Explanation: The longest arithmetic subsequence is `[1,2,3,4]`. Each adjacent difference is 1.

**Example 2:**  
Input: `arr = [1,3,5,7]`, `difference = 1`  
Output: `1`  
Explanation: No two numbers have a difference of 1, so the answer is any single element (length 1).

**Example 3:**  
Input: `arr = [1,5,7,8,5,3,4,2,1]`, `difference = -2`  
Output: `4`  
Explanation: The longest arithmetic subsequence is `[7,5,3,1]`, each next number is 2 less than the previous.

### Thought Process (as if you’re the interviewee)  

Brute-force:  
- Try all possible subsequences and check if each forms a valid arithmetic sequence with the given difference.
- For each element, recursively or iteratively find the next valid candidate.
- This is exponential in time (2ⁿ), which is too slow for n up to 10⁵.

Can we optimize?  
- We notice that if we know the length of the longest valid subsequence ending at a certain value, we can extend that by checking for value + difference (or value - difference for negative steps).
- This suggests dynamic programming with a hash map.

Optimized approach:  
- For each number a in arr, the best length of a sequence ending at a is one more than the best length ending at a - difference.
- We loop through arr, for each a do:  
  dp[a] = dp.get(a - difference, 0) + 1  
- Keep track of the maximum dp[a] seen so far.

This is O(n) time and O(n) space.

### Corner cases to consider  
- Array with all equal elements (difference = 0)
- Negative difference value
- Array of length 1
- No subsequence longer than 1 possible
- Empty array (not possible by constraints, but still good to check)
- Large values and large n

### Solution

```python
def longestSubsequence(arr, difference):
    # Dictionary to hold the length of the longest subsequence ending at each value
    dp = {}
    longest = 0

    for num in arr:
        # If there is a subsequence ending at num - difference, extend it
        prev = dp.get(num - difference, 0)
        dp[num] = prev + 1
        # Keep track of the overall max subsequence length
        if dp[num] > longest:
            longest = dp[num]

    return longest
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of arr. Each element is processed once.
- **Space Complexity:** O(n), as we store at most n entries in our dictionary (one for each unique value in arr).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to return the subsequence itself, not just its length?  
  *Hint: Store predecessors i.e., remember index or value chain for reconstruction.*

- Can you solve this if the allowed difference between each pair can vary within a given range?  
  *Hint: This breaks the chain property; sliding window or alternative DP may be needed.*

- How does the solution change if the input array can have up to 10⁹ values, but only a small subset are nonzero?  
  *Hint: The hash map remains efficient because it only grows with distinct reachable values, not with array range.*

### Summary

This problem is a classic application of dynamic programming combined with a hash map for fast lookups, similar to the "Longest Increasing Subsequence (LIS)" but tailored for a specific difference.  
The approach updates lengths map (DP) in a single pass and has many parallels to problems involving subsequences/strings and prefix-based logic.  
This pattern appears in other arithmetic progression, jump game, and chain-building problems.


### Flashcard
Use a hash map to track the length of the longest subsequence ending at each value; for each num, set dp[num] = dp[num-diff] + 1.

### Tags
Array(#array), Hash Table(#hash-table), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Destroy Sequential Targets(destroy-sequential-targets) (Medium)