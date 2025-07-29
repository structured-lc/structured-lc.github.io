### Leetcode 1768 (Easy): Merge Strings Alternately [Practice](https://leetcode.com/problems/merge-strings-alternately)

### Description  
Given two strings **word₁** and **word₂**, merge them by alternating characters from each, starting with **word₁**. If one string is longer, append its remaining characters at the end.  
For example, if **word₁ = "abc"** and **word₂ = "pqr"**, the merged result would be **"apbqcr"**.

### Examples  

**Example 1:**  
Input: `word1="abc", word2="pqr"`  
Output: `apbqcr`  
*Explanation: Start with "a" from word₁, then "p" from word₂, then "b" from word₁, then "q" from word₂, then "c" from word₁, and finally "r" from word₂.*

**Example 2:**  
Input: `word1="ab", word2="pqrs"`  
Output: `apbqrs`  
*Explanation: Alternate "a" (word₁), "p" (word₂), "b" (word₁), "q" (word₂). Then append the rest: "rs" (from word₂).*

**Example 3:**  
Input: `word1="abcd", word2="pq"`  
Output: `apbqcd`  
*Explanation: Alternate "a" (word₁), "p" (word₂), "b" (word₁), "q" (word₂). Then append the rest: "cd" (from word₁).*

### Thought Process (as if you’re the interviewee)  
First, I recognize this as a string manipulation problem where I need to iterate through both strings and merge their characters one after the other.  
  
- **Brute Force:**  
  I could use a loop to iterate up to the maximum length of the two strings. At each position, if the character exists in word₁, append it; if it exists in word₂, append that too.  
  This brute force solution is easy to implement and straightforward for this problem.
  
- **Optimized Approach:**  
  The brute force approach is already efficient here, as each character from both strings is used exactly once, so complexity is linear.  
  Alternatively, if using Python, `itertools.zip_longest` could elegantly pair characters, but in an interview, it's more common to write an explicit loop for clarity and language-independence[1][2].

### Corner cases to consider  
- Both strings are empty.
- One string is significantly longer than the other.
- One string is empty, the other is not.
- Both strings are of equal length.
- Strings contain only one character.

### Solution

```python
def mergeAlternately(word1: str, word2: str) -> str:
    # Calculate lengths
    n1, n2 = len(word1), len(word2)
    result = []
    i = 0

    # Iterate while either string has characters left
    while i < n1 or i < n2:
        if i < n1:
            result.append(word1[i])
        if i < n2:
            result.append(word2[i])
        i += 1
    return ''.join(result)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  *Where n = len(word₁) + len(word₂). We traverse each string once to build the result.*
- **Space Complexity:** O(n)  
  *Extra space is used to build the result, which has at most len(word₁)+len(word₂) characters.*

### Potential follow-up questions (as if you’re the interviewer)  

- How would you generalize the solution to merge *k* strings alternately?
  *Hint: Use a list of pointers, looping as long as any string has characters left.*
- Can you solve it in-place if given mutable string data structures?
  *Hint: Consider direct swaps or pointer manipulation.*
- What if characters from word₁ and word₂ need to follow a different pattern (e.g., two from word₁, then one from word₂)?
  *Hint: Track step pattern and advance pointers accordingly.*

### Summary
This problem is a classic string manipulation using the **two pointers** pattern. You increment pointers in both strings and alternate picking their characters. The technique is generalizable to scenarios where multiple sequences must be merged in a patterned fashion and is commonly seen in problems requiring element alternation or merging sorted sequences.