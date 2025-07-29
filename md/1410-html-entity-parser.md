### Leetcode 1410 (Medium): HTML Entity Parser [Practice](https://leetcode.com/problems/html-entity-parser)

### Description  
Given a text string with HTML entity codes (e.g. "&quot;" for ", "&gt;" for >, etc.), replace all valid HTML entity names in the text with their corresponding character. Only certain entities are supported: &quot;, &apos;, &amp;, &gt;, &lt;, &frasl;.

### Examples  
**Example 1:**  
Input: `&amp; is an HTML entity but &ambassador; is not.`  
Output: `& is an HTML entity but &ambassador; is not.`  
*Explanation: Only known entities are converted; unknown remain as-is.*

**Example 2:**  
Input: `and I quote: &quot;...&quot;`  
Output: `and I quote: "..."`  
*Explanation: &quot; replaced with ".*

**Example 3:**  
Input: `Stay &gt; Stay &lt; Stay &amp; Stay &frasl;`  
Output: `Stay > Stay < Stay & Stay /`  
*Explanation: Each respective entity code is replaced.*

### Thought Process (as if you’re the interviewee)  
Create a dictionary mapping entity names to their literal replacements. Iterate the input string and replace all valid occurrences. There are multiple ways: (1) Use regular expressions to match and replace; (2) Manual parsing using pointers to find '&' and ending ';', and look up in the mapping. Since only a few entity names are valid, both methods are efficient. Beware overlapping or nested entities; ensure only valid mappings are replaced.

### Corner cases to consider  
- Entities at the start or end of string.
- Invalid / unknown entity names (do not convert).
- Consecutive or nested entity codes.
- Interleaved regular characters and entities.

### Solution

```python
def entityParser(text):
    entities = {
        '&quot;': '"', '&apos;': "'", '&amp;': '&',
        '&gt;': '>', '&lt;': '<', '&frasl;': '/',
    }
    i = 0
    n = len(text)
    result = []
    while i < n:
        if text[i] == '&':
            found = False
            for ent, char in entities.items():
                if text.startswith(ent, i):
                    result.append(char)
                    i += len(ent)
                    found = True
                    break
            if not found:
                result.append('&')
                i += 1
        else:
            result.append(text[i])
            i += 1
    return ''.join(result)
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n × k), n = length of text, k = number of entity patterns (constant here), as for every '&' position, we check all patterns.
- **Space Complexity:** O(n), result storage (output replaces input at most one-to-one).

### Potential follow-up questions (as if you’re the interviewer)  
- How to generalize the parser for arbitrary entity codes?  
  *Hint: Use a hash table or dictionary built from an entity code table; possibly regex for matching.*

- What if some entity codes are case-insensitive?  
  *Hint: Normalize comparisons or expand the mapping for different forms.*

- How to efficiently handle very large input strings?  
  *Hint: Stream processing and avoiding backtracking, possibly using two pointers.*

### Summary
Classic pattern matching and string replacement problem, suitable for substring, pointer, or regex solutions. The algorithm uses a map for structured lookups and iterates with pointer advancement, a common approach in custom string parsing interview problems.