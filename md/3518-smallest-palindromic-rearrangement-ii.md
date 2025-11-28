### Leetcode 3518 (Hard): Smallest Palindromic Rearrangement II [Practice](https://leetcode.com/problems/smallest-palindromic-rearrangement-ii)

### Description  
Given a **palindromic string** `s` and an integer `k`, return the *k-th lexicographically smallest palindromic permutation* of `s`. If there are fewer than `k` distinct palindromic permutations, return an empty string. Different rearrangements that result in the same palindrome are counted only once.

In other words, you want the kᵗʰ unique palindromic string that can be formed by rearranging `s`'s letters (lexicographically sorted), or an empty string if that many do not exist.

### Examples  

**Example 1:**  
Input: `s = "abba", k = 2`  
Output: `"baab"`  
*Explanation: Palindromic permutations are: "abba", "baab". "baab" is the 2ⁿᵈ lexicographically smallest.*

**Example 2:**  
Input: `s = "abcba", k = 1`  
Output: `"abcba"`  
*Explanation: Palindromic permutations in order: "abcba", "bacab", "bcacb", "cabac", "cbaac". The 1ˢᵗ is "abcba".*

**Example 3:**  
Input: `s = "aabb", k = 3`  
Output: `""`  
*Explanation: Possible palindromic permutations are "abba", "baab" (only 2 exist), so answer is empty as k = 3.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  List all permutations of the string, check each to see if it’s a palindrome, remove duplicates, sort, take the kᵗʰ.  
  *But*: For n up to 10⁴, this is plainly infeasible.
  
- **Key insight:**  
  A palindrome is completely determined by its first half (and possibly a middle character if the length is odd).  
  Since `s` is a palindrome, its letter count forms can be rearranged.  
  To construct all unique palindromic permutations:
    - Count the frequency of each character.
    - For each character, divide the count by 2 (⌊count/2⌋): these letters comprise the *first half*.
    - If odd-length, a middle character is possible (the one with odd count).
    - Generate all unique permutations of first half; for each, construct the full palindrome by mirroring and inserting the possible middle character.
  - The total number of unique palindromic rearrangements = (number of unique permutations of first half) × (number of possible middle characters: either 1 or 0).

- **How to find the kᵗʰ lex smallest efficiently?**  
  Use a recursive generation similar to next-permutation or lexico-permutation algorithms, constructing the first half one letter at a time, at each decision branch, use combinatorics to count number of remaining permutations if you select this letter, and skip appropriately.

- **Trade-offs/Why final approach:**  
  - Using character counts instead of full permutations makes this efficient.
  - At each position, for each candidate character, we can skip entire branches of the solution tree if their permutation counts fall short of k.
  - This approach runs in O(n × 26) (since 26 possible chars at each branch of n/2 depth), much faster than brute force.

### Corner cases to consider  
- Empty string: s = "", k = 1
- No possible palindromic permutation: k > total number of unique palindromic permutations
- All characters same
- All unique odd-length characters (single-character palindromes only)
- Large even n (test fast combinatorics)
- Very large k (e.g., k > 1e9)
- Characters in different cases (if allowed)

### Solution

```python
def smallest_palindromic_rearrangement_ii(s: str, k: int) -> str:
    from collections import Counter
    from math import comb
    
    # Step 1: Count frequencies
    freq = Counter(s)
    n = len(s)
    odd_count = sum(1 for v in freq.values() if v % 2)
    # For even-length string, all letters must be even
    if (n % 2 == 0 and odd_count != 0) or (n % 2 == 1 and odd_count != 1):
        return ""  # Not possible, but in problem, s guaranteed palindrome
    
    # Step 2: Prepare first half
    half = []
    for ch in sorted(freq):
        half.extend([ch] * (freq[ch] // 2))
    # Middle/center letter if any
    center = ''
    for ch in freq:
        if freq[ch] % 2:
            center = ch
            break

    # Step 3: Helper - count number of unique palindromic permutations for current freq
    def count_perm(counts):
        total = sum(counts.values())
        res = 1
        for ch in counts:
            res *= math.factorial(counts[ch])
        return math.factorial(total) // res

    import math
    # The counts of current usable chars for the half
    half_counts = Counter()
    for ch in half:
        half_counts[ch] += 1

    answer = []
    m = len(half)

    # Step 4: Construct kth lexicographically smallest
    for i in range(m):
        for ch in sorted(half_counts):
            if half_counts[ch] == 0:
                continue
            half_counts[ch] -= 1

            # Calculate number of palindromic arrangements possible if we pick `ch` at this position
            perms = 1
            total = sum(half_counts.values())
            perms = math.factorial(total)
            for c2 in half_counts:
                perms //= math.factorial(half_counts[c2])
            
            if perms >= k:
                answer.append(ch)
                break
            else:
                k -= perms
                half_counts[ch] += 1  # reset and try next letter

    # Step 5: Compose the palindrome
    prefix = ''.join(answer)
    suffix = prefix[::-1]
    if center:
        return prefix + center + suffix
    else:
        return prefix + suffix
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n × 26) where n = len(s)/2.  
  For each position in the first half, we try up to 26 possible chars, and combinatorics calculations via factorials (which are up to n, but Python's math.factorial is fast for n ≤ 10⁴). Each step only uses counts, not full permutations.

- **Space Complexity:**  
  O(n) for storing character counts and the result prefix.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input string is not guaranteed to be a palindrome?  
  *Hint: How can you check if palindromic rearrangement is possible at all?*

- How would you handle the case if the string contains unicode or non-ASCII characters?  
  *Hint: Adjust 26 to the range of possible input characters.*

- How can this solution be modified to return all palindromic permutations up to k rather than just kᵗʰ?  
  *Hint: Use backtracking and early cutoff.*

### Summary
This problem is a classic application of **lexicographical kth-permutation generation**, using combinatorics and multiset permutation counting. The key observation is that a palindrome can be constructed from a half-string and its mirror, with possible center. This pattern is common in permutation-rank problems, and efficient multiset handling is essential for performance at scale. You can reuse the kth-lex-permutation + multiset combinatorics logic in anagrams, ranking, and similar permutation-indexing problems.


### Flashcard
Generate all unique palindromic permutations by constructing the first half from sorted character counts, then mirror it; sort and return the kᵗʰ.

### Tags
Hash Table(#hash-table), Math(#math), String(#string), Combinatorics(#combinatorics), Counting(#counting)

### Similar Problems
