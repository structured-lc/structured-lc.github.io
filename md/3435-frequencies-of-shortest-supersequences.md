### Leetcode 3435 (Hard): Frequencies of Shortest Supersequences [Practice](https://leetcode.com/problems/frequencies-of-shortest-supersequences)

### Description  
You are given an array of strings `words`. Compute the frequency of every unique shortest common supersequence (SCS) of `words`. For each SCS (that is not a permutation of another), determine how many times it appears as the SCS of all permutations of the words array. Return a mapping from each unique SCS to its count.

An SCS of a set of strings is the shortest possible string that contains each of the input strings as a subsequence. For example, SCS of ["ab", "bc"] could be "abc" or "bac". Two SCS strings are considered the same if they are identical character by character, not just by being a permutation of the words order.

### Examples  

**Example 1:**  
Input: `words = ["ab", "bc"]`  
Output: `{"abc": 1, "bac": 1}`  
*Explanation: "abc" is the SCS of ("ab", "bc"). "bac" is the SCS for ("bc", "ab"). Each appears once.*

**Example 2:**  
Input: `words = ["a", "b", "c"]`  
Output: `{"abc": 6}`  
*Explanation: All permutations yield "abc" as the SCS, so the count is 6 (3! permutations).*

**Example 3:**  
Input: `words = ["a", "ab"]`  
Output: `{"ab": 1, "aab": 1}`  
*Explanation: ("a", "ab") → "ab", ("ab", "a") → "aab". Two SCS: "ab" once, "aab" once.*

### Thought Process (as if you’re the interviewee)  
First, consider all possible orderings of the words list (there are n! permutations). For each ordering, compute the SCS for that order. Track the frequency of each unique SCS.

The brute-force way is to:
- Generate all permutations of the words list.
- For each permutation, compute the SCS (using a dynamic programming approach—like merging two strings repeatedly).
- Store each result and count frequencies.

However, with up to 16 words (as the problem usually restricts), n! can get very large. But the SCS of different permutations often end up being identical, so we only need to count unique SCS strings. To optimize:
- Use dynamic programming + memoization for SCS calculation.
- Prune duplicate calculations by using a cache (memo) on tuples of strings.

Trade-offs: Brute force is simple but slow. DP with memo cuts off redundant work but still has worst-case exponential complexity in n.

### Corner cases to consider  
- Only one word: return the word itself, freq=1.
- Every word is the same: only one SCS, freq=n!.
- Words with fully overlapping substrings ("abc", "bc", "c").
- Empty strings in input.
- All single-letter distinct words.

### Solution

```python
from collections import Counter
from itertools import permutations
from functools import lru_cache

def scs(a, b):
    # Compute SCS of 2 strings using DP table.
    m, n = len(a), len(b)
    dp = [[""] * (n+1) for _ in range(m+1)]
    for i in range(m+1):
        for j in range(n+1):
            if i == 0:
                dp[i][j] = b[:j]
            elif j == 0:
                dp[i][j] = a[:i]
            elif a[i-1] == b[j-1]:
                dp[i][j] = dp[i-1][j-1] + a[i-1]
            else:
                # Choose shorter SCS: append char from a or from b
                scs1 = dp[i-1][j] + a[i-1]
                scs2 = dp[i][j-1] + b[j-1]
                if len(scs1) < len(scs2):
                    dp[i][j] = scs1
                elif len(scs2) < len(scs1):
                    dp[i][j] = scs2
                else:
                    # If equal length, use lex order to guarantee unique representation
                    dp[i][j] = min(scs1, scs2)
    return dp[m][n]

def scs_of_list(words):
    # Merge SCS of all words in order
    res = words[0]
    for w in words[1:]:
        res = scs(res, w)
    return res

def frequencies_of_shortest_supersequences(words):
    freq = Counter()
    seen = set()
    for perm in permutations(words):
        scs_str = scs_of_list(perm)
        key = (scs_str)
        freq[key] += 1
    return dict(freq)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n! × k² × n) where n = len(words), k = max word len. All n! permutations, for each we do n-1 SCS merges, each is DP O(k²).
- **Space Complexity:** O(n! × k) worst case for storing all unique SCS strings.

### Potential follow-up questions (as if you’re the interviewer)  

- What if only the frequency of the lexicographically smallest SCS is needed?  
  *Hint: For each permutation, keep track of min SCS only.*

- How to optimize SCS computation for repeated pairs?  
  *Hint: Use memoization on SCS([i..j]) or DP over subsets; cache by index tuple rather than full strings.*

- Can this algorithm be parallelized?  
  *Hint: Yes, dividing permutations among threads, combine counters at the end.*

### Summary
This problem is a combinatorial dynamic programming problem involving generating all permutations and merging words pairwise using SCS DP. The main pattern is leveraging memoized dynamic programming over string pairs and permutations. The pattern applies to problems involving all sequence orderings and iterative pairwise merging, like multi-string LCS/SCS, or combinatorial path/frequency generation tasks.

### Tags
Array(#array), String(#string), Bit Manipulation(#bit-manipulation), Graph(#graph), Topological Sort(#topological-sort), Enumeration(#enumeration)

### Similar Problems
