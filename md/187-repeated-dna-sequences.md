### Leetcode 187 (Medium): Repeated DNA Sequences [Practice](https://leetcode.com/problems/repeated-dna-sequences)

### Description  
Given a string representing a DNA sequence (composed only of the characters 'A', 'C', 'G', and 'T'), find all 10-letter-long substrings that appear more than once in the DNA molecule. Return the repeated sequences in any order.  
This is about efficiently detecting repeated fixed-length patterns within a string—important for sequence analysis.

### Examples  

**Example 1:**  
Input: `"AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"`  
Output: `["AAAAACCCCC", "CCCCCAAAAA"]`  
*Explanation: The substring "AAAAACCCCC" appears twice, and "CCCCCAAAAA" also appears twice.*

**Example 2:**  
Input: `"AAAAAAAAAAAAA"`  
Output: `["AAAAAAAAAA"]`  
*Explanation: The 10-letter substring "AAAAAAAAAA" appears multiple times in overlapping fashion.*

**Example 3:**  
Input: `"AGCTAGCTAGCTAGCTAGCT"`  
Output: `["AGCTAGCTAG"]`  
*Explanation: The substring "AGCTAGCTAG" appears at positions 0, 4, 8; so it repeats.*

### Thought Process (as if you’re the interviewee)  

Brute-force would be to generate all possible 10-letter substrings and check for duplicates by comparing against every other substring. This would be slow (O(n²)), especially for large input.  
A better approach is to use a **hash map (dictionary)** to count occurrences of each 10-letter substring while iterating through the string with a sliding window of size 10. This is O(n) because both substring slicing and dictionary operations are efficient.

Since DNA strings have only four characters, an advanced way (sometimes needed for further optimization, e.g. huge data sets or memory) is to encode each 10-letter string as an integer using 2 bits/letter and use a rolling hash, but for most interview scenarios, a simple hash map approach suffices and is easier to code and reason about.

### Corner cases to consider  
- The string is shorter than 10 letters ⇒ no repeated substrings possible, should return an empty list.
- Only unique substrings (no repeats).
- Input string contains overlapping substrings that repeat (e.g., lots of 'A's).
- All substrings are the same.
- Very large string, check efficiency.

### Solution

```python
def findRepeatedDnaSequences(s):
    # Store seen substrings and results
    seen = set()
    repeated = set()
    # Iterate all possible 10-letter substrings
    for i in range(len(s) - 9):
        substr = s[i:i+10]
        if substr in seen:
            repeated.add(substr)
        else:
            seen.add(substr)
    return list(repeated)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the string.  
  We check each possible substring (n-9 iterations), with O(1) average set lookups/inserts.
- **Space Complexity:** O(n), in the worst case where all substrings are unique/added, plus storage for the output list.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you further reduce memory usage for very long input?
  *Hint: Consider bit manipulation—encode each letter with 2 bits and use integer hashing (rolling hash).*
- What if the substring length was variable or given at runtime?
  *Hint: Parametrize the substring length; logic remains the same but handle variable window size.*
- Could you handle continuous streams of DNA where the input isn’t fully loaded at once?
  *Hint: Maintain a moving window; might need extra data structures if substrings can span batches.*

### Summary
This problem leverages the **sliding window + hash set/pattern detection** pattern, common in substring/duplicate substring or subarray problems.  
The approach highlights efficient substring search and duplicate detection using hashing—easily applicable to varied string, pattern, or window-based detection tasks in technical interviews.

### Tags
Hash Table(#hash-table), String(#string), Bit Manipulation(#bit-manipulation), Sliding Window(#sliding-window), Rolling Hash(#rolling-hash), Hash Function(#hash-function)

### Similar Problems
