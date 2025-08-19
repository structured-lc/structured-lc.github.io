### Leetcode 484 (Medium): Find Permutation [Practice](https://leetcode.com/problems/find-permutation)

### Description  
Given a secret signature string s consisting only of the characters 'I' (increase) and 'D' (decrease), your task is to find the **lexicographically smallest permutation** of the numbers [1, 2, ..., n] that fits this signature, where n = len(s) + 1.  
- For every "I" in s, the next number must be greater (perm[i] < perm[i+1]).  
- For every "D" in s, the next number must be smaller (perm[i] > perm[i+1]).  
The returned permutation should be the smallest possible in lexicographical order that matches s.

### Examples  

**Example 1:**  
Input: `"I"`  
Output: `[1, 2]`  
Explanation: Only one increasing relationship possible: 1 < 2.

**Example 2:**  
Input: `"DI"`  
Output: `[2, 1, 3]`  
Explanation:  
- Between first and second: D ⇒ 2 > 1  
- Between second and third: I ⇒ 1 < 3  
There are multiple valid permutations (e.g., [3,1,2]), but [2,1,3] is lexicographically smallest.

**Example 3:**  
Input: `"DDI"`  
Output: `[3, 2, 1, 4]`  
Explanation:  
- D: 3 > 2  
- D: 2 > 1  
- I: 1 < 4  
This is the smallest permutation that fits the pattern.

### Thought Process (as if you’re the interviewee)  
- **Brute-force**: Try all possible permutations of 1 to n, check which fit the pattern, then select the lex smallest.  
  - This is not efficient: too slow for larger n (as n! grows very fast).
- **Optimized intuition**:  
  - Wherever an 'I' occurs, increase order, wherever a 'D' occurs, decrease order.
  - To get the lex smallest permutation, process from left to right:
    - Start with the sequence [1,2,3,...,n].
    - For every consecutive run of 'D's, reverse that subarray.
  - This is because to satisfy the 'D' at index i, perm[i] > perm[i+1], so make the smallest available numbers be in decreasing order for all 'D' runs.
  - We iterate through the string; for each segment ending at an 'I' or at the string end, if there's a prior run of 'D's, reverse that part of the constructed permutation.

### Corner cases to consider  
- Single character: e.g., s = "I" or "D"
- All 'I's or all 'D's (monotonic signature)
- Very long string (efficient algorithm required)
- No 'I' or no 'D'
- Handling last 'D' sequence at the end of s

### Solution

```python
def findPermutation(s):
    n = len(s) + 1
    perm = list(range(1, n + 1))  # Start with [1, 2, ..., n]
    i = 0
    while i < len(s):
        if s[i] == 'D':
            # Find the end of the current 'D' run
            start = i
            while i < len(s) and s[i] == 'D':
                i += 1
            # Reverse perm[start : i + 1]
            perm[start : i + 1] = perm[start : i + 1][::-1]
        else:
            i += 1
    return perm
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  - We scan s once and reverse subarrays only for maximal contiguous 'D' runs, each element is reversed at most once.
- **Space Complexity:** O(n)  
  - Only store the output permutation and a few counters.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you generate all valid permutations that follow s?
  *Hint: Backtracking, but time complexity will be much higher.*

- What if the signature allows more characters (e.g., 'E' for equal)?
  *Hint: Need to extend the logic—currently, only strictly increasing/decreasing are supported.*

- How to do it in-place or with less extra space?
  *Hint: We already mutate the list in-place during reversal.*

### Summary
This problem demonstrates a classic greedy approach: when asked for the lexicographically smallest permutation matching a sequence of "I"/"D" relations, process each maximal downward ('D') sequence with a reversal to guarantee minimal values for rising sequences and large values "falling" for decreases. This "run reversal" pattern also applies in other problems where relative orderings are given by patterns (e.g., "minimum number following pattern," stack permutations).

### Tags
Array(#array), String(#string), Stack(#stack), Greedy(#greedy)

### Similar Problems
- Using a Robot to Print the Lexicographically Smallest String(using-a-robot-to-print-the-lexicographically-smallest-string) (Medium)