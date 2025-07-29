### Leetcode 394 (Medium): Decode String [Practice](https://leetcode.com/problems/decode-string)

### Description  
Given an **encoded string** which uses the pattern `k[encoded_string]` (where `k` is a positive integer and `encoded_string` is repeated `k` times), return the **decoded string**. The input may have nested brackets, and is always valid—digits only specify repeat counts and not part of original data. For example, `3[a2[c]]` encodes `accaccacc`.

### Examples  

**Example 1:**  
Input: `s = "3[a]2[bc]"`  
Output: `"aaabcbc"`  
*Explanation: "a" is repeated 3 times (`"aaa"`), "bc" is repeated 2 times (`"bcbc"`), so the result is `"aaabcbc"`.*

**Example 2:**  
Input: `s = "3[a2[c]]"`  
Output: `"accaccacc"`  
*Explanation: Start from the innermost bracket: "2[c]" gives "cc", so "a2[c]" is "acc". Then "3[acc]" becomes "accaccacc".*

**Example 3:**  
Input: `s = "2[abc]3[cd]ef"`  
Output: `"abcabccdcdcdef"`  
*Explanation: "abc" is repeated 2 times (`"abcabc"`), "cd" is repeated 3 times (`"cdcdcd"`), then add "ef", so the final result is `"abcabccdcdcdef"`.*

### Thought Process (as if you’re the interviewee)  
My first thought is to **process the string from left to right**, decoding each pattern of `k[encoded_string]`. Since brackets can be nested, a simple left-to-right approach won’t work because you can't expand inner brackets before outer ones without recursion or a stack.

A brute-force idea is to **recursively expand the innermost brackets first**—finding every `k[encoded_string]`, decoding the `encoded_string`, and repeating it. This would involve keeping track of numbers (for k) and the substring that should be repeated. But recursion would not scale well for deeply nested or long inputs.

A better way is a **stack-based approach**. As we parse characters:
- If it's a digit, we build up the current number.
- If it's a `[`, we push the number and the current result onto stacks and reset both to start a new context.
- If it's a `]`, we pop the last number and prior string, repeat the current built string, and append it back.
- If it's a character, we build up the current string.

This stack-based method efficiently handles nested brackets in a single pass and uses space proportional to the nesting level.

### Corner cases to consider  
- **Empty string**: Should return an empty string.
- **No brackets**: Inputs with only characters and no brackets.
- **Nested brackets**: Deeply nested like `2[a2[b2[c]]]`.
- **Multi-digit repeat counts**: e.g., `12[a]` to verify handling of `k` > 9.
- **Multiple adjacent encoded patterns**: e.g., `2[a]3[b]`.
- **Letter and number collision**: Ensure digits only indicate repeat count and not letters inside substrings.

### Solution

```python
def decodeString(s):
    # Stacks for numbers and strings
    num_stack = []
    str_stack = []
    curr_num = 0
    curr_str = ""
    
    for c in s:
        if c.isdigit():
            # Build the current number
            curr_num = curr_num * 10 + int(c)
        elif c == '[':
            # Push the current context to stacks, reset for next level
            num_stack.append(curr_num)
            str_stack.append(curr_str)
            curr_num = 0
            curr_str = ""
        elif c == ']':
            # Pop number and previous string, combine
            repeat_count = num_stack.pop()
            prev_str = str_stack.pop()
            curr_str = prev_str + curr_str * repeat_count
        else:
            # Regular character, append to current string
            curr_str += c

    return curr_str
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  We traverse the string once. For each character, operations are push/pop/append (amortized O(1)), so overall linear with string length.

- **Space Complexity:** O(n)  
  The stacks track nesting, which for the worst case (all brackets nested) is O(n). The decoded string can also be O(n) in size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you decode if the encoding also allowed uppercase, spaces, or additional special characters?  
  *Hint: Think about rules for identifying repeated sequences and parsing multi-character tokens.*
  
- Could you decode the string **in-place** if allowed to overwrite the original input?  
  *Hint: Consider using pointers and careful in-place array manipulation.*

- What if the repeat count could be zero or negative in some cases?  
  *Hint: How would this change the validity and result pattern?*

### Summary
This problem uses the **stack pattern**, commonly seen in problems involving nested structures (parentheses, XML parsing, etc.). The stack enables you to process nested and repeated elements in a single pass as you parse the string left-to-right. This approach is efficient, intuitive for nested decoding, and easily adapted for other similar parsing tasks.