### Leetcode 3687 (Easy): Library Late Fee Calculator [Practice](https://leetcode.com/problems/library-late-fee-calculator)

### Description  
Given the due date and return date for a borrowed library book, compute the total late fee. If the book is returned after its due date, a fee of ₹5 per day overdue will be charged. If returned on or before the due date, there is no fee. You need to handle correct date parsing and error cases for invalid dates.

### Examples  

**Example 1:**  
Input: `due_date = "05-05-2024", return_date = "10-05-2024"`  
Output: `25`  
*Explanation: Returned 5 days late (10 - 5), so the fee = 5 × ₹5 = ₹25.*

**Example 2:**  
Input: `due_date = "15-04-2024", return_date = "10-04-2024"`  
Output: `0`  
*Explanation: Returned before due date, so no fee.*

**Example 3:**  
Input: `due_date = "10-07-2024", return_date = "10-07-2024"`  
Output: `0`  
*Explanation: Returned on due date, so no fee.*

### Thought Process (as if you’re the interviewee)  
First, parse both dates in the correct format ("dd-MM-yyyy"). Then calculate the number of days the book is returned late by checking if the difference is positive. If returned early or on time, the fee is zero.  
A brute-force approach would be to manually split the date strings and do calendar math, but risks errors with month/year boundaries. Instead, it's safer to use a standard approach to convert the strings to date objects, compute the difference, and apply the formula:  
Fee = max(0, days_late × ₹5).  
Validating date format should be done upfront to catch invalid inputs.

### Corner cases to consider  
- Return date is same as due date (fee zero)
- Return date before due date (fee zero)
- Wrong date format (should not crash)
- Month/year boundaries (e.g. due: "31-12-2023", returned: "01-01-2024")
- Leap year dates (e.g. "29-02-2024")
- Large overdue periods (e.g. 100+ days late)

### Solution

```python
from datetime import datetime

def library_late_fee(due_date: str, return_date: str) -> int:
    # Parse the input dates (assume format "dd-MM-yyyy")
    try:
        due_dt = datetime.strptime(due_date, "%d-%m-%Y")
        return_dt = datetime.strptime(return_date, "%d-%m-%Y")
    except ValueError:
        # If date format is incorrect, return 0 fee
        return 0

    # Calculate days late
    days_late = (return_dt - due_dt).days

    # Fee is ₹5 per day late, but never negative
    return max(0, days_late * 5)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) — Date parsing and difference calculation are constant time.
- **Space Complexity:** O(1) — Only a fixed number of variables are used, no extra storage.

### Potential follow-up questions (as if you’re the interviewer)  

- If the fine rate changes based on the type of book (e.g. ₹10/day for reference books), how would you modify your solution?  
  *Hint: Pass rate as a parameter, and/or use a lookup table for book types.*

- Suppose library holidays shouldn’t be counted for fines. How would you efficiently exclude these days?  
  *Hint: Build a set of holiday dates and count only actual overdue days.*

- If you have to process a list of 10,000 book records at once, what should you optimize?  
  *Hint: Batch processing and minimize repeated parsing.*

### Summary
This problem is a direct application of **date difference calculation** and simple conditional logic. The **pattern** is common in billing, rental, and scheduling situations, whenever time-based penalties or fees are needed. Clear input validation and edge case handling are crucial for reliable real-world code.

### Tags
Array(#array), Simulation(#simulation)

### Similar Problems
