### Leetcode 1517 (Easy): Find Users With Valid E-Mails [Practice](https://leetcode.com/problems/find-users-with-valid-e-mails)

### Description  
Given a table `Users` with columns `id` and `mail`, write an SQL query to find users with **valid emails**. A valid email:
- Contains only one '@' character.
- Has at least one '.' after the '@'.
- Begins with a **lowercase** letter.

Return the `id` of these users.

### Examples  

**Example 1:**  
Input:  
Users:
| id | mail                  |
|----|----------------------|
| 1  | lee@leetcode.com     |
| 2  | bar@Leet.Code.com    |
| 3  | f@leet.com           |
| 4  | invalid@email        |
Output:  
`[1, 3]`
*Explanation: 1 and 3 have valid lowercase begin, single '@', dot after @.*

**Example 2:**  
Input:  
| id | mail       |
|----|------------|
| 1  | a@a.a      |
| 2  | @a.com     |
| 3  | good@email.com |
Output:  
`[1, 3]`
*Explanation: Entries 1 and 3 are valid. Entry 2 starts with '@'.*

**Example 3:**  
Input:
| id | mail          |
|----|---------------|
| 1  | test@.com     |
| 2  | b@c           |
Output:  
`[]`
*Explanation: No valid emails ('.' must be after '@').*

### Thought Process (as if you’re the interviewee)  
To check **valid emails**, I need SQL logic or a regex that checks:
- First character is a lowercase letter
- Exactly one '@': compare for zero and more than one
- At least one '.' after '@': find position of '@' and check for '.' afterwards

I need to write a WHERE clause with string functions or regular expressions, probably using `REGEXP`, `LIKE`, or basic functions such as `SUBSTR()` and `INSTR()`.

### Corner cases to consider  
- Mail with more than one '@'
- Dot before @ instead of after
- No dot at all
- Mixed case or all uppercase
- Mail starts with a non-letter

### Solution

```sql
SELECT id
FROM Users
WHERE
  mail REGEXP '^[a-z][^@]*@[A-Za-z0-9.]+\\.[A-Za-z]+$'
  AND LENGTH(mail) - LENGTH(REPLACE(mail, '@', '')) = 1;
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n) where n = number of rows (each is checked)
- **Space Complexity:** O(1) extra, output size is O(k) for k matching users.

### Potential follow-up questions (as if you’re the interviewer)  
- How would you change query if uppercase is allowed as first letter?  
  *Hint: Modify regex pattern or use LOWER/UPPER normalization.*

- What if emails can have underscores or hyphens?  
  *Hint: Update character class in regex pattern.*

- How to ensure emails are unique in results?  
  *Hint: Add SELECT DISTINCT or filter duplicates by grouping.*

### Summary
The approach uses **regular expressions** and string operations in SQL to ensure email validity under specific rules. Email validation patterns are common in database and reporting queries, with regex being a standard solution.

### Tags
Database(#database)

### Similar Problems
