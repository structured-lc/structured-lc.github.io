### Leetcode 2586 (Easy): Count the Number of Vowel Strings in Range [Practice](https://leetcode.com/problems/count-the-number-of-vowel-strings-in-range)

### Description  
Given an array of strings words and two integer indices left and right, count how many words in the subarray — between indices left and right (inclusive) — start and end with a vowel character ('a', 'e', 'i', 'o', 'u').  
A string is considered a "vowel string" if both its first and last characters are vowels.

### Examples  

**Example 1:**  
Input: `words = ["are","amy","u"], left = 0, right = 2`  
Output: `2`  
*Explanation: words = "are" (starts and ends with vowel), words[1] = "amy" (starts and ends with vowel 'a', 'y' is not a vowel), words[2] = "u" (starts and ends with vowel). Both "are" and "u" count, total = 2.*

**Example 2:**  
Input: `words = ["hey","aeo","mu","ooo","artro"], left = 1, right = 4`  
Output: `3`  
*Explanation: Check words[1:5] = ["aeo","mu","ooo","artro"]:  
- "aeo" (starts 'a', ends 'o'): count  
- "mu" (starts 'm') : not count  
- "ooo" (starts 'o', ends 'o') : count  
- "artro" (starts 'a', ends 'o'): count  
So answer is 3.*

**Example 3:**  
Input: `words = ["apple","banana","anaconda","eagle","kiwi","onion","ubi","orange"], left = 2, right = 5`  
Output: `2`  
*Explanation: Check words[2:6] = ["anaconda","eagle","kiwi","onion"]:  
- "anaconda" (starts 'a', ends 'a'): count  
- "eagle" (starts 'e', ends 'e'): count  
- "kiwi" (starts 'k'): not count  
- "onion" (starts 'o', ends 'n'): not count  
So answer is 2.*

### Thought Process (as if you’re the interviewee)  
First, I’ll iterate through the subarray of words from left to right indices (inclusive). For each word, I’ll check if the first character and the last character are both vowels. For vowels, I’ll use a set {'a', 'e', 'i', 'o', 'u'} for efficient lookup.  
The brute-force approach is enough here since we are doing at most n checks, and each check is O(1).  
Optimization isn’t necessary since the constraints are small, but to make code clearer, I’ll use a helper function to check for vowels.  

### Corner cases to consider  
- Empty words array  
- left > right (should not happen as per constraints, but defensively)  
- Strings of length 1 (first and last char are same)  
- Mixed case (all input assumed lowercase as per problem, if not, convert to lower)  
- No words in range or no vowel words in range (answer should be 0)  
- word is "" (empty string) — depends on constraints, but probably not possible

### Solution

```python
def countVowelStringsInRange(words, left, right):
    # Set of vowels for quick lookup
    vowels = {'a', 'e', 'i', 'o', 'u'}
    count = 0
    # Iterate from left to right indices (inclusive)
    for i in range(left, right + 1):
        word = words[i]
        # Check: first and last char exist and are both vowels
        if word and word[0] in vowels and word[-1] in vowels:
            count += 1
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = right - left + 1; we check each word in the subarray, and each check is O(1).
- **Space Complexity:** O(1), only a constant amount of extra space is used (no new arrays or lists allocated).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the words could have upper/lower case letters?  
  *Hint: Force lower-case/upper-case normalization before checking vowel condition.*

- What if you need to find the count efficiently multiple times with changing queries (like many left, right queries on the same list)?  
  *Hint: Preprocess into a prefix sums array, then answer any range query in O(1).*

- Can you return the list of indices where the words are vowel strings, not just the count?  
  *Hint: Instead of just count, collect and return index positions.*

### Summary
The solution uses a **simple linear scan** of the subarray, with a helper vowel check for each word’s endpoints.  
The coding pattern is “sliding window/range scan” and “simple string property check”.  
This approach is common for substring or array range validation queries and can be adapted for prefix-sums-like optimizations if queries are repeated.