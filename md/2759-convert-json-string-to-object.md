### Leetcode 2759 (Hard): Convert JSON String to Object [Practice](https://leetcode.com/problems/convert-json-string-to-object)

### Description  
You are given a string representing a JSON value (object, array, string, number, boolean, or null). The string is guaranteed to be a valid JSON (no malformed input). You must write a function to parse the string into its corresponding Python data structure (dict, list, str, int/float, bool, or None), **without using any built-in library methods** like `json.loads`.  
- The JSON may be arbitrarily nested (arrays and objects within arrays, etc.).
- The string lacks escape and invisible characters, and all string values are alphanumeric.

### Examples  

**Example 1:**  
Input: `{"name":"John","age":30,"isStudent":false}`  
Output: `{"name": "John", "age": 30, "isStudent": False}`  
*Explanation: Start at `{`, parse each key (string in ""), then parse values (which can be string, number, boolean), combine into dict.*

**Example 2:**  
Input: `[1,"two",true,null,{"a":[2,3]}]`  
Output: `[1, "two", True, None, {"a": [2, 3]}]`  
*Explanation: Start at `[`, iterate elements; recognize numbers, strings, booleans, null, and a nested object with a list value.*

**Example 3:**  
Input: `"helloWorld"`  
Output: `"helloWorld"`  
*Explanation: A bare string surrounded by double quotes is parsed as a simple Python string.*

### Thought Process (as if you’re the interviewee)  
First, since the input is guaranteed valid and has no escape characters, recursive descent parsing is a natural fit.  
- Start by advancing through the string character by character using a pointer/index.
- For `{`, call a helper to parse an object: parse key-string, colon, value (recursively), comma or closing `}`.
- For `[`, parse array: recursively parse each element, comma or closing `]`.
- For `"`, parse string: advance until the next `"` is found.
- For digits or '-', parse a number.
- For the start of true/false/null, parse corresponding values.  
I would implement helper functions like `parseValue`, `parseObject`, `parseArray`, and `parseString`, each returning the value and updating the position index.  
This is efficient because it only visits each character once, and works for arbitrary nesting. Stack/iterative approaches can also work, but recursion mirrors the grammar of JSON and often is more readable in interviews.  
The main trade-off: Recursion depth limited by input nesting, but for interview-level input this is acceptable.

### Corner cases to consider  
- Empty object `{}` and empty array `[]`
- Strings representing single primitives like `"123"` or `"true"`
- Numbers with and without leading zeros
- Large nested structures
- Arrays or objects containing different primitive types
- Top-level non-object/array (e.g., `"foo"`, `123`)
- Extra whitespace (if allowed ― here not relevant as stated)
- Value `null` mapping to Python `None`

### Solution

```python
def json_parse(s: str):
    # Index as a mutable object, so it can be updated in helper functions
    idx = [0]

    def skip_whitespace():
        # No whitespace per problem, but add if input might allow in extension
        while idx[0] < len(s) and s[idx[0]] == ' ':
            idx[0] += 1

    def parse_value():
        if idx[0] >= len(s):
            return None
        char = s[idx[0]]
        if char == '"':
            return parse_string()
        elif char == '{':
            return parse_object()
        elif char == '[':
            return parse_array()
        elif char == 't':
            return parse_true()
        elif char == 'f':
            return parse_false()
        elif char == 'n':
            return parse_null()
        else:
            # number: could be negative or digit
            return parse_number()

    def parse_string():
        # Assume s[idx] == '"'
        idx[0] += 1  # skip opening quote
        start = idx[0]
        while s[idx[0]] != '"':
            idx[0] += 1
        value = s[start:idx[0]]
        idx[0] += 1  # skip closing quote
        return value

    def parse_number():
        start = idx[0]
        if s[idx[0]] == '-':
            idx[0] += 1
        while idx[0] < len(s) and s[idx[0]].isdigit():
            idx[0] += 1
        # Fractional part
        if idx[0] < len(s) and s[idx[0]] == '.':
            idx[0] += 1
            while idx[0] < len(s) and s[idx[0]].isdigit():
                idx[0] += 1
            return float(s[start:idx[0]])
        return int(s[start:idx[0]])

    def parse_true():
        assert s[idx[0]:idx[0]+4] == "true"
        idx[0] += 4
        return True

    def parse_false():
        assert s[idx[0]:idx[0]+5] == "false"
        idx[0] += 5
        return False

    def parse_null():
        assert s[idx[0]:idx[0]+4] == "null"
        idx[0] += 4
        return None

    def parse_array():
        arr = []
        idx[0] += 1  # skip [
        while True:
            if s[idx[0]] == ']':
                idx[0] += 1
                break
            arr.append(parse_value())
            if s[idx[0]] == ',':
                idx[0] += 1  # skip comma
            elif s[idx[0]] == ']':
                idx[0] += 1
                break
        return arr

    def parse_object():
        obj = {}
        idx[0] += 1  # skip {
        while True:
            if s[idx[0]] == '}':
                idx[0] += 1
                break
            key = parse_string()
            assert s[idx[0]] == ':'
            idx[0] += 1  # skip colon
            val = parse_value()
            obj[key] = val
            if s[idx[0]] == ',':
                idx[0] += 1  # skip comma
            elif s[idx[0]] == '}':
                idx[0] += 1
                break
        return obj

    return parse_value()
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), because each character in the string is examined at most once.
- **Space Complexity:** O(N), for the space taken by the output structure (recursively constructed dicts/lists), plus recursion stack up to depth of nesting.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle escape characters or unicode in JSON strings?  
  *Hint: Update `parse_string` to handle backslashes, e.g., `\"`, `\\`, `\uXXXX`.*

- Can you parse extremely large or deeply nested inputs?  
  *Hint: Consider iterative (stack-based) parsing to avoid recursion depth limits.*

- How would you extend this to allow for pretty-printing or stringifying the parsed object?  
  *Hint: Write a dual function that serializes Python objects to JSON-compliant strings.*

### Summary
This problem is a classic **recursive descent parsing** exercise, building data structures directly from character streams. The pattern is widely applicable in compilers, configuration file parsing, interpreters, and similar problems requiring string-to-data translation based on a defined grammar.