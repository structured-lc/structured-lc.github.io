### Leetcode 3306 (Medium): Count of Substrings Containing Every Vowel and K Consonants II [Practice](https://leetcode.com/problems/count-of-substrings-containing-every-vowel-and-k-consonants-ii)

### Description  
Given a string and a non-negative integer k, find the number of substrings in which **every vowel** ('a', 'e', 'i', 'o', 'u') appears at least once, and **exactly k consonants** are present.  
- Substrings may overlap.
- Vowels and consonants must be counted individually for each substring.

### Examples  

**Example 1:**  
Input: `word = "aeioqq", k = 1`  
Output: `0`  
*Explanation: No substring contains all 5 vowels at least once.*

**Example 2:**  
Input: `word = "aeiou", k = 0`  
Output: `1`  
*Explanation: Only substring "aeiou" (word[0..4]) has all vowels, and no consonants.*

**Example 3:**  
Input: `word = "ieaouqqieaouqq", k = 1`  
Output: `3`  
*Explanation: There are 3 valid substrings:  
- word[0..5]: "ieaouq" (q is the only consonant),  
- word[6..11]: "qieaou" (q is the only consonant),  
- word[7..12]: "ieaouq" (q is the only consonant).*

### Thought Process (as if you’re the interviewee)  
Start with the brute-force approach:  
- Generate all possible substrings (O(n²)).  
- For each substring, count the vowels and consonants, check if all vowels appear at least once, and if the consonant count is k.

Brute-force is too slow for big strings (up to 2 × 10⁵).  
Instead, use a **sliding window** approach:  
- Use two pointers (left/right) to maintain a window, expand right pointer to include more characters.
- Track count of vowels (using a map or array for 'a', 'e', 'i', 'o', 'u') and consonants in current window.
- Shrink the window from left until you don't satisfy the condition.
- For each right end, check if the window contains all vowels and exactly k consonants; if so, increment answer.

Tricky part:  
- "Exactly k consonants": For every right index, there could be more than one left that satisfies exactly k consonants and all vowels.  
- It helps to fix the right, try to move left, and when window matches, count how many left positions can be a valid start.

A map of counts for all vowels, a single int for consonants, and an efficient sliding mechanism suffices here.  
Tradeoff: Sliding window is much faster, but slightly more complex to implement.

### Corner cases to consider  
- The string has fewer than 5 vowels → result is 0.
- All vowels but too many consonants → check the exact count.
- No consonants required (k = 0).
- k > number of consonants in any substring.
- Repeating vowels or consonants (test handling counts correctly).
- Substrings that start/end with vowels/consonants.
- String length == 5, and all are vowels, k == 0.

### Solution

```python
def count_substrings(word: str, k: int) -> int:
    n = len(word)
    vowels = set('aeiou')
    ans = 0

    # To avoid double counting, try every start position
    for start in range(n):
        vowel_cnt = {'a':0, 'e':0, 'i':0, 'o':0, 'u':0}
        consonant_cnt = 0
        for end in range(start, n):
            ch = word[end]
            if ch in vowels:
                vowel_cnt[ch] += 1
            else:
                consonant_cnt += 1
            # Only check when consonant count ≤ k (short-circuit long run)
            if consonant_cnt > k:
                break
            # Check if all vowels are present
            if consonant_cnt == k and all(vowel_cnt[v]>0 for v in vowels):
                ans += 1
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²):  
  For each starting index, scan ahead and check for vowels/consonants, break early if consonants exceed k.
- **Space Complexity:** O(1):  
  O(1) extra space (fixed size dict for vowels).

### Potential follow-up questions (as if you’re the interviewer)  

- Can you optimize for large n (e.g., n = 2 × 10⁵)?  
  *Hint: Is there a way to reduce from O(n²) to O(n) using advanced sliding window or pre-computation?*

- What if the requirement is "at least k" instead of "exactly k" consonants?  
  *Hint: After finding valid window, how to count all substrings ending after right.*

- Suppose you must also report the actual substrings found.  
  *Hint: Store or reconstruct substrings based on indices.*

### Summary
This problem is a classic use of **window technique** and character counting—especially for substring matching with multiple simultaneous constraints (count each type, check for presence, and control exact counts of another).  
It's closely related to problems like "minimum window containing all characters" and "fixed/sum substrings", which are very popular interview patterns.  
The brute-force is easy to implement but slow; sliding windows bring performance and show your ability to optimize when overlapping subproblems allow.