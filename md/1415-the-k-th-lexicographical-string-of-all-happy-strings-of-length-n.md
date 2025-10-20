### Leetcode 1415 (Medium): The k-th Lexicographical String of All Happy Strings of Length n [Practice](https://leetcode.com/problems/the-k-th-lexicographical-string-of-all-happy-strings-of-length-n)

### Description  
Given two integers **n** and **k**, generate the kᵗʰ lexicographically smallest "happy string" of length n.

A **happy string** is a string of length n where:
- Only characters 'a', 'b', and 'c' are used.
- No two consecutive characters are the same (i.e., it cannot contain "aa", "bb", or "cc").

If there are fewer than k happy strings of length n, return an empty string ('').

### Examples  
**Example 1:**  
Input: `n = 1, k = 3`  
Output: `"c"`  
*Explanation: The happy strings of length 1 are ["a", "b", "c"]. The 3ʳᵈ is "c".*

**Example 2:**  
Input: `n = 1, k = 4`  
Output: `""`  
*Explanation: Only three happy strings of length 1 exist. k=4 is out of bounds, so return empty string.*

**Example 3:**  
Input: `n = 3, k = 9`  
Output: `"cab"`  
*Explanation: There are 12 total happy strings of length 3 in lexicographical order: ["aba", "abc", "aca", "acb", "bab", "bac", "bca", "bcb", "cab", "cac", "cba", "cbc"]. The 9ᵗʰ is "cab".*

### Thought Process (as if you’re the interviewee)  
My first instinct is to generate all happy strings of length n and pick the kᵗʰ in lexicographic order. 

A brute-force way is to use a recursive depth-first search (DFS) or backtracking:
- Start with an empty string.
- At each step, try adding 'a', 'b' or 'c', skipping the character if it matches the last one added.
- When the string reaches length n, collect it as a happy string. 
- Stop recursing if we've generated k happy strings.

Optimizations: 
- Instead of building all strings, we can prune recursion as soon as we've generated k happy strings.
- Since every extension is in a lexicographical order, DFS will naturally generate ordered outputs, so we can stop early.

Trade-off: Brute-force is fine for small n (n ≤ 20), but for large n, we might hit performance/memory constraints. However, problem limits are tight enough for DFS/backtracking to work.

### Corner cases to consider  
- k larger than the number of possible happy strings (should return "").
- n = 1 or other minimal boundary cases.
- k = 1 (should return the very first happy string).
- Repeated characters next to each other are impossible, so handle that during string construction.

### Solution

```python
# Helper for backtracking/DFS

def getHappyString(n, k):
    res = []

    # Backtracking function
    def dfs(curr):
        if len(res) >= k:
            return  # early pruning; only need first k
        if len(curr) == n:
            res.append(curr)
            return
        for ch in 'abc':
            # Don't repeat previous character
            if not curr or curr[-1] != ch:
                dfs(curr + ch)

    dfs("")
    if len(res) < k:
        return ""
    return res[k-1]  # 0-indexed
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(3ⁿ) in the worst case, since each of the n positions has up to 3 choices (but less due to repetition restrictions).
- **Space Complexity:** O(n × min(k, S)), where S is the number of possible happy strings (≤ 2 × 3ⁿ⁻¹). Storing up to k strings only.

### Potential follow-up questions (as if you’re the interviewer)  

- What if n is very large (say, n = 50)?
  *Hint: Is there a way to calculate the kᵗʰ string directly, without generating all?*

- Can you generate only the first k happy strings in order?
  *Hint: Can you adapt the backtracking method to cut off after k found?*

- Could you extend this idea to an arbitrary alphabet or more than 3 characters?
  *Hint: Think about how to change the branching logic during recursion.*

### Summary
This problem is a clear example of the backtracking/DFS pattern, generating valid strings under a set of adjacency constraints. The optimization of stopping after reaching k total outputs, plus pruning repeats, keeps the solution efficient for reasonable n. This coding pattern also applies to permutation/genration questions with adjacency rules or lexicographical ordering.


### Flashcard
Generate all happy strings of length n using DFS or backtracking, stopping once the kᵗʰ string is found.

### Tags
String(#string), Backtracking(#backtracking)

### Similar Problems
