### Leetcode 1180 (Easy): Count Substrings with Only One Distinct Letter [Practice](https://leetcode.com/problems/count-substrings-with-only-one-distinct-letter)

### Description  
Given a string s of lowercase English letters, count how many substrings consist of only one distinct character. A substring is any contiguous sequence of characters, and for this problem, we only care about those where every letter in the substring is the same. For example, in "aab", the substrings "a", "aa", and "b" all qualify, but "ab" does not.

### Examples  

**Example 1:**  
Input: `s = "aaaba"`  
Output: `8`  
Explanation: The substrings are "aaa", "aa", "a", "b".  
"aaa" occurs 1 time (positions 0-2),  
"aa" occurs 2 times (positions 0-1 and 1-2),  
"a" occurs 4 times (at positions 0, 1, 2, 4),  
"b" occurs 1 time (position 3).  
So, total = 1 + 2 + 4 + 1 = 8.

**Example 2:**  
Input: `s = "aaaaaaaaaa"`  
Output: `55`  
Explanation: All substrings of all lengths are valid and the number is 10×11/2 = 55.

**Example 3:**  
Input: `s = "abc"`  
Output: `3`  
Explanation: The only substrings with all one letter are "a", "b", and "c".

### Thought Process (as if you’re the interviewee)  
First, I considered brute-force: Check every possible substring and see if all its characters are the same. For a string of length n, there are O(n²) substrings, and checking each could give an even higher time cost.

However, I noticed that for each group of consecutive equal characters (length k), there are k*(k+1)/2 substrings where all the letters are the same. For example, in "aaaa", we have:
- Four substrings of length 1: "a", "a", "a", "a"
- Three of length 2: "aa", "aa", "aa"
- Two of length 3: "aaa", "aaa"
- One of length 4: "aaaa"
Total: 4+3+2+1=10, which follows the k×(k+1)/2 math pattern.

So, the idea is to walk along the string, count lengths of each consecutive run of the same letter, and add up k×(k+1)/2 for each such run.

This optimized approach is O(n) time and O(1) space, as we only need a counter for the current run and the total sum.

### Corner cases to consider  
- Empty string (should return 0, but per constraints, input string has at least 1 character)
- String with all the same character, e.g. "aaaaa"
- String with all unique characters, e.g. "abcde"
- String with repeats but each group is length 1, e.g. "ababab"
- Very long strings (check efficiency)
- Case where last group is at the end: "aabbb"

### Solution

```python
def countLetters(s: str) -> int:
    total = 0          # To store the final count
    run_length = 1     # Tracks current group length (at least 1, since s is length ≥ 1)
    
    for i in range(1, len(s)):
        if s[i] == s[i-1]:
            run_length += 1   # Still in the same group
        else:
            # Group ended; add its total substrings
            total += run_length * (run_length + 1) // 2
            run_length = 1    # Reset for the next group
    
    # Don't forget the last group!
    total += run_length * (run_length + 1) // 2
    
    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the string.  
  We pass over the string once, doing constant work at each step.
- **Space Complexity:** O(1).  
  Only a few integer variables are used regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your solution change if substrings needed to be returned explicitly, not just the count?  
  *Hint: You’d need to generate all substrings for each run; this increases time and space complexity.*

- How could you adapt this to count substrings with *at most* one distinct letter, allowing for one or more mismatches?  
  *Hint: Consider sliding windows and hashmaps for tracking character counts.*

- If the string were very large and streamed in (can't hold the entire string), how could you compute the count?  
  *Hint: Maintain counts just for the current run and total — you don’t need to keep the whole string in memory.*

### Summary
This approach leverages the mathematical pattern for the count of substrings in a run of identical characters (run-length encoding). It’s an efficient and classic use of the "grouping" pattern and the arithmetic sum formula. The core coding pattern is useful for substring count problems and string run-length analysis in general.


### Flashcard
For each run of k identical chars, add k×(k+1)/2 to count—sum over all such runs.

### Tags
Math(#math), String(#string)

### Similar Problems
