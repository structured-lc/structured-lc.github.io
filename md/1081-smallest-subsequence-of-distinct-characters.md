### Leetcode 1081 (Medium): Smallest Subsequence of Distinct Characters [Practice](https://leetcode.com/problems/smallest-subsequence-of-distinct-characters)

### Description  
Given a string `s`, return the **lexicographically smallest subsequence** of `s` that contains every **distinct character** in `s` exactly once.  
A *subsequence* is a sequence made by deleting some (or no) characters from the original string, keeping the order.  
For example, `"abcde"` has subsequences like `"ace"`, `"abcd"`, and `"bce"`.  
Here, you need to pick each unique character exactly once, in order, so that the resulting string is as small as possible in dictionary order.

### Examples  

**Example 1:**  
Input: `s = "bcabc"`  
Output: `abc`  
*Explanation: All unique characters are `'a'`, `'b'`, and `'c'`.  
By removing the second `'b'` and the first `'c'`, `"abc"` is the lex smallest.*

**Example 2:**  
Input: `s = "cbacdcbc"`  
Output: `acdb`  
*Explanation: Unique letters: `'a'`, `'b'`, `'c'`, `'d'`.  
Forming `"acdb"` keeps order and minimizes lex order, since later `'b'` can be taken after `'d'` and skipping earlier duplicate `'c'`.*

**Example 3:**  
Input: `s = "ecbacba"`  
Output: `eacb`  
*Explanation: Each unique letter appears once, and removing duplicate `'c'`/`'b'`/`'a'` forms `"eacb"`, which is smallest.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Try every possible subsequence with unique letters, sort and pick the smallest.  
  This is clearly exponential and infeasible for `s` up to 1000 characters.
- **Optimize:**  
  Notice that if a character can be placed earlier in the result (i.e., a smaller than current stack top) and later duplicates still exist, it is better to pop the larger one and push the smaller.  
  This leads to a **greedy** approach with a stack, while always ensuring all needed letters will still appear later.
- **Approach:**  
  - Keep a stack for the current smallest sequence being built.
  - Track whether a character is already in the stack (to ensure each is used once).
  - Track the **last occurrence** of each character.
  - For each character:
    - If already in the stack, skip.
    - Otherwise, while the current character is smaller than the top of the stack, and the top still occurs later, pop from stack and mark as not-seen.
    - Push current character, mark as seen.
  - At the end, stack forms the answer.

### Corner cases to consider  
- Empty string (though constraints say 1 ≤ s.length)
- All distinct characters, e.g., `s = "zyx"`
- String where all characters are the same, e.g., `s = "aaaa"`
- Characters appearing more than twice, e.g., `s = "abacb"`
- Already sorted input, e.g., `s = "abcdef"`
- Reverse order, e.g., `s = "fedcba"`

### Solution

```python
def smallestSubsequence(s: str) -> str:
    # Track last occurrence of each character
    last_occurrence = {ch: i for i, ch in enumerate(s)}
    stack = []                # Stack to maintain current result
    in_stack = set()          # To check if character already added
    
    for i, ch in enumerate(s):
        # If already in stack, don't add again
        if ch in in_stack:
            continue

        # Greedily remove larger letters at stack top if they appear later
        while stack and ch < stack[-1] and last_occurrence[stack[-1]] > i:
            removed = stack.pop()
            in_stack.remove(removed)

        stack.append(ch)
        in_stack.add(ch)
    
    return ''.join(stack)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each character is pushed and popped at most once, and all lookups are constant time.
- **Space Complexity:** O(∣Σ∣) up to O(26) for letters in stack/set, plus O(n) for the last occurrence map.

### Potential follow-up questions (as if you’re the interviewer)  

- What if uppercase and lowercase letters are considered the same character?  
  *Hint: Think about normalizing or mapping both cases together before processing.*

- How would you handle Unicode characters (not just lowercase English letters)?  
  *Hint: Use dictionaries/sets instead of arrays sized 26.*

- How can you modify your solution if you are required to output all possible valid answers (when there could be ties)?  
  *Hint: Explore backtracking or collect all lex smallest candidates.*

### Summary
This is a classic **greedy + monotonic stack** pattern, closely related to "Remove Duplicate Letters."  
It is efficient due to keeping track of last positions and using sets/stacks for constant-time checks. The pattern frequently appears in problems dealing with "unique results," "subsequences," or "lexicographic order under constraints."

### Tags
String(#string), Stack(#stack), Greedy(#greedy), Monotonic Stack(#monotonic-stack)

### Similar Problems
- Find the Most Competitive Subsequence(find-the-most-competitive-subsequence) (Medium)