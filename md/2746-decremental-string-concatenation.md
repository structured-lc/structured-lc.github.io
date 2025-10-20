### Leetcode 2746 (Medium): Decremental String Concatenation [Practice](https://leetcode.com/problems/decremental-string-concatenation)

### Description  
You're given an array of strings `words` (size n). You must **join all strings into one**, but when joining two strings, if the last character of the first string matches the first character of the second string, you must remove one of these duplicate characters (so they don't overlap in the merged result). At each join, you can choose to append or prepend the next string to your current result. After all joins, **return the minimum possible length** of the resulting string.

### Examples  

**Example 1:**  
Input: `words = ["ab","bc","cd"]`  
Output: `4`  
*Explanation:*
- Join order 1: ((("ab"+"bc")="abc")+"cd"="abcd") length 4.
- If we do: `ab` + `cd` = "`abcd`"; then prepend "`bc`": "`bcabcd`" (but we can merge at the boundary).  
Best is `"a" + "b" + "c" + "d"="abcd"` (since `"ab" + "bc"` → `"abc"` with overlap b; then `"abc" + "cd"` → `"abcd"` with overlap c).  
Final string: `"abcd"`, length 4.

**Example 2:**  
Input: `words = ["a","ab","bc"]`  
Output: `3`  
*Explanation:*
- Join order: ((("a" + "ab") = "ab") + "bc" = "abc")  
Using all allowed overlaps, result is `"abc"` of length 3.

**Example 3:**  
Input: `words = ["aa","aa","aa"]`  
Output: `2`  
*Explanation:*
- Every join, `"aa" + "aa"` shares "a", so reduces by 1: first join gives `"aa"`, then joining last `"aa"` gets `"aa"` again.  
All overlaps: result is `"aa"` (length 2).

### Thought Process (as if you’re the interviewee)  
- **Brute force:** Try every possible order and choice (append/prepend) of joining strings. This leads to a tree of \(2^{n-1}\) possible states (impractical for n up to 100 or more).
- **Observation:** The way we join (append/prepend) and the overlap at boundaries depends only on the **first and last characters** of our current formed string.
- Define state as: starting from position i, with current head 'a' and tail 'b' (the first and last character of the concatenated result so far).
- **DP approach:** Use recursion with memoization: `dp(i, first, last)` = minimum length from i to n-1, given current string has first char 'first' and last char 'last'.
    - At each step, join next word by either appending (so overlap is possible at current tail and next word's head) or prepending (overlap possible at current head and next word's tail).
    - Combine those overlaps, minimize total resulting length.
- **Tradeoff:**  
    - Space: Need to remember dp at each (i, head, tail) – |words| × 26 × 26.  
    - Time: Each state visited once, so O(n×26×26). Efficient.

### Corner cases to consider  
- One word only (no joins): return its length.
- All overlaps are possible (e.g., all words are a single repeated letter).
- No possible overlaps (words don't share start/end characters).
- Words of different lengths.
- Mixed overlapping/non-overlapping cases.

### Solution

```python
def minimizeConcatenatedLength(words):
    n = len(words)
    from functools import lru_cache

    # dp(i, left, right): min length from i st words[i:] concatenated,
    # current string starts with 'left', ends with 'right'
    @lru_cache(maxsize=None)
    def dp(i, left, right):
        if i == n:
            return 0
        w = words[i]
        w_len = len(w)
        w_left, w_right = w[0], w[-1]

        # Choice 1: append (so, overlap right of current with w_left)
        overlap1 = 1 if right == w_left else 0
        cost1 = dp(i+1, left, w_right) + w_len - overlap1

        # Choice 2: prepend (so, overlap left of current with w_right)
        overlap2 = 1 if w_right == left else 0
        cost2 = dp(i+1, w_left, right) + w_len - overlap2

        return min(cost1, cost2)

    # Start with words[0] as the initial string
    return len(words[0]) + dp(1, words[0][0], words[0][-1])
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × 26 × 26)  
  Each state is dp(i, left, right) for 0 ≤ i ≤ n, 26 possible left, 26 possible right characters (as only lowercase English letters possible).
- **Space Complexity:** O(n × 26 × 26)  
  For memoization storage (dp cache), plus recursion stack depth O(n).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you are given restrictions on which word can be joined after which?
  *Hint: Represent as a graph, try with graph search/DP with state transitions only along valid links.*

- How would you modify the solution to output not just the minimum length, but the sequence of joins or the string itself?
  *Hint: Store choices during DP or reconstruct from a prev array.*

- Suppose words can have uppercase letters. What changes?
  *Hint: DP state and cache size grows to 52×52 for ASCII (or consider ord(c) - ord('A') for upper, lower).*

### Summary
This problem is a **top-down DP with memoization and overlapping subproblems**.  
It’s based on tracking "state" as first/last character boundaries, and recursive exploration of two options at each join.  
This **two-pointer dynamic boundary DP** appears in similar string/cost minimization problems, and is highly relevant for optimizing with overlapping subproblems and reconstructing choices (useful for advanced DP and contest questions).


### Flashcard
DP state depends on current string’s first and last char; try appending/prepending each word, track overlaps.

### Tags
Array(#array), String(#string), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Largest Merge Of Two Strings(largest-merge-of-two-strings) (Medium)