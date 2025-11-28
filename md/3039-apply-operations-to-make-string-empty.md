### Leetcode 3039 (Medium): Apply Operations to Make String Empty [Practice](https://leetcode.com/problems/apply-operations-to-make-string-empty)

### Description  
Given a string **s** consisting only of lowercase English letters, you repeatedly perform the following operation until **s** becomes empty:  
- For every distinct character present in **s**, remove its *first occurrence* from **s**.  
- Continue these rounds of removals until the string is empty.

After all operations, what is the string formed by *concatenating* the last character removed for each distinct character? Return this string in the order the removals happened in the last round.

### Examples  

**Example 1:**  
Input: `s = "aabcbbca"`  
Output: `"bca"`  
*Explanation:  
- Round 1: Remove first 'a', 'b', 'c': s = "abcbbca"  
- Round 2: Remove first 'a', 'b', 'c': s = "bbca"  
- Round 3: Remove first 'b', 'c', 'a': s = "b"  
- Round 4: Remove first 'b': s = ""  
- Last round removed: 'b', 'c', 'a' ⇒ Output is `"bca"`*

**Example 2:**  
Input: `s = "abcabc"`  
Output: `"abc"`  
*Explanation:  
- Round 1: Remove 'a','b','c': s="abc"  
- Round 2: Remove 'a','b','c': s=""  
- Last round removed: 'a','b','c' ⇒ Output is `"abc"`*

**Example 3:**  
Input: `s = "zzzz"`  
Output: `"z"`  
*Explanation:  
- Round 1: Remove 'z': s="zzz"  
- ...repeat...  
- Last round removed: 'z' ⇒ Output is `"z"`*

### Thought Process (as if you’re the interviewee)  
First, I interpret the problem as operating in *rounds*. In each round, I remove the first occurrence of each unique character. The last round consists of the last times I remove each character (which must be all of a character's instances being exhausted).

**Naive approach:**  
- Simulate every round by scanning string, marking first occurrences for each character, removing them, repeat until the string is empty.
- Record in each round which characters were removed.

Naive simulation works but is potentially slow for long strings. But examining the process, each *character* is removed once per round until it’s gone. The *last time* a character is removed must be the last instance of that character in the string.  
So, for each character, keep track of how many times it occurs (its frequency, f). All characters are removed f times (once per round). The last time it's removed is at its last occurrence's index in the string.

**Optimization:**  
- For each character, record:
    - The frequency (how many times it appears, f).
    - The index of each occurrence.
- For each round, remove all characters that still remain, focusing especially on the round where each character is removed for the last time.
- The answer is the characters whose *max frequency* equals their count, and whose last occurrence index comes last.

But according to optimal solutions, we can imagine that for all characters with the maximum count, their final removal happens in the last round, and the order is determined by their last appearance.

Thus, just collect the characters whose count is maximal and whose index is the last occurrence of that character.

### Corner cases to consider  
- String with just one character, e.g., `"a"`
- String where all letters are unique, e.g., `"abcdef"`
- String where all letters are the same, e.g., `"aaaa"`
- String with interleaved repeats, e.g., `"abacbc"`
- Empty string (should return empty string)
- String where last round characters are not in alphabetical order

### Solution

```python
def last_non_empty_string(s: str) -> str:
    # Count the frequency of each character
    count = [0] * 26
    # Store last index of each character
    last_index = [0] * 26
    for i, ch in enumerate(s):
        idx = ord(ch) - ord('a')
        count[idx] += 1
        last_index[idx] = i

    # Find the maximum frequency present
    max_freq = max(count)
    result = []
    # To preserve order, scan s from left to right; 
    # take characters that are in the last occurrences 
    # and have max_freq
    for i, ch in enumerate(s):
        idx = ord(ch) - ord('a')
        if count[idx] == max_freq and last_index[idx] == i:
            result.append(ch)
    return ''.join(result)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the string.  
  - We make two passes: one to count frequencies and track last positions, one to assemble answer.
- **Space Complexity:** O(1), since we only use two arrays of size 26 (for each letter a–z).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify your solution if the string could contain Unicode characters, not just 'a'–'z'?  
  *Hint: Use a dictionary/hashmap instead of fixed-size arrays.*

- Can you output the rounds and the characters removed in each round?  
  *Hint: Simulate each round with a queue or by repeated string traversal.*

- How would this change if instead of removing the *first* occurrence, you had to remove the *last* occurrence of each distinct character in every round?  
  *Hint: Track index reversals, and process from right to left each round.*

### Summary
This problem uses **hashing** and **last occurrence tracking**. The optimal approach avoids simulation, using two passes and fixed O(1) extra space (for alphabet-based strings). It's an example of reducing a simulation problem to an array-mapping. The key insight is to relate rounds of removals to the character frequencies and capture the correct indices for final output. This kind of pattern is common in last occurrence/maximum-count problems and is widely applicable to problems involving segmenting operations or final-event capture for repeated processes.


### Flashcard
Simulate rounds: in each round, remove first occurrence of each unique character; track which characters removed per round.

### Tags
Array(#array), Hash Table(#hash-table), Sorting(#sorting), Counting(#counting)

### Similar Problems
