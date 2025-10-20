### Leetcode 937 (Medium): Reorder Data in Log Files [Practice](https://leetcode.com/problems/reorder-data-in-log-files)

### Description  
Given an array of **log entries**, each as a string with an identifier followed by either space-separated words (letters) or digits. **Letter-logs** contain only lowercase letters after the identifier; **digit-logs** contain only digits.  
Your task:  
- **Reorder the logs** so that all letter-logs come before any digit-logs.
- **Sort letter-logs** lexicographically based on their content (excluding the identifier). If contents are identical, sort by identifier.
- **Keep the relative ordering** of digit-logs unchanged.

### Examples  

**Example 1:**  
Input: `["dig1 8 1 5 1","let1 art can","dig2 3 6","let2 own kit dig","let3 art zero"]`  
Output: `["let1 art can","let3 art zero","let2 own kit dig","dig1 8 1 5 1","dig2 3 6"]`  
*Explanation:  
- Split letter-logs: "let1 art can", "let2 own kit dig", "let3 art zero"  
- Split digit-logs: "dig1 8 1 5 1", "dig2 3 6"  
- Sort letter-logs by content: "art can" < "art zero" < "own kit dig"  
- Sorted logs: "let1 art can", "let3 art zero", "let2 own kit dig"  
- Append original order digit-logs.*

**Example 2:**  
Input: `["a1 9 2 3 1","g1 act car","zo4 4 7","ab1 off key dog","a8 act zoo"]`  
Output: `["g1 act car","a8 act zoo","ab1 off key dog","a1 9 2 3 1","zo4 4 7"]`  
*Explanation:  
- Letter-logs: "g1 act car", "ab1 off key dog", "a8 act zoo"  
- Sorted by content, then by identifier.*

**Example 3:**  
Input: `["let1 a b","let2 a b","let3 1 2 3"]`  
Output: `["let1 a b","let2 a b","let3 1 2 3"]`  
*Explanation:  
- Letter-logs content identical; sort by identifier.*


### Thought Process (as if you’re the interviewee)  
- First, **separate logs** into letter-logs and digit-logs. This helps with clarity and preserves the order constraint for digit-logs.
- For **letter-logs**, extract the content and identifier; sort by (content, identifier).
- For **digit-logs**, retain their original order.
- This is a classic **string parsing and custom sorting** problem.  
- Edge cases: Empty logs, all digit-logs, all letter-logs, logs with matching content.
- **Trade-offs:**  
  - Brute-force: Try sorting all logs with a custom key function, but separating gives clear logic and is more manageable.
  - Final approach:  
    - Separate lists for letter and digit logs,
    - Custom sort on letter-logs,
    - Concatenate the result.


### Corner cases to consider  
- Empty input: `[]`
- Only digit-logs or only letter-logs
- Logs with identical contents but different identifiers  
- Identifier or content has edge-case values (short, long, or space edge)
- Varying log lengths
- Mixed-case input (but per problem should only be lowercase for letter-logs)


### Solution

```python
def reorderLogFiles(logs):
    letter_logs = []
    digit_logs = []

    for log in logs:
        # Split at first space; left part is identifier
        idx = log.find(' ')
        identifier = log[:idx]
        content = log[idx+1:]

        # Check first character of content to determine log type
        if content[0].isalpha():
            letter_logs.append((content, identifier, log))
        else:
            digit_logs.append(log)

    # Sort letter_logs: first by content, then by identifier
    letter_logs.sort(key=lambda x: (x[0], x[1]))

    # Rebuild resulting list
    reordered = [log for _, _, log in letter_logs] + digit_logs
    return reordered
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(L log L),  
  - where L = number of letter-logs.  
  - We separate logs in O(N), then sort only the letter-logs.  
  - Digit-logs retain initial order, which is O(N) for concatenation.
- **Space Complexity:** O(N),  
  - for storing separated lists and auxiliary tuples used for sorting.  
  - (N = total number of logs; output list is same size)


### Potential follow-up questions (as if you’re the interviewer)  

- What if the logs are extremely large (streamed data)?
  *Hint: Can you process logs in chunks, or is it feasible to sort only what fits in memory?*

- How would you handle extremely long identifiers or content, possibly with spaces in identifiers?
  *Hint: How do you robustly split only at the first space?*

- What changes if you have to sort digit-logs by their content too?
  *Hint: Can you unify your sorting logic for both log types?*


### Summary
This problem uses the **custom sorting** and **list partitioning** approach, separating data based on type before applying the relevant sort. This pattern is common in interviews for log processing, string manipulation, and custom ordering tasks—applicable to many "process and re-sort by rules" problems in code interviews.


### Flashcard
Separate letter-logs and digit-logs; sort letter-logs by content then identifier, keep digit-logs in original order, and concatenate.

### Tags
Array(#array), String(#string), Sorting(#sorting)

### Similar Problems
