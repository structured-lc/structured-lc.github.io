### Leetcode 1324 (Medium): Print Words Vertically [Practice](https://leetcode.com/problems/print-words-vertically)

### Description  
Given a string `s` consisting of words separated by spaces, print the words vertically. For each column (by character position), create a new row string that contains that character from each word (in order), omitting spaces. The final output is a list of strings, one for each vertical slice, right-trimmed (no trailing spaces), preserving internal spaces.

### Examples  

**Example 1:**  
Input: `s = "HOW ARE YOU"`  
Output: `['HAY', 'ORO', 'WEU']`  
*Explanation: Column-wise, first: H O W ⇒ H; A R E ⇒ A; Y O U ⇒ Y. Second: O R O; third: W E U.*

**Example 2:**  
Input: `s = "TO BE OR NOT TO BE"`  
Output: `['TBONTB', 'OEROOE', '   T']`  
*Explanation: Pad shorter words with spaces, then right-trim each line.*

**Example 3:**  
Input: `s = "CONTEST IS COMING"`  
Output: `['CIC', 'OSO', 'N M', 'T I', 'E N', 'S G', 'T']`  
*Explanation: Each string is formed by reading vertically downwards.*

### Thought Process (as if you’re the interviewee)  
- Split the string into words.
- Find the maximum word length. For each character column (from 0 to max length), traverse each word, take letter if present, else space.
- Build each vertical word and right-trim trailing spaces before returning.

### Corner cases to consider  
- Empty string or single word input
- Words of very different lengths
- Multiple spaces between words
- Words containing only spaces

### Solution

```python
# Vertical reading and right-strip trailing spaces
def printVertically(s):
    words = s.split(' ')
    maxlen = max(len(w) for w in words)
    res = []
    for i in range(maxlen):
        chars = []
        for w in words:
            if i < len(w):
                chars.append(w[i])
            else:
                chars.append(' ')
        res.append(''.join(chars).rstrip())
    return res
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n × m), where n is number of words, m is max word length.
- **Space Complexity:** O(n × m), as we build an array for each character column.

### Potential follow-up questions (as if you’re the interviewer)  
- What if you want to print columns left-justified?  
  *Hint: Change strip to lstrip or don’t strip at all.*

- Can you print the vertical output bottom-up?  
  *Hint: Reverse order of building the result.*

- How would you handle punctuation or mixed whitespace?  
  *Hint: Consider advanced tokenization.*

### Summary
This problem uses basic string and array manipulation with the column-major reading pattern. The approach is a variant of matrix transposition, a pattern common in formatting and ETL/data cleanup questions.