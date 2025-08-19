### Leetcode 2514 (Hard): Count Anagrams [Practice](https://leetcode.com/problems/count-anagrams)

### Description  
You are given a string `s` consisting of one or more words separated by a single space.  
A string `t` is called an **anagram** of `s` if for every iᵗʰ word, the letters are rearranged but not across words (i.e., each word in `t` is a permutation of the iᵗʰ word in `s`).  
Return the number of **distinct anagrams** of `s` under this rule.  
Since the answer can be very large, return it modulo 10⁹ + 7.

### Examples  

**Example 1:**  
Input: `s = "too hot"`  
Output: `18`  
*Explanation: "too" has 3!/(2!) = 3 arrangements, "hot" has 3! = 6. Total = 3 × 6 = 18.*

**Example 2:**  
Input: `s = "aa"`  
Output: `1`  
*Explanation: "aa" has only 1 unique arrangement since both letters are the same.*

**Example 3:**  
Input: `s = "abc ab"`  
Output: `12`  
*Explanation: "abc": 3! = 6 ways, "ab": 2! = 2; total = 6 × 2 = 12.*

### Thought Process (as if you’re the interviewee)  
First, let's clarify:  
- We must count *distinct* anagrams, not all permutations (duplicated letters matter).
- Each word can be scrambled individually, but words stay in their positions.

**Naive solution:**  
- List all unique anagrams for each word, generate full sentences, add to a set.
- Problem: For longer words or many words, this explodes (inefficient).

**Better approach:**  
- Count distinct arrangements for each word using **combinatorics**:
  - For a word of length n with repeating characters, the number of unique arrangements is:
    - n! / (c₁! × c₂! × ... × cₖ!)
      - Where c₁, ..., cₖ are counts of each letter.
- Multiply the anagram counts of all words together.

**Implementation**  
- Precompute factorials up to the longest word length.
- Use modular inverses to divide by the repeated letters' factorials (since direct division under modulus is not allowed).
- Iterate over words, compute multinomial coefficient for each, multiply results.
- Use modulo 10⁹ + 7 at each step to avoid overflow.

This approach is efficient (O(n)), avoids unnecessary string/array allocations, and fits the input constraints.

### Corner cases to consider  
- Words with all identical letters (e.g. "aaaaaa") – should only have 1 arrangement.
- Sentences with single-letter words.
- Repeated words in the sentence.
- Large word: stress test for factorial precomputation and inverse.
- Very long input string (close to 10⁵ in length).

### Solution

```python
def countAnagrams(s):
    MOD = 10 ** 9 + 7
    MAX = 100_005  # As per input constraint
    
    # Precompute factorial and inverse factorial arrays up to MAX
    factorial = [1] * MAX
    inv_factorial = [1] * MAX
    for i in range(1, MAX):
        factorial[i] = factorial[i-1] * i % MOD

    # Compute inverse via Fermat's Little Theorem
    inv_factorial[MAX-1] = pow(factorial[MAX-1], MOD-2, MOD)
    for i in range(MAX-2, -1, -1):
        inv_factorial[i] = inv_factorial[i+1] * (i+1) % MOD

    result = 1

    for word in s.split():
        # Count frequency of each letter
        freq = {}
        for c in word:
            freq[c] = freq.get(c, 0) + 1
        n = len(word)
        arrangements = factorial[n]
        for count in freq.values():
            arrangements = arrangements * inv_factorial[count] % MOD
        result = result * arrangements % MOD

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N is the length of input `s`.  
  Preprocessing is O(N) for factorials, word split/iteration is O(N), character frequency counting per word is O(length of word).
- **Space Complexity:** O(N), due to precomputed factorial/inverse arrays (up to MAX ≈ 10⁵), and some frequency dictionaries.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the string can contain punctuation or mixed-case?  
  *Hint: Think about input preprocessing and normalization.*

- Can this approach be optimized further for large alphabets or unicode text?  
  *Hint: Consider the storage and bit-manipulation for higher character sets.*

- How would you modify the approach if anagrams for the whole sentence (not word-wise) are required?  
  *Hint: You'd need to compute frequency for all chars in the entire string ignoring spaces.*

### Summary
This problem is a classic example of the **multinomial coefficient** pattern, often combined with **modulo arithmetic** and **modular inverses** due to combinatorial explosion. Precomputing factorials and their inverses is a common trick for O(1) binomial/multinomial computations. The same principle applies in counting permutations with duplicates, some DP-on-strings problems, and advanced probability scenarios.

### Tags
Hash Table(#hash-table), Math(#math), String(#string), Combinatorics(#combinatorics), Counting(#counting)

### Similar Problems
- Group Anagrams(group-anagrams) (Medium)
- Count Ways to Build Rooms in an Ant Colony(count-ways-to-build-rooms-in-an-ant-colony) (Hard)