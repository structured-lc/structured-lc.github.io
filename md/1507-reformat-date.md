### Leetcode 1507 (Easy): Reformat Date [Practice](https://leetcode.com/problems/reformat-date)

### Description  
Given a date string in the format `Day Month Year` (e.g. '20th Oct 2052'), reformat it to the ISO format `YYYY-MM-DD` (e.g. '2052-10-20'). The input date always has:
- Day as a number with "st", "nd", "rd", or "th" as a suffix (1 ≤ day ≤ 31)
- Month as a 3-letter English abbreviation
- Year as 4 digits.

### Examples  

**Example 1:**  
Input: `date = "20th Oct 2052"`  
Output: `2052-10-20`  
*Explanation: Rearranged and zero-padded.*

**Example 2:**  
Input: `date = "6th Jun 1933"`  
Output: `1933-06-06`  
*Explanation: Day and month are zero-padded.*

**Example 3:**  
Input: `date = "26th May 1960"`  
Output: `1960-05-26`  
*Explanation: Standard reformatting.*

### Thought Process (as if you’re the interviewee)  
- Split the string by spaces: [`Day`, `Month`, `Year`]
- Extract digits from the Day part and zero-pad if necessary
- Use a mapping for month abbreviations to numbers
- Return as "year-month-day"

### Corner cases to consider  
- Single-digit day ('1st', '2nd', ...)
- Day values need to be zero-padded
- Month abbreviations always valid

### Solution

```python
# Mapping month abbreviations to numbers
MONTHS = {
    'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04',
    'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08',
    'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
}

def reformatDate(date: str) -> str:
    day, month, year = date.split()
    # Remove suffix: 'th', 'st', 'nd', 'rd'
    day_num = ''.join(c for c in day if c.isdigit())
    if len(day_num) == 1:
        day_num = '0' + day_num
    month_num = MONTHS[month]
    return f"{year}-{month_num}-{day_num}"
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1), parsing and formatting string.
- **Space Complexity:** O(1), only uses a few variables.

### Potential follow-up questions (as if you’re the interviewer)  

- What changes if months are not always in English?  
  *Hint: You’d need a locale-aware or extended month mapping.*

- How would you parse the date if it came in as "YYYY-MMM-DD" or another custom format?  
  *Hint: Use regular expressions or robust parsing libraries.*

- How can you validate the input date?  
  *Hint: Check for valid ranges, month abbreviations, and possible leap years.*

### Summary
This is a **string parsing and mapping** problem, common in data normalization and transformation. The direct mapping pattern applies widely in code that interfaces with dates from multiple sources.


### Flashcard
Reformat a date string by splitting it into day, month, and year, then reassembling it in the desired format.

### Tags
String(#string)

### Similar Problems
