### Leetcode 2062 (Easy): Count Vowel Substrings of a String [Practice](https://leetcode.com/problems/count-vowel-substrings-of-a-string)

### Description  
Given a lowercase English string, count the number of **substrings** that:
- consist only of vowels ('a', 'e', 'i', 'o', 'u'), and  
- **contain all 5 vowels at least once**.

You must count substrings formed from consecutive characters, i.e., substrings, not subsequences.

### Examples  

**Example 1:**  
Input: `word = "aeiouu"`  
Output: `2`  
*Explanation: The substrings `"aeiou"` and `"aeiouu"` both have only vowels and include all five vowels at least once. "eiouu", "iouu", etc. contain fewer than 5 types of vowels.*

**Example 2:**  
Input: `word = "unicornarihan"`  
Output: `0`  
*Explanation: No substring of consecutive vowels contains all five vowels.*

**Example 3:**  
Input: `word = "cuaieuouac"`  
Output: `7`  
*Explanation: The substrings that work are "uaieuo", "uaieuou", "uaieuoua", "uaieuouac", "aieuo", "aieuou", and "aieuoua". Each such substring starts and ends at a position that gives all 5 vowels exactly once before reaching a consonant or the string’s end.*

### Thought Process (as if you’re the interviewee)  
First, I understand that I need to count substrings that:
- Consist only of vowels
- Contain all five distinct vowels ('a', 'e', 'i', 'o', 'u') at least once

**Brute-force approach:**
- For all possible substrings, check if it contains only vowels and all 5 vowels.
- For every possible (i, j) pair (i ≤ j), extract word[i:j+1], check both conditions.
- This is O(n² × k), where n is the string length and k is the average substring length (due to repeated checks and set operations).

**Optimized brute-force:**
- For each starting index, move forward while characters are vowels, keeping track of unique vowels with a set or array.
- As soon as the substring contains all 5 vowels, increment the result.
- If a non-vowel is found, break the inner loop since no further extension will be valid starting from i.

This approach leverages the fact that any valid substring must be vowels-only, so we can avoid unnecessary checks once a consonant is reached.  
It's efficient for small/medium input sizes (with O(n²) time), but not linear.

### Corner cases to consider  
- Empty string: result is 0
- No vowels at all: result is 0
- Substrings formed by only vowels but not all 5 types: result is 0
- Multiple overlapping substrings satisfying the criteria
- All vowels together at the start/end/multiple times in the string
- Input containing consecutive vowels sequences longer than 5 (long substrings)

### Solution

```python
def countVowelSubstrings(word: str) -> int:
    def is_vowel(c):
        return c in 'aeiou'

    n = len(word)
    total = 0

    # Try every possible starting position
    for i in range(n):
        vowel_set = set()
        # Explore all substrings starting at i
        for j in range(i, n):
            if is_vowel(word[j]):
                vowel_set.add(word[j])
                # Only count if we see all 5 vowels so far
                if len(vowel_set) == 5:
                    total += 1
            else:
                # If we find a non-vowel, no longer valid
                break

    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²), since for each of the n starting positions we may need to traverse up to n more positions in the worst case (when entire string is vowels). For each step, set operations are O(1) as the max set size is 5 (number of vowels).
- **Space Complexity:** O(1) extra space. The set of vowels only grows to at most 5; no additional space proportional to input.

### Potential follow-up questions (as if you’re the interviewer)  

- How would this change if the set of vowels were larger or dynamic?  
  *Hint: Think about scalable structures for larger alphabets, maybe using hashmaps.*

- Can you count, for each position, the shortest substring starting there containing all 5 vowels?  
  *Hint: Sliding window or two-pointer technique, but condition check changes.*

- What if you had to return all such substrings rather than just counting?  
  *Hint: Store the valid substrings and avoid duplicates if necessary.*

### Summary
The problem is a classic example of the "substring with all unique required characters" pattern but specialized to the case where the substring is restricted to vowels only. The solution uses an optimized brute-force approach: for every starting index, expand as long as you see vowels, track unique ones, and count as soon as all 5 are present.  
This is a common string and sliding window pattern, and similar logic is used in problems involving substrings with all required characters, e.g., "Minimum Window Substring", "Substring with Concatenation of All Words", etc.

### Tags
Hash Table(#hash-table), String(#string)

### Similar Problems
- Number of Matching Subsequences(number-of-matching-subsequences) (Medium)
- Subarrays with K Different Integers(subarrays-with-k-different-integers) (Hard)
- Number of Substrings With Only 1s(number-of-substrings-with-only-1s) (Medium)
- Longest Substring Of All Vowels in Order(longest-substring-of-all-vowels-in-order) (Medium)
- Total Appeal of A String(total-appeal-of-a-string) (Hard)
- Count of Substrings Containing Every Vowel and K Consonants II(count-of-substrings-containing-every-vowel-and-k-consonants-ii) (Medium)
- Count of Substrings Containing Every Vowel and K Consonants I(count-of-substrings-containing-every-vowel-and-k-consonants-i) (Medium)