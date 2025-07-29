### Leetcode 2423 (Easy): Remove Letter To Equalize Frequency [Practice](https://leetcode.com/problems/remove-letter-to-equalize-frequency/)

### Description  
Given a 0-indexed string consisting of lowercase English letters, remove **exactly one letter** from any position such that the frequency of every letter present in the resulting string is equal.  
Return **true** if this is possible, otherwise **false**.

*For example, removing the 'c' from "abcc" to get "abc", where a, b, c all appear once (same frequency). It is not allowed to do nothing—one letter must be removed.*

### Examples  

**Example 1:**  
Input: `word = "abcc"`  
Output: `true`  
*Explanation: Remove the last 'c' (index 3): "abc". Now a, b, c each have frequency 1.*

**Example 2:**  
Input: `word = "aazz"`  
Output: `false`  
*Explanation: Removing any letter leaves at least two different frequencies: either one letter with frequency 1 and another with 2, or vice versa.*

**Example 3:**  
Input: `word = "zzz"`  
Output: `true`  
*Explanation: Remove any 'z', remaining string contains "zz" (each present letter frequency is 2; only 'z' remains).*

### Thought Process (as if you’re the interviewee)  
We want to know if, after **removing any single letter**, all remaining characters appear the same number of times.

**Brute-force idea:**  
Try removing each character (all n possibilities), count the frequency of the remaining string, and check if all frequencies are equal. This is O(n²) time, which is acceptable for small n but not optimal.

**Optimized Approach:**  
- Count the frequency of each letter in the original string (O(n)).
- For each unique character, simulate removing one occurrence of that character:
  - Decrease its count by 1.
  - Check if the remaining nonzero frequencies are all equal.
- There are at most 26 different characters; for each, the frequency check is O(26).
- So, the overall runtime is O(26²) = O(1) (since 26 is constant), or O(n + 26²) = O(n).

This approach is efficient and avoids repeated counting.

**Trade-offs:**  
The optimized method is preferred for clarity and performance, especially if the input size increases.

### Corner cases to consider  
- All letters identical (e.g. "aaaaa"): Should return true.
- Two characters with very different counts (like "aaaaab"): Should handle if removal can equalize.
- Removing a character leaves a zero count for a letter.
- Strings of length 2 (like "ab" or "aa").
- String already has equal frequencies, but must remove one.
- Removing a letter could result in multiple letters with zero count; only nonzero frequencies matter.

### Solution

```python
def equalFrequency(word: str) -> bool:
    # Step 1: Count the frequency of each letter
    freq = [0] * 26
    for ch in word:
        freq[ord(ch) - ord('a')] += 1
        
    # Step 2: Try removing one occurrence of each character type
    for i in range(26):
        if freq[i] == 0:
            continue
        freq[i] -= 1  # Remove one occurrence
        
        # Gather all nonzero frequencies after removal
        seen = set()
        for f in freq:
            if f > 0:
                seen.add(f)
        
        # If all remaining frequencies are equal (only one frequency present), return True
        if len(seen) == 1:
            return True
        
        # Restore the frequency for next iteration
        freq[i] += 1
    
    # If none of the removals resulted in all equal frequencies
    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the input string. Counting letter frequencies is O(n); iterating (at most) 26 removals each checking up to 26 frequencies is still constant-factor work.
- **Space Complexity:** O(1), using a fixed 26-element array for counts and a set (max size 26). No space grows with input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could remove *any number* of letters? How would you generalize?
  *Hint: Think about finding the minimum number of removals using frequency counts.*

- Can you return the set of all possible resulting strings that meet the condition?
  *Hint: Simulate all removals that lead to equal frequencies and collect valid cases.*

- How would you solve the problem if the input string could contain Unicode characters?
  *Hint: You'd use a dictionary with character keys instead of a fixed-size array.*

### Summary
We use the **frequency count + simulation** pattern: count how often each letter appears, simulate each possible letter removal, and check if the resulting string's nonzero frequencies are all equal.  
This approach is commonly used in problems about balancing or equalizing counts, and is seen in string frequency normalization, anagram checking, or balancing tasks.