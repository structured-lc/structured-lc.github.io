### Leetcode 1737 (Medium): Change Minimum Characters to Satisfy One of Three Conditions [Practice](https://leetcode.com/problems/change-minimum-characters-to-satisfy-one-of-three-conditions)

### Description  
Given two strings **a** and **b** consisting only of lowercase letters, you can change any character in either string to any other lowercase letter in a single operation.  
The goal is to satisfy **one** of the following three conditions with the **minimum number of operations**:
- Every character in a is strictly less than **every** character in b (i.e., max(a) < min(b)).
- Every character in b is strictly less than **every** character in a (i.e., max(b) < min(a)).
- Both a and b consist of only **one distinct letter** (can be the same or different for a and b).

Return the minimum number of operations needed.

### Examples  

**Example 1:**  
Input: `a = "aba", b = "caa"`  
Output: `2`  
*Explanation:  
Option 1: Change both 'a's in b to 'c' → b = "ccc" (2 changes). Now all a < all b.  
Option 2: Change both 'a's in a to 'b' and all in b to 'a' (3 changes).  
Option 3: Make both a and b all 'a's (change one 'b' in a and one 'c' in b, total 2).  
Best: 2 changes.*

**Example 2:**  
Input: `a = "dabadd", b = "cda"`  
Output: `3`  
*Explanation:  
Option 1: Change all chars in b to 'e' ("eee") (3 changes), then all a < all b.  
Option 2: Make both a and b all 'a's (change all in a but two, all in b but one → not optimal).  
Best: 3 changes.*

**Example 3:**  
Input: `a = "aaa", b = "aaa"`  
Output: `0`  
*Explanation: Both strings already have one distinct letter.*

### Thought Process (as if you’re the interviewee)  

First, I’d look at brute-force:  
- Generate all possible strings with only one distinct letter for both a and b—26 × 26 combinations. Calculate the number of changes needed for each and take the minimum.  
- For "all a < all b" or "all b < all a": Try for each possible split letter ('b'...'z'), counting the changes so all a's are strictly less than all b's (or vice versa).  
- The brute-force approach is feasible, since the possible alphabet size is small (26), but n can be up to 10⁵. Thus, we need an O(26²) or O(26) approach per step.

Optimization:  
- Precompute frequency counts for all 26 letters for both a and b.  
- For case 3, for each letter, count how many need to be changed in a and b to make them all that letter. Try all 26 letters, keep the minimum.
- For case 1 and 2, for each cut point `i` (from 'a' to 'y'):  
    - All characters in a ≤ i, all in b > i ⇒ change a's chars > i, and b's chars ≤ i.
    - Use prefix sums of frequencies to make this fast for all possible `i`.

This is efficient—done in O(26) steps overall.

### Corner cases to consider  
- Both strings are already uniform.
- One string is empty (not possible here, but short strings).
- All characters of a/b at the alphabet ends ('a'... or ...'z').
- Strings have full overlap (characters in both a and b are the same).
- Maximum input size.

### Solution

```python
def minCharacters(a: str, b: str) -> int:
    # Frequency count of a and b
    freq_a = [0] * 26
    freq_b = [0] * 26
    for ch in a:
        freq_a[ord(ch) - ord('a')] += 1
    for ch in b:
        freq_b[ord(ch) - ord('a')] += 1

    # Case 3: Both consist of one distinct letter (try all letters)
    min_ops = float('inf')
    for i in range(26):
        # Change all non-i in a, plus all non-i in b
        ops = (len(a) - freq_a[i]) + (len(b) - freq_b[i])
        if ops < min_ops:
            min_ops = ops

    # Prefix sums for quick comparison in case 1 and 2
    pre_a = [0] * 27  # 26 + 1
    pre_b = [0] * 27
    for i in range(26):
        pre_a[i + 1] = pre_a[i] + freq_a[i]
        pre_b[i + 1] = pre_b[i] + freq_b[i]

    # Try all cut points between 'a'..'y' (strictly less)
    for i in range(1, 26):  # split at i ('a'..chr(i-1)) < chr(i)..'z'
        # Condition 1: all a < all b
        ops1 = (len(a) - pre_a[i]) + pre_b[i]
        if ops1 < min_ops:
            min_ops = ops1
        # Condition 2: all b < all a
        ops2 = (len(b) - pre_b[i]) + pre_a[i]
        if ops2 < min_ops:
            min_ops = ops2

    return min_ops
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m + n + 26), where m and n are lengths of a and b. Counting frequencies is O(m + n), all further work is a constant factor (26 letters).
- **Space Complexity:** O(26), for the frequency and prefix arrays.

### Potential follow-up questions (as if you’re the interviewer)  

- What if this were extended to uppercase and lowercase letters?  
  *Hint: How would character mapping and 52-letter frequency arrays change?*

- If the allowed operation were only to change a character to the next/previous letter (not any letter), how would you adapt?  
  *Hint: Is a greedy or BFS approach needed for minimal number of single-step "close" changes?*

- How would your approach adapt if there were 3 or more input strings instead of 2?  
  *Hint: Do similar split points in alphabet and uniformity checks work?*

### Summary
This problem uses the "counting + prefix sum" pattern, common in character frequency and range-comparison problems—efficient when the domain size is small (here, 26). It's a typical approach for "min operations to achieve some uniform/relation condition" when letters are involved and is applicable to similar "make strings uniform" or "get all values below/above a split" coding problems.

### Tags
Hash Table(#hash-table), String(#string), Counting(#counting), Prefix Sum(#prefix-sum)

### Similar Problems
