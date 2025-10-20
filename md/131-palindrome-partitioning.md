### Leetcode 131 (Medium): Palindrome Partitioning [Practice](https://leetcode.com/problems/palindrome-partitioning)

### Description  
Given a string **s**, return all possible ways to split **s** into *contiguous substrings* so that every substring is a **palindrome** (reads the same forwards and backwards).  
Each partition is a list of these palindrome substrings. Return all such possible partitions.

### Examples  

**Example 1:**  
Input: `s = "aab"`  
Output: `[["a","a","b"], ["aa","b"]]`  
*Explanation: You can split as "a" + "a" + "b" (all single letters, all palindromes) or as "aa" + "b" (both palindromes).*

**Example 2:**  
Input: `s = "a"`  
Output: `[["a"]]`  
*Explanation: Single character strings are always palindromes, so only one possible partition.*

**Example 3:**  
Input: `s = "racecar"`  
Output: `[["r","a","c","e","c","a","r"], ["r","aceca","r"], ["racecar"]]`  
*Explanation: Each letter is a palindrome, but "aceca" and "racecar" are also valid palindromes, providing multiple partition options.*  

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Try every way to partition the string into substrings. For each partition, check if every substring is a palindrome. This approach checks all 2ⁿ⁻¹ possible partition points (for n characters) for every split — very expensive for big n.

- **Optimization with Backtracking:**  
  Use *backtracking* to build up a partition gradually. At each point in the recursion, try every possible end index for a substring starting at the current index:
  - If the chosen substring is a palindrome, recursively partition the rest.
  - Use a helper function to check if a substring is a palindrome (simple O(k) check, k is substring length).
  - When you reach the end of the string, add the current path to the result.

- **Further Optimization:**  
  - Memoize palindrome checks if the interviewer asks for more speed.
  - For constraints up to 16 characters, plain backtracking is acceptable and efficient.

The backtracking pattern is well-suited here because you only proceed with partitions if the chosen piece is a palindrome, drastically reducing needless work.

### Corner cases to consider  
- Empty string (should return `[[]]` or `[]`, but constraint says length ≥ 1)
- All identical characters (e.g., `"aaa"`)
- No possible multi-length palindromes (e.g., `"abc"`)
- The entire string is a palindrome (e.g., `"racecar"`, `"aba"`)
- Very short strings (`"a"`, `"ab"`)

### Solution

```python
def partition(s):
    def is_palindrome(left, right):
        # Check if s[left:right+1] is palindrome
        while left < right:
            if s[left] != s[right]:
                return False
            left += 1
            right -= 1
        return True
    
    def backtrack(start, path, results):
        if start == len(s):
            results.append(path[:])
            return
        for end in range(start, len(s)):
            if is_palindrome(start, end):
                # Pick the palindrome substring s[start:end+1]
                path.append(s[start:end+1])
                backtrack(end + 1, path, results)
                path.pop()  # Undo the last choice

    results = []
    backtrack(0, [], results)
    return results
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Worst-case for backtracking is O(2ⁿ × n), since there can be up to 2ⁿ possible partitionings (each of n-1 spaces can be a split or not), and for each we may spend O(n) checking palindromes. For small n (≤16), this is tractable.
- **Space Complexity:**  
  - O(n) for the recursion stack (max depth = string length).
  - O(2ⁿ × n) for storing all possible partitions in results (could be exponential in the worst case).

### Potential follow-up questions (as if you’re the interviewer)  

- Can you generate only the minimal number of partitions (i.e., find the partition with the fewest parts)?
  *Hint: Try DP for minimal cuts, not all partitions.*

- How would you speed up palindrome checking?
  *Hint: Use a DP table to precompute all palindromic substrings in O(n²) time/space.*

- What if the string contains digits and uppercase/lowercase, and palindrome check is case-insensitive?
  *Hint: Normalize the string before partitioning.*

### Summary
This problem uses the **backtracking/cut and choose** pattern: at each index, try every possible "cut" that produces a palindrome and recursively partition the remainder.  
It’s a classic candidate for backtracking, similar to *subsets* or *combination sum* problems, and can be further optimized if asked.  
Patterns used here recur in word break, subset partitioning, and combination generation interview problems.


### Flashcard
Use backtracking to try every partition; at each step, extend the current substring and recurse only if it’s a palindrome.

### Tags
String(#string), Dynamic Programming(#dynamic-programming), Backtracking(#backtracking)

### Similar Problems
- Palindrome Partitioning II(palindrome-partitioning-ii) (Hard)
- Palindrome Partitioning IV(palindrome-partitioning-iv) (Hard)
- Maximum Number of Non-overlapping Palindrome Substrings(maximum-number-of-non-overlapping-palindrome-substrings) (Hard)