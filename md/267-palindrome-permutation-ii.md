### Leetcode 267 (Medium): Palindrome Permutation II [Practice](https://leetcode.com/problems/palindrome-permutation-ii)

### Description  
Given a string **s**, return *all* unique palindromic permutations of **s**. A permutation is palindromic if it reads the same forwards and backwards. Return the permutations in any order. If none are possible, return an empty list.

### Examples  

**Example 1:**  
Input: `s = "aabb"`  
Output: `["abba","baab"]`  
*Explanation: Both "abba" and "baab" use all the letters and read the same forwards and backwards.*

**Example 2:**  
Input: `s = "abc"`  
Output: `[]`  
*Explanation: No palindrome can be formed because all characters appear only once.*

**Example 3:**  
Input: `s = "aaa"`  
Output: `["aaa"]`  
*Explanation: "aaa" is itself a palindrome. There is only one possible permutation.*

### Thought Process (as if you’re the interviewee)  
First, check if a palindromic permutation is even possible. For a string to form a palindrome:
- At most **one character** may have an odd count.  
  - Example: "aabb" (all even counts) is fine. "aba" (one odd count) is also fine. "abc" (three odd counts) is not possible.

**Brute-force idea:**  
- Generate all possible permutations and check if each forms a palindrome.
- This is very inefficient (O(n!)).

**Optimized approach:**  
- Count the frequency of each character.
- If more than one character has an odd count, return [] immediately.
- For characters with even counts, take half their count and form the **first half** of the palindrome.
- For an odd count character (if any), it will sit at the center.
- Generate all unique permutations of the first half (using backtracking to avoid duplicates).
- For each unique half, form the full palindrome by reflecting and possibly adding a central character.

This way, we drastically reduce unnecessary permutation generation and guarantee uniqueness by permuting only the limited half-characters and avoiding repeats via used flags or set structures.

### Corner cases to consider  
- Empty string (`s = ""`): should return [""]
- String with only one character (`s = "a"`): returns ["a"]
- No possible palindrome permutations (`s = "abc"`)
- Long string with multiple possible palindromic orders (`s = "aabbcc"`)
- All same character (`s = "aaa"`)

### Solution

```python
def generatePalindromes(s):
    # Count frequency of each character
    freq = {}
    for c in s:
        freq[c] = freq.get(c, 0) + 1

    # Find characters with odd counts
    odds = [char for char, cnt in freq.items() if cnt % 2 == 1]
    if len(odds) > 1:
        return []

    # Build the half of palindrome to permute
    half = []
    center = ""
    for char, cnt in freq.items():
        if cnt % 2 == 1:
            center = char
        half.extend([char] * (cnt // 2))

    # Helper function for backtracking
    def backtrack(path, used, results):
        if len(path) == len(half):
            # Form palindrome: permuted half + center + reversed half
            palindrome = ''.join(path) + center + ''.join(reversed(path))
            results.append(palindrome)
            return
        for i in range(len(half)):
            # Skip used or duplicate characters at the same depth
            if used[i]:
                continue
            if i > 0 and half[i] == half[i - 1] and not used[i - 1]:
                continue
            used[i] = True
            path.append(half[i])
            backtrack(path, used, results)
            path.pop()
            used[i] = False

    half.sort()
    results = []
    used = [False] * len(half)
    backtrack([], used, results)
    return results
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n! / (k₁! k₂! ... kₘ!)), where n is half the length of **s**, and kᵢ are counts of each unique character in the half. This is the number of unique permutations of the half-string.  
  Building the half and count dict is O(n). Generating each unique permutation is factorial in half length.
- **Space Complexity:** O(n + num_permutations). Uses O(n) for frequency and used arrays, and O(ans) for all results.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle inputs with uppercase, spaces, or non-letter characters?  
  *Hint: Preprocess input or adjust frequency logic.*

- If you only had to return *any one* palindromic permutation, how would you change your method?  
  *Hint: Early return after generating first valid permutation.*

- What if the input was immutable and very large, and you could not use extra memory proportional to the input?  
  *Hint: Consider on-the-fly generation, streaming, or limiting result set.*

### Summary
This problem uses the **backtracking with pruning** coding pattern and takes advantage of the properties of palindromes (mirror symmetry, at most one center) for optimization. The idea of counting frequencies and generating permutations of a subset (the half-string) to avoid duplicates is common in permutation-related string problems, like "Permutations II" and "Anagrams".


### Flashcard
Palindrome Permutation II

### Tags
Hash Table(#hash-table), String(#string), Backtracking(#backtracking)

### Similar Problems
- Next Permutation(next-permutation) (Medium)
- Permutations II(permutations-ii) (Medium)
- Palindrome Permutation(palindrome-permutation) (Easy)