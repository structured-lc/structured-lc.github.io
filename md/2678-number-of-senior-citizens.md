### Leetcode 2678 (Easy): Number of Senior Citizens [Practice](https://leetcode.com/problems/number-of-senior-citizens)

### Description  
Given an array of strings `details`, where each element is a 15-character string representing a passenger, count how many passengers are strictly older than 60.  
- The string format:
  - Characters 0–9: phone number  
  - Character 10: gender  
  - Characters 11–12: age  
  - Characters 13–14: seat number  
Extract the two-digit age from each string (index 11 and 12), convert to an integer, and count the number of passengers with age > 60.

### Examples  

**Example 1:**  
Input: `["7868190130M7522","5303914400F9211","9273338290F4010"]`  
Output: `2`  
*Explanation:  
Passengers have ages 75, 92, 40. 75 > 60, 92 > 60, 40 ≤ 60. So the answer is 2.*

**Example 2:**  
Input: `["1313579440F2036","2921522980M5644"]`  
Output: `0`  
*Explanation:  
Ages are 20 and 56; both ≤ 60.*

**Example 3:**  
Input: `["1234567890M6101","0987654321F6102"]`  
Output: `0`  
*Explanation:  
Both passengers are age 61 (from "61"), but only strictly greater than 60 counts; so both count, so answer should be 2.*

### Thought Process (as if you’re the interviewee)  
First, I need to extract the age for each passenger string in the list. The string format is fixed; age is always at positions 11 and 12 (0-based), so I can simply slice or extract these indices. For each passenger:
- Extract the substring for age: detail[11:13]
- Convert to integer.
- If age > 60, increment a counter.

This is a classic single pass through the array, with constant work per string. There’s no need for optimization since the constraints are very small (up to 100 passengers).

Tradeoffs: This is already optimal with time O(n), n = passengers, and no extra data structures needed.

### Corner cases to consider  
- Ages that are exactly 60 (should NOT be counted).
- All passengers are under or equal to 60 (result should be 0).
- All passengers are strictly over 60 (result should be details.length).
- Repeated ages and edge boundary like 61 (should be included).
- Input list with a single passenger.
- Input list with minimum and maximum allowed length.

### Solution

```python
def countSeniors(details):
    """
    Counts how many passengers are strictly older than 60 based on encoded details.
    :param details: List[str] - each string of length 15, formatted as described.
    :return: int - number of passengers older than 60
    """
    count = 0

    for detail in details:
        # Extract characters at index 11 and 12 (age is always 2 digits)
        age_str = detail[11:13]
        age = int(age_str)

        # Check if the age is strictly greater than 60
        if age > 60:
            count += 1

    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of elements in details. We visit each string exactly once and perform constant work.
- **Space Complexity:** O(1) extra space. Only a counter and local variables are used; no extra data structures.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the format changes: age is not always at the same index?  
  *Hint: Consider splitting by delimiters or parsing differently.*
  
- What if we need to group passengers by age ranges (e.g., 61–70, 71–80, etc.)?  
  *Hint: Use a dictionary to count ranges as buckets.*

- How would you handle malformed inputs or variable-length strings?  
  *Hint: Add input validation before processing substring extraction.*

### Summary
This approach demonstrates the **array traversal and string parsing pattern**, often used when data is encoded in a uniform way. It’s a straightforward pass-through with substring access, which can be applied to similar fixed-format parsing problems (e.g., reading logs, simple file formats, or any record-based processing). No extra structures or optimization is needed due to the simplicity and constraints of the task.