### Leetcode 1853 (Easy): Convert Date Format [Practice](https://leetcode.com/problems/convert-date-format)

### Description  
Given a table `Days` with a single column `day` (of type `date`), **convert each date to a formatted string** of the form:  
**"day\_name, month\_name day, year"**  
Return this as a result table (order doesn’t matter).  
The output is **case-sensitive**.

### Examples  

**Example 1:**  
Input:  
```
Days table:
+------------+
| day        |
+------------+
| 2022-04-12 |
| 2021-08-09 |
| 2020-06-26 |
+------------+
```
Output:  
```
+-------------------------+
| day                     |
+-------------------------+
| Tuesday, April 12, 2022 |
| Monday, August 9, 2021  |
| Friday, June 26, 2020   |
+-------------------------+
```
Explanation:  
Each date is converted to "weekday name, month name day, year" format. The output strings are case-sensitive.

**Example 2:**  
Input:  
```
Days table:
+------------+
| day        |
+------------+
| 2020-01-01 |
| 2019-12-31 |
+------------+
```
Output:  
```
+------------------------+
| day                    |
+------------------------+
| Wednesday, January 1, 2020 |
| Tuesday, December 31, 2019 |
+------------------------+
```
Explanation:  
Both dates rendered to the requested format.

**Example 3:**  
Input:  
```
Days table:
+------------+
| day        |
+------------+
| 2023-07-23 |
+------------+
```
Output:  
```
+------------------------+
| day                    |
+------------------------+
| Sunday, July 23, 2023  |
+------------------------+
```
Explanation:  
Single date input: correctly formatted string.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Iterate each row, manually parse string and map year, month, day, and weekday. However, that would be error-prone and verbose, especially when needing actual weekday names.
- **Optimization:** Use built-in SQL **DATE\_FORMAT** function, which provides extensive options for date→string mapping.  
  - `%W`: Full weekday name (e.g., "Monday")  
  - `%M`: Full month name (e.g., "August")  
  - `%e`: Day of the month (numeric, space-padded)  
  - `%Y`: 4-digit year  
- This single function condenses the solution to one short, reliable, and readable line. It's preferable for maintainability and correctness, no risk of incorrect string manipulation.
- **Trade-offs:** Requires database that supports DATE\_FORMAT (common in MySQL).  
  - If not available, backup would be manual conversion logic (much more complex).

### Corner cases to consider  
- Empty table (should return empty result, no error).
- Input date at year/month/day boundaries (e.g., 2000-01-01, 1999-12-31).
- Leap day (e.g., 2020-02-29).
- All dates from the same week or month (shouldn't affect output format).
- Very old or futuristic date input.

### Solution

```sql
-- Use DATE_FORMAT to render the string in "weekday, month day, year" format
SELECT
  DATE_FORMAT(day, '%W, %M %e, %Y') AS day
FROM Days;
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of rows in the Days table. Each row is formatted independently.
- **Space Complexity:** O(n), as we return a formatted string for every input row. No extra space used beyond the output.

### Potential follow-up questions (as if you’re the interviewer)  

- What if my SQL flavor does not support DATE\_FORMAT?  
  *Hint: Emulate with CASE statements, month/weekday lookup tables.*

- How would you handle timezones or non-UTC stored dates?  
  *Hint: Use CONVERT\_TZ or similar transformation before formatting.*

- How would you format the date as "YYYY/MM/DD" or a custom user input format?  
  *Hint: Adjust the formatting string inside DATE\_FORMAT.*

### Summary
This is a straightforward **SQL date formatting** problem. It leverages the built-in `DATE_FORMAT` function, which abstracts away locale details and edge cases—making the approach robust, concise, and highly maintainable.  
The pattern of using built-in date/time formatting functions arises frequently in database reporting and data extraction, and a similar approach can be applied to any scenario requiring user-friendly or locale-specific date output.

### Tags
Database(#database)

### Similar Problems
