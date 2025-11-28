### Leetcode 2947 (Medium): Count Beautiful Substrings I [Practice](https://leetcode.com/problems/count-beautiful-substrings-i)

### Description  
Given a string `s` of lowercase English letters and an integer `k`, return the number of **non-empty "beautiful" substrings** in `s`.  
A substring is called **beautiful** if:
- It contains an equal number of vowels and consonants.
- The product of the vowel count and consonant count is divisible by `k`.

You must check every possible substring (contiguous) of `s` and count those that satisfy the above rules.

### Examples  

**Example 1:**  
Input: `s = "baeyh"`, `k = 2`  
Output: `2`  
Explanation:  
The beautiful substrings are `"baey"` (vowels=`a`,`e`, consonants=`b`,`y`; both appear twice so 2 vowels and 2 consonants, 2×2=4 is divisible by 2)  
and `"aeyh"` (vowels=`a`,`e`, consonants=`y`,`h`; 2 vowels and 2 consonants, 4 is divisible by 2).

**Example 2:**  
Input: `s = "abba"`, `k = 1`  
Output: `4`
Explanation:  
All substrings with even length and an equal number of vowels and consonants count because their product is always a multiple of 1:  
Possible substrings include `"ab"`, `"bb"`, `"ba"`, `"abba"`.

**Example 3:**  
Input: `s = "bcd"`, `k = 2`  
Output: `0`  
Explanation:  
No substring has equal numbers of vowels and consonants.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  The naive approach is to try every possible substring of `s` (start and end indices), and for each, count the number of vowels and consonants.  
  If both counts are the same and their product is divisible by `k`, increment our answer.

- **Optimizing:**  
  Since there are O(n²) possible substrings, and each substring scan is O(n) if we count vowels/consonants afresh, this leads to O(n³), which is too high.  
  To do better, we can, for each start index, maintain running vowel_count and consonant_count as we expand the end index.  
  This reduces per-substring checking to O(1), for a total O(n²), which is acceptable for short/medium strings (n ≤ a few thousand).

- **Decision:**  
  Stick with the running counts per start index, check the two criteria, and increment the answer if both match.  
  There’s no immediate trick with prefix-sums or hash maps because of the double constraint.

### Corner cases to consider  
- Empty string (`s = ""`): should return 0.  
- String contains only vowels or only consonants: will always return 0.  
- k = 1 (so any equal counts automatically work).  
- All substrings are length 1: impossible (vowels ≠ consonants).  
- Large input string: algorithm must avoid O(n³).

### Solution

```python
def beautifulSubstrings(s: str, k: int) -> int:
    # Set containing the vowel characters for quick lookup
    vowels_set = {'a', 'e', 'i', 'o', 'u'}
    n = len(s)
    result = 0
    
    # Try every possible starting index
    for i in range(n):
        vowel_count = 0
        consonant_count = 0
        # Expand substring to the right
        for j in range(i, n):
            if s[j] in vowels_set:
                vowel_count += 1
            else:
                consonant_count += 1
            # Both counts must be positive and equal
            if vowel_count == consonant_count and vowel_count > 0:
                prod = vowel_count * consonant_count
                if prod % k == 0:
                    result += 1
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²)  
  For each start index (n choices), we extend the end index (up to n choices), and track counts in O(1).  
  For each pair, the check is O(1).

- **Space Complexity:** O(1)  
  Only a fixed number of counters and variables are used (not depending on input size).

### Potential follow-up questions (as if you’re the interviewer)  

- What if `s` may contain uppercase letters?  
  *Hint: How would you easily normalize for both cases?*

- Can you solve this in less than O(n²)?  
  *Hint: Is there a way to use prefix-sums or hash maps by encoding the state differently?*

- What changes if the criterion is “number of vowels is exactly k more than the number of consonants”?  
  *Hint: You would change your check and probably can keep the rest the same.*

### Summary
This problem is a classic "check all substrings with constraints" string problem, best handled with two nested loops and running counters. The approach uses the sliding window or prefix-accumulation concept, but due to the double constraint (balance and divisibility), hash map or prefix sum tricks do not directly help.  
This coding pattern can be extended to problems involving balanced substrings, character frequencies, and substring product or parity conditions.


### Flashcard
For each starting index, maintain a running count of vowels and consonants. When vowel_count == consonant_count and their product is divisible by k, increment the answer. O(n²) with O(1) per substring.

### Tags
Hash Table(#hash-table), Math(#math), String(#string), Enumeration(#enumeration), Number Theory(#number-theory), Prefix Sum(#prefix-sum)

### Similar Problems
