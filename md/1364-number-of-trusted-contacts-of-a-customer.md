### Leetcode 1364 (Medium): Number of Trusted Contacts of a Customer [Practice](https://leetcode.com/problems/number-of-trusted-contacts-of-a-customer)

### Description  
Given a table Contacts with columns: user_id, contact_name, contact_email, and trusted_status (values: 'YES' or 'NO'). Write an SQL query to find the number of trusted contacts ('YES') for each user_id. The result should have columns (user_id, count_trusted_contacts), ordered by user_id ascending.

### Examples  
**Example 1:**  
Input:  
Contacts table:
| user_id | contact_name | contact_email  | trusted_status |
|---------|--------------|----------------|---------------|
| 1       | John         | john@email.com | YES           |
| 1       | Amy          | amy@email.com  | NO            |
| 2       | Mary         | mary@email.com | YES           |
| 2       | Bob          | bob@email.com  | YES           |
Output:  
| user_id | count_trusted_contacts |
|---------|-----------------------|
| 1       | 1                     |
| 2       | 2                     |
*Explanation: User 1 has one trusted contact, user 2 has two.*

**Example 2:**  
Input:  
Contacts table:
| user_id | contact_name | contact_email  | trusted_status |
|---------|--------------|----------------|---------------|
| 1       | John         | john@email.com | NO            |
| 2       | Mary         | mary@email.com | YES           |
| 3       | Amy          | amy@email.com  | YES           |
Output:  
| user_id | count_trusted_contacts |
|---------|-----------------------|
| 2       | 1                     |
| 3       | 1                     |

**Example 3:**  
Input:  
Contacts table:
| user_id | contact_name | contact_email  | trusted_status |
|---------|--------------|----------------|---------------|
Output: (empty)

### Thought Process (as if you’re the interviewee)  
We need to count the number of contacts per user where trusted_status = 'YES'. That's a GROUP BY problem in SQL. Include only users with at least one trusted contact, so use WHERE trusted_status = 'YES', GROUP BY user_id, COUNT(*).

### Corner cases to consider  
- Users with no trusted contacts shouldn't appear in the result
- Multiple contacts for the same user with 'YES' status
- No contacts at all (empty output)
- All contacts are trusted, or all contacts are not trusted

### Solution
```sql
SELECT
  user_id,
  COUNT(*) AS count_trusted_contacts
FROM
  Contacts
WHERE
  trusted_status = 'YES'
GROUP BY
  user_id
ORDER BY
  user_id ASC;
```

### Time and Space complexity Analysis
- **Time Complexity:** O(N), where N is the number of rows in the Contacts table
- **Space Complexity:** O(U), where U is the number of unique user_ids in the output

### Potential follow-up questions (as if you’re the interviewer)  

- How would you include users with zero trusted contacts (output zero)?  
  *Hint: Use LEFT JOIN to a users table or COUNT with CASE WHEN...*

- What if you wanted the percentage of trusted contacts per user?  
  *Hint: COUNT trusted and COUNT total, then compute percentage.*

- Include users who have never added any contacts?  
  *Hint: LEFT JOIN a users table to Contacts.*

### Summary
This problem is a classic SQL aggregation (GROUP BY + COUNT with WHERE filter); useful for rollups, counting, and statistics by attribute.