### Leetcode 443 (Medium): String Compression [Practice](https://leetcode.com/problems/string-compression)

### Description  
Given an **array of characters** (`chars`), compress it in-place using the following rules:
- For each group of **consecutive repeating characters**, if the group's length is 1, just write the character. If the group's length is greater than 1, write the character followed by the group's count (as characters).
- After compressing, the result should be placed back into `chars` (modify the input **in-place**) and the function should return the **new length** of the array.
- **Note:** If the count is `10` or more, store each digit in a separate slot (`"a"` repeated 12 times becomes `"a","1","2"`).
- You must implement the algorithm using **O(1) extra space**.

### Examples  

**Example 1:**  
Input: `["a","a","b","b","c","c","c"]`  
Output: `6`  
*Explanation: After compression, the array is modified to `["a","2","b","2","c","3"]`. The return value is the new length `6` (contents after that don't matter).*

**Example 2:**  
Input: `["a"]`  
Output: `1`  
*Explanation: The array is already compressed—just `["a"]`.*

**Example 3:**  
Input: `["a","b","b","b","b","b","b","b","b","b","b","b","b"]`  
Output: `4`  
*Explanation: The compressed array is `["a","b","1","2"]`. For eleven consecutive `"b"`s, we store both digits `1` and `2` as characters.*

### Thought Process (as if you’re the interviewee)  

- Since arrays must be modified **in-place**, and we need O(1) extra space, we can't make a new array or use fancy Python string tools.
- **Brute-force idea:**  
    - Go through the chars and track groups of repeated characters. Build a separate string, but that's not allowed since we must write in-place.
- **Optimized approach:**  
    - Use two pointers: read and write.
        - The "read" pointer scans the array for groups of the same character.
        - The "write" pointer marks where to write the compressed data.
    - For each group:
        - Write the character at the write pointer.
        - If the group has more than 1 character, write each digit of the group length (e.g. for length 12, write '1', then '2').
    - Move the read pointer to the start of the next unique group, and repeat.
    - Finally, return where the write pointer ends, which is the new length.

- **Why is this better?**
    - This approach is O(n) time: each character is read once and written once.
    - Space is O(1): only pointers and small variables are used.

### Corner cases to consider  
- Empty array (`[]`)  
- Array with only one character (e.g., `["a"]`)  
- All characters are unique (e.g., `["a","b","c"]`)  
- All characters are the same (e.g., `["a","a","a","a"]`)  
- Group counts with more than one digit (e.g., 10+ consecutive characters)
- Input size at the minimum and maximum boundary  
- Non-alphabet characters (since the prompt doesn't require only letters—it's any character)

### Solution

```python
def compress(chars):
    n = len(chars)
    write = 0  # where to write next character
    read = 0   # where to read next group

    while read < n:
        char = chars[read]
        count = 0
        
        # Count number of occurrences of the current character
        while read < n and chars[read] == char:
            read += 1
            count += 1

        # Write the character
        chars[write] = char
        write += 1

        # If there's more than one, write the count, digit by digit
        if count > 1:
            for c in str(count):
                chars[write] = c
                write += 1

    return write
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = length of `chars`. Each position is read and (possibly) written once.
- **Space Complexity:** O(1), because all work is done in-place with just a few integer variables and no extra data structures.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you decompress this format, given a compressed array?
  *Hint: Given `["a","2","b","2","c","3"]` restore original.*
- Can you generalize this for Unicode or multi-byte character encodings?
  *Hint: What if characters are not ASCII, but UTF-8?*
- How does your approach change if the array is immutable (e.g., given as a string)?
  *Hint: You’ll need to build a new string, possibly using additional space.*

### Summary
This uses the **two pointer pattern**—one pointer for reading input and another for writing output in-place. It's a classic pattern for array in-place modification and can also be applied to remove/remove duplicates, reordering, or compaction type problems. The key challenge is always keeping track of read/write positions and handling multi-digit numbers correctly.