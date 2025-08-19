### Leetcode 182 (Easy): Duplicate Emails [Practice](https://leetcode.com/problems/duplicate-emails)

### Description  
Given a table named **Person** with columns `id` (integer, primary key) and `email` (string), write a query to find all email addresses that appear more than once in the table. Your output should be a single-column list of these duplicated email addresses.  

Example conversation:
> *“You have a people table, and you need to return only the emails used by more than one person. The answer should be a list of those duplicate emails.”*  

### Examples  

**Example 1:**  
Input:  
```
+----+---------+
| id | email   |
+----+---------+
|  1 | a@b.com |
|  2 | c@d.com |
|  3 | a@b.com |
+----+---------+
```
Output:  
```
+---------+
| Email   |
+---------+
| a@b.com |
+---------+
```
Explanation.  
`a@b.com` appears for id=1 and id=3, so it is duplicated. `c@d.com` appears only once.

**Example 2:**  
Input:  
```
+----+----------------+
| id | email          |
+----+----------------+
|  1 | sam@test.com   |
|  2 | joe@test.com   |
|  3 | sam@test.com   |
|  4 | nick@test.com  |
+----+----------------+
```
Output:  
```
+----------------+
| Email          |
+----------------+
| sam@test.com   |
+----------------+
```
Explanation.  
Only `sam@test.com` is used more than once.

**Example 3:**  
Input:  
```
+----+--------------+
| id | email        |
+----+--------------+
|  1 | mike@a.com   |
|  2 | angela@a.com |
|  3 | tom@a.com    |
+----+--------------+
```
Output:  
```
+------+
| Email|
+------+
(empty)
```
Explanation.  
All emails are unique, so there are no duplicate emails in the output.

### Thought Process (as if you’re the interviewee)  
First, the brute-force approach would be to compare each email against every other email for equality — but that's very inefficient (O(n²)), especially for database tables.

A practical approach is to **group emails** and count how many times each occurs:
- If an email appears more than once, it's duplicate.
- In SQL, this is done with `GROUP BY email HAVING COUNT(*) > 1`;
- In Python or other languages, you can use a dictionary or Counter to count.  

Alternatively, you could use a **self-join**: join the Person table to itself where the emails match but ids differ. This also finds duplicates but can be less efficient and harder to read for this task.  

**Trade-offs:**  
- The `GROUP BY` solution is simpler and generally more efficient since it's O(n) for counting/grouping.
- The self-join is O(n²) and usually only needed for more complex duplicate detection.

### Corner cases to consider  
- Table has only one row (no duplicates possible)
- All emails are unique
- All emails are the same (should return that one email)
- Multiple emails each duplicated
- Case sensitivity: emails like "A@B.com" vs "a@b.com" are considered different
- Null emails are not present (per problem guarantee)

### Solution

```python
# Given a list of dictionaries, each with 'id' and 'email' keys.
# Return a list of emails that occur more than once.

def duplicate_emails(persons):
    # Count occurrences of each email
    email_count = {}
    for person in persons:
        email = person['email']
        if email in email_count:
            email_count[email] += 1
        else:
            email_count[email] = 1
    # Collect emails that occur > 1 time
    result = []
    for email, count in email_count.items():
        if count > 1:
            result.append(email)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of rows. Each row is processed once to count, and then collected.
- **Space Complexity:** O(m), where m is the number of unique emails (for the dictionary storage), plus O(result) for the output list.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you output the ids of people sharing the same duplicated email?  
  *Hint: Maintain a list of ids for each email during counting.*

- What if the email field could be null?  
  *Hint: Skip rows where email is None, or handle specifically.*

- How would you count and output how many times each duplicate email occurs?  
  *Hint: Output key-value pairs: email → count, for counts > 1.*

### Summary
The approach uses **hash counting (dictionary/Counter)**, a common coding technique for duplicate detection, validation, or frequency analysis.  
This coding pattern applies in problems like “find the single non-duplicate in an array”, “anagrams”, and “duplicate file names”, among many others. The SQL `GROUP BY ... HAVING` pattern is also a foundational database skill.

### Tags
Database(#database)

### Similar Problems
