### Leetcode 591 (Hard): Tag Validator [Practice](https://leetcode.com/problems/tag-validator)

### Description  
You are given a string that represents a snippet of code in a simplified HTML/XML-like format. Your task is to determine whether the input string forms a valid document according to a strict set of rules:
- The entire code must be *wrapped* in a single, valid closed tag: `<TAG_NAME>...</TAG_NAME>`.
- A **valid tag name**: 1 to 9 uppercase letters (A-Z only).
- Tags must be properly *nested* and *matched*; closing tags (`</TAG_NAME>`) must correspond to the most recent unmatched open tag.
- Content inside tags may be:
  - Plain text (any characters except a '<' or '>', unless properly marked)
  - Nested valid tags
  - *CDATA* sections: Inside `<![CDATA[ ... ]]>`, any content (including brackets and other tags) is treated as plain text and ignored for further parsing.
- No tags or CDATA may appear *outside* the outermost matched tag.
- No stray `<`, `>`, or unmatched tags/incorrect tag names are allowed.

### Examples  

**Example 1:**  
Input: `<A></A>`  
Output: `True`  
*Explanation: A single valid tag. The tag name 'A' is 1 character and matches; nothing illegal inside.*

**Example 2:**  
Input: `<A><B></B></A>`  
Output: `True`  
*Explanation: Valid nested structure. Tags are all uppercase and matched.*

**Example 3:**  
Input: `<A></B></A>`  
Output: `False`  
*Explanation: The tags are not properly nested (closing tag 'B' does not match opening tag 'A').*

**Example 4:**  
Input: `<A><![CDATA[<B></B>]]></A>`  
Output: `True`  
*Explanation: Inside CDATA, `<B></B>` is treated as plain text.*

**Example 5:**  
Input: `<A><!CDATA[XYZ]]></A>`  
Output: `False`  
*Explanation: CDATA is incorrectly formatted (must be `<![CDATA[...]]>`).*

### Thought Process (as if you’re the interviewee)  
First, I think about how tag parsing usually works: I need to track open/close tag structure, handle CDATA special zones, and validate tag names. My brute-force idea is to use a stack to track current open tags:
- When seeing a start tag like `<A>`, push 'A' to the stack.
- On a closing tag `</A>`, pop the last item and assert it matches 'A'.
- CDATA sections are tricky because inside `<![CDATA[ ... ]]>` there's no parsing – treat everything up to the next `]]>` as text.
For each step, I'll carefully parse tags, checking character by character. I also need to validate each tag name (1-9 uppercase letters only). Invalid tag names, tags not properly matched, or content outside the initial root tag invalidate the input.
This stack-based approach makes sure nesting and order are respected. I'll avoid using regex or Python shortcuts not allowed in most interviews, and manually parse the string.

### Corner cases to consider  
- Input is missing the outer tag, e.g. `text`
- Opening tag without a closing tag
- Closing tag with no opening tag
- Tag name has lowercase letters or is too long
- Content or other tags before/after the outermost root tag
- Incorrect or malformed CDATA section
- Stray '<', or unclosed tags
- Nested CDATA or text inside CDATA with extra brackets

### Solution

```python
def isValid(code: str) -> bool:
    n = len(code)
    stack = []
    i = 0

    def valid_tag_name(name):
        # Tag name: 1-9 uppercase-only
        return 1 <= len(name) <= 9 and all('A' <= c <= 'Z' for c in name)

    while i < n:
        if code.startswith("<![CDATA[", i):
            # CDATA: only allowed inside tag
            if not stack:
                return False
            j = code.find("]]>", i)
            if j == -1:
                return False
            i = j + 3
        elif code.startswith("</", i):
            # Closing tag
            j = code.find(">", i)
            if j == -1:
                return False
            name = code[i+2:j]
            if not valid_tag_name(name):
                return False
            if not stack or stack[-1] != name:
                return False
            stack.pop()
            i = j + 1
            # if finished, nothing should remain after root close
            if not stack and i != n:
                return False
        elif code.startswith("<", i):
            # Opening tag
            j = code.find(">", i)
            if j == -1:
                return False
            name = code[i+1:j]
            if not valid_tag_name(name):
                return False
            if not stack and i != 0:
                # outer tag must start at index 0
                return False
            stack.append(name)
            i = j + 1
        else:
            # Text between tags, only allowed inside a valid opened tag
            if not stack:
                return False
            i += 1
    return not stack
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N)  
  Each character in `code` is processed at most once: tag parsing and CDATA scanning both scan forward. No nested loops over the input. All stack operations are O(1).

- **Space Complexity:** O(N)  
  A stack stores tag names corresponding to the depth of nested tags: at worst, this is proportional to the length in a degenerate case like `<A><B><C>...`.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle lowercase tag names or allow custom tag name lengths?  
  *Hint: Pass code style or tag name constraints as function arguments.*

- How could this be adapted to validate real HTML, with self-closing tags and attributes?  
  *Hint: Handle spaces, `/>` closing, and ignore attributes.*

- How do you detect and recover from malformed or deeply nested input efficiently?  
  *Hint: Track depth, and detect cycles or stack overflow in recursive form.*

### Summary
The main approach is *manual parsing with a stack* to enforce proper tag nesting, root wrapping, and CDATA handling. This is a classic application of state-machine parsing. This pattern is very common for XML/HTML validation, parenthesis matching, and structured document parsing, and is broadly applicable to similar "well-formedness" problems.


### Flashcard
Use a stack to track open tags, handle CDATA as raw text, and validate tag names and nesting for correct XML structure.

### Tags
String(#string), Stack(#stack)

### Similar Problems
- Add Bold Tag in String(add-bold-tag-in-string) (Medium)