### Leetcode 2014 (Hard): Longest Subsequence Repeated k Times [Practice](https://leetcode.com/problems/longest-subsequence-repeated-k-times)

### Description  
Given a string **s** and an integer **k**, find the longest **subsequence** that can be repeated **at least k times** as a subsequence within **s**.  
If multiple longest sequences exist, return the **lexicographically largest** one.  
A subsequence is formed by deleting any number of characters (possibly zero) without changing order.  
Return an empty string if there is none.

### Examples  

**Example 1:**  
Input: `s = "letsleetcode", k = 2`  
Output: `"let"`  
Explanation:  
- Subsequence "let" can be found twice: ("l e t s l e e t c o d e")  
  1st "let" at indices 0,1,2; 2nd at 4,5,6.  
- "ete" is also valid, but "let" is lexicographically larger.

**Example 2:**  
Input: `s = "bb", k = 2`  
Output: `"b"`  
Explanation:  
- Subsequence "b" appears twice.

**Example 3:**  
Input: `s = "ab", k = 2`  
Output: `""`  
Explanation:  
- No subsequence can be repeated 2 times in "ab".

### Thought Process (as if you’re the interviewee)  

1. **Brute-force idea:**  
   - Generate all possible subsequences and, for each, check if its copy repeated k times is a subsequence of s.
   - Very slow and infeasible due to exponential number of subsequences.

2. **Optimizations:**  
   - Only consider characters that appear at least k times; otherwise, such a character cannot be included in the answer.
   - For each character, the maximum possible count in the answer is ⌊freq[ch]/k⌋.
   - Build possible candidates by generating all combinations (up to max possible length), using only the "hot" characters (with enough frequency).
   - Start checking longer strings first and, for equal length, reverse lexicographical order for tiebreaker.

3. **How to check if a candidate t, repeated k times, is a subsequence of s?**  
   - Use a helper to scan s with multi-pointer.
   - BFS is a good fit: Since max possible length is small (≤ 7), generate candidates and for each, check.
   - Remember to order candidates by (length desc, lex desc).

**Why is max answer length small?**  
- Each inclusion of a character 'x' requires k*count('x') appearances in s.  
- So, max possible answer length = sum over all ch (⌊freq[ch]/k⌋), which will not exceed n//k (using integer division).

**Final Approach:**  
- Count frequencies, build the list of usable chars.
- Generate all possible candidates of length up to n//k (combinatorially, DFS/BFS).
- For each, check if t * k is a subsequence of s.
- Return the longest, lexicographically largest.

### Corner cases to consider  
- All characters same in s (like "aaaaaa", k=2).
- s shorter than k.
- No character occurs at least k times (e.g., s="abc", k=2).
- Multiple candidates of same length (test lexicographical order).
- k = n (s of length n).
- Very large s with only single repeated character.

### Solution

```python
def longest_subsequence_repeated_k(s: str, k: int) -> str:
    from collections import Counter, deque
    
    freq = Counter(s)
    # Only keep chars with enough frequency
    hot_chars = [ch for ch in freq if freq[ch] >= k]
    
    if not hot_chars:
        return ""
    
    # For each hot_char, max usage
    char_max = {ch: freq[ch] // k for ch in hot_chars}
    
    # Build all possible candidate subsequences <= 7 in length (safe upper bound)
    candidates = ['']
    for _ in range(sum(char_max.values())):
        new_candidates = []
        for cand in candidates:
            for ch in hot_chars:
                # Control repetition count for each char
                if cand.count(ch) < char_max[ch]:
                    new_candidates.append(cand + ch)
        candidates += new_candidates
    
    # Remove possible duplicates, sort by (length desc, lex desc)
    candidates = list(set(candidates))
    candidates.sort(key=lambda x: (len(x), x), reverse=True)
    
    def is_subsequence(pattern, s, k):
        # Check if pattern * k is a subsequence of s
        n, idx = len(s), 0
        for _ in range(k):
            j = 0
            for i in range(idx, n):
                if s[i] == pattern[j]:
                    j += 1
                    if j == len(pattern):
                        idx = i + 1
                        break
            else:
                return False
        return True
    
    for cand in candidates:
        if cand and is_subsequence(cand, s, k):
            return cand
    return ""
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
   - Number of candidates is at most sum(char_max.values()) choose length (combinatorially, manageable since max length ≤ 7).
   - For each candidate, subsequence check is O(n \* len(candidate) \* k), but in practice, limited by pruning via character availability.
   - Overall time: O(n \* L \* C), where L = candidate length (≤ 7), C = number of candidates (also small).

- **Space Complexity:**  
   - Extra storage for all candidates (small, up to a few thousand).
   - O(n) for frequency table and candidate queue.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle Unicode or uppercase/lowercase strings?
  *Hint: Adjust character counting, possibly use unicode-aware counters.*

- How to optimize subsequence checking for longer candidates?
  *Hint: Use character index preprocessing and binary search, or use automaton building.*

- What if s is streamed and not available upfront?
  *Hint: You might only be able to do one pass, limits ability to generate all combinations; may need approximation.*

### Summary
This problem combines **backtracking/DFS/BFS** with **greedy candidate pruning** by character frequency.  
It's an application of candidate generation, filtered by feasibility, and used in string subsequence/repetition contexts.  
A similar pattern appears in "counted subsequence" problems, "maximum repeated pattern," or "greatest possible string with constraints."  
Bounding the answer length using total frequency/k is the key insight that makes exhaustive search practical here.


### Flashcard
Find the longest subsequence repeated `k` times by considering only characters that appear at least `k` times.

### Tags
String(#string), Backtracking(#backtracking), Greedy(#greedy), Counting(#counting), Enumeration(#enumeration)

### Similar Problems
- Longest Substring with At Least K Repeating Characters(longest-substring-with-at-least-k-repeating-characters) (Medium)