### Leetcode 1897 (Easy): Redistribute Characters to Make All Strings Equal [Practice](https://leetcode.com/problems/redistribute-characters-to-make-all-strings-equal)

### Description  
Given an array of **non-empty** strings, you can perform any number of operations: pick two distinct indices i and j, move any character from words[i] to any position in words[j].  
Determine if it is possible to redistribute characters so that **all strings become equal**.  
All strings must be equal at the end — same length, same characters, same order.

### Examples  

**Example 1:**  
Input: `["abc","aabc","bc"]`  
Output: `true`  
*Explanation: Combine all characters: a a b b c c. Since there are 3 strings, distribute each character equally so all strings are "abc". Each gets 1 'a', 1 'b', 1 'c'.*

**Example 2:**  
Input: `["ab","a"]`  
Output: `false`  
*Explanation: Total characters: 2 'a', 1 'b'. Cannot evenly distribute among 2 strings (since 1 'b' is left).*

**Example 3:**  
Input: `["a","b","c"]`  
Output: `false`  
*Explanation: Total characters: 1 'a', 1 'b', 1 'c'. Three strings, but each string should end up identical. Can't redistribute these to make all strings same.*

### Thought Process (as if you’re the interviewee)  
First, let's observe what it really means for all strings to become equal. It doesn't matter what string they become — only that they all should have the same *characters*, with equal counts, in whatever order.

Brute-force idea: try generating all possible permutations by redistributing letters, or simulate moves. But this is infeasible for larger inputs.

Let’s look for patterns:  
- If we combine all letters from all strings, can these be divided *evenly* among strings?
- Specifically, for each character, its **total count** across all strings must be divisible by the number of strings.  
  - Example: If there are 3 strings and 7 'a's, you can't distribute 'a's evenly.
  - Example: 6 'x's and 3 strings → possible, as 6 mod 3 = 0.

Therefore, for every character `ch`, total_count[ch] % n == 0, where n is the number of strings.  
If this is true for all characters, it's *always* possible to make all strings equal by redistributing as needed.

Hence, we just need to:
- Count the frequency of each character across all strings.
- Check divisibility by n.

This approach is efficient and easy to implement.

### Corner cases to consider  
- All strings are already equal.
- Only one string (always true).
- Some characters are present in one string only.
- Characters that appear multiple times.
- Total characters can’t be divided evenly.
- Very large or very small input sizes.

### Solution

```python
def makeEqual(words):
    # Step 1: Build frequency map for all letters (26 letters a-z)
    freq = [0] * 26
    for word in words:
        for ch in word:
            freq[ord(ch) - ord('a')] += 1

    n = len(words)
    
    # Step 2: For every character, check if count is divisible by n
    for count in freq:
        if count % n != 0:
            return False
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(S), where S = total characters in all strings.  
  We loop over every character once to build frequency, then 26 steps to check divisibility.

- **Space Complexity:** O(1), since we only use a fixed array of size 26 (for 'a'-'z'), independent of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the strings can contain uppercase letters or symbols?  
  *Hint: Expand the logic to consider 52 or more characters, adjusting the frequency array size.*

- Can you return the actual string that all could become?  
  *Hint: Distribute total counts per character evenly, build the result.*

- How would you modify this for streaming input or very large datasets?  
  *Hint: Consider efficient frequency counting using hash maps or distributed computing approaches if needed.*

### Summary
This problem is an example of the **counting + modulus pattern** — a common technique for checking if a set of items can be partitioned evenly.  
Knowing how to model state using frequency arrays/hash maps, and using simple divisibility checks, often leads to simple yet powerful solutions in interview scenarios.  
This pattern appears in grouping, redistribution, and many "can you partition equally" problems.