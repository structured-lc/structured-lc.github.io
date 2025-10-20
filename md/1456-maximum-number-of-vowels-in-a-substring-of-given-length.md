### Leetcode 1456 (Medium): Maximum Number of Vowels in a Substring of Given Length [Practice](https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length)

### Description  
Given a string `s` and an integer `k`, find the maximum number of vowels (a, e, i, o, u) in any substring of `s` with length exactly `k`. Return that number.  
You need to check every possible substring of size `k`, count the number of vowels, and return the largest such count.

### Examples  

**Example 1:**  
Input: `s = "abciiidef", k = 3`  
Output: `3`  
*Explanation: The substring `"iii"` contains 3 vowels.*

**Example 2:**  
Input: `s = "aeiou", k = 2`  
Output: `2`  
*Explanation: Every substring of length 2 (e.g., "ae", "ei", "io", "ou") will contain only vowels. Thus, max is 2.*

**Example 3:**  
Input: `s = "leetcode", k = 3`  
Output: `2`  
*Explanation: Substrings like `"lee"`, `"eet"`, and `"ode"` each contain 2 vowels, which is the maximum.*

**Example 4:**  
Input: `s = "rhythms", k = 4`  
Output: `0`  
*Explanation: No substring contains any vowels.*

**Example 5:**  
Input: `s = "tryhard", k = 4`  
Output: `1`  
*Explanation: The max number of vowels in any 4-length substring is 1.*

### Thought Process (as if you’re the interviewee)  
First, brute-force:  
- For all substrings of length `k`, count the vowels and take the maximum.
- This would be O(n \* k) time, which is not efficient for large strings.

Optimization:  
- Use a **sliding window** of size `k`:
    - Count vowels in the first window.
    - Slide one character at a time:  
        - Subtract 1 if the character that leaves the window is a vowel.
        - Add 1 if the character that enters is a vowel.
        - Update the maximum.
- This makes the solution O(n) time and O(1) space (outside of input/output).
- This is a classic use-case for the sliding window pattern when working with contiguous subarrays or substrings.

### Corner cases to consider  
- `k` equals length of the string: only one window to check.
- No vowels at all: answer should be 0.
- All vowels: answer should be `k`.
- Only one character, and it's a vowel vs. not a vowel.
- `k` is 1.
- String contains consecutive vowels/non-vowels.

### Solution

```python
def maxVowels(s: str, k: int) -> int:
    vowels = {'a', 'e', 'i', 'o', 'u'}
    vowel_count = 0

    # Count vowels in the first window of size k
    for i in range(k):
        if s[i] in vowels:
            vowel_count += 1

    max_vowels = vowel_count

    # Slide the window: one character enters, one leaves
    for i in range(k, len(s)):
        if s[i] in vowels:
            vowel_count += 1
        if s[i - k] in vowels:
            vowel_count -= 1
        if vowel_count > max_vowels:
            max_vowels = vowel_count

    return max_vowels
```

### Time and Space complexity Analysis  

- **Time Complexity:** **O(n)**, where n is the length of the string. We make one initial pass over the first window, and then one pass as we slide the window, total O(n).
- **Space Complexity:** **O(1)**. We use a set for vowels (constant size) and a few integers for counters.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to return the actual substring(s) with the maximum vowel count instead of the count?
  *Hint: Track start indices or save substrings in a list when max is matched.*

- How would this solution change if the input string could contain uppercase letters?
  *Hint: Convert to lowercase, or update the vowels set to include uppercase vowels.*

- If vowels could change dynamically (e.g., any arbitrary list of vowel characters), how would you modify your approach?
  *Hint: Make the vowels set a parameter.*

### Summary
This problem is a textbook example of the **sliding window** pattern for substrings or subarrays with fixed length and counting/swapping elements as the window moves. The pattern is broadly applicable for max/min/sum calculations in subarrays and is much more efficient than brute force, reducing O(n\*k) methods to O(n) for one-pass solutions.


### Flashcard
Use a sliding window of size k to track and update the count of vowels, maintaining the maximum seen.

### Tags
String(#string), Sliding Window(#sliding-window)

### Similar Problems
- Maximum White Tiles Covered by a Carpet(maximum-white-tiles-covered-by-a-carpet) (Medium)
- Minimum Recolors to Get K Consecutive Black Blocks(minimum-recolors-to-get-k-consecutive-black-blocks) (Easy)
- Length of the Longest Alphabetical Continuous Substring(length-of-the-longest-alphabetical-continuous-substring) (Medium)