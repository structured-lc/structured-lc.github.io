### Leetcode 1618 (Medium): Maximum Font to Fit a Sentence in a Screen [Practice](https://leetcode.com/problems/maximum-font-to-fit-a-sentence-in-a-screen)

### Description  
Given a string `text`, an integer screen width `w` and height `h`, and a sorted list `fonts` of possible font sizes, determine the **largest font size** from `fonts` such that the entire `text` fits on a single line on the screen.  
You have access to a provided interface `FontInfo` with:
- `getWidth(fontSize, ch)`: gets the width of character `ch` using `fontSize`
- `getHeight(fontSize)`: gets the height of any character using `fontSize`  
Return the largest font size that fits (i.e., total width ≤ w and height ≤ h), or -1 if none fit.

### Examples  

**Example 1:**  
Input: `text = "leetcode"`, `w = 100`, `h = 45`, `fonts = [10, 12, 16, 18]`  
Output: `16`  
*Explanation: With font size 16, the total width of "leetcode" is ≤ 100, and the height is ≤ 45. Font size 18 is too big.*

**Example 2:**  
Input: `text = "apple"`, `w = 60`, `h = 20`, `fonts = [8,12,14,20,24]`  
Output: `14`  
*Explanation: 14 is the largest font size where the width of "apple" fits within 60 and height within 20.*

**Example 3:**  
Input: `text = "banana"`, `w = 50`, `h = 10`, `fonts = [11, 12]`  
Output: `-1`  
*Explanation: Neither 11 nor 12 meet both width and height constraints.*

### Thought Process (as if you’re the interviewee)  
First, brute force: For each font size in `fonts`, calculate total width (sum for each char using `getWidth`) and height (`getHeight`) and check if both fit the screen. Track the largest font size that works.  
However, since `fonts` is sorted (ascending), we can **optimize using binary search** (since if a font does not fit, all larger fonts also will not fit).  
For each mid-point in binary search, check width and height constraints:
- If fits, search right for bigger size.
- If does not fit, search left for smaller size.  
This minimizes the number of calls to `FontInfo` and is much more efficient than O(n).

### Corner cases to consider  
- `fonts` contains only one element  
- Font heights are greater than `h` for all fonts (none fit, return -1)  
- Empty `text` (should always fit, width = 0)  
- All fonts fit, or none fit  
- `w` or `h` is 0 (nothing can fit except empty text)

### Solution

```python
# Assume FontInfo interface is given as:
# FontInfo.getWidth(fontSize: int, ch: str) -> int
# FontInfo.getHeight(fontSize: int) -> int

def maxFont(text, w, h, fonts, fontInfo):
    left = 0
    right = len(fonts) - 1
    answer = -1

    while left <= right:
        mid = (left + right) // 2
        font_size = fonts[mid]
        
        # Check if the whole text fits at this font_size
        total_width = 0
        for ch in text:
            total_width += fontInfo.getWidth(font_size, ch)
        font_height = fontInfo.getHeight(font_size)
        
        if total_width <= w and font_height <= h:
            answer = font_size
            left = mid + 1   # Try to find an even larger one
        else:
            right = mid - 1  # Try smaller
    return answer
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(logₙ × t), where n = number of fonts, t = length of text. Each binary search iteration (logₙ) checks width for all t characters.
- **Space Complexity:** O(1) (constant extra space; does not scale with input; only indices and counters used)

### Potential follow-up questions (as if you’re the interviewer)  

- How would you minimize calls to `FontInfo.getWidth()`?  
  *Hint: Can you cache repeated width results for same character and font size?*

- What would you do if the font metrics are not guaranteed to be non-decreasing?  
  *Hint: You may need to check all fonts rather than using binary search.*

- If supporting multi-line text, how would the logic change?  
  *Hint: Break lines when reaching width limit, count total lines needed, fit within screen height.*

### Summary
This problem is a classic **binary search on answer** pattern. Because feasible font sizes are contiguous and sorted, binary search is much more efficient than linear scan.  
This pattern is common in search for maximal/minimal feasible value: e.g., capacity checking, scheduling, allocation problems, and more.


### Flashcard
Binary search the sorted font sizes, testing each mid-point for fit against screen dimensions, and track the largest valid font.

### Tags
Array(#array), String(#string), Binary Search(#binary-search), Interactive(#interactive)

### Similar Problems
