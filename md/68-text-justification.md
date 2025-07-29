### Leetcode 68 (Hard): Text Justification [Practice](https://leetcode.com/problems/text-justification)

### Description  
Given an array of words and an integer maxWidth, format the text so that each line contains exactly maxWidth characters, fully justified. This means:
- **Words are packed greedily** into lines: each line gets as many words as possible without exceeding maxWidth.
- **Extra spaces** between words are distributed as evenly as possible. If the number doesn't divide evenly, more spaces are assigned to the left slots.
- **Special cases**:
  - The **last line** is left-justified: words are separated by a single space and any extra spaces appear at the end.
  - Lines with just one word are also left-justified, with spaces added at the end to fill maxWidth.

### Examples  

**Example 1:**  
Input:  
words = `["This", "is", "an", "example", "of", "text", "justification."]`, maxWidth = `16`  
Output:  
`["This    is    an", "example  of text", "justification.  "]`  
*Explanation:  
- Line 1: "This    is    an" (3 words, 4 spaces: 1 between each, then distribute 2 leftovers leftwards)  
- Line 2: "example  of text"  
- Line 3: "justification.  " (last line — left-justified, spaces at end)*

**Example 2:**  
Input:  
words = `["What","must","be","acknowledgment","shall","be"]`, maxWidth = `16`  
Output:  
`["What   must   be", "acknowledgment  ", "shall be        "]`  
*Explanation:  
- Line 1: "What   must   be"  
- Line 2: "acknowledgment  " (one word, left-justified and padded)  
- Line 3: "shall be        " (last line, left-justified)*

**Example 3:**  
Input:  
words = `["Science","is","what","we","understand","well","enough","to","explain", "to","a","computer.","Art","is","everything","else","we","do"]`, maxWidth = `20`  
Output:  
`["Science  is  what we", "understand      well", "enough to explain to", "a  computer.  Art is", "everything  else  we", "do                  "]`  
*Explanation:  
Words are packed and spaces are distributed as per the rules. Last line is left-justified.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** Start left to right, keep adding words to a new line until adding the next would breach maxWidth. For each such group, distribute spaces according to the rule.
- For **space distribution**, calculate how many total spaces needed (maxWidth minus total chars length), then how many slots (between words), and add spaces accordingly.
- **Special cases:** Last line and single-word lines are left-justified.
- **Approach:**  
  - Use a greedy method to collect as many words as possible for each line.
  - For each line (except the last), pad spaces evenly between words. Extra spaces will be distributed leftwards if not divisble.
  - For the last line and one-word lines, left-justify by joining with single spaces and padding the right with spaces.
- **Trade-offs:** Greedy is optimal here and allows one-pass processing. The main challenge is careful string and space management.

### Corner cases to consider  
- Empty input (`words = []`)
- All words fit in one line.
- maxWidth equal to the length of the longest word (forces one word per line).
- Words with length 1, or all the same length.
- Last line with one word or multiple words (should always be left-justified).
- Only one word total.

### Solution

```python
def fullJustify(words, maxWidth):
    res = []
    i = 0
    n = len(words)
    
    while i < n:
        # Figure out which words fit in the current line.
        line_len = len(words[i])
        last = i + 1
        while last < n and line_len + 1 + len(words[last]) <= maxWidth:
            line_len += 1 + len(words[last])
            last += 1
        
        line_words = words[i:last]
        num_of_words = last - i
        num_of_letters = sum(len(word) for word in line_words)
        
        spaces_to_distribute = maxWidth - num_of_letters
        
        # If last line or the line contains only one word, left-justify
        if last == n or num_of_words == 1:
            line = ' '.join(line_words)
            # pad the end with spaces
            line += ' ' * (maxWidth - len(line))
        else:
            spaces_between = num_of_words - 1
            min_space = spaces_to_distribute // spaces_between
            extra = spaces_to_distribute % spaces_between
            
            line = ''
            for j in range(spaces_between):
                line += line_words[j]
                # extra spaces go to the left slots
                line += ' ' * (min_space + (1 if j < extra else 0))
            line += line_words[-1]
        res.append(line)
        i = last
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the total number of words. Each word is processed at most twice (group assembling, string joining/padding).
- **Space Complexity:** O(m), where m is the total number of characters output (proportional to number of lines × maxWidth). Extra storage is used only for the output list and helper variables, no recursion or extra data structures.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle text justification for right-to-left languages?
  *Hint: Consider word directionality and space alignment from the other side.*

- How do you justify text if the input includes words longer than maxWidth?
  *Hint: Think about word breaking, truncation, or error handling.*

- Could you modify this to support dynamic widths (different widths per line)?
  *Hint: How would the algorithm change if maxWidth varies for each line, e.g., for a multi-column layout?*

### Summary
This is a classic **greedy** and **string manipulation** problem, often asked to assess ability to handle intricate formatting logic. The solution patterns used include greedy packing, math for space distribution, and careful string assembly. These are common in formatting outputs (text editors, tables, reports), and also useful for interview tasks needing granular control over string layout.