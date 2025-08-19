### Leetcode 806 (Easy): Number of Lines To Write String [Practice](https://leetcode.com/problems/number-of-lines-to-write-string)

### Description  
You are given a string *s* made up of lowercase English letters, and an array *widths* of length 26 where each *widths[i]* represents the pixel width of the iᵗʰ letter of the alphabet ('a' → widths, ..., 'z' → widths).  
Each line of writing can have at most 100 pixels. Starting from the first character, write letters to a line until adding another letter would exceed 100 pixels; then start a new line.  
Return an array of two integers: the total number of lines needed to write all the letters of *s*, and the pixel width used by the last line.

### Examples  

**Example 1:**  
Input:  
widths = `[10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10]`,  
s = `"abcdefghijklmnopqrstuvwxyz"`  
Output: `[3, 60]`  
*Explanation: Each letter takes 10 pixels, so after writing 10 letters, you've filled 1 line (10×10=100).  
Next 10 letters fill the 2nd line (another 100).  
Last 6 letters take 60 pixels on the 3rd line.*

**Example 2:**  
Input:  
widths = `[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]`,  
s = `"bbbcccdddaaa"`  
Output: `[2, 24]`  
*Explanation: Each letter is 4 pixels. Write as many as possible on each line.  
First 25 pixels used fills 6 characters per line (6 × 4 = 24), but since 24 < 100, you keep adding. Continue until the current letter would overflow; at that point, move to next line.  
With 12 letters × 4 = 48, you fit all in 1 line. But since you can add more, continue and only break when necessary.*

**Example 3:**  
Input:  
widths = `[10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10]`,  
s = `"zzz"`  
Output: `[1, 30]`  
*Explanation: Each 'z' is 10 pixels, and adding 3 of them (30 pixels) fits on a single line.*

### Thought Process (as if you’re the interviewee)  
- The brute-force idea is to process each character one by one, keep track of the current line's pixel width, and if adding the next character would exceed 100, increment the line count and start the new line's width with the current character.
- To get the width for a character, use `widths[ord(c) - ord('a')]`.
- Initialize `num_lines` to 1 (since at least one line is needed) and `current_width` to 0.
- For each character:
  - If `current_width + char_width > 100`: Start a new line (`num_lines += 1`, `current_width = 0`), then add the char width.
  - Else, add the char width to `current_width`.
- At the end, return `[num_lines, current_width]`.
- This is O(n) time (where n = len(s)), O(1) space.

### Corner cases to consider  
- Empty string: should return [1, 0] (still one line, but width is zero).
- Characters which are exactly fitting the line (current_width + char_width == 100).
- Very large or very small widths (some chars fill a line alone).
- All widths are 1, and input string has exactly 100 chars.
- All widths are 100 and input string has multiple chars.
- String length is less than or equal to 1.

### Solution

```python
def numberOfLines(widths, s):
    num_lines = 1      # At least one line is needed
    current_width = 0  # Current line pixel counter

    for c in s:
        char_width = widths[ord(c) - ord('a')]
        if current_width + char_width > 100:
            num_lines += 1      # Start a new line
            current_width = 0   # Reset current width
        current_width += char_width

    return [num_lines, current_width]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of string s. Each character is processed once to lookup width and update line/width counters.
- **Space Complexity:** O(1), as only constant extra space is used (num_lines, current_width), disregarding input storage for widths and s.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you adapt this if the maximum pixels per line was a parameter, not fixed at 100?  
  *Hint: Replace the hardcoded limit, pass as argument.*

- What if widths and s are very large—how would you optimize or scale?  
  *Hint: Consider streaming input, avoid loading the full string at once.*

- Can you write an overloaded version that also returns the ranges of characters written on each line?  
  *Hint: Track indices or slices per line while processing.*

### Summary
This is a classic **greedy filling** or **simulation** problem. You process elements one by one, filling the "container" (here, a line up to 100 pixels), and start a new container whenever the fill limit is exceeded.  
Patterns like this are common in **bin packing**, **string formatting**, and classic **greedy line breaking** logic. The approach is optimal for problems where you need to split input data into bucketed groups with a threshold.

### Tags
Array(#array), String(#string)

### Similar Problems
