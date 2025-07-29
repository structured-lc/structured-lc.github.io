### Leetcode 3582 (Easy): Generate Tag for Video Caption [Practice](https://leetcode.com/problems/generate-tag-for-video-caption)

### Description  
Given a string caption representing the caption for a video, generate a valid tag as follows:
- Combine all words into a single camelCase string, **prefixed with "#"**.
  - *CamelCase*: the first word is all lowercase; the first letter of subsequent words is uppercase (the rest lowercase).
- Remove all non-English alphabet characters from each word (after "#").
- Truncate the result to at most 100 characters.
Return the generated tag.

### Examples  

**Example 1:**  
Input: `"Leetcode daily streak achieved"`  
Output: `#leetcodeDailyStreakAchieved`  
*Explanation: Split into words: ["Leetcode", "daily", "streak", "achieved"].  
First: "leetcode", then "Daily", "Streak", "Achieved" (capitalize first letter, rest lowercase).  
Final: "#leetcodeDailyStreakAchieved".*

**Example 2:**  
Input: `"can I Go There"`  
Output: `#canIGoThere`  
*Explanation: Each word processed similarly; the first word is lowercase.*

**Example 3:**  
Input: `"hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh"`  
Output: `#hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh`  
*Explanation: The first word is 101 characters, so the result (including "#") is truncated to 100 characters.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
  - Split the input string by whitespace.
  - For each word, remove non-English letters.
  - Apply lowercase to the first word; for others, uppercase the first letter and lowercase the rest.
  - Concatenate the words, prefix with "#".
  - Truncate to 100 characters.

- **Why this approach:**  
  - The words need to be processed sequentially for camelCase and filtering.
  - Truncation is a post-processing step that is efficient after construction.
  - Complexity is linear to total input length.

- **Trade-offs:**  
  - Not using built-in libraries for string manipulation ensures clarity.
  - Could use regex for filtering, but manual filtering ensures interview robustness.

### Corner cases to consider  
- Input is empty string: Should output just "#".
- Multiple spaces or leading/trailing spaces: Should ignore empty splits.
- Words with non-letter characters only: These words become empty and are ignored.
- Words longer than 100 characters: Output is truncated at 100 including "#".
- All-caps or all-lower: Ensure lowercase/uppercase rules are respected.

### Solution

```python
def generate_tag(caption):
    # Split input on spaces, filter out empty strings from consecutive spaces/leading/trailing spaces
    words = [w for w in caption.strip().split(' ') if w]

    processed = []
    for idx, word in enumerate(words):
        # Filter only English letters
        filtered = []
        for c in word:
            if ('a' <= c <= 'z') or ('A' <= c <= 'Z'):
                filtered.append(c)
        if not filtered:
            continue  # Skip if word became empty

        filtered_word = ''.join(filtered)
        if idx == 0:
            processed.append(filtered_word.lower())
        else:
            processed.append(filtered_word[:1].upper() + filtered_word[1:].lower())

    result = '#' + ''.join(processed)
    
    # Truncate to at most 100 characters
    return result[:100]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the input caption.  
  Each character is visited at most twice (during filtering and joining).

- **Space Complexity:** O(n), for storing processed words and constructing the result string.

### Potential follow-up questions (as if you’re the interviewer)  

- What if words can contain unicode letters (e.g., accents, non-English alphabets)?  
  *Hint: Consider Unicode category matching.*

- Can you optimize the solution if the input is guaranteed to be less than 100 characters?  
  *Hint: Early truncation / direct character counting.*

- How would you handle hashtags in the middle of the caption?  
  *Hint: Current rule only allows '#' at the beginning.*

### Summary
This problem is a **classic string preprocessing and formatting pattern**—combining case conversion, filtering, and truncation. The approach is linear scan with per-word transformation, commonly seen in data normalization, UI, and slug/tag generation scenarios. This method is robust, clear, and easily extensible for more complex rules.